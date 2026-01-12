import { VENUES_REGISTRY, CITIES } from './venues-registry';

export const FALLBACK_EVENTS = [
  {
    _id: 'event-1',
    title: { en: 'Amazing Comedy Show', ar: 'العرض الكوميدي الرهيب' },
    venueId: { _id: 'platinum-stage-doha', name: { en: 'U Venue', ar: 'يو فينيو' }, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600' },
    cityId: { _id: 'doha', name: { en: 'Doha', ar: 'الدوحة' } },
    showTimes: [{ date: '2026-01-25', time: '20:00' }],
    pricing: [{ categoryId: 'regular', price: 15 }],
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
    currency: 'QAR',
    type: 'comedy',
    status: 'active',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'event-2',
    title: { en: 'Food Festival', ar: 'مهرجان الأكل' },
    venueId: { _id: 'Al-Dana-manama', name: { en: 'Beyon Al Dana Amphitheatre', ar: 'مسرح بيون الدانة' }, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600' },
    cityId: { _id: 'manama', name: { en: 'Manama', ar: 'المنامة' } },
    showTimes: [{ date: '2026-02-02', time: '17:00' }],
    pricing: [{ categoryId: 'regular', price: 0 }],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    currency: 'BHD',
    type: 'festival',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'event-3',
    title: { en: 'Big Concert', ar: 'حفل غنائي كبير' },
    venueId: { _id: 'platinum-stage-doha', name: { en: 'U Venue', ar: 'يو فينيو' }, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600' },
    cityId: { _id: 'doha', name: { en: 'Doha', ar: 'الدوحة' } },
    showTimes: [{ date: '2026-02-10', time: '21:00' }],
    pricing: [{ categoryId: 'regular', price: 30 }],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    currency: 'QAR',
    type: 'concert',
    status: 'active',
    featured: true,
    createdAt: new Date().toISOString(),
  }
];

export const FALLBACK_ARTISTS = [
  { _id: 'artist-1', name: { en: 'Majid Al Mohandis', ar: 'ماجد المهندس' }, image: 'https://images.unsplash.com/photo-1549833284-6a7df91c1f65?w=300' },
  { _id: 'artist-2', name: { en: 'Amr Diab', ar: 'عمرو دياب' }, image: 'https://images.unsplash.com/photo-1563240619-44ec00455ca3?w=300' },
  { _id: 'artist-3', name: { en: 'Balqees', ar: 'بلقيس' }, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
];

export const FALLBACK_CATEGORIES = [
  { _id: 'category-1', label: { en: 'Concerts', ar: 'حفلات غنائية' }, slug: 'concerts', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400' },
  { _id: 'category-2', label: { en: 'Sports', ar: 'رياضة' }, slug: 'sports', image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400' },
];
