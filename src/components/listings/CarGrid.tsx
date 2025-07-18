'use client';

import { CarCard } from './CarCard';

interface Car {
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

interface CarGridProps {
  cars: Car[];
  isLoading?: boolean;
}

export const CarGrid = ({ cars, isLoading = false }: CarGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg"></div>
            <div className="mt-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No cars found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search filters to find more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} {...car} />
      ))}
    </div>
  );
}; 