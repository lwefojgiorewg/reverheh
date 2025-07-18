const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if data already exists
    const existingCars = await prisma.car.count();
    if (existingCars > 0) {
      console.log('Database already has data. Skipping seed.');
      return;
    }

    // Create sample users
    const user1 = await prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      },
    });

    const user2 = await prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
      },
    });

    // Sample car data
    const cars = [
      {
        make: 'BMW',
        model: '3 Series',
        year: 2020,
        price: 35000,
        mileage: 25000,
        description: 'Well-maintained BMW 3 Series with full service history',
        bodyType: 'Sedan',
        doors: 4,
        seats: 5,
        color: 'Alpine White',
        firstRegistration: new Date('2020-03-15'),
        power: 190,
        displacement: 1998,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        drive: 'RWD',
        acceleration: 7.1,
        topSpeed: 240,
        fuelConsumptionCombined: 6.2,
        fuelConsumptionUrban: 7.8,
        fuelConsumptionExtraUrban: 5.4,
        co2Emissions: 142,
        previousOwners: 1,
        hasWarranty: true,
        hasServiceHistory: true,
        sellerId: user1.id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
              alt: 'BMW 3 Series front',
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
              alt: 'BMW 3 Series interior',
              order: 1,
            },
          ],
        },
      },
      {
        make: 'Audi',
        model: 'A4',
        year: 2019,
        price: 32000,
        mileage: 35000,
        description: 'Premium Audi A4 with excellent condition',
        bodyType: 'Sedan',
        doors: 4,
        seats: 5,
        color: 'Brilliant Black',
        firstRegistration: new Date('2019-06-20'),
        power: 180,
        displacement: 1984,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        drive: 'AWD',
        acceleration: 7.3,
        topSpeed: 235,
        fuelConsumptionCombined: 6.5,
        fuelConsumptionUrban: 8.1,
        fuelConsumptionExtraUrban: 5.7,
        co2Emissions: 148,
        previousOwners: 2,
        hasWarranty: false,
        hasServiceHistory: true,
        sellerId: user2.id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
              alt: 'Audi A4 front',
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
              alt: 'Audi A4 interior',
              order: 1,
            },
          ],
        },
      },
      {
        make: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2021,
        price: 42000,
        mileage: 18000,
        description: 'Luxury Mercedes C-Class with premium features',
        bodyType: 'Sedan',
        doors: 4,
        seats: 5,
        color: 'Obsidian Black',
        firstRegistration: new Date('2021-01-10'),
        power: 200,
        displacement: 1991,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        drive: 'RWD',
        acceleration: 6.8,
        topSpeed: 250,
        fuelConsumptionCombined: 5.2,
        fuelConsumptionUrban: 6.1,
        fuelConsumptionExtraUrban: 4.8,
        co2Emissions: 137,
        previousOwners: 1,
        hasWarranty: true,
        hasServiceHistory: true,
        sellerId: user1.id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
              alt: 'Mercedes C-Class front',
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
              alt: 'Mercedes C-Class interior',
              order: 1,
            },
          ],
        },
      },
      {
        make: 'Volkswagen',
        model: 'Golf',
        year: 2018,
        price: 22000,
        mileage: 45000,
        description: 'Reliable VW Golf with great fuel economy',
        bodyType: 'Hatchback',
        doors: 5,
        seats: 5,
        color: 'Pure White',
        firstRegistration: new Date('2018-09-05'),
        power: 150,
        displacement: 1968,
        fuelType: 'Diesel',
        transmission: 'Manual',
        drive: 'FWD',
        acceleration: 8.5,
        topSpeed: 210,
        fuelConsumptionCombined: 4.8,
        fuelConsumptionUrban: 5.6,
        fuelConsumptionExtraUrban: 4.3,
        co2Emissions: 125,
        previousOwners: 2,
        hasWarranty: false,
        hasServiceHistory: true,
        sellerId: user2.id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
              alt: 'VW Golf front',
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
              alt: 'VW Golf interior',
              order: 1,
            },
          ],
        },
      },
    ];

    // Create cars
    for (const car of cars) {
      await prisma.car.create({
        data: car,
      });
    }

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 