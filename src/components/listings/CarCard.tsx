'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CarCardProps {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  imageUrl: string;
  fuelType: string;
  transmission: string;
}

export const CarCard = ({
  id,
  title,
  price,
  year,
  mileage,
  location,
  imageUrl,
  fuelType,
  transmission,
}: CarCardProps) => {
  return (
    <Link href={`/cars/${id}`} className="group">
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
        {/* Car Image */}
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Car Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
            {title}
          </h3>
          
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">€{price.toLocaleString()}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {year}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {mileage.toLocaleString()} km
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {fuelType}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {transmission}
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        </div>
      </div>
    </Link>
  );
}; 