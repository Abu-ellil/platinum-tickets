import { Theater, Section, Row, Seat, SeatStatus, StageCategory } from "./types";

// Category configuration with colors and prices
export const STAGE_CATEGORIES: Record<StageCategory, { color: string; price: number; label: string }> = {
  vip: { color: "#dc2626", price: 10696.20, label: "VIP" },
  royal: { color: "#7c3aed", price: 10027.88, label: "ROYAL" },
  diamond: { color: "#1e3a5f", price: 8690.66, label: "DIAMOND" },
  platinum: { color: "#06b6d4", price: 8222.70, label: "PLATINUM" },
  gold: { color: "#3b82f6", price: 7019.38, label: "GOLD" },
  silver: { color: "#9ca3af", price: 5000.00, label: "SILVER" },
};

const SEAT_SIZE = 18;
const SEAT_GAP = 4;

// Helper to generate seats in an arc pattern
const generateArcRow = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  seatCount: number,
  rowLabel: string,
  sectionId: string,
  categoryId: StageCategory,
  rowIndex: number
): Row => {
  const seats: Seat[] = [];
  const angleStep = (endAngle - startAngle) / (seatCount - 1 || 1);
  
  for (let i = 0; i < seatCount; i++) {
    const angle = startAngle + i * angleStep;
    const radians = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(radians);
    const y = centerY + radius * Math.sin(radians);
    const status: SeatStatus = Math.random() < 0.15 ? "sold" : "available";
    
    seats.push({
      id: `${sectionId}-${rowLabel}-${i + 1}`,
      rowId: `${sectionId}-${rowLabel}`,
      sectionId,
      number: i + 1,
      label: `${rowLabel}${i + 1}`,
      x,
      y,
      status,
      categoryId,
      price: STAGE_CATEGORIES[categoryId].price,
    });
  }
  
  return {
    id: `${sectionId}-${rowLabel}`,
    label: rowLabel,
    y: centerY + radius,
    seats,
  };
};

// Helper for rectangular block seats
const generateBlockRow = (
  startX: number,
  y: number,
  seatCount: number,
  rowLabel: string,
  sectionId: string,
  categoryId: StageCategory,
  seatWidth: number = SEAT_SIZE
): Row => {
  const seats: Seat[] = [];
  
  for (let i = 0; i < seatCount; i++) {
    const status: SeatStatus = Math.random() < 0.15 ? "sold" : "available";
    seats.push({
      id: `${sectionId}-${rowLabel}-${i + 1}`,
      rowId: `${sectionId}-${rowLabel}`,
      sectionId,
      number: i + 1,
      label: `${rowLabel}${i + 1}`,
      x: startX + i * (seatWidth + SEAT_GAP),
      y,
      status,
      categoryId,
      price: STAGE_CATEGORIES[categoryId].price,
    });
  }
  
  return {
    id: `${sectionId}-${rowLabel}`,
    label: rowLabel,
    y,
    seats,
  };
};

