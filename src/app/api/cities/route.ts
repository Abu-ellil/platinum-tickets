import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import { CITIES } from '@/lib/venues-registry';

export const dynamic = 'force-dynamic';

// GET /api/cities - List all cities
export async function GET() {
  try {
    await dbConnect();
    
    console.log('GET /api/cities - Database connected');
    const cities = await City.find({})
      .sort({ 'name.en': 1 })
      .lean();
    console.log(`GET /api/cities - Found ${cities.length} cities`);
    
    return NextResponse.json({ success: true, data: cities });
  } catch (error) {
    console.error('Database connection failed:', error);
    
    // Fallback to static data if DB is not available
    const fallbackCities = CITIES.map(city => ({
      _id: city.id,
      name: city.name,
      country: city.country,
      image: city.image,
      slug: city.id,
      flag: city.id === 'doha' ? '🇶🇦' : 
            city.id === 'manama' ? '🇧🇭' : 
            city.id === 'dubai' ? '🇦🇪' : 
            city.id === 'riyadh' ? '🇸🇦' : '📍',
    }));

    return NextResponse.json({ 
      success: true, 
      data: fallbackCities,
      warning: `Using static fallback data. Error: ${error instanceof Error ? error.message : String(error)}`
    });
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
