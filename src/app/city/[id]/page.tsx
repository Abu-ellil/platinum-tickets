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

const CATEGORIES = [
  { name: { en: "Music", ar: "عرض موسيقي" }, icon: Music, color: "bg-pink-100 text-pink-600", image: "https://images.unsplash.com/photo-1514525253440-b393452e8220?w=200&h=200&fit=crop" },
  { name: { en: "Comedy", ar: "عرض كوميدي" }, icon: Theater, color: "bg-blue-100 text-blue-600", image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=200&h=200&fit=crop" },
  { name: { en: "Cinema", ar: "سينما خارجية" }, icon: Theater, color: "bg-purple-100 text-purple-600", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop" },
  { name: { en: "Sports", ar: "سباقات وغيرها" }, icon: Trophy, color: "bg-orange-100 text-orange-600", image: "https://images.unsplash.com/photo-1533107058569-994207cdbf05?w=200&h=200&fit=crop" },
];

const ARTISTS = [
  { name: "علي بن محمد", nameEn: "Ali Bin Mohammed", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { name: "بلقيس", nameEn: "Balqees", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  { name: "فؤاد عبد الواحد", nameEn: "Fouad Abdul Wahed", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
  { name: "ماجد المهندس", nameEn: "Majid Al Mohandis", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" },
];

const CITY_DATA: any = {
  muscat: {
    name: { en: "Muscat", ar: "مسقط" },
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80",
    events: [
      { id: 1, title: { ar: "العرض الكوميدي الرهيب", en: "Amazing Comedy Show" }, date: "Jan 25", location: { ar: "مسرح القرم", en: "Qurum Theatre" }, image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&q=80", tag: "Selling Fast", price: "15 OMR" },
      { id: 2, title: { ar: "مهرجان الأكل", en: "Food Festival" }, date: "Feb 02", location: { ar: "حديقة القرم", en: "Qurum Park" }, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", tag: "Popular", price: "Free" },
      { id: 3, title: { ar: "حفل غنائي كبير", en: "Big Concert" }, date: "Feb 10", location: { ar: "دار الأوبرا", en: "Opera House" }, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80", price: "30 OMR" },
    ],
    topEvents: [
      { id: 4, title: { ar: "جولة عبر عبارة في روي", en: "Ferry Tour in Ruwi" }, date: "Daily", location: { ar: "مرسى الروضة", en: "Marina Bandar Rowdha" }, image: "https://images.unsplash.com/photo-1544526226-d41334645224?w=400&q=80" },
      { id: 5, title: { ar: "تحدي السير", en: "Trail Trekking" }, date: "Jan 30", location: { ar: "جبال مسقط", en: "Muscat Mountains" }, image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80" },
    ],
    touristActivities: [
      { id: 6, title: { ar: "رحلة بحرية", en: "Sea Trip" }, image: "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?w=400&q=80", tag: "Recommended", price: "20 OMR" },
      { id: 7, title: { ar: "جولة في المدينة", en: "City Tour" }, image: "https://images.unsplash.com/photo-1563811771046-ba984ff30900?w=400&q=80", tag: "Best Seller", price: "15 OMR" },
    ],
    places: [
      { id: 8, title: { ar: "المتحف الوطني", en: "National Museum" }, location: { ar: "مسقط القديمة", en: "Old Muscat" }, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80" },
      { id: 9, title: { ar: "قصر العلم", en: "Al Alam Palace" }, location: { ar: "مسقط", en: "Muscat" }, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80" },
    ]
  },
  doha: {
    name: { en: "Doha", ar: "الدوحة" },
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80",
    events: [
      { id: 1, title: { ar: "كأس آسيا 2023", en: "Asian Cup 2023" }, date: "Dec 01", location: { ar: "استاد لوسيل", en: "Lusail Stadium" }, image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&q=80", tag: "Highlight" }
    ],
    topEvents: [],
    touristActivities: [],
    places: []
  },
  cairo: {
    name: { en: "Cairo", ar: "القاهرة" },
    heroImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&q=80",
    events: [],
    topEvents: [],
    touristActivities: [],
    places: []
  }
};

export default function CityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { language, dir, t } = useLanguage();
  const cityId = (id as string).toLowerCase();
  const data = CITY_DATA[cityId] || CITY_DATA.muscat;

  const isRtl = dir === "rtl";

  return (
    <div className="bg-white min-h-screen pb-24 font-sans" dir={dir}>
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 md:hidden">
        <Link href="/" className="hover:opacity-70">
          <ChevronLeft className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
        <span className="font-bold text-lg">{data.name[language]}</span>
        <div className="flex gap-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Share2 className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto md:shadow-2xl md:my-8 md:rounded-3xl overflow-hidden bg-white">
        {/* 1. Hero Banner */}
        <section className="relative aspect-[16/10] w-full">
          <Image
            src={data.heroImage}
            alt={data.name[language]}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-white text-4xl md:text-5xl font-black mb-2">
              {t("experience")} {data.name[language]}
            </h1>
          </div>
        </section>

        {/* 2. Discover Best Events in [City] */}
        <section className="py-8">
          <div className="px-6 mb-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-black text-gray-900">
              {t("discover_best_events")} {data.name[language]}
            </h2>
            <Link href="#" className="text-blue-600 font-bold text-sm flex items-center gap-1 group">
              {t("view_all")}
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {data.events.map((event: any) => (
              <div key={event.id} className="min-w-[280px] snap-start mb-2 group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all">
                  <Image src={event.image} alt={event.title[language]} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {event.tag && (
                    <div className="absolute top-3 inset-x-3 flex justify-end">
                      <Badge className="bg-white/90 text-black border-none font-bold text-[10px]">{event.tag}</Badge>
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
                    <span>{event.date}</span>
                    <span className="mx-1">•</span>
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{event.location[language]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Top Events */}
        <section className="py-6 border-t border-gray-50">
          <div className="px-6 mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
              {t("top_events")}
            </h2>
          </div>
          <div className="px-6 space-y-4">
            {data.topEvents.map((event: any) => (
              <div key={event.id} className="flex gap-4 group cursor-pointer">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                  <Image src={event.image} alt={event.title[language]} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col justify-center py-1">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1 line-clamp-2">{event.title[language]}</h4>
                  <p className="text-xs text-gray-400 mb-2">{event.date}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location[language]}
                  </p>
                </div>
                <div className="mr-auto self-center">
                  <ChevronRight className={`w-5 h-5 text-gray-300 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Tourist Activities */}
        <section className="py-8">
          <div className="px-6 mb-6">
            <h2 className="text-xl font-black text-gray-900">{t("tourist_activities")}</h2>
          </div>
          <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar snap-x">
            {data.touristActivities.map((act: any) => (
              <div key={act.id} className="min-w-[160px] snap-start group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all">
                  <Image src={act.image} alt={act.title[language]} fill className="object-cover" />
                  {act.tag && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white border-none text-[8px] px-1.5 py-0">{act.tag}</Badge>
                    </div>
                  )}
                </div>
                <h5 className="font-bold text-gray-900 text-sm mb-0.5">{act.title[language]}</h5>
                <p className="text-[10px] text-gray-500 font-bold text-green-600">{act.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Categories (Circular) */}
        <section className="py-10 bg-gray-50/50">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-black text-gray-900">{t("categories")}</h2>
          </div>
          <div className="px-6 flex gap-8 overflow-x-auto no-scrollbar justify-between">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] group cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden relative border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Image src={cat.image} alt={cat.name[language]} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <cat.icon className="w-8 h-8 text-white opacity-80" />
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700 text-center">{cat.name[language]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Popular Artists */}
        <section className="py-10">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-black text-gray-900">{t("popular_artists")}</h2>
          </div>
          <div className="px-6 flex gap-8 overflow-x-auto no-scrollbar">
            {ARTISTS.map((artist, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[90px] group cursor-pointer text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden relative shadow-lg group-hover:ring-4 group-hover:ring-purple-100 transition-all duration-300">
                  <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-900">{artist.name}</span>
                  <span className="text-[10px] text-gray-400 font-medium">Musician</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Places */}
        <section className="py-8 bg-gray-50/30">
          <div className="px-6 mb-6">
            <h2 className="text-xl font-black text-gray-900">{t("places")}</h2>
          </div>
          <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar">
            {data.places.map((place: any) => (
              <div key={place.id} className="min-w-[200px] group cursor-pointer">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 shadow-md">
                  <Image src={place.image} alt={place.title[language]} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h5 className="font-bold text-gray-900 text-sm mb-1">{place.title[language]}</h5>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {place.location[language]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Large Banner Section (Sports) */}
        <section className="py-10 px-6">
          <div className="mb-6">
            <h2 className="text-xl font-black text-gray-900">{t("sports_events")}</h2>
          </div>
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80"
              alt="Sports"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-400 text-black border-none font-bold">LIVE</Badge>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white text-2xl font-black mb-1">CIEC 2024 ROUND 1</h3>
              <p className="text-gray-300 text-xs mb-4">The ultimate racing experience in the city</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 text-sm font-bold">Starts from 50 OMR</span>
                <Button size="sm" className="bg-white text-black hover:bg-gray-100 rounded-lg h-8 px-4 font-bold text-xs">
                  {t("view_all")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 8.5 Comedy Shows Section */}
        <section className="py-8 border-t border-gray-50">
          <div className="px-6 mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">{t("comedy_shows")}</h2>
            <Link href="#" className="text-blue-600 font-bold text-xs">{t("view_all")}</Link>
          </div>
          <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar snap-x">
            {[1, 2].map((i) => (
              <div key={i} className="min-w-[260px] snap-start group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-md">
                  <Image
                    src={`https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80`}
                    alt="Comedy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-black border-none text-[10px] font-bold">New</Badge>
                  </div>
                </div>
                <h5 className="font-bold text-gray-900 text-sm">Laughter Night Vol. {i}</h5>
                <p className="text-[10px] text-gray-500 mt-1">Starting from 10 OMR</p>
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

        {/* 10. Nearby City Events */}
        <section className="py-10 border-t border-gray-50">
          <div className="px-6 mb-8 text-center md:text-start">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
              {t("nearby_city_events")}
            </h2>
          </div>
          <div className="px-6">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg group cursor-pointer mb-6">
              <Image src="https://images.unsplash.com/photo-1514525253440-b393452e8220?w=800&q=80" alt="Nearby" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg">Dubai Music Festival</h3>
                <p className="text-gray-300 text-xs mt-1">Dubai - UAE</p>
              </div>
              <button className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* 11. Other Cities Grid */}
        <section className="py-10 bg-gray-50/50">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-black text-gray-900">{t("other_cities_events")}</h2>
          </div>
          <div className="px-6 flex gap-6 overflow-x-auto no-scrollbar">
            {['Cairo', 'Doha', 'Dubai', 'Rabat'].map((city) => (
              <div key={city} className="min-w-[120px] flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden relative shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={`https://images.unsplash.com/photo-15${city === 'Cairo' ? '82510003544-4d00b7f74220' : '72252009286-268acec5ca0a'}?w=200&h=200&fit=crop`}
                    alt={city}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-gray-900">{city}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer App Banner */}
        <section className="m-6 bg-gray-100 rounded-[32px] p-8 text-center">
          <h3 className="text-2xl font-black text-gray-900 mb-2 leading-snug">
            تجربة أفضل في التطبيق
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            حمل التطبيق لتحصل على ميزات حصرية
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={120} height={40} />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={135} height={40} />
            </div>
            <div className="bg-black text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              فتح التطبيق
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

