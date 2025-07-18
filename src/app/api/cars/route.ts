import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { CarFilter } from '@/types/filters';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters
    const filters: Partial<CarFilter> = {
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      minYear: searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined,
      maxYear: searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined,
      minMileage: searchParams.get('minMileage') ? parseInt(searchParams.get('minMileage')!) : undefined,
      maxMileage: searchParams.get('maxMileage') ? parseInt(searchParams.get('maxMileage')!) : undefined,
      bodyType: searchParams.get('bodyType') || undefined,
      make: searchParams.get('make') || undefined,
      model: searchParams.get('model') || undefined,
      fuelType: searchParams.get('fuelType') || undefined,
      transmission: searchParams.get('transmission') || undefined,
    };

    // Build where clause
    const where: any = {};
    if (filters.minPrice) where.price = { ...where.price, gte: filters.minPrice };
    if (filters.maxPrice) where.price = { ...where.price, lte: filters.maxPrice };
    if (filters.minYear) where.year = { ...where.year, gte: filters.minYear };
    if (filters.maxYear) where.year = { ...where.year, lte: filters.maxYear };
    if (filters.minMileage) where.mileage = { ...where.mileage, gte: filters.minMileage };
    if (filters.maxMileage) where.mileage = { ...where.mileage, lte: filters.maxMileage };
    if (filters.bodyType) where.bodyType = filters.bodyType;
    if (filters.make) where.make = filters.make;
    if (filters.model) where.model = filters.model;
    if (filters.fuelType) where.fuelType = filters.fuelType;
    if (filters.transmission) where.transmission = filters.transmission;

    // Parse pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Parse sorting
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const orderBy = { [sortField]: sortOrder };

    // Fetch cars with relations
    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        include: {
          images: {
            orderBy: { order: 'asc' },
            take: 1,
          },
          seller: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.car.count({ where }),
    ]);

    return NextResponse.json({
      cars,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    
    // Extract car data
    const carData = {
      make: formData.get('make') as string,
      model: formData.get('model') as string,
      year: parseInt(formData.get('year') as string),
      price: parseFloat(formData.get('price') as string),
      mileage: parseInt(formData.get('mileage') as string),
      description: formData.get('description') as string,
      fuelType: formData.get('fuelType') as string,
      transmission: formData.get('transmission') as string,
      bodyType: formData.get('bodyType') as string,
      color: formData.get('color') as string,
      location: formData.get('location') as string,
      sellerId: user.id,
      // Set default values for required fields
      doors: 4,
      seats: 5,
      firstRegistration: new Date(),
      power: 0,
      displacement: 0,
      drive: 'FWD',
      previousOwners: 1,
      hasWarranty: false,
      hasServiceHistory: false,
    };

    // Create the car
    const car = await prisma.car.create({
      data: carData,
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Handle image uploads (simplified - in production you'd upload to cloud storage)
    const images = formData.getAll('images') as File[];
    
    if (images.length > 0) {
      const imagePromises = images.map(async (image, index) => {
        // For now, we'll store placeholder URLs
        // In production, you'd upload to cloud storage and get real URLs
        const imageUrl = `/api/placeholder-image/${car.id}/${index}`;
        
        return prisma.carImage.create({
          data: {
            url: imageUrl,
            alt: `${car.make} ${car.model} - Image ${index + 1}`,
            order: index,
            carId: car.id,
          },
        });
      });

      await Promise.all(imagePromises);
    }

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
} 