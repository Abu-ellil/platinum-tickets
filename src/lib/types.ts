export type SeatStatus = "available" | "selected" | "sold" | "reserved";

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
