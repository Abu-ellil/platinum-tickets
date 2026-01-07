"use client";

import { CATEGORIES } from "@/lib/data";
import { ScrollContainer } from "@/components/ui/scroll-container";
import Link from "next/link";

export function CategoryGrid() {
  return (
    <ScrollContainer className="gap-6 py-2">
      {CATEGORIES.map((cat) => (
        <Link 
          key={cat.id} 
          href={`/categories/${cat.id}`}
          className="flex flex-col items-center gap-3 group min-w-[100px] snap-start"
        >
          <div className="w-24 h-24 rounded-full border-2 border-transparent group-hover:border-purple-600 transition-all p-1">
             <div 
               className="w-full h-full rounded-full bg-cover bg-center shadow-md group-hover:shadow-xl transition-shadow overflow-hidden"
               style={{ backgroundImage: `url(${cat.image})` }}
             >
                <div className="w-full h-full bg-black/10 group-hover:bg-transparent transition-colors" />
             </div>
          </div>
          <span className="text-sm font-bold text-gray-700 group-hover:text-purple-700 text-center">
            {cat.label}
          </span>
        </Link>
      ))}
    </ScrollContainer>
  );
}
