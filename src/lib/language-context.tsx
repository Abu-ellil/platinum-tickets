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