// Generate the Platinum Stage Theater
const generatePlatinumStage = (): Theater => {
  const sections: Section[] = [];
  const centerX = 500;
  const stageY = 80;
  
  // VIP Section - Small arc closest to stage
  const vipRows: Row[] = [];
  for (let i = 0; i < 2; i++) {
    const rowLabel = String.fromCharCode(65 + i);
    vipRows.push(generateArcRow(centerX, stageY + 40, 100 + i * 30, 200, 340, 8 + i * 2, rowLabel, "vip", "vip", i));
  }
  sections.push({
    id: "vip",
    name: "VIP",
    rows: vipRows,
    x: centerX - 120,
    y: stageY + 80,
    width: 240,
    height: 80,
    priceCategory: "VIP",
  });

  // Royal Section - Behind VIP
  const royalRows: Row[] = [];
  for (let i = 0; i < 3; i++) {
    const rowLabel = String.fromCharCode(67 + i);
    royalRows.push(generateArcRow(centerX, stageY + 40, 180 + i * 28, 195, 345, 14 + i * 2, rowLabel, "royal", "royal", i));
  }
  sections.push({
    id: "royal",
    name: "ROYAL",
    rows: royalRows,
    x: centerX - 180,
    y: stageY + 160,
    width: 360,
    height: 100,
    priceCategory: "ROYAL",
  });

  // Platinum Left & Right - Side blocks
  const platLeftRows: Row[] = [];
  const platRightRows: Row[] = [];
  for (let i = 0; i < 6; i++) {
    const rowLabel = `P${String.fromCharCode(65 + i)}`;
    platLeftRows.push(generateBlockRow(80, stageY + 180 + i * (SEAT_SIZE + SEAT_GAP), 6, rowLabel, "plat-left", "platinum"));
    platRightRows.push(generateBlockRow(centerX + 240, stageY + 180 + i * (SEAT_SIZE + SEAT_GAP), 6, rowLabel, "plat-right", "platinum"));
  }
  sections.push({
    id: "plat-left",
    name: "PLATINUM",
    rows: platLeftRows,
    x: 60,
    y: stageY + 160,
    width: 160,
    height: 160,
    priceCategory: "PLATINUM",
  });
  sections.push({
    id: "plat-right",
    name: "PLATINUM",
    rows: platRightRows,
    x: centerX + 220,
    y: stageY + 160,
    width: 160,
    height: 160,
    priceCategory: "PLATINUM",
  });

  // Diamond Section - Center block
  const diamondRows: Row[] = [];
  for (let i = 0; i < 5; i++) {
    const rowLabel = `D${String.fromCharCode(65 + i)}`;
    diamondRows.push(generateBlockRow(centerX - 120, stageY + 320 + i * (SEAT_SIZE + SEAT_GAP), 12, rowLabel, "diamond", "diamond"));
  }
  sections.push({
    id: "diamond",
    name: "DIAMOND",
    rows: diamondRows,
    x: centerX - 140,
    y: stageY + 300,
    width: 280,
    height: 130,
    priceCategory: "DIAMOND",
  });

  // Gold Left & Right + Center
  const goldLeftRows: Row[] = [];
  const goldRightRows: Row[] = [];
  const goldCenterRows: Row[] = [];
  for (let i = 0; i < 5; i++) {
    const rowLabel = `G${String.fromCharCode(65 + i)}`;
    goldLeftRows.push(generateBlockRow(80, stageY + 360 + i * (SEAT_SIZE + SEAT_GAP), 6, rowLabel, "gold-left", "gold"));
    goldRightRows.push(generateBlockRow(centerX + 240, stageY + 360 + i * (SEAT_SIZE + SEAT_GAP), 6, rowLabel, "gold-right", "gold"));
    goldCenterRows.push(generateBlockRow(centerX - 100, stageY + 450 + i * (SEAT_SIZE + SEAT_GAP), 10, `GC${rowLabel}`, "gold-center", "gold"));
  }
  sections.push({
    id: "gold-left",
    name: "GOLD",
    rows: goldLeftRows,
    x: 60,
    y: stageY + 340,
    width: 160,
    height: 120,
    priceCategory: "GOLD",
  });
  sections.push({
    id: "gold-right",
    name: "GOLD",
    rows: goldRightRows,
    x: centerX + 220,
    y: stageY + 340,
    width: 160,
    height: 120,
    priceCategory: "GOLD",
  });
  sections.push({
    id: "gold-center",
    name: "GOLD",
    rows: goldCenterRows,
    x: centerX - 120,
    y: stageY + 430,
    width: 240,
    height: 130,
    priceCategory: "GOLD",
  });

  // Silver - Far edges
  const silverLeftRows: Row[] = [];
  const silverRightRows: Row[] = [];
  for (let i = 0; i < 4; i++) {
    const rowLabel = `S${String.fromCharCode(65 + i)}`;
    silverLeftRows.push(generateBlockRow(20, stageY + 420 + i * (SEAT_SIZE + SEAT_GAP), 4, rowLabel, "silver-left", "silver"));
    silverRightRows.push(generateBlockRow(centerX + 340, stageY + 420 + i * (SEAT_SIZE + SEAT_GAP), 4, rowLabel, "silver-right", "silver"));
  }
  sections.push({
    id: "silver-left",
    name: "SILVER",
    rows: silverLeftRows,
    x: 10,
    y: stageY + 400,
    width: 100,
    height: 100,
    priceCategory: "SILVER",
  });
  sections.push({
    id: "silver-right",
    name: "SILVER",
    rows: silverRightRows,
    x: centerX + 320,
    y: stageY + 400,
    width: 100,
    height: 100,
    priceCategory: "SILVER",
  });

  return {
    id: "platinum-stage",
    name: "Platinum Stage",
    width: 1000,
    height: 700,
    sections,
    stage: {
      x: 250,
      y: 20,
      width: 500,
      height: 60,
      label: "STAGE",
    },
  };
};

export const PLATINUM_STAGE = generatePlatinumStage();
