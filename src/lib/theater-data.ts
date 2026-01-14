
import { PLATINUM_STAGE, STAGE_CATEGORIES } from "./platinum-stage-data";
import { Theater, StageCategory } from "./types";

export const getTheaterConfig = (eventId: string, customPricing?: { categoryId: string, price: number }[]) => {
  // If we have custom pricing, we need to clone the theater and update the prices
  const theater = JSON.parse(JSON.stringify(PLATINUM_STAGE)) as Theater;
  const categories = JSON.parse(JSON.stringify(STAGE_CATEGORIES)) as Record<string, { color: string; price: number; label: string }>;

  if (customPricing && customPricing.length > 0) {
    // Update categories prices
    customPricing.forEach(cp => {
      if (categories[cp.categoryId]) {
        categories[cp.categoryId].price = cp.price;
      }
    });

    // Update all seats in the theater with the new prices and inject color/price to sections
    theater.sections.forEach(section => {
      // Get category info for the section
      const categoryId = section.priceCategory as StageCategory;
      const categoryInfo = categories[categoryId];
      
      if (categoryInfo) {
        (section as any).color = categoryInfo.color;
        (section as any).price = categoryInfo.price;
      }

      section.rows.forEach(row => {
        row.seats.forEach(seat => {
          const customPrice = customPricing?.find(cp => cp.categoryId === seat.categoryId);
          if (customPrice) {
            seat.price = customPrice.price;
          }
        });
      });
    });
  } else {
    // Even without custom pricing, ensure sections have color and price for TheaterLayout
    theater.sections.forEach(section => {
      const categoryId = section.priceCategory as StageCategory;
      const categoryInfo = categories[categoryId];
      if (categoryInfo) {
        (section as any).color = categoryInfo.color;
        (section as any).price = categoryInfo.price;
      }
    });
  }

  return {
    theater,
    categories
  };
};
