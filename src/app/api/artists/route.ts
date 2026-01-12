import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artist from '@/models/Artist';

// GET /api/artists - List all artists
export async function GET() {
  try {
    await dbConnect();
    
    const artists = await Artist.find({})
      .sort({ 'name.en': 1 })
      .lean();
    
    return NextResponse.json({ success: true, data: artists });
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}

// POST /api/artists - Create new artist
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const artist = await Artist.create(body);
    
    return NextResponse.json({ success: true, data: artist }, { status: 201 });
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create artist' },
      { status: 500 }
    );
  }
}
