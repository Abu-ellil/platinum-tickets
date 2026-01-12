"use client";

import { useRef, useState, useCallback } from "react";
import { Theater, Seat as SeatType, Section, StageCategory } from "@/lib/types";
import { STAGE_CATEGORIES } from "@/lib/platinum-stage-data";
import { StageSeat } from "./stage-seat";
import { StageSection } from "./stage-section";
import { PriceLegend } from "./price-legend";
import { Plus, Minus, ZoomIn } from "lucide-react";

interface PlatinumStageMapProps {
    theater: Theater;
    selectedSeats: string[];
    onSeatSelect: (seat: SeatType) => void;
}

export function PlatinumStageMap({ theater, selectedSeats, onSeatSelect }: PlatinumStageMapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomedSection, setZoomedSection] = useState<string | null>(null);
    const [activeCategories, setActiveCategories] = useState<StageCategory[]>(
        Object.keys(STAGE_CATEGORIES) as StageCategory[]
    );

    // Zoom controls
    const handleZoomIn = useCallback(() => {
        setZoom(z => Math.min(z * 1.3, 4));
        setIsZoomed(true);
    }, []);

    const handleZoomOut = useCallback(() => {
        const newZoom = zoom / 1.3;
        if (newZoom <= 1.1) {
            setZoom(1);
            setIsZoomed(false);
            setZoomedSection(null);
            setPan({ x: 0, y: 0 });
        } else {
            setZoom(newZoom);
        }
    }, [zoom]);

    const handleSectionClick = useCallback((sectionId: string) => {
        const section = theater.sections.find(s => s.id === sectionId);
        if (!section) return;

        // Calculate center of section for panning
        const centerX = -(section.x + section.width / 2 - theater.width / 2) * 2;
        const centerY = -(section.y + section.height / 2 - theater.height / 2) * 2;

        setZoom(2.5);
        setPan({ x: centerX, y: centerY });
        setIsZoomed(true);
        setZoomedSection(sectionId);
    }, [theater]);

    const handleResetView = useCallback(() => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setIsZoomed(false);
        setZoomedSection(null);
    }, []);

    const handleCategoryToggle = useCallback((category: StageCategory) => {
        setActiveCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            }
            return [...prev, category];
        });
    }, []);

    // Check if a section should be visible based on active categories
    const isSectionVisible = (section: Section) => {
        const category = section.priceCategory.toLowerCase() as StageCategory;
        return activeCategories.includes(category);
    };

    return (
        <div className="flex flex-col w-full bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl overflow-hidden shadow-xl border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">{theater.name}</h3>
                <button
                    onClick={handleResetView}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                >
                    <ZoomIn className="w-3.5 h-3.5" />
                    Reset View
                </button>
            </div>

            {/* Main Map Area */}
            <div className="relative flex-1 min-h-[500px] overflow-hidden">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${theater.width} ${theater.height}`}
                    className="w-full h-full"
                    style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transformOrigin: "center center",
                        transition: "transform 0.3s ease-out",
                    }}
                >
                    {/* Background gradient */}
                    <defs>
                        <linearGradient id="stageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#374151" />
                            <stop offset="100%" stopColor="#1f2937" />
                        </linearGradient>
                    </defs>

                    {/* Stage Area */}
                    <rect
                        x={theater.stage.x}
                        y={theater.stage.y}
                        width={theater.stage.width}
                        height={theater.stage.height}
                        rx={8}
                        fill="url(#stageGradient)"
                        className="drop-shadow-md"
                    />
                    <text
                        x={theater.stage.x + theater.stage.width / 2}
                        y={theater.stage.y + theater.stage.height / 2 + 5}
                        textAnchor="middle"
                        className="fill-white text-xl font-bold tracking-[0.3em]"
                    >
                        {theater.stage.label}
                    </text>

                    {/* Seats Layer (visible when zoomed) */}
                    {isZoomed && (
                        <g>
                            {theater.sections
                                .filter(isSectionVisible)
                                .map((section) => (
                                    <g key={section.id}>
                                        {section.rows.map((row) =>
                                            row.seats.map((seat) => (
                                                <StageSeat
                                                    key={seat.id}
                                                    seat={seat}
                                                    isSelected={selectedSeats.includes(seat.id)}
                                                    onSelect={onSeatSelect}
                                                />
                                            ))
                                        )}
                                    </g>
                                ))}
                        </g>
                    )}

                    {/* Section Overlays (visible when not zoomed) */}
                    {!isZoomed && (
                        <g>
                            {theater.sections
                                .filter(isSectionVisible)
                                .map((section) => (
                                    <StageSection
                                        key={section.id}
                                        section={section}
                                        isZoomed={isZoomed}
                                        onClick={handleSectionClick}
                                    />
                                ))}
                        </g>
                    )}
                </svg>

                {/* Zoom Controls */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    <button
                        onClick={handleZoomIn}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                        aria-label="Zoom in"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                        aria-label="Zoom out"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                </div>

                {/* Zoom indicator */}
                {isZoomed && (
                    <div className="absolute left-4 bottom-4 px-3 py-1.5 bg-black/70 text-white text-xs rounded-full">
                        {Math.round(zoom * 100)}%
                    </div>
                )}
            </div>

            {/* Price Legend */}
            <PriceLegend
                onCategoryToggle={handleCategoryToggle}
                activeCategories={activeCategories}
            />

            {/* Selected Seats Summary */}
            {selectedSeats.length > 0 && (
                <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected
                        </span>
                        <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors">
                            Continue to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
