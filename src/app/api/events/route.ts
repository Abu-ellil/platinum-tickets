import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import Venue from '@/models/Venue';
import City from '@/models/City';

// GET /api/events - List all events
export async function GET(request: NextRequest) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get('cityId');
  const status = searchParams.get('status') || 'active';
  const limit = parseInt(searchParams.get('limit') || '50');
  
  const query: Record<string, unknown> = {};
  if (cityId) query.cityId = cityId;
  if (status !== 'all') query.status = status;
  
  const events = await Event.find(query)
    .populate('venueId', 'name image')
    .populate('cityId', 'name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  
  return NextResponse.json({ success: true, data: events });
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const event = await Event.create(body);
    
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
