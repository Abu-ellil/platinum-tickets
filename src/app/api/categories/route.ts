import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

// GET /api/categories - List all categories
export async function GET() {
  await dbConnect();
  
  const categories = await Category.find({})
    .sort({ slug: 1 })
    .lean();
  
  return NextResponse.json({ success: true, data: categories });
}

// POST /api/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const category = await Category.create(body);
    
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
