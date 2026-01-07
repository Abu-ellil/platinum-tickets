"use client";

import { useRef, useState, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { Theater, Seat as SeatType } from "@/lib/types";
import { Seat } from "./seat";

interface SeatMapProps {
  theater: Theater;
  selectedSeats: string[]; // Set of IDs
  onSeatSelect: (seat: SeatType) => void;
}

export function SeatMap({ theater, selectedSeats, onSeatSelect }: SeatMapProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 });

  // Prevent default gesture behavior (scrolling/zooming page)
  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    const el = targetRef.current;
    if (el) {
      el.addEventListener('gesturestart', handler);
      el.addEventListener('gesturechange', handler);
      el.addEventListener('gestureend', handler);
      return () => {
        el.removeEventListener('gesturestart', handler);
        el.removeEventListener('gesturechange', handler);
        el.removeEventListener('gestureend', handler);
      };
    }
  }, []);

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setStyle((s) => ({ ...s, x, y }));
      },
      onPinch: ({ offset: [s], memo }) => {
        setStyle((st) => ({ ...st, scale: s }));
        return memo;
      },
    },
    {
      target: targetRef,
      drag: { from: () => [style.x, style.y] },
      pinch: { scaleBounds: { min: 0.5, max: 4 }, rubberband: true },
    }
  );

  return (
    <div className="w-full h-[60vh] bg-gray-100 overflow-hidden relative touch-none select-none">
      <div
        ref={targetRef}
        className="origin-center w-full h-full will-change-transform"
        style={{
          transform: `translate(${style.x}px, ${style.y}px) scale(${style.scale})`,
        }}
      >
        <svg
          viewBox={`0 0 ${theater.width} ${theater.height}`}
          className="w-full h-full"
        >
          {/* Stage Area */}
          <path 
             d={`M${theater.stage.x},${theater.stage.y} h${theater.stage.width} l-50,${theater.stage.height} h-${theater.stage.width - 100} z`}
             className="fill-gray-300" 
          />
          <text
            x={theater.stage.x + theater.stage.width / 2}
            y={theater.stage.y + theater.stage.height / 2 + 10}
            textAnchor="middle"
            className="fill-gray-600 text-2xl font-bold tracking-widest"
          >
            {theater.stage.label}
          </text>

          {/* Seats Layer */}
          <g>
            {theater.sections.map((section) => (
              <g key={section.id}>
                {section.rows.map((row) => (
                   row.seats.map((seat) => (
                     <Seat 
                       key={seat.id}
                       seat={seat}
                       isSelected={selectedSeats.includes(seat.id)}
                       onSelect={onSeatSelect}
                     />
                   ))
                ))}
              </g>
            ))}
          </g>
        </svg>
      </div>
      
      {/* Legend Overlay */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur p-3 rounded-lg shadow-md text-xs border border-gray-100">
         <div className="flex items-center gap-2 mb-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> VIP (500 SAR)</div>
         <div className="flex items-center gap-2 mb-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Premium (300 SAR)</div>
         <div className="flex items-center gap-2 mb-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Regular (100 SAR)</div>
         <div className="flex items-center gap-2 mb-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> المحدد</div>
         <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-300"></span> محجوز</div>
      </div>
    </div>
  );
}
