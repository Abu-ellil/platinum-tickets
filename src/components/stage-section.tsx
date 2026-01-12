"use client";

import { Section, StageCategory } from "@/lib/types";
import { STAGE_CATEGORIES } from "@/lib/platinum-stage-data";
import { cn } from "@/lib/utils";
import React from "react";

interface StageSectionProps {
    section: Section;
    isZoomed: boolean;
    onClick: (sectionId: string) => void;
}

const StageSection = React.memo(({ section, isZoomed, onClick }: StageSectionProps) => {
    const category = section.priceCategory.toLowerCase() as StageCategory;
    const categoryConfig = STAGE_CATEGORIES[category];

    if (isZoomed) return null; // Don't show overlay when zoomed

    return (
        <g
            className="cursor-pointer"
            onClick={() => onClick(section.id)}
        >
            <rect
                x={section.x}
                y={section.y}
                width={section.width}
                height={section.height}
                rx={8}
                ry={8}
                fill={categoryConfig?.color || "#9ca3af"}
                className="transition-opacity duration-200 hover:opacity-90"
                opacity={0.85}
            />
            <text
                x={section.x + section.width / 2}
                y={section.y + section.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white font-bold text-sm pointer-events-none select-none"
                style={{ fontSize: Math.min(section.width / 6, 20) }}
            >
                {section.name}
            </text>
        </g>
    );
});

StageSection.displayName = "StageSection";
export { StageSection };
