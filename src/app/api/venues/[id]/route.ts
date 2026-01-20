import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Venue from '@/models/Venue';
import City from '@/models/City';

// GET /api/venues/[id] - Get a single venue
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const venue = await Venue.findById(id).populate({ path: 'cityId', model: City, select: 'name' });
    
    if (!venue) {
      return NextResponse.json(
        { success: false, error: 'Venue not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: venue });
  } catch (error) {
    console.error('Error fetching venue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch venue' },
      { status: 500 }
    );
  }
}

// PUT /api/venues/[id] - Update a venue
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const venue = await Venue.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!venue) {
      return NextResponse.json(
        { success: false, error: 'Venue not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: venue });
  } catch (error) {
    console.error('Error updating venue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update venue' },
      { status: 500 }
    );
  }
}

// DELETE /api/venues/[id] - Delete a venue
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const venue = await Venue.findByIdAndDelete(id);

    if (!venue) {
      return NextResponse.json(
        { success: false, error: 'Venue not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Venue deleted' });
  } catch (error) {
    console.error('Error deleting venue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete venue' },
      { status: 500 }
    );
  }
}
