import { Theater } from "./types";
import { PLATINUM_STAGE, STAGE_CATEGORIES } from "./platinum-stage-data";
import { MANAMA_AMPHITHEATER, MANAMA_CATEGORIES } from "./manama-amphitheater-data";

// City definition with bilingual support
export interface City {
  id: string;
  name: { en: string; ar: string };
  country: { en: string; ar: string };
  image: string;
}

// Venue definition with theater reference
export interface VenueInfo {
  id: string;
  name: { en: string; ar: string };
  cityId: string;
  theaterId: string;
  image: string;
}

// Cities registry
export const CITIES: City[] = [
  {
    id: "doha",
    name: { en: "Doha", ar: "الدوحة" },
    country: { en: "Qatar", ar: "قطر" },
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ber4f48?w=600",
  },
  {
    id: "manama",
    name: { en: "Manama", ar: "المنامة" },
    country: { en: "Bahrain", ar: "البحرين" },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
  },
  {
    id: "dubai",
    name: { en: "Dubai", ar: "دبي" },
    country: { en: "UAE", ar: "الإمارات" },
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
  },
  {
    id: "riyadh",
    name: { en: "Riyadh", ar: "الرياض" },
    country: { en: "Saudi Arabia", ar: "السعودية" },
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600",
  },
];

// Venues registry (linked to cities and theaters)
export const VENUES_REGISTRY: VenueInfo[] = [
  {
    id: "platinum-stage-doha",
    name: { en: "U Venue", ar: "يو فينيو" },
    cityId: "doha",
    theaterId: "platinum-stage",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
  },
  {
    id: "Al-Dana-manama",
    name: { en: "Beyon Al Dana Amphitheatre", ar: "مسرح بيون الدانة" },
    cityId: "manama",
    theaterId: "manama-amphitheater",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600",
  },
];

// Theater registry - maps theater IDs to actual theater data
export const THEATERS: Record<string, Theater> = {
  "platinum-stage": PLATINUM_STAGE,
  "manama-amphitheater": MANAMA_AMPHITHEATER,
};

// Category configs for each theater
export const THEATER_CATEGORIES: Record<string, Record<string, { color: string; price: number; label: string }>> = {
  "platinum-stage": STAGE_CATEGORIES,
  "manama-amphitheater": MANAMA_CATEGORIES,
};

// Helper functions
export function getVenuesByCity(cityId: string): VenueInfo[] {
  return VENUES_REGISTRY.filter(v => v.cityId === cityId);
}

export function getTheaterByVenue(venueId: string): Theater | undefined {
  const venue = VENUES_REGISTRY.find(v => v.id === venueId);
  if (!venue) return undefined;
  return THEATERS[venue.theaterId];
}

export function getCategoryConfig(theaterId: string) {
  return THEATER_CATEGORIES[theaterId] || {};
}

export function getVenueById(venueId: string): VenueInfo | undefined {
  return VENUES_REGISTRY.find(v => v.id === venueId);
}

export function getCityById(cityId: string): City | undefined {
  return CITIES.find(c => c.id === cityId);
}
