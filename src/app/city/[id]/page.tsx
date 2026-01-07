"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Music, Trophy, Theater, Utensils, Star, ChevronRight, Share2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { name: "Music", icon: Music, color: "bg-pink-100 text-pink-600" },
  { name: "Sports", icon: Trophy, color: "bg-orange-100 text-orange-600" },
  { name: "Theater", icon: Theater, color: "bg-purple-100 text-purple-600" },
  { name: "Dining", icon: Utensils, color: "bg-green-100 text-green-600" },
  { name: "VIP", icon: Star, color: "bg-yellow-100 text-yellow-600" },
];

const ARTISTS = [
  { name: "Amr Diab", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop" },
  { name: "Nancy", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  { name: "Tamer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
  { name: "Assala", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" },
  { name: "Majid", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" },
];

const CITY_DATA: any = {
  doha: {
    name: "Doha",
    hero: [
      {
        title: "AFC Asian Cup Qatar 2023™",
        subtitle: "The stars of Asia shine in Qatar",
        image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=800&q=80"
      },
      {
        title: "Doha Jewellery Exhibition",
        subtitle: "Experience luxury like never before",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
      }
    ],
    events: [
      { title: "Qatar Grand Prix 2024", date: "Dec 01", location: "Lusail Circuit", image: "https://images.unsplash.com/photo-1533107058569-994207cdbf05?w=400&q=80", tag: "Selling Fast" },
      { title: "Doha Food Festival", date: "Nov 15", location: "Oxygen Park", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", tag: "Popular" },
      { title: "Desert Safari & BBQ", date: "Daily", location: "Sealine Beach", image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80" },
      { title: "Museum of Islamic Art Tour", date: "Weekly", location: "Corniche", image: "https://images.unsplash.com/photo-1565552636284-db7d4be10f03?w=400&q=80" },
    ]
  },
  manama: {
    name: "Manama",
    hero: [
      {
        title: "Bahrain GP 2024 - F1",
        subtitle: "Experience the thrill of night racing",
        image: "https://images.unsplash.com/photo-1582200237728-66236b2848c2?w=800&q=80"
      },
      {
        title: "Spring of Culture Festival",
        subtitle: "Celebrating music, art and theatre",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8220?w=800&q=80"
      }
    ],
    events: [
      { title: "Bahrain Jazz Fest", date: "Oct 28", location: "Royal Golf Club", image: "https://images.unsplash.com/photo-1511192336575-5a79af671694?w=400&q=80", tag: "Music" },
      { title: "Al Dar Island Beach Party", date: "Weekend", location: "Al Dar Islands", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", tag: "Beach" },
      { title: "Pearling Path Tour", date: "Daily", location: "Muharraq", image: "https://images.unsplash.com/photo-1590076215667-874d4165c271?w=400&q=80" },
      { title: "Manama Souq Walking Tour", date: "Daily", location: "Bab Al Bahrain", image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c8186b?w=400&q=80" },
    ]
  }
};

export default function CityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = CITY_DATA[id as string] || CITY_DATA.doha;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.hero.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.hero.length]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Mobile-style Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-sm md:hidden">
         <Link href="/" className="text-gray-500 hover:text-gray-900">
           <ArrowRight className="h-6 w-6 rotate-180" />
         </Link>
         <h1 className="font-bold text-lg capitalize">{data.name}</h1>
         <div className="flex gap-4 text-gray-500">
           <Search className="h-6 w-6" />
           <Share2 className="h-6 w-6" />
         </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-4xl bg-white shadow-xl min-h-screen">
        
        {/* Hero Slider */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden group">
          {data.hero.map((slide: any, index: number) => (
             <div 
               key={index}
               className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
             >
               <Image 
                 src={slide.image} 
                 alt={slide.title}
                 fill 
                 className="object-cover"
                 priority={index === 0}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                 <Badge className="w-fit mb-2 bg-yellow-400 text-black hover:bg-yellow-500 border-none">Featured</Badge>
                 <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-1">{slide.title}</h2>
                 <p className="text-gray-200 text-sm md:text-lg opacity-90">{slide.subtitle}</p>
               </div>
             </div>
          ))}
          
          {/* Slider Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {data.hero.map((_: any, idx: number) => (
              <button 
                key={idx}
                className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>

        {/* Categories Rail */}
        <section className="py-6 overflow-hidden">
          <div className="px-4 flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center gap-2 min-w-[70px] snap-start cursor-pointer group">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${cat.color}`}>
                   <cat.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Events */}
        <section className="py-4 border-t border-gray-100">
          <div className="px-4 mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-purple-600 w-1 h-6 rounded-r-full block"></span>
              Top Events
            </h3>
            <Link href="#" className="text-xs text-purple-600 font-semibold hover:underline">View All</Link>
          </div>
          
          <div className="px-4 flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4">
             {data.events.map((event: any, i: number) => (
               <div key={i} className="min-w-[220px] md:min-w-[260px] snap-start">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                     <Image src={event.image} alt={event.title} fill className="object-cover" />
                     {event.tag && (
                       <div className="absolute top-2 right-2">
                         <Badge variant="secondary" className="text-[10px] font-bold shadow-sm">{event.tag}</Badge>
                       </div>
                     )}
                     <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                     </div>
                  </div>
                  <h4 className="font-bold text-gray-900 leading-snug mb-1 line-clamp-2">{event.title}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </p>
               </div>
             ))}
          </div>
        </section>

        {/* Featured Artist */}
        <section className="py-6 bg-gray-50">
           <div className="px-4 mb-4">
              <h3 className="text-xl font-bold text-gray-900">Trending Artists</h3>
           </div>
           <div className="px-4 flex gap-4 overflow-x-auto no-scrollbar">
              {ARTISTS.map((artist, i) => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
                   <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md relative">
                      <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                   </div>
                   <span className="text-xs font-semibold text-gray-800">{artist.name}</span>
                </div>
              ))}
           </div>
        </section>

        {/* Featured Large Banner Event */}
        <section className="py-6 px-4">
           <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" 
                alt="Music Festival" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                 <p className="text-xs font-bold uppercase tracking-wider mb-1 text-yellow-400">Sponsored</p>
                 <h3 className="text-2xl font-bold mb-2">Mega Music Festival 2024</h3>
                 <Button size="sm" className="w-fit bg-white text-black hover:bg-gray-100">Get Tickets</Button>
              </div>
           </div>
        </section>

        {/* Explore More */}
        <section className="py-4 pb-20">
          <div className="px-4 mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Explore {data.name}</h3>
          </div>
          
           <div className="px-4 grid grid-cols-2 gap-4">
              {[1,2,3,4].map((item) => (
                 <div key={item} className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                       <Image 
                         src={`https://images.unsplash.com/photo-${item === 1 ? '1605218427368-35b81a3dd716' : item === 2 ? '1576085898323-28c0490b6389' : '1552566626-52f8b828add9'}?w=400&q=80`} 
                         alt="Explore" 
                         fill 
                         className="object-cover" 
                       />
                    </div>
                    <div>
                       <h5 className="font-bold text-sm">Experience {item}</h5>
                       <p className="text-[10px] text-gray-500">From $25.00</p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

      </div>

      {/* App Download Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
              <div className="flex flex-col">
                 <span className="font-bold text-sm">Get the App</span>
                 <span className="text-[10px] text-gray-500">Best experience on mobile</span>
              </div>
           </div>
           <Button size="sm" variant="default" className="bg-purple-600 h-8 text-xs">Download</Button>
        </div>
      </div>
    </div>
  );
}
