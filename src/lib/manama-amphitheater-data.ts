import { Theater, Section, Row, Seat, SeatStatus, StageCategory } from "./types";

// Manama amphitheater category configuration
export const MANAMA_CATEGORIES: Record<string, { color: string; price: number; label: string }> = {
  balcony: { color: "#dc2626", price: 77802.96, label: "BALCONY" },
  premium: { color: "#8b5cf6", price: 64835.80, label: "PREMIUM" },
  rowB: { color: "#7c3aed", price: 6483.58, label: "ROW B" },
  standard: { color: "#3b82f6", price: 4500.00, label: "STANDARD" },
  rowF: { color: "#06b6d4", price: 2593.43, label: "ROW F" },
  box: { color: "#f59e0b", price: 15000.00, label: "BOX" },
};

const SEAT_SIZE = 16;
const SEAT_GAP = 3;

// Helper to generate a row of seats in amphitheater format
const generateAmphiRow = (
  centerX: number,
  y: number,
  seatCount: number,
  rowLabel: string,
  sectionId: string,
  categoryId: string,
  price: number
): Row => {
  const seats: Seat[] = [];
  const totalWidth = seatCount * (SEAT_SIZE + SEAT_GAP);
  const startX = centerX - totalWidth / 2;
  
  for (let i = 0; i < seatCount; i++) {
    const status: SeatStatus = Math.random() < 0.12 ? "sold" : "available";
    seats.push({
      id: `${sectionId}-${rowLabel}-${i + 1}`,
      rowId: `${sectionId}-${rowLabel}`,
      sectionId,
      number: i + 1,
      label: `${rowLabel}${i + 1}`,
      x: startX + i * (SEAT_SIZE + SEAT_GAP),
      y,
      status,
      categoryId,
      price,
    });
  }
  
  return {
    id: `${sectionId}-${rowLabel}`,
    label: rowLabel,
    y,
    seats,
  };
};

// Helper to generate a balcony section (vertical strip on left/right)
const generateBalconySection = (
  x: number,
  startY: number,
  rows: number,
  seatsPerRow: number,
  sectionId: string,
  isLeft: boolean
): Section => {
  const sectionRows: Row[] = [];
  
  for (let r = 0; r < rows; r++) {
    const rowLabel = `${r + 1}`;
    const seats: Seat[] = [];
    
    for (let s = 0; s < seatsPerRow; s++) {
      const status: SeatStatus = Math.random() < 0.1 ? "sold" : "available";
      seats.push({
        id: `${sectionId}-${rowLabel}-${s + 1}`,
        rowId: `${sectionId}-${rowLabel}`,
        sectionId,
        number: s + 1,
        label: `${sectionId.toUpperCase()}${rowLabel}-${s + 1}`,
        x: x + s * (SEAT_SIZE + SEAT_GAP),
        y: startY + r * (SEAT_SIZE + SEAT_GAP),
        status,
        categoryId: "balcony",
        price: MANAMA_CATEGORIES.balcony.price,
      });
    }
    
    sectionRows.push({
      id: `${sectionId}-${rowLabel}`,
      label: rowLabel,
      y: startY + r * (SEAT_SIZE + SEAT_GAP),
      seats,
    });
  }
  
  return {
    id: sectionId,
    name: sectionId === "balcony-a" ? "BALCONY A" : "BALCONY B",
    rows: sectionRows,
    x: x,
    y: startY,
    width: seatsPerRow * (SEAT_SIZE + SEAT_GAP),
    height: rows * (SEAT_SIZE + SEAT_GAP),
    priceCategory: "BALCONY",
  };
};

