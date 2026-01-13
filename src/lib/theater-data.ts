
import { PLATINUM_STAGE, STAGE_CATEGORIES } from "./platinum-stage-data";

export const getTheaterConfig = (eventId: string) => {
  // For now, return the same stage for all events
  return {
    theater: PLATINUM_STAGE,
    categories: STAGE_CATEGORIES
  };
};
