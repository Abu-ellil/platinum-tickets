import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Venue from '@/models/Venue';
import City from '@/models/City';

// GET /api/venues - List venues (optionally filter by city)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId');
    
    const query: Record<string, unknown> = {};
    if (cityId) query.cityId = cityId;
    
    const venues = await Venue.find(query)
      .populate({ path: 'cityId', model: City, select: 'name' })
      .sort({ 'name.en': 1 })
      .lean();
    
    return NextResponse.json({ success: true, data: venues });
  } catch (error: any) {
    console.error('Error fetching venues:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch venues' },
      { status: 500 }
    );
  }
}

// POST /api/venues - Create new venue
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const venue = await Venue.create(body);
    
    return NextResponse.json({ success: true, data: venue }, { status: 201 });
  } catch (error) {
    console.error('Error creating venue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create venue' },
      { status: 500 }
    );
  }
}
