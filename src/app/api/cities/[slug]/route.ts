import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';

// GET /api/cities/[slug] - Get a single city by its slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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
}

// PUT /api/cities/[slug] - Update a city
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();

    const city = await City.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!city) {
      return NextResponse.json(
        { success: false, error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: city });
  } catch (error) {
    console.error('Error updating city:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update city' },
      { status: 500 }
    );
  }
}

// DELETE /api/cities/[slug] - Delete a city
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const city = await City.findOneAndDelete({ slug });

    if (!city) {
      return NextResponse.json(
        { success: false, error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'City deleted' });
  } catch (error) {
    console.error('Error deleting city:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete city' },
      { status: 500 }
    );
  }
}
