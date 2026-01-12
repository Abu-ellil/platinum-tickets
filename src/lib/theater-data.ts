import { Theater, Section, Row, Seat, SeatStatus, CategoryConfig } from "./types";
import { MANAMA_AMPHITHEATER, MANAMA_CATEGORIES } from "./manama-amphitheater-data";

const SEAT_RADIUS = 20;
const SEAT_SPACING = 60;
const ROW_SPACING = 70;

// Helper to generate a row of seats
const generateRow = (
  rowLabel: string, 
  y: number, 
  count: number, 
  startX: number, 
  sectionId: string, 
  categoryId: string, 
  price: number,
  rowIdPrefix: string
): Row => {
  const seats: Seat[] = [];
  for (let i = 1; i <= count; i++) {
    const status: SeatStatus = Math.random() < 0.2 ? "sold" : "available";
    seats.push({
      id: `${sectionId}-${rowIdPrefix}-${i}`,
      rowId: `${sectionId}-${rowIdPrefix}`,
      sectionId,
      number: i,
      label: `${rowLabel}-${i}`,
      x: startX + (i - 1) * SEAT_SPACING,
      y: y,
      status,
      categoryId,
      price
    });
  }
  return { id: `${sectionId}-${rowIdPrefix}`, label: rowLabel, y, seats };
};

// Generate Mock Theater
const generateTheater = (): Theater => {
  const sections: Section[] = [];

  // Section 1: VIP (Front Center)
  const vipRows: Row[] = [];
  for (let i = 0; i < 5; i++) {
    const rowLabel = String.fromCharCode(65 + i); // A, B, C...
    const seatCount = 12 + i * 2; // Fan out
    const startX = 400 - (seatCount * SEAT_SPACING) / 2;
    vipRows.push(generateRow(rowLabel, 150 + i * ROW_SPACING, seatCount, startX, "vip", "vip", 500, `vip-${i}`));
  }
  sections.push({
    id: "vip",
    name: "VIP Area",
    rows: vipRows,
    x: 100,
    y: 100,
    width: 600,
    height: 400,
    priceCategory: "VIP"
  });

  // Section 2: Premium (Middle)
  const premiumRows: Row[] = [];
  for (let i = 0; i < 6; i++) {
    const rowLabel = String.fromCharCode(70 + i); // F, G...
    const seatCount = 20 + i;
    const startX = 400 - (seatCount * SEAT_SPACING) / 2;
    premiumRows.push(generateRow(rowLabel, 550 + i * ROW_SPACING, seatCount, startX, "premium", "premium", 300, `prem-${i}`));
  }
  sections.push({
    id: "premium",
    name: "Premium Stalls",
    rows: premiumRows,
    x: 50,
    y: 550,
    width: 700,
    height: 500,
    priceCategory: "Premium"
  });

  return {
    id: "grand-theater",
    name: "مسرح الدانة",
    width: 800,
    height: 1200,
    sections,
    stage: {
      x: 200,
      y: 0,
      width: 400,
      height: 80,
      label: "STAGE"
    }
  };
};



export const MOCK_THEATER = generateTheater();

export const DEFAULT_CATEGORIES: Record<string, CategoryConfig> = {
  "VIP": { color: "#dc2626", price: 500, label: "VIP Ticket" },
  "Premium": { color: "#3b82f6", price: 300, label: "Premium Ticket" }
};

export const getTheaterConfig = (eventId: string): { theater: Theater; categories: Record<string, CategoryConfig> } => {
  if (eventId === "4451579" || eventId === "manama-event") {
    return {
      theater: MANAMA_AMPHITHEATER,
      categories: MANAMA_CATEGORIES
    };
  }
  
  // Default to mock theater
  return {
    theater: MOCK_THEATER,
    categories: DEFAULT_CATEGORIES
  };
};
