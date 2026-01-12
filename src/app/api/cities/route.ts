import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';

// GET /api/cities - List all cities
export async function GET() {
  try {
    await dbConnect();
    
    const cities = await City.find({})
      .sort({ 'name.en': 1 })
      .lean();
    
    return NextResponse.json({ success: true, data: cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cities' },
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
