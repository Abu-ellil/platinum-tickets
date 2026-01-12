"use client";

import { StageCategory, CategoryConfig } from "@/lib/types";

interface PriceLegendProps {
    categories: Record<string, CategoryConfig>;
    onCategoryToggle?: (category: StageCategory) => void;
    activeCategories?: StageCategory[];
}

export function PriceLegend({ categories: propCategories, onCategoryToggle, activeCategories }: PriceLegendProps) {
    const categories = Object.entries(propCategories);

    return (
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-sm border-t border-gray-200">
            {categories.map(([key, config]) => {
                const isActive = !activeCategories || activeCategories.includes(key);
                return (
                    <button
                        key={key}
                        onClick={() => onCategoryToggle?.(key)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${isActive
                            ? "opacity-100 hover:scale-105"
                            : "opacity-40 hover:opacity-60"
                            }`}
                    >
                        <span
                            className="w-4 h-4 rounded-sm"
                            style={{ backgroundColor: config.color }}
                        />
                        <span className="text-xs font-medium text-gray-700">
                            {config.label} • EGP {config.price.toLocaleString()}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
