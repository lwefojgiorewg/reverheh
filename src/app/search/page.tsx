'use client';

import { Header } from '@/components/layout/Header';
import { CarSearch } from '@/components/search/CarSearch';
import { CarGrid } from '@/components/listings/CarGrid';
import { useState } from 'react';

// Mock data for demonstration
const MOCK_CARS = [
  {
    id: '1',
    title: 'BMW 3 Series 320d M Sport',
    price: 35000,
    year: 2021,
    mileage: 25000,
    location: 'Munich, Germany',
    imageUrl: 'https://placehold.co/600x400',
    fuelType: 'Diesel',
    transmission: 'Automatic'
  },
  {
    id: '2',
    title: 'Mercedes-Benz C-Class C200 AMG Line',
    price: 42000,
    year: 2022,
    mileage: 15000,
    location: 'Berlin, Germany',
    imageUrl: 'https://placehold.co/600x400',
    fuelType: 'Petrol',
    transmission: 'Automatic'
  },
  {
    id: '3',
    title: 'Audi A4 40 TFSI S line',
    price: 38000,
    year: 2021,
    mileage: 20000,
    location: 'Hamburg, Germany',
    imageUrl: 'https://placehold.co/600x400',
    fuelType: 'Petrol',
    transmission: 'Automatic'
  }
];

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search filters */}
          <div className="mb-8">
            <CarSearch />
          </div>

          {/* Search results */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="relevance"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="year_desc">Year: Newest First</option>
                  <option value="mileage_asc">Mileage: Low to High</option>
                </select>
              </div>
            </div>

            {/* Car grid */}
            <CarGrid cars={MOCK_CARS} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </main>
  );
} 