'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CarImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
}

interface ImageGalleryProps {
  images: CarImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]?.url || '/placeholder-car.jpg'}
          alt={images[selectedImage]?.alt || 'Car image'}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index
                  ? 'border-[#ff4c0c]'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Car image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 