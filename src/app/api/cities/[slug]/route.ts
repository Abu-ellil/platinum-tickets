import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import { CITIES } from '@/lib/venues-registry';

// GET /api/cities/[slug] - Get a single city by its slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    
    const { slug } = await params;
    
    const city = await City.findOne({ slug })
      .lean();
    
    if (!city) {
      return NextResponse.json(
        { success: false, error: 'City not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: city });
  } catch (error) {
    console.error('Database connection failed, falling back to static city data:', error);
    
    const { slug } = await params;
    const staticCity = CITIES.find(c => c.id === slug);

    if (staticCity) {
      const fallbackCity = {
        _id: staticCity.id,
        name: staticCity.name,
        country: staticCity.country,
        image: staticCity.image,
        slug: staticCity.id,
        flag: staticCity.id === 'doha' ? '🇶🇦' : 
              staticCity.id === 'manama' ? '🇧🇭' : 
              staticCity.id === 'dubai' ? '🇦🇪' : 
              staticCity.id === 'riyadh' ? '🇸🇦' : '📍',
      };
      
      return NextResponse.json({ 
        success: true, 
        data: fallbackCity,
        warning: 'Using static fallback data because database connection failed.'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch city' },
      { status: 500 }
    );
  }
}
