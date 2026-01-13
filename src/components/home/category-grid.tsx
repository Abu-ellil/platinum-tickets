"use client";

import { useEffect, useState } from "react";
import { ScrollContainer } from "@/components/ui/scroll-container";
import Link from "next/link";

interface Category {
  _id: string;
  label: { en: string; ar: string };
  image: string;
  slug: string;
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        }
      });
  }, []);

  return (
    <ScrollContainer className="gap-6 py-2">
      {categories.map((cat) => (
        <Link 
          key={cat._id} 
          href={`/categories/${cat.slug}`}
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
            {cat.label.ar}
          </span>
        </Link>
      ))}
    </ScrollContainer>
  );
}
