"use client";

import { useEffect, useState } from "react";
import { ScrollContainer } from "@/components/ui/scroll-container";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface Artist {
  _id: string;
  name: { en: string; ar: string };
  image: string;
}

export function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetch("/api/artists")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArtists(data.data);
        }
      });
  }, []);

  return (
    <ScrollContainer className="gap-6 py-4">
      {artists.map((artist) => (
        <Link 
          key={artist._id} 
          href={`/artists/${artist._id}`}
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
            {artist.name.ar}
          </span>
        </Link>
      ))}
    </ScrollContainer>
  );
}
