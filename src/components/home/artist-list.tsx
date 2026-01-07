"use client";

import { ARTISTS } from "@/lib/data";
import { ScrollContainer } from "@/components/ui/scroll-container";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

export function ArtistList() {
  return (
    <ScrollContainer className="gap-6 py-4">
      {ARTISTS.map((artist) => (
        <Link 
          key={artist.id} 
          href={`/artists/${artist.id}`}
          className="flex flex-col items-center gap-2 group min-w-[140px] snap-start relative"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden relative shadow-md">
            <div 
               className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
               style={{ backgroundImage: `url(${artist.image})` }}
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
               <PlayCircle className="text-white w-8 h-8 drop-shadow-lg" />
             </div>
          </div>
          <span className="text-base font-bold text-gray-800 group-hover:text-purple-700 text-center mt-2">
            {artist.name}
          </span>
        </Link>
      ))}
    </ScrollContainer>
  );
}
