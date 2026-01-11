"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const translations = {
  en: {
    discover: "Discover",
    events: "Events",
    nightlife: "NightLife",
    attractions: "Attractions",
    in_your_city: "in your city",
    search_placeholder: "Search event or category...",
    select_city: "Select your city",
    show_more: "Show more",
    login: "Login",
    download_app: "Download App",
    contact_support: "Contact Support",
    join_team: "Join our team",
    location: "Location",
    language: "Language",
    currency: "Currency",
    sell_with_us: "Sell with us",
    main_menu: "Main Menu",
    support_center: "Support Center",
    add_event: "Add Event",
    experience: "Experience",
    view_all: "View All",
    discover_best_events: "Discover best events in",
    top_events: "Top Events",
    tourist_activities: "City Tourist Activities",
    categories: "Categories",
    popular_artists: "Famous in the Place",
    places: "Places",
    sports_events: "Sports Events",
    comedy_shows: "Comedy Shows",
    nearby_city_events: "Top events in nearby cities",
    other_cities_events: "Other cities with available events",
    discover_more: "Discover More",
  },
  ar: {
    discover: "اكتشف",
    events: "الفعاليات",
    nightlife: "المغامرات",
    attractions: "التجارب",
    in_your_city: "أينما كنت!",
    search_placeholder: "البحث عن الفعالية أو الفئة",
    select_city: "اختر مدينتك",
    show_more: "أظهر المزيد",
    login: "تسجيل الدخول",
    download_app: "حمّل التطبيق الآن",
    contact_support: "التواصل مع الدعم",
    join_team: "انضم لفريقنا",
    location: "الموقع",
    language: "اللغة",
    currency: "العملة",
    sell_with_us: "بيع فعاليتك معنا",
    main_menu: "القائمة الرئيسية",
    support_center: "مركز الدعم",
    add_event: "إضافة فعالية",
    experience: "جرب",
    view_all: "مشاهدة الكل",
    discover_best_events: "اكتشف أفضل الفعاليات في",
    top_events: "أبرز الفعاليات",
    tourist_activities: "للنشاطات السياحية للمدينة",
    categories: "الفئات",
    popular_artists: "مشاهير المكان",
    places: "الأماكن",
    sports_events: "الفعاليات الرياضية",
    comedy_shows: "العروض الكوميدية",
    nearby_city_events: "أبرز الفعاليات الترفيهية التي تقام في المدن القريبة منك",
    other_cities_events: "المدن الأخرى مع الفعاليات المتاحة حالياً",
    discover_more: "اكتشف المزيد",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  const dir = language === "ar" ? "rtl" : "ltr";

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
