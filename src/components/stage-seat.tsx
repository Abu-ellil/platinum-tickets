"use client";

import { Seat as SeatType, StageCategory } from "@/lib/types";
import { STAGE_CATEGORIES } from "@/lib/platinum-stage-data";
import { cn } from "@/lib/utils";
import React from "react";

interface StageSeatProps {
    seat: SeatType;
    isSelected: boolean;
    onSelect: (seat: SeatType) => void;
    size?: number;
}

const StageSeat = React.memo(({ seat, isSelected, onSelect, size = 16 }: StageSeatProps) => {
    const isAvailable = seat.status === "available";
    const category = seat.categoryId as StageCategory;
    const categoryConfig = STAGE_CATEGORIES[category];

    // Get fill color
    let fillColor = "#d1d5db"; // Gray for sold
    if (isAvailable) {
        fillColor = categoryConfig?.color || "#9ca3af";
    }
    if (isSelected) {
        fillColor = "#fbbf24"; // Yellow for selected
    }

    return (
        <rect
            x={seat.x - size / 2}
            y={seat.y - size / 2}
            width={size}
            height={size}
            rx={3}
            ry={3}
            fill={fillColor}
            className={cn(
                "transition-all duration-150",
                isAvailable ? "cursor-pointer hover:opacity-80 hover:scale-110" : "cursor-not-allowed opacity-60",
                isSelected && "stroke-white stroke-2"
            )}
            style={{ transformOrigin: `${seat.x}px ${seat.y}px` }}
            onClick={() => isAvailable && onSelect(seat)}
        />
    );
});

StageSeat.displayName = "StageSeat";
export { StageSeat };
