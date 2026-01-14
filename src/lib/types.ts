export type SeatStatus = "available" | "selected" | "sold" | "reserved";

export type StageCategory = string;

export interface CategoryConfig {
  color: string;
  price: number;
  label: string;
}

export interface Seat {
  id: string;
  rowId: string;
  sectionId: string;
  number: number; // e.g., 1, 2, 3
  label: string; // e.g., "A-1"
  x: number;
  y: number;
  status: SeatStatus;
  categoryId: string; // "vip", "premium", "regular"
  price: number;
}

export interface Row {
  id: string;
  label: string; // "A", "B"
  y: number; // Vertical position in SVG
  seats: Seat[];
}

export interface Section {
  id: string;
  name: string; // "Orchestra Center", "Balcony"
  rows: Row[];
  x: number;
  y: number;
  width: number;
  height: number;
  priceCategory: string;
  color?: string;
  price?: number;
}

export interface Theater {
  id: string;
  name: string;
  width: number;
  height: number;
  sections: Section[];
  stage: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  };
}

export interface Event {
   _id: string;
   title: string;
   venueId?: string | { _id: string; name: { ar: string; en: string }; image: string };
   venueName?: string;
   description?: string;
   cityId: string | { _id: string; name: { ar: string; en: string } };
   showTimes: {
     date: string | Date;
     time: string;
   }[];
   pricing: {
     categoryId: string;
     price: number;
   }[];
   image: string;
   currency: string;
   status: string;
   type: string;
   featured: boolean;
   rating?: number;
   originalPrice?: number;
   statusBadge?: string;
   subTitle?: string;
   category?: string;
   artists?: { name: string; role?: string; image: string }[];
   terms?: { ar: string; en: string };
   info?: { ar: string; en: string };
   gettingThere?: { ar: string; en: string };
 }
 
 export interface Venue {
   _id: string;
   name: {
     ar: string;
     en: string;
   };
   cityId: string | { _id: string; name: { ar: string; en: string } };
   theaterId: string;
   image: string;
   categories: {
     id: string;
     label: string;
     color: string;
     defaultPrice: number;
   }[];
 }
 
 export interface Artist {
   _id: string;
   name: {
     ar: string;
     en: string;
   };
   image: string;
   bio?: {
     ar?: string;
     en?: string;
   };
 }
