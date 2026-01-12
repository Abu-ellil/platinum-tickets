import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Venue from '@/models/Venue';
import Artist from '@/models/Artist';
import Category from '@/models/Category';
import { STAGE_CATEGORIES } from '@/lib/platinum-stage-data';
import { MANAMA_CATEGORIES } from '@/lib/manama-amphitheater-data';

// POST /api/seed - Seed initial data
export async function POST() {
  try {
    await dbConnect();
    
    // Clear existing data
    await Promise.all([
      City.deleteMany({}),
      Venue.deleteMany({}),
      Artist.deleteMany({}),
      Category.deleteMany({}),
    ]);
    
    // Seed Cities
    const cities = await City.insertMany([
      {
        name: { en: 'Doha', ar: 'الدوحة' },
        country: { en: 'Qatar', ar: 'قطر' },
        image: 'https://images.unsplash.com/photo-1569025743873-ea3a9ber4f48?w=600',
      },
      {
        name: { en: 'Manama', ar: 'المنامة' },
        country: { en: 'Bahrain', ar: 'البحرين' },
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      },
      {
        name: { en: 'Dubai', ar: 'دبي' },
        country: { en: 'UAE', ar: 'الإمارات' },
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
      },
      {
        name: { en: 'Riyadh', ar: 'الرياض' },
        country: { en: 'Saudi Arabia', ar: 'السعودية' },
        image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600',
      },
    ]);
    
    const dohaId = cities.find(c => c.name.en === 'Doha')?._id;
    const manamaId = cities.find(c => c.name.en === 'Manama')?._id;
    
    // Convert stage categories to venue format
    const platinumCategories = Object.entries(STAGE_CATEGORIES).map(([id, config]) => ({
      id,
      label: config.label,
      color: config.color,
      defaultPrice: config.price,
    }));
    
    const manamaCategories = Object.entries(MANAMA_CATEGORIES).map(([id, config]) => ({
      id,
      label: config.label,
      color: config.color,
      defaultPrice: config.price,
    }));
    
    // Seed Venues
    await Venue.insertMany([
      {
        name: { en: 'U Venue', ar: 'يو فينيو' },
        cityId: dohaId,
        theaterId: 'platinum-stage',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600',
        categories: platinumCategories,
      },
      {
        name: { en: 'Beyon Al Dana Amphitheatre', ar: 'مسرح بيون الدانة' },
        cityId: manamaId,
        theaterId: 'manama-amphitheater',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600',
        categories: manamaCategories,
      },
    ]);
    
    // Seed Artists
    await Artist.insertMany([
      { name: { en: 'Majid Al Mohandis', ar: 'ماجد المهندس' }, image: 'https://images.unsplash.com/photo-1549833284-6a7df91c1f65?w=300' },
      { name: { en: 'Amr Diab', ar: 'عمرو دياب' }, image: 'https://images.unsplash.com/photo-1563240619-44ec00455ca3?w=300' },
      { name: { en: 'Mohammed Abdo', ar: 'محمد عبده' }, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300' },
      { name: { en: 'Assala', ar: 'أصالة' }, image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300' },
      { name: { en: 'Tamer Hosny', ar: 'تامر حسني' }, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300' },
      { name: { en: 'Angham', ar: 'أنغام' }, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300' },
    ]);
    
    // Seed Categories
    await Category.insertMany([
      { label: { en: 'Concerts', ar: 'حفلات' }, image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300', slug: 'concerts' },
      { label: { en: 'Theater', ar: 'مسرح' }, image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300', slug: 'theater' },
      { label: { en: 'Adventures', ar: 'مغامرات' }, image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=300', slug: 'adventures' },
      { label: { en: 'Comedy', ar: 'كوميديا' }, image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=300', slug: 'comedy' },
      { label: { en: 'Attractions', ar: 'معالم سياحية' }, image: 'https://images.unsplash.com/photo-1547234935-80c7142ee969?w=300', slug: 'attractions' },
      { label: { en: 'Sports', ar: 'رياضة' }, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300', slug: 'sports' },
    ]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      counts: {
        cities: cities.length,
        venues: 2,
        artists: 6,
        categories: 6,
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
