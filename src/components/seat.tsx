import { Seat as SeatType } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  onSelect: (seat: SeatType) => void;
}

const Seat = React.memo(({ seat, isSelected, onSelect }: SeatProps) => {
  const isAvailable = seat.status === "available";
  
  // Color mapping based on category
  let fillColor = "fill-gray-300"; // Sold default
  if (isAvailable) {
    if (seat.categoryId === "vip") fillColor = "fill-purple-500";
    else if (seat.categoryId === "premium") fillColor = "fill-blue-500";
    else fillColor = "fill-green-500";
  }

  if (isSelected) fillColor = "fill-yellow-400";

  return (
    <circle
      cx={seat.x}
      cy={seat.y}
      r={15} // 30px diameter touch target
      className={cn(
        "transition-colors duration-200",
        fillColor,
        isAvailable ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed",
        isSelected && "stroke-white stroke-2"
      )}
      onClick={() => isAvailable && onSelect(seat)}
    />
  );
});

Seat.displayName = "Seat";
export { Seat };
