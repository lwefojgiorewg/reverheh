import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import { prisma } from '../src/lib/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const IMAGE_CATEGORIES = [
  'sedan', 'suv', 'sports-car', 'luxury-car',
  'vintage-car', 'electric-car', 'convertible'
];

// Function to download image from URL
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve());
      } else {
        response.resume();
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Function to fetch images from Unsplash
async function fetchUnsplashImages(query: string, count: number = 5) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=landscape`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.status}`);
  }

  const data = await response.json();
  return data.results.map((photo: any) => ({
    url: photo.urls.regular,
    description: photo.description || photo.alt_description || '',
    credit: {
      name: photo.user.name,
      link: photo.user.links.html
    }
  }));
}

// Main function to download and store images
async function downloadCarImages() {
  // Create images directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'public', 'car-images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Create credits file
  const creditsFile = path.join(imagesDir, 'credits.json');
  const credits: any = {};

  for (const category of IMAGE_CATEGORIES) {
    console.log(`Downloading ${category} images...`);
    
    try {
      const images = await fetchUnsplashImages(category);
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const filename = `${category}-${i + 1}.jpg`;
        const filepath = path.join(imagesDir, filename);
        
        await downloadImage(image.url, filepath);
        
        // Store credits
        credits[filename] = {
          description: image.description,
          photographer: image.credit.name,
          link: image.credit.link
        };

        console.log(`Downloaded: ${filename}`);
      }
    } catch (error) {
      console.error(`Error downloading ${category} images:`, error);
    }
  }

  // Save credits
  fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2));
  console.log('Credits saved to credits.json');

  // Update car listings with random images
  const cars = await prisma.car.findMany();
  
  for (const car of cars) {
    const categoryImages = fs.readdirSync(imagesDir)
      .filter(file => file.startsWith(car.bodyType.toLowerCase()) && file.endsWith('.jpg'))
      .map(file => `/car-images/${file}`);

    if (categoryImages.length > 0) {
      // Randomly select 3-5 images for each car
      const numImages = Math.floor(Math.random() * 3) + 3;
      const selectedImages = [...categoryImages]
        .sort(() => Math.random() - 0.5)
        .slice(0, numImages);

      // Delete existing images
      await prisma.carImage.deleteMany({
        where: { carId: car.id }
      });

      // Create new image records
      await prisma.car.update({
        where: { id: car.id },
        data: {
          images: {
            create: selectedImages.map((url, index) => ({
              url,
              order: index,
              alt: `${car.make} ${car.model} ${car.year} - Image ${index + 1}`
            }))
          }
        }
      });

      console.log(`Updated images for car: ${car.id}`);
    }
  }
}

// Run the script
if (import.meta.url === fileURLToPath(process.argv[1])) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Please set UNSPLASH_ACCESS_KEY environment variable');
    process.exit(1);
  }

  downloadCarImages()
    .then(() => {
      console.log('Image download completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
} 