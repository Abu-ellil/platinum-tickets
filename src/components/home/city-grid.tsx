"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const CITIES = [
  {
    id: "cairo",
    name: { en: "Cairo", ar: "القاهرة" },
    flag: "🇪🇬",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "doha",
    name: { en: "Doha", ar: "الدوحة" },
    flag: "🇶🇦",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "muscat",
    name: { en: "Muscat", ar: "مسقط" },
    flag: "🇴🇲",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "rabat",
    name: { en: "Rabat", ar: "الرباط" },
    flag: "🇲🇦",
    image:
      "https://images.unsplash.com/photo-1539667468225-8df6674149c0?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "istanbul",
    name: { en: "Istanbul", ar: "إسطنبول" },
    flag: "🇹🇷",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "bursa",
    name: { en: "Bursa", ar: "بورصة" },
    flag: "🇹🇷",
    image:
      "https://images.unsplash.com/photo-1589149021966-51d07c0b0507?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "antalya",
    name: { en: "Antalya", ar: "أنطاليا" },
    flag: "🇹🇷",
    image:
      "https://images.unsplash.com/photo-1542052106173-ef8958d89a13?w=800&auto=format&fit=crop&q=60",
  },
  
];

export function CityGrid() {
  const { language, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const displayedCities = showAll ? CITIES : CITIES.slice(0, 4);

  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center md:text-right">
        {t("select_city")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedCities.map((city) => (
          <Link key={city.id} href={`/city/${city.id}`} className="group block">
            <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
              <img
                src={city.image}
                alt={city.name[language]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </div>

            <div className="flex items-center gap-2 px-1 justify-center md:justify-start">
              <span className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                {city.name[language]}
              </span>
              <span className="text-xl flex items-center justify-center p-0.5 bg-gray-100 rounded-sm">
                {city.flag}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="w-full md:w-auto min-w-[300px] h-14 text-xl font-bold border-gray-200 text-gray-900 hover:bg-gray-50 rounded-xl shadow-sm"
          >
            {t("show_more")}
          </Button>
        </div>
      )}
    </section>
  );
}
