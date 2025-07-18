import { Suspense } from 'react';
import CarFilters from '@/components/cars/CarFilters';
import { CarGrid } from '@/components/cars/CarGrid';
import { CarSorting } from '@/components/cars/CarSorting';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Car Listings | AutoScout24 Clone',
  description: 'Browse our extensive collection of cars for sale',
};

export default async function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch filter options
  const [makes, bodyTypes, fuelTypes, transmissions] = await Promise.all([
    prisma.car.findMany({
      select: { make: true },
      distinct: ['make'],
      orderBy: { make: 'asc' },
    }),
    prisma.car.findMany({
      select: { bodyType: true },
      distinct: ['bodyType'],
      orderBy: { bodyType: 'asc' },
    }),
    prisma.car.findMany({
      select: { fuelType: true },
      distinct: ['fuelType'],
      orderBy: { fuelType: 'asc' },
    }),
    prisma.car.findMany({
      select: { transmission: true },
      distinct: ['transmission'],
      orderBy: { transmission: 'asc' },
    }),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#333f48] mb-8">Cars for Sale</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4">
          <CarFilters 
            makes={makes.map(c => c.make)}
            bodyTypes={bodyTypes.map(c => c.bodyType)}
            fuelTypes={fuelTypes.map(c => c.fuelType)}
            transmissions={transmissions.map(c => c.transmission)}
            searchParams={searchParams}
          />
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <CarSorting />
          </div>
          
          <Suspense fallback={<div>Loading cars...</div>}>
            <CarGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 