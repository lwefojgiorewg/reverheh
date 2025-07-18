import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface CarGridProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getCars(searchParams: CarGridProps['searchParams']) {
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  // Build where clause based on filters
  const where: any = {};

  // Price range
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = Number(searchParams.minPrice);
    if (searchParams.maxPrice) where.price.lte = Number(searchParams.maxPrice);
  }

  // Year range
  if (searchParams.minYear || searchParams.maxYear) {
    where.year = {};
    if (searchParams.minYear) where.year.gte = Number(searchParams.minYear);
    if (searchParams.maxYear) where.year.lte = Number(searchParams.maxYear);
  }

  // Mileage range
  if (searchParams.minMileage || searchParams.maxMileage) {
    where.mileage = {};
    if (searchParams.minMileage) where.mileage.gte = Number(searchParams.minMileage);
    if (searchParams.maxMileage) where.mileage.lte = Number(searchParams.maxMileage);
  }

  // Body type
  if (searchParams.bodyType) {
    where.bodyType = {
      in: Array.isArray(searchParams.bodyType)
        ? searchParams.bodyType
        : searchParams.bodyType.split(','),
    };
  }

  // Fuel type
  if (searchParams.fuelType) {
    where.fuelType = {
      in: Array.isArray(searchParams.fuelType)
        ? searchParams.fuelType
        : searchParams.fuelType.split(','),
    };
  }

  // Transmission
  if (searchParams.transmission) {
    where.transmission = {
      in: Array.isArray(searchParams.transmission)
        ? searchParams.transmission
        : searchParams.transmission.split(','),
    };
  }

  // Determine sort order
  let orderBy: any = { createdAt: 'desc' };
  const sort = searchParams.sort as string;
  
  switch (sort) {
    case 'price_asc':
      orderBy = { price: 'asc' };
      break;
    case 'price_desc':
      orderBy = { price: 'desc' };
      break;
    case 'year_desc':
      orderBy = { year: 'desc' };
      break;
    case 'year_asc':
      orderBy = { year: 'asc' };
      break;
    case 'mileage_asc':
      orderBy = { mileage: 'asc' };
      break;
    case 'mileage_desc':
      orderBy = { mileage: 'desc' };
      break;
  }

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        seller: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
    prisma.car.count({ where }),
  ]);

  return { cars, total, pages: Math.ceil(total / limit) };
}

export async function CarGrid({ searchParams }: CarGridProps) {
  const { cars, total, pages } = await getCars(searchParams);
  const currentPage = Number(searchParams.page) || 1;

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-[#333f48]">No cars found</h3>
        <p className="text-gray-600 mt-2">Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {cars.length} of {total} cars
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link
            href={`/cars/${car.id}`}
            key={car.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={car.images[0]?.url || '/placeholder-car.jpg'}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#333f48] mb-2">{car.make} {car.model}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold text-[#ff4c0c]">
                  €{car.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">{car.year}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{car.mileage.toLocaleString()} km</span>
                <span>•</span>
                <span>{car.fuelType}</span>
                <span>•</span>
                <span>{car.transmission}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {car.seller.image && (
                  <Image
                    src={car.seller.image}
                    alt={car.seller.name || ''}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600">{car.seller.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((page) => {
            const params = new URLSearchParams(searchParams as any);
            params.set('page', page.toString());
            
            return (
              <Link
                key={page}
                href={`/cars?${params.toString()}`}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page
                    ? 'bg-[#ff4c0c] text-white'
                    : 'bg-white text-[#333f48] hover:bg-gray-100'
                }`}
              >
                {page}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
} 