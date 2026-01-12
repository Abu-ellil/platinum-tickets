export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  price: number;
  currency: "QAR" | "SAR" | "EGP" | "AED" | "BHD";
  image: string;
  category: "New" | "Popular" | "Sold Out" | null;
  type: "concert" | "theater" | "adventure" | "festival" | "comedy";
}

export interface Category {
  id: string;
  label: string;
  image: string; // Changed from icon to image for circle view
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: "concerts", label: "حفلات", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop" },
  { id: "theater", label: "مسرح", image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300&h=300&fit=crop" },
  { id: "adventures", label: "مغامرات", image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=300&h=300&fit=crop" },
  { id: "comedy", label: "كوميديا", image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=300&h=300&fit=crop" },
  { id: "attractions", label: "معالم سياحية", image: "https://images.unsplash.com/photo-1547234935-80c7142ee969?w=300&h=300&fit=crop" },
  { id: "sports", label: "رياضة", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop" },
  { id: "festivals", label: "مهرجانات", image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=300&h=300&fit=crop" },
];

export const ARTISTS: Artist[] = [
  { id: "1", name: "ماجد المهندس", image: "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?w=300&h=300&fit=crop" },
  { id: "2", name: "عمرو دياب", image: "https://images.unsplash.com/photo-1563240619-44ec00455ca3?w=300&h=300&fit=crop" },
  { id: "3", name: "محمد عبده", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=300&fit=crop" },
  { id: "4", name: "أصالة", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop" },
  { id: "5", name: "تامر حسني", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" },
  { id: "6", name: "أنغام", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop" },
];

export const VENUES: Venue[] = [
  { id: "1", name: "مسرح الدانة", city: "المنامة", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop" },
  { id: "2", name: "أرينا كوكا كولا", city: "دبي", image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&h=400&fit=crop" },
  { id: "3", name: "مركز الملك فهد الثقافي", city: "الرياض", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop" },
  { id: "4", name: "دار الأوبرا السلطانية", city: "مسقط", image: "https://images.unsplash.com/photo-1514302240736-b1fee59858eb?w=600&h=400&fit=crop" },
];

export const EVENTS: Event[] = [
  {
    id: "1",
    title: "حفل ماجد المهندس في البحرين",
    date: "22 يناير 2026",
    venue: "مسرح الدانة",
    price: 350,
    currency: "SAR",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&auto=format&fit=crop",
    category: "Popular",
    type: "concert",
  },
  {
    id: "2",
    title: "مهرجان وين وبكم 6",
    date: "25 فبراير 2026",
    venue: "حلبة البحرين الدولية",
    price: 50,
    currency: "SAR",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&auto=format&fit=crop",
    category: "New",
    type: "adventure",
  },
  {
    id: "3",
    title: "حفل كالفين هاريس - الدانة",
    date: "10 مارس 2026",
    venue: "مسرح الدانة",
    price: 450,
    currency: "SAR",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop",
    category: null,
    type: "concert",
  },
  {
    id: "4",
    title: "رحلة سفاري صحراوية",
    date: "يومياً",
    venue: "الصحراء العربية",
    price: 200,
    currency: "SAR",
    image: "https://images.unsplash.com/photo-1547234935-80c7142ee969?w=800&auto=format&fit=crop",
    category: null,
    type: "adventure",
  },
  {
    id: "5",
    title: "عرض مسرحي: مدرسة المشاغبين",
    date: "15 إبريل 2026",
    venue: "المسرح الوطني",
    price: 150,
    currency: "SAR",
    image: "https://images.unsplash.com/photo-1503095392269-41f97280872d?w=800&auto=format&fit=crop",
    category: "Sold Out",
    type: "theater",
  },
  {
    id: "6",
    title: "دبي باركس آند ريزورتس",
    date: "مفتوح يومياً",
    venue: "دبي",
    price: 295,
    currency: "AED",
    image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop",
    category: "Popular",
    type: "attraction",
  },
  {
    id: "4451579",
    title: "حفل الفنان ماجد المهندس",
    date: "22 يناير 2026",
    venue: "مسرح بيون الدانة",
    price: 2596,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?w=800&auto=format&fit=crop",
    category: "New",
    type: "concert",
  }
] as Event[];
