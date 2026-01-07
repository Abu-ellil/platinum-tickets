"use client";

import { useState, useEffect } from "react";
import { Search, Ticket, Compass, Star, Music } from "lucide-react";

const WORDS = ["Events", "NightLife", "Attractions"];

// const QUICK_FILTERS = [
//   { label: 'Events', icon: <Star className="w-4 h-4" />, color: 'bg-purple-500' },
//   { label: 'Concerts', icon: <Music className="w-4 h-4" />, color: 'bg-pink-500' },
//   { label: 'Adventures', icon: <Compass className="w-4 h-4" />, color: 'bg-orange-500' },
//   { label: 'Attractions', icon: <Ticket className="w-4 h-4" />, color: 'bg-blue-500' },
// ];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[500px] md:min-h-[600px] w-full bg-[#1a0b2e] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image */}
      <div 
         className="absolute inset-0 bg-cover bg-center"
         style={{ backgroundImage: 'url("/bg-worldwide-header-sm-4.webp")' }}
      />
      {/* Gradient Overlay - Purple/Blue tone matching Platinumlist */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a0b2e] via-[#2d1b4e]/20 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />
      
      <div className="relative container z-10 px-4 w-full flex flex-col items-center pt-16">
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white text-center mb-8 drop-shadow-xl leading-snug flex flex-col items-center">
          <span className="block mb-2">Discover</span>
          <span 
            className="block text-transparent bg-clip-text text-5xl md:text-7xl lg:text-8xl transition-all duration-300 transform scale-105"
            style={{ 
              WebkitTextStroke: '1px white',
              fontFamily: 'inherit'
            }}
          >
            {WORDS[index]}
          </span>
          <span className="block mt-2">in your city</span>
        </h1>

        {/* Main Search Container */}
        <div className="w-full max-w-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="relative flex items-center w-full h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all group overflow-hidden">
             
             {/* Search Icon */}
             <div className="pl-6 pr-3">
               <Search className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
             </div>

             {/* Input */}
             <input 
               type="text" 
               placeholder="Search event or category..." 
               className="w-full h-full bg-transparent border-none outline-none text-white placeholder:text-white/60 text-lg"
             />

             {/* Sparkle Icon/Badge */}
             <div className="pr-6 pl-3">
               <div className="relative">
                 <Star className="w-6 h-6 text-[#9fffad] fill-[#9fffad] animate-pulse" />
                 <span className="absolute -bottom-1 -right-1 text-[10px] font-bold text-black/60">β</span>
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
