"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Music,
  Trophy,
  Theater,
  Utensils,
  Star,
  ChevronRight,
  Share2,
  Search,
  ChevronLeft,
  Heart,
  ExternalLink,
  ChevronLeftCircle,
  ChevronRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";

const CATEGORY_ICONS: Record<string, any> = {
  music: Music,
  comedy: Theater,
  cinema: Theater,
  sports: Trophy,
  theater: Theater,
  adventures: Trophy,
};

const CATEGORY_COLORS: Record<string, string> = {
  music: "bg-pink-100 text-pink-600",
  comedy: "bg-blue-100 text-blue-600",
  cinema: "bg-purple-100 text-purple-600",
  sports: "bg-orange-100 text-orange-600",
  theater: "bg-indigo-100 text-indigo-600",
  adventures: "bg-green-100 text-green-600",
};

export default function CityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { language, dir, t } = useLanguage();
  const citySlug = (id as string).toLowerCase();

  const [city, setCity] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isRtl = dir === "rtl";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Fetch City
        const cityRes = await fetch(`/api/cities/${citySlug}`);
        const cityJson = await cityRes.json();

        if (cityJson.success) {
          const cityData = cityJson.data;
          setCity(cityData);

          // 2. Fetch Events for this city
          const eventsRes = await fetch(`/api/events?cityId=${cityData._id}`);
          const eventsJson = await eventsRes.json();
          if (eventsJson.success) {
            setEvents(eventsJson.data);
          }
        }

        // 3. Fetch Categories
        const categoriesRes = await fetch('/api/categories');
        const categoriesJson = await categoriesRes.json();
        if (categoriesJson.success) {
          setCategories(categoriesJson.data);
        }

        // 4. Fetch Artists
        const artistsRes = await fetch('/api/artists');
        const artistsJson = await artistsRes.json();
        if (artistsJson.success) {
          setArtists(artistsJson.data);
        }
      } catch (error) {
        console.error('Error fetching city page data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [citySlug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen pb-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="bg-white min-h-screen pb-24 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">{t("city_not_found")}</h1>
        <Link href="/">
          <Button>{t("go_home")}</Button>
        </Link>
      </div>
    );
  }

  // Derived sections from events
  const featuredEvents = events.filter(e => e.featured);
  const regularEvents = events.filter(e => !e.featured);

  return (
    <div className="bg-white min-h-screen pb-24 font-sans" dir={dir}>
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 md:hidden">
        <Link href="/" className="hover:opacity-70">
          <ChevronLeft className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
        <span className="font-bold text-lg">{city.name[language]}</span>
        <div className="flex gap-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Share2 className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto md:shadow-2xl md:my-8 md:rounded-3xl overflow-hidden bg-white">
        {/* 1. Hero Banner */}
        <section className="relative aspect-[16/10] w-full">
          <Image
            src={city.image}
            alt={city.name[language]}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-white text-4xl md:text-5xl font-black mb-2">
              {t("experience")} {city.name[language]}
            </h1>
          </div>
        </section>

        {/* 2. Discover Best Events in [City] */}
        <section className="py-8">
          <div className="px-6 mb-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-black text-gray-900">
              {t("discover_best_events")} {city.name[language]}
            </h2>
            <Link href="#" className="text-blue-600 font-bold text-sm flex items-center gap-1 group">
              {t("view_all")}
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {events.length > 0 ? events.map((event: any) => (
              <div key={event._id} className="min-w-[280px] snap-start mb-2 group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all">
                  <Image src={event.image} alt={event.title[language]} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {event.featured && (
                    <div className="absolute top-3 inset-x-3 flex justify-end">
                      <Badge className="bg-white/90 text-black border-none font-bold text-[10px]">{t("popular")}</Badge>
                    </div>
                  )}
                  <button className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1">{event.title[language]}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }) : ''}</span>
                    <span className="mx-1">•</span>
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{event.venueId?.name?.[language] || city.name[language]}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center w-full text-gray-400">
                {t("no_events_found")}
              </div>
            )}
          </div>
        </section>

        {/* 3. Top Events (from Featured) */}
        {featuredEvents.length > 0 && (
          <section className="py-6 border-t border-gray-50">
            <div className="px-6 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                {t("top_events")}
              </h2>
            </div>
            <div className="px-6 space-y-4">
              {featuredEvents.map((event: any) => (
                <div key={event._id} className="flex gap-4 group cursor-pointer">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                    <Image src={event.image} alt={event.title[language]} fill className="object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1 line-clamp-2">{event.title[language]}</h4>
                    <p className="text-xs text-gray-400 mb-2">{event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }) : ''}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.venueId?.name?.[language] || city.name[language]}
                    </p>
                  </div>
                  <div className="mr-auto self-center">
                    <ChevronRight className={`w-5 h-5 text-gray-300 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Categories (Circular) */}
        <section className="py-10 bg-gray-50/50">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-black text-gray-900">{t("categories")}</h2>
          </div>
          <div className="px-6 flex gap-8 overflow-x-auto no-scrollbar justify-between">
            {categories.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Star;
              return (
                <div key={cat._id} className="flex flex-col items-center gap-3 min-w-[80px] group cursor-pointer">
                  <div className="w-20 h-20 rounded-full overflow-hidden relative border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Image src={cat.image} alt={cat.label[language]} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white opacity-80" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 text-center">{cat.label[language]}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Popular Artists */}
        <section className="py-10">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-black text-gray-900">{t("popular_artists")}</h2>
          </div>
          <div className="px-6 flex gap-8 overflow-x-auto no-scrollbar">
            {artists.map((artist, i) => (
              <div key={artist._id} className="flex flex-col items-center gap-3 min-w-[90px] group cursor-pointer text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden relative shadow-lg group-hover:ring-4 group-hover:ring-purple-100 transition-all duration-300">
                  <Image src={artist.image} alt={artist.name[language]} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-900">{artist.name[language]}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{t("musician")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Discover More Button */}
        <div className="py-8 px-6 flex justify-center">
          <Button variant="outline" className="w-full h-12 rounded-xl text-gray-900 border-gray-200 font-bold hover:bg-gray-50">
            {t("discover_more")}
          </Button>
        </div>

        {/* Footer App Banner */}
        <section className="m-6 bg-gray-100 rounded-[32px] p-8 text-center">
          <h3 className="text-2xl font-black text-gray-900 mb-2 leading-snug">
            {language === 'ar' ? 'تجربة أفضل في التطبيق' : 'Better Experience in App'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {language === 'ar' ? 'حمل التطبيق لتحصل على ميزات حصرية' : 'Download the app for exclusive features'}
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={120} height={40} />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={135} height={40} />
            </div>
            <div className="bg-black text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              {language === 'ar' ? 'فتح التطبيق' : 'Open App'}
            </div>
          </div>
        </section>

      </div>

      {/* Floating Bottom Nav for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-2 md:hidden z-50">
        <div className="max-w-md mx-auto flex justify-around">
          {[
            { label: "Home", ar: "الرئيسية", icon: Star },
            { label: "Events", ar: "الفعاليات", icon: Music },
            { label: "Places", ar: "الأماكن", icon: MapPin },
            { label: "Profile", ar: "حسابي", icon: Star },
          ].map((item, i) => (
            <button key={i} className="flex flex-col items-center p-2 gap-1 group">
              <item.icon className={`w-5 h-5 ${i === 0 ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-bold ${i === 0 ? 'text-blue-600' : 'text-gray-400'}`}>{language === 'ar' ? item.ar : item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
