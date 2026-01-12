
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import Venue from '@/models/Venue';
import City from '@/models/City';

// GET /api/events/[id] - Get single event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    // params is a Promise in Next.js 15+ (or can be anticipated as such)
    // but in current versions it might be just an object. 
    // Adapting for safety:
    const { id } = await params;

    const event = await Event.findById(id)
      .populate('venueId', 'name image')
      .populate('cityId', 'name')
      .lean();

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}
