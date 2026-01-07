"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CITIES = [
  {
    id: "doha",
    name: "Doha",
    flag: "��",
    image: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "manama",
    name: "Manama",
    flag: "��",
    image: "https://images.unsplash.com/photo-lC3p0F8-l50?w=800&auto=format&fit=crop&q=60"
  }
];

export function CityGrid() {
  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Select your city</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CITIES.map((city) => (
          <Link 
            key={city.id} 
            href={`/city/${city.id}`}
            className="group block"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 shadow-md">
              <Image 
                src={city.image} 
                alt={city.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            
            <div className="flex items-center gap-3 px-1">
              <span className="text-2xl shadow-sm rounded-sm overflow-hidden flex items-center justify-center">
                {city.flag}
              </span>
              <span className="text-lg font-medium text-gray-800 group-hover:text-purple-700 transition-colors">
                {city.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          variant="outline" 
          className="w-full md:w-auto min-w-[200px] h-12 text-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          Show more
        </Button>
      </div>
    </section>
  );
}
