import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { City, Venue, Artist, Category, Event } from '@/models';
import { STAGE_CATEGORIES } from '@/lib/platinum-stage-data';
import { MANAMA_CATEGORIES } from '@/lib/manama-amphitheater-data';

// POST /api/seed - Seed initial data
export async function POST() {
  try {
    console.log('Starting seed process...');
    await dbConnect();
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      City.deleteMany({}),
      Venue.deleteMany({}),
      Artist.deleteMany({}),
      Category.deleteMany({}),
      Event.deleteMany({}),
    ]);
    
    console.log('Seeding cities...');
    const citiesData = [
      {
        name: { en: 'Cairo', ar: 'القاهرة' },
        country: { en: 'Egypt', ar: 'مصر' },
        slug: 'cairo',
        flag: '🇪🇬',
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800',
      },
      {
        name: { en: 'Doha', ar: 'الدوحة' },
        country: { en: 'Qatar', ar: 'قطر' },
        slug: 'doha',
        flag: '🇶🇦',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
      },
      {
        name: { en: 'Muscat', ar: 'مسقط' },
        country: { en: 'Oman', ar: 'عمان' },
        slug: 'muscat',
        flag: '🇴🇲',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
      },
      {
        name: { en: 'Rabat', ar: 'الرباط' },
        country: { en: 'Morocco', ar: 'المغرب' },
        slug: 'rabat',
        flag: '🇲🇦',
        image: 'https://images.unsplash.com/photo-1539667468225-8df6674149c0?w=800',
      },
      {
        name: { en: 'Istanbul', ar: 'إسطنبول' },
        country: { en: 'Turkey', ar: 'تركيا' },
        slug: 'istanbul',
        flag: '🇹🇷',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
      },
      {
        name: { en: 'Bursa', ar: 'بورصة' },
        country: { en: 'Turkey', ar: 'تركيا' },
        slug: 'bursa',
        flag: '🇹🇷',
        image: 'https://images.unsplash.com/photo-1589149021966-51d07c0b0507?w=800',
      },
      {
        name: { en: 'Antalya', ar: 'أنطاليا' },
        country: { en: 'Turkey', ar: 'تركيا' },
        slug: 'antalya',
        flag: '🇹🇷',
        image: 'https://images.unsplash.com/photo-1542052106173-ef8958d89a13?w=800',
      },
      {
        name: { en: 'Manama', ar: 'المنامة' },
        country: { en: 'Bahrain', ar: 'البحرين' },
        slug: 'manama',
        flag: '🇧🇭',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      },
      {
        name: { en: 'Dubai', ar: 'دبي' },
        country: { en: 'UAE', ar: 'الإمارات' },
        slug: 'dubai',
        flag: '🇦🇪',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      },
      {
        name: { en: 'Riyadh', ar: 'الرياض' },
        country: { en: 'Saudi Arabia', ar: 'السعودية' },
        slug: 'riyadh',
        flag: '🇸🇦',
        image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800',
      },
    ];

    const insertedCitiesDocs = await City.insertMany(citiesData);
    const insertedCities = insertedCitiesDocs.map(c => c.toObject());
    
    const muscatId = insertedCities.find(c => c.slug === 'muscat')?._id;
    const dohaId = insertedCities.find(c => c.slug === 'doha')?._id;
    const manamaId = insertedCities.find(c => c.slug === 'manama')?._id;

    if (!muscatId || !dohaId || !manamaId) {
      return NextResponse.json({
        success: false,
        error: "City ID lookup failed",
        debug: {
          sampleCity: insertedCities[0],
          allSlugs: insertedCities.map(c => c.slug),
          searched: ['muscat', 'doha', 'manama']
        }
      }, { status: 400 });
    }
    
    console.log('Seeding categories...');
    const categoriesData = [
      { label: { en: 'Music', ar: 'عرض موسيقي' }, image: 'https://images.unsplash.com/photo-1514525253440-b393452e8220?w=400', slug: 'music' },
      { label: { en: 'Comedy', ar: 'عرض كوميدي' }, image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400', slug: 'comedy' },
      { label: { en: 'Cinema', ar: 'سينما خارجية' }, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400', slug: 'cinema' },
      { label: { en: 'Sports', ar: 'سباقات وغيرها' }, image: 'https://images.unsplash.com/photo-1533107058569-994207cdbf05?w=400', slug: 'sports' },
      { label: { en: 'Theater', ar: 'مسرح' }, image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400', slug: 'theater' },
      { label: { en: 'Adventures', ar: 'مغامرات' }, image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=400', slug: 'adventures' },
    ];
    await Category.insertMany(categoriesData);

    // Convert stage categories to venue format
    const platinumCategories = Object.entries(STAGE_CATEGORIES).map(([id, config]) => ({
      id,
      label: config.label,
      color: config.color,
      defaultPrice: config.price,
    }));
    
    const manamaCategoriesArr = Object.entries(MANAMA_CATEGORIES).map(([id, config]) => ({
      id,
      label: config.label,
      color: config.color,
      defaultPrice: config.price,
    }));
    
    console.log('Seeding venues...');
    const venues = await Venue.insertMany([
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
        categories: manamaCategoriesArr,
      },
      {
        name: { en: 'Muscat Opera House', ar: 'دار الأوبرا السلطانية' },
        cityId: muscatId,
        theaterId: 'platinum-stage',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
        categories: platinumCategories,
      },
    ]);
    console.log(`Seeded ${venues.length} venues`);

    const operaId = venues.find(v => v.name.en === 'Muscat Opera House')?._id;
    const uVenueId = venues.find(v => v.name.en === 'U Venue')?._id;

    console.log('Seeding artists...');
    await Artist.insertMany([
      { name: { en: 'Majid Al Mohandis', ar: 'ماجد المهندس' }, image: 'https://images.unsplash.com/photo-1549833284-6a7df91c1f65?w=300' },
      { name: { en: 'Amr Diab', ar: 'عمرو دياب' }, image: 'https://images.unsplash.com/photo-1563240619-44ec00455ca3?w=300' },
      { name: { en: 'Ali Bin Mohammed', ar: 'علي بن محمد' }, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
      { name: { en: 'Balqees', ar: 'بلقيس' }, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
      { name: { en: 'Fouad Abdul Wahed', ar: 'فؤاد عبد الواحد' }, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
    ]);

    console.log('Seeding events...');
    const eventsData = [
      // Muscat Events
      {
        title: { en: 'Amazing Comedy Show', ar: 'العرض الكوميدي الرهيب' },
        venueId: operaId,
        cityId: muscatId,
        showTimes: [{ date: new Date('2026-01-25'), time: '20:00' }],
        pricing: [{ categoryId: 'regular', price: 15 }],
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
        currency: 'OMR',
        type: 'comedy',
        status: 'active',
        featured: true,
      },
      {
        title: { en: 'Food Festival', ar: 'مهرجان الأكل' },
        venueId: operaId,
        cityId: muscatId,
        showTimes: [{ date: new Date('2026-02-02'), time: '17:00' }],
        pricing: [{ categoryId: 'regular', price: 0 }],
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        currency: 'OMR',
        type: 'festival',
        status: 'active',
      },
      {
        title: { en: 'Big Concert', ar: 'حفل غنائي كبير' },
        venueId: operaId,
        cityId: muscatId,
        showTimes: [{ date: new Date('2026-02-10'), time: '21:00' }],
        pricing: [{ categoryId: 'regular', price: 30 }],
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
        currency: 'OMR',
        type: 'concert',
        status: 'active',
        featured: true,
      },
      // Doha Events
      {
        title: { en: 'Asian Cup 2023', ar: 'كأس آسيا 2023' },
        venueId: uVenueId,
        cityId: dohaId,
        showTimes: [{ date: new Date('2026-12-01'), time: '18:00' }],
        pricing: [{ categoryId: 'regular', price: 100 }],
        image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=800',
        currency: 'QAR',
        type: 'sports',
        status: 'active',
        featured: true,
      },
    ];
    await Event.insertMany(eventsData);
    console.log(`Seeded ${eventsData.length} events`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      counts: {
        cities: insertedCities.length,
        venues: venues.length,
        artists: 5,
        categories: categoriesData.length,
        events: eventsData.length,
      }
    });
  } catch (error) {
    console.error('CRITICAL SEED ERROR:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error during seeding' },
      { status: 500 }
    );
  }
}
