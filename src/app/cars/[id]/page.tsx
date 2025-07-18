import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/layout/Header';
import { ImageGallery } from '@/components/cars/ImageGallery';
import { CarSpecifications } from '@/components/cars/CarSpecifications';
import { ContactForm } from '@/components/cars/ContactForm';
import { SellerInfo } from '@/components/cars/SellerInfo';

interface CarDetailsPageProps {
  params: { id: string };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const car = await prisma.car.findUnique({
    where: { id: params.id },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
      seller: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-[#ff4c0c]">Home</a></li>
            <li>/</li>
            <li><a href="/cars" className="hover:text-[#ff4c0c]">Cars</a></li>
            <li>/</li>
            <li className="text-gray-900">{car.make} {car.model}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Title and Price */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#333f48] mb-2">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {car.year} • {car.mileage.toLocaleString()} km • {car.color}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#ff4c0c]">
                    €{car.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">Price</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Fuel Type</span>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
                <div>
                  <span className="text-gray-500">Transmission</span>
                  <p className="font-medium">{car.transmission}</p>
                </div>
                <div>
                  <span className="text-gray-500">Body Type</span>
                  <p className="font-medium">{car.bodyType}</p>
                </div>
                <div>
                  <span className="text-gray-500">Drive</span>
                  <p className="font-medium">{car.drive}</p>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#333f48] mb-4">Photos</h2>
              <ImageGallery images={car.images} />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#333f48] mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {car.description || `This ${car.year} ${car.make} ${car.model} is a well-maintained vehicle with ${car.mileage.toLocaleString()} kilometers on the odometer. It features a ${car.fuelType} engine with ${car.transmission} transmission and ${car.drive} drive system.`}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#333f48] mb-4">Technical Specifications</h2>
              <CarSpecifications car={car} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="bg-white rounded-lg p-6">
              <SellerInfo seller={car.seller} />
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#333f48] mb-4">Contact Seller</h3>
              <ContactForm carId={car.id} sellerId={car.sellerId} />
            </div>

            {/* Similar Cars */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#333f48] mb-4">Similar Cars</h3>
              <SimilarCars currentCar={car} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

async function SimilarCars({ currentCar }: { currentCar: any }) {
  const similarCars = await prisma.car.findMany({
    where: {
      OR: [
        { make: currentCar.make },
        { bodyType: currentCar.bodyType },
        { fuelType: currentCar.fuelType },
      ],
      NOT: { id: currentCar.id },
    },
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    take: 3,
  });

  if (similarCars.length === 0) return null;

  return (
    <div className="space-y-4">
      {similarCars.map((car) => (
        <a
          key={car.id}
          href={`/cars/${car.id}`}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="w-16 h-12 bg-gray-200 rounded flex-shrink-0">
            {car.images[0] && (
              <img
                src={car.images[0].url}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[#333f48] truncate">
              {car.make} {car.model}
            </h4>
            <p className="text-sm text-gray-600">
              {car.year} • {car.mileage.toLocaleString()} km
            </p>
            <p className="text-sm font-medium text-[#ff4c0c]">
              €{car.price.toLocaleString()}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
} 