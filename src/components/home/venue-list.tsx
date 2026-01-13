"use client";

import { useEffect, useState } from "react";
import { ScrollContainer } from "@/components/ui/scroll-container";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface Venue {
  _id: string;
  name: { en: string; ar: string };
  cityId: { name: { en: string; ar: string } };
  image: string;
}

export function VenueList() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    fetch("/api/venues")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVenues(data.data);
        }
      });
  }, []);

  return (
    <ScrollContainer className="gap-5 py-4">
      {venues.map((venue) => (
        <Link 
          key={venue._id} 
          href={`/venues/${venue._id}`}
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
                {venue.name?.ar || ""}
              </h3>
              <div className="flex items-center text-gray-300 text-xs font-medium">
                <MapPin className="w-3 h-3 ml-1" />
                {venue.cityId?.name?.ar || ""}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ScrollContainer>
  );
}