// Generate the Manama Amphitheater
const generateManamaAmphitheater = (): Theater => {
  const sections: Section[] = [];
  const centerX = 500;
  const stageY = 580;
  
  // Main seating rows (A-F, each with 4 sub-sections)
  const rowConfigs = [
    { row: "A", y: 80, seatCount: 28, category: "premium", price: MANAMA_CATEGORIES.premium.price },
    { row: "B", y: 130, seatCount: 32, category: "rowB", price: MANAMA_CATEGORIES.rowB.price },
    { row: "C", y: 180, seatCount: 36, category: "standard", price: MANAMA_CATEGORIES.standard.price },
    { row: "D", y: 230, seatCount: 40, category: "standard", price: MANAMA_CATEGORIES.standard.price },
    { row: "E", y: 280, seatCount: 44, category: "standard", price: MANAMA_CATEGORIES.standard.price },
    { row: "F", y: 330, seatCount: 48, category: "rowF", price: MANAMA_CATEGORIES.rowF.price },
  ];
  
  // Create main seating sections (split into 4 columns per row)
  for (const config of rowConfigs) {
    const seatsPerSection = Math.floor(config.seatCount / 4);
    
    for (let s = 1; s <= 4; s++) {
      const sectionId = `${config.row}${s}`;
      const sectionX = centerX - (config.seatCount * (SEAT_SIZE + SEAT_GAP)) / 2 + 
                       (s - 1) * seatsPerSection * (SEAT_SIZE + SEAT_GAP);
      
      // Generate multiple rows within each section
      const sectionRows: Row[] = [];
      for (let r = 0; r < 3; r++) {
        const rowY = config.y + r * (SEAT_SIZE + SEAT_GAP);
        sectionRows.push(generateAmphiRow(
          sectionX + (seatsPerSection * (SEAT_SIZE + SEAT_GAP)) / 2,
          rowY,
          seatsPerSection,
          `${config.row}${r + 1}`,
          sectionId,
          config.category,
          config.price
        ));
      }
      
      sections.push({
        id: sectionId,
        name: sectionId,
        rows: sectionRows,
        x: sectionX,
        y: config.y,
        width: seatsPerSection * (SEAT_SIZE + SEAT_GAP),
        height: 3 * (SEAT_SIZE + SEAT_GAP),
        priceCategory: config.category.toUpperCase(),
      });
    }
  }
  
  // Balcony A (Left side)
  sections.push(generateBalconySection(40, 100, 12, 3, "balcony-a", true));
  
  // Balcony B (Right side)
  sections.push(generateBalconySection(880, 100, 12, 3, "balcony-b", false));
  
  // Box seats (Left: 1-4, Right: 5-8)
  for (let b = 1; b <= 8; b++) {
    const isLeft = b <= 4;
    const boxX = isLeft ? 10 : 940;
    const boxY = 100 + ((b - 1) % 4) * 80;
    
    const boxRows: Row[] = [];
    for (let r = 0; r < 2; r++) {
      const seats: Seat[] = [];
      for (let s = 0; s < 4; s++) {
        const status: SeatStatus = Math.random() < 0.05 ? "sold" : "available";
        seats.push({
          id: `box${b}-${r + 1}-${s + 1}`,
          rowId: `box${b}-${r + 1}`,
          sectionId: `box${b}`,
          number: s + 1,
          label: `BOX${b}-${s + 1}`,
          x: boxX + s * (SEAT_SIZE + 2),
          y: boxY + r * (SEAT_SIZE + 2),
          status,
          categoryId: "box",
          price: MANAMA_CATEGORIES.box.price,
        });
      }
      boxRows.push({
        id: `box${b}-${r + 1}`,
        label: `${r + 1}`,
        y: boxY + r * (SEAT_SIZE + 2),
        seats,
      });
    }
    
    sections.push({
      id: `box${b}`,
      name: `BOX ${b}`,
      rows: boxRows,
      x: boxX,
      y: boxY,
      width: 4 * (SEAT_SIZE + 2),
      height: 2 * (SEAT_SIZE + 2),
      priceCategory: "BOX",
    });
  }
  
  return {
    id: "manama-amphitheater",
    name: "Beyon Al Dana Amphitheatre",
    width: 1000,
    height: 700,
    sections,
    stage: {
      x: 200,
      y: stageY,
      width: 600,
      height: 80,
      label: "STAGE",
    },
  };
};

export const MANAMA_AMPHITHEATER = generateManamaAmphitheater();
