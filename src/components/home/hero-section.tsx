"use client";

import { useState, useEffect } from "react";
import { Search, Ticket, Compass, Star, Music, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const WORDS_EN = ["Events", "NightLife", "Attractions"];
const WORDS_AR = ["ابرز الفعاليات", "والمغامرات", "والتجارب الاستثنائية"];

// const QUICK_FILTERS = [
//   { label: 'Events', icon: <Star className="w-4 h-4" />, color: 'bg-purple-500' },
//   { label: 'Concerts', icon: <Music className="w-4 h-4" />, color: 'bg-pink-500' },
//   { label: 'Adventures', icon: <Compass className="w-4 h-4" />, color: 'bg-orange-500' },
//   { label: 'Attractions', icon: <Ticket className="w-4 h-4" />, color: 'bg-blue-500' },
// ];

export function HeroSection() {
  const { language, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const words = language === "ar" ? WORDS_AR : WORDS_EN;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative min-h-[380px] md:min-h-[600px] w-full  overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg-worldwide-header3.webp")' }}
      />
      {/* Gradient Overlay - Purple/Blue tone matching Platinumlist */}
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 " />

      <div className="relative container z-10 px-4 w-full flex flex-col  pt-16">
        <div className=" mb-10 space-y-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl">
            {t("discover")}
          </h1>
          <div className=" md:h-28 overflow-hidden">
            <span
              key={index}
              className="block text-4xl md:text-6xl lg:text-7xl font-black text-white/0 drop-shadow-xl animate-slide-up [-webkit-text-stroke:2px_white]"
            >
              {words[index]}
            </span>
          </div>
          <p className="text-4xl md:text-4xl font-bold text-white drop-shadow-lg">
            {t("in_your_city")}
          </p>
        </div>

        {/* Main Search Container */}
        <div className="w-full max-w-3xl relative animate-in fade-in slide-in-from-bottom-4 duration-700 ">
          <div className="relative flex items-center w-full h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all group overflow-hidden shadow-2xl">
            {/* Search Icon on the right */}
            <div className="pr-6 pl-3">
              <Search className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="w-full h-full bg-transparent border-none outline-none text-white placeholder:text-white/70 text-lg px-4 font-medium"
            />
            {/* Left side Sparkle/Beta (from Image 0) */}
            <div className="pl-6 pr-3 flex items-center gap-1.5 border-r border-white/10">
              <div className="bg-[#9fffad p-1.5 rounded-full">
                <Sparkles className="w-8 h-6 text-[#9fffad] text-4xl relative" />
                <span className=" font-bold text-xs absolute top-9">β</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filters / Tags */}
        {/* <div className="mt-8 flex flex-wrap justify-center gap-3">
          {QUICK_FILTERS.map((filter) => (
            <button 
              key={filter.label}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all border border-white/10"
            >
              <span className={`p-1 rounded-full ${filter.color} text-white`}>
                {filter.icon}
              </span>
              <span className="font-medium text-sm">{filter.label}</span>
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
