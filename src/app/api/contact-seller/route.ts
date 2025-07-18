import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, carId, sellerId } = body;

    // Validate required fields
    if (!name || !email || !message || !carId || !sellerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get car and seller information
    const [car, seller] = await Promise.all([
      prisma.car.findUnique({
        where: { id: carId },
        select: { make: true, model: true, year: true },
      }),
      prisma.user.findUnique({
        where: { id: sellerId },
        select: { name: true, email: true },
      }),
    ]);

    if (!car || !seller) {
      return NextResponse.json(
        { error: 'Car or seller not found' },
        { status: 404 }
      );
    }

    // In a real application, you would:
    // 1. Send an email to the seller
    // 2. Store the message in a database
    // 3. Send a confirmation email to the buyer
    // 4. Log the interaction

    console.log('Contact form submission:', {
      buyer: { name, email, phone },
      car: `${car.year} ${car.make} ${car.model}`,
      seller: seller.name,
      message,
    });

    // For now, we'll just return success
    // In production, you'd implement actual email sending and database storage

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully. The seller will contact you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 