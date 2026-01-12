import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';

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
    console.error('Error fetching city by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch city' },
      { status: 500 }
    );
  }
}
