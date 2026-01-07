"use client";

import { VENUES } from "@/lib/data";
import { ScrollContainer } from "@/components/ui/scroll-container";
import Link from "next/link";
import { MapPin } from "lucide-react";

export function VenueList() {
  return (
    <ScrollContainer className="gap-5 py-4">
      {VENUES.map((venue) => (
        <Link 
          key={venue.id} 
          href={`/venues/${venue.id}`}
          className="block group min-w-[280px] w-[280px] snap-start"
        >
          <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${venue.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            
            <div className="absolute bottom-0 right-0 p-4 w-full">
              <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-yellow-400 transition-colors">
                {venue.name}
              </h3>
              <div className="flex items-center text-gray-300 text-xs font-medium">
                <MapPin className="w-3 h-3 ml-1" />
                {venue.city}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ScrollContainer>
  );
}
