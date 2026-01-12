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
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
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
    <div className="bg-white min-h-screen font-sans" dir={dir}>
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

      <div className="w-full mx-auto bg-white">
        {/* 1. Hero Banner */}
        <section className="relative aspect-[16/6] md:aspect-[21/7] w-full overflow-hidden">
          <Image
            src={city.image}
            alt={city.name[language]}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight drop-shadow-2xl">
              {t("experience")} {city.name[language]}
            </h1>
            <div className="flex items-center gap-4 text-white/90 font-bold">
              <span className="flex items-center gap-1.5"><MapPin className="w-5 h-5" /> {city.name[language]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="flex items-center gap-1.5">{events.length} {t("events")}</span>
            </div>
          </div>
        </section>

        {/* Desktop Search Bar (Floating) */}
        <div className="hidden md:block sticky top-[72px] z-40 px-6 py-4 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("search_placeholder")}
                className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors h-12">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-bold text-gray-700">{language === 'ar' ? 'أي تاريخ' : 'Any Date'}</span>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto space-y-16 py-12 px-6">
          {/* 2. Discover Best Events in [City] */}
          <section>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">
                  {t("discover_best_events")} {city.name[language]}
                </h2>
                <div className="flex gap-2">
                  {['Today', 'Tomorrow', 'This Weekend'].map(filter => (
                    <button key={filter} className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                      {language === 'ar' ? (filter === 'Today' ? 'اليوم' : filter === 'Tomorrow' ? 'غداً' : 'نهاية الأسبوع') : filter}
                    </button>
                  ))}
                </div>
              </div>
              <Link href="#" className="text-blue-600 font-bold text-base flex items-center gap-1 group pb-2">
                {t("view_all")}
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 snap-x px-4 -mx-4">
              {events.length > 0 ? events.map((event: any) => (
                <Link href={`/events/${event._id}`} key={event._id} className="min-w-[280px] md:min-w-[340px] snap-start mb-2 group cursor-pointer transition-all">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <Image src={event.image} alt={event.title[language]} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                    {/* Overlays */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {event.featured && (
                        <Badge className="bg-white/95 text-black border-none font-black text-[10px] px-3 py-1 shadow-xl">
                          {t("popular")}
                        </Badge>
                      )}
                      <Badge className="bg-red-600 text-white border-none font-black text-[10px] px-3 py-1 shadow-xl">
                        {language === 'ar' ? 'يُباع سريعًا' : 'SELLING FAST'}
                      </Badge>
                    </div>

                    <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors border border-white/10 group/heart">
                      <Heart className="w-5 h-5 text-white group-hover/heart:fill-red-500 group-hover/heart:text-red-500 transition-all" />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="bg-black/40 backdrop-blur-xl p-3 rounded-xl border border-white/20 flex items-center gap-3 w-full justify-between">
                        <span className="text-white font-black">{event.pricing?.[0]?.price || '350'} {event.currency}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-lg h-9 px-4 font-bold transition-all hover:scale-105">
                          {t("book_now")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="px-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-tight">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }) : ''}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-0.5 rounded-lg text-[10px] font-black text-yellow-700 ring-1 ring-yellow-100">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{event.rating || '4.8'}</span>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-900 text-lg md:text-xl line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{event.title[language]}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-2.5 font-bold">
                      <MapPin className="w-4 h-4 text-gray-300" />
                      <span className="truncate">{event.venueId?.name?.[language] || city.name[language]}</span>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="py-20 text-center w-full text-gray-400 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
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
                  <Link href={`/events/${event._id}`} key={event._id} className="flex gap-4 group cursor-pointer">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                      <Image src={event.image} alt={event.title[language]} fill className="object-cover group-hover:scale-110 transition-transform" sizes="96px" />
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
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 5. Categories (Circular) */}
          <section className="py-12 bg-gray-50/50 -mx-6 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-gray-900">{t("categories")}</h2>
                <p className="text-gray-500 font-medium mt-1">{language === 'ar' ? 'استكشف ما تفضله' : 'Explore what you love'}</p>
              </div>
              <div className="flex gap-10 overflow-x-auto no-scrollbar justify-center pb-4">
                {categories.map((cat, i) => {
                  const Icon = CATEGORY_ICONS[cat.slug] || Star;
                  return (
                    <div key={cat._id} className="flex flex-col items-center gap-4 min-w-[100px] group cursor-pointer">
                      <div className="w-24 h-24 rounded-full overflow-hidden relative border-4 border-white shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out ring-1 ring-gray-100">
                        <Image src={cat.image} alt={cat.label[language]} fill className="object-cover transition-transform group-hover:scale-110" sizes="96px" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-10 h-10 text-white opacity-90 drop-shadow-md" />
                        </div>
                      </div>
                      <span className="text-sm font-black text-gray-800 text-center tracking-tight">{cat.label[language]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 6. Popular Artists */}
          <section className="py-12">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900">{t("popular_artists")}</h2>
            </div>
            <div className="flex gap-10 overflow-x-auto no-scrollbar pb-4">
              {artists.map((artist, i) => (
                <div key={artist._id} className="flex flex-col items-center gap-4 min-w-[100px] group cursor-pointer text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden relative shadow-xl group-hover:ring-8 group-hover:ring-blue-50 transition-all duration-500 transform group-hover:scale-105">
                    <Image src={artist.image} alt={artist.name[language]} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{artist.name[language]}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t("musician")}</span>
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
                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={120} height={40} unoptimized />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={135} height={40} unoptimized />
              </div>
              <div className="bg-black text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                {language === 'ar' ? 'فتح التطبيق' : 'Open App'}
              </div>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}
