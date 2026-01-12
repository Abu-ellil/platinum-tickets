"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface City {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  flag: string;
  image: string;
}

export function CityGrid() {
  const { language, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('/api/cities', { cache: 'no-store' });
        const json = await res.json();
        console.log('CityGrid API response:', json);
        if (json.success) {
          console.log('CityGrid received cities:', json.data.length);
          setCities(json.data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  const displayedCities = showAll ? cities : cities.slice(0, 4);

  console.log('CityGrid render:', { showAll, citiesCount: cities.length, displayedCount: displayedCities.length });

  if (loading) {
    return (
      <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[16/10] bg-gray-200 rounded-[24px] mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (cities.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-4xl md:text-4xl font-black text-gray-900 mb-8 md:text-right">
        {t("select_city")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedCities.map((city) => (
          <Link key={city._id} href={`/city/${city.slug}`} className="group block">
            <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
              <img
                src={city.image}
                alt={city.name[language as keyof typeof city.name]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </div>

            <div className="flex items-center gap-2 px-1 justify-center md:justify-start">
              <span className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                {city.name[language as keyof typeof city.name]}
              </span>
              <span className="text-xl flex items-center justify-center p-0.5 bg-gray-100 rounded-sm">
                {city.flag}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && cities.length > 4 ? (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="w-full md:w-auto min-w-[300px] h-14 text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white hover:border-white"
          >
            {t("show_more")}
          </Button>
        </div>
      ) : showAll && cities.length > 4 && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(false)}
            className="w-full md:w-auto min-w-[300px] h-14 text-xl font-bold border-gray-600 text-white hover:bg-gray-50 rounded-2xl shadow-sm"
          >
            {t("show_less")}
          </Button>
        </div>
      )}
    </section>
  );
}
