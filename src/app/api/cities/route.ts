import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';

export const dynamic = 'force-dynamic';

// GET /api/cities - List all cities
export async function GET() {
  try {
    await dbConnect();
    
    console.log('GET /api/cities - Database connected');
    const cities = await City.find({})
      .sort({ 'name.en': 1 })
      .lean();
    
    return NextResponse.json({ success: true, data: cities });
  } catch (error: any) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}

// POST /api/cities - Create new city
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const city = await City.create(body);
    
    return NextResponse.json({ success: true, data: city }, { status: 201 });
  } catch (error) {
    console.error('Error creating city:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create city' },
      { status: 500 }
    );
  }
}
