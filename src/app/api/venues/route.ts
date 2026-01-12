import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Venue from '@/models/Venue';
import { VENUES_REGISTRY } from '@/lib/venues-registry';

// GET /api/venues - List venues (optionally filter by city)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId');
    
    const query: Record<string, unknown> = {};
    if (cityId) query.cityId = cityId;
    
    const venues = await Venue.find(query)
      .populate('cityId', 'name')
      .sort({ 'name.en': 1 })
      .lean();
    
    return NextResponse.json({ success: true, data: venues });
  } catch (error) {
    console.error('Database connection failed, falling back to static venues data:', error);
    
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId');
    
    let fallbackVenues = VENUES_REGISTRY.map(v => ({
      _id: v.id,
      name: v.name,
      cityId: v.cityId,
      image: v.image,
      theaterId: v.theaterId
    }));

    if (cityId) {
      fallbackVenues = fallbackVenues.filter(v => v.cityId === cityId);
    }

    return NextResponse.json({ 
      success: true, 
      data: fallbackVenues,
      warning: 'Using static fallback data because database connection failed.'
    });
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
