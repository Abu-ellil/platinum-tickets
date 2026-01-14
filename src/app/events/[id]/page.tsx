"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Share2, Info, Loader2, ArrowRight, Star, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { id } = use(params);
  const { language, dir } = useLanguage();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similarEvents, setSimilarEvents] = useState<any[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [selectedShowTimeIndex, setSelectedShowTimeIndex] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/events/${id}`);
        const json = await res.json();

        if (json.success) {
          setEvent(json.data);
          setError("");
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!event || !event.cityId) return;
    const cityId = event.cityId._id || event.cityId;

    const fetchSimilar = async () => {
      try {
        setLoadingSimilar(true);
        const res = await fetch(`/api/events?cityId=${cityId}&status=active&limit=6`);
        const json = await res.json();
        if (json.success) {
          const filtered = json.data.filter((e: any) => e._id !== event._id);
          setSimilarEvents(filtered);
        }
      } finally {
        setLoadingSimilar(false);
      }
    };

    fetchSimilar();
  }, [event]);

  useEffect(() => {
    if (event?.showTimes && event.showTimes.length > 0) {
      setSelectedShowTimeIndex(0);
    }
  }, [event]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {language === "ar" ? "الفعالية غير موجودة" : "Event Not Found"}
        </h1>
        <Link href="/">
          <Button>{language === "ar" ? "العودة للرئيسية" : "Go Home"}</Button>
        </Link>
      </div>
    );
  }

  const eventTitle = event.title || "";
  const venueName =
    event.venueId?.name?.[language] ||
    event.venueId?.name?.en ||
    event.venueName ||
    (language === "ar" ? "مكان غير محدد" : "Unknown Venue");

  const cityName =
    event.cityId?.name?.[language] ||
    event.cityId?.name?.en ||
    "";

  const eventDescription = event.description || "";

  const selectedShowTime = event.showTimes?.[selectedShowTimeIndex] || event.showTimes?.[0];

  const eventDate = selectedShowTime?.date
    ? new Date(selectedShowTime.date).toLocaleDateString(
        language === "ar" ? "ar-EG" : "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "";

  const eventTime = selectedShowTime?.time || "";

  const minPrice =
    event.pricing && event.pricing.length > 0
      ? Math.min(...event.pricing.map((p: any) => p.price))
      : 0;

  const mapQuery = encodeURIComponent(`${eventTitle} ${venueName} ${cityName}`.trim());
  const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`;

  return (
    <div className="min-h-screen bg-white pb-24" dir={dir}>
      {/* Custom Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-5 h-0.5 bg-gray-900 mb-1.5 rounded-full"></div>
            <div className="w-5 h-0.5 bg-gray-900 mb-1.5 rounded-full"></div>
            <div className="w-3 h-0.5 bg-gray-900 rounded-full"></div>
          </button>
          <Link href="/" className="flex items-center">
            <span className="text-[#9b3cf7] font-black text-xl tracking-tighter">platinum</span>
            <span className="text-gray-900 font-black text-xl tracking-tighter">list</span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <button className="text-gray-900 hover:text-[#9b3cf7] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-900 hover:text-[#9b3cf7] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="relative aspect-[4/5] w-full bg-gray-100">
        <Image
          src={event.image || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9"}
          alt={eventTitle}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Badges */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {event.statusBadge && (
            <span className="px-3 py-1.5 rounded-full bg-[#ffdd00] text-black text-[10px] font-black uppercase tracking-wider shadow-sm">
              {event.statusBadge}
            </span>
          )}
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-black" />
            4.8
          </span>
        </div>
        
        {/* Floating Actions */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/30">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/30">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none">
          <button className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-black/20 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <button className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-black/20 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Event Category Badge */}
        <div className="absolute bottom-6 right-6 z-20">
          <span className="px-4 py-2 rounded-full bg-[#1b0620] text-white text-[11px] font-black uppercase tracking-widest shadow-lg">
            {event.category || (language === "ar" ? "حفل موسيقي" : "Concert")}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-6 space-y-8">
        {/* Title and Intro */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-gray-900 leading-[1.1] tracking-tight">
            {eventTitle}
          </h1>
          <p className="text-gray-500 font-bold text-lg">
            {event.subTitle || (language === "ar" ? "بمشاركة أوركسترا قطر الفيلهارمونية" : "With Qatar Philharmonic Orchestra")}
          </p>
        </div>

        {/* Resell Alert */}
        <div className="bg-[#fcf5ff] border border-[#f3e8ff] rounded-[24px] p-5 flex gap-5 items-start">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-purple-50">
            <svg className="w-7 h-7 text-[#9b3cf7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="space-y-1.5 pt-1">
            <p className="font-black text-[#9b3cf7] text-lg leading-none">{language === "ar" ? "تغيّرت خططك؟ لا مشكلة!" : "Plans changed? No problem!"}</p>
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
              {language === "ar" 
                ? "إذا كنت لا تستطيع حضور الفعالية، يمكنك بضعة ثوانٍ إعادة بيع تذكرتك لعملاء آخرين." 
                : "If you can't attend the event, you can resell your ticket to other customers in seconds."}
            </p>
          </div>
        </div>

        {/* Info List */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-[#9b3cf7] transition-all">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 font-black uppercase tracking-wider">{language === "ar" ? "التاريخ" : "DATE"}</span>
              <span className="font-black text-gray-900 text-[15px]">{eventDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-[#9b3cf7] transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 font-black uppercase tracking-wider">{language === "ar" ? "الوقت" : "TIME"}</span>
              <span className="font-black text-gray-900 text-[15px]">
                {language === "ar" 
                  ? `تفتح الأبواب 19:30، يبدأ العرض ${eventTime}` 
                  : `Doors open 19:30, show starts ${eventTime}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-[#9b3cf7] transition-all">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 font-black uppercase tracking-wider">{language === "ar" ? "المكان" : "VENUE"}</span>
              <span className="font-black text-gray-900 text-[15px]">{venueName}</span>
            </div>
          </div>
        </div>

        {/* Line separator */}
        <div className="h-px bg-gray-100 w-full my-4"></div>

        {/* Artists Section */}
        <div className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">{language === "ar" ? "المشاركون" : "Artists"}</h2>
          {(event.artists || [{ name: "عبير نعمة", role: "فنانة", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81" }]).map((artist: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-[20px] hover:border-purple-100 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                  <Image src={artist.image || "https://images.unsplash.com/photo-1516280440614-37939bbacd81"} alt={artist.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-black text-[15px] text-gray-900">{artist.name}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{artist.role || (language === "ar" ? "فنان" : "Artist")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#9b3cf7] hover:bg-purple-50 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-gray-900">{language === "ar" ? "الوصف" : "Description"}</h2>
          <div className="text-[15px] text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: eventDescription || (language === "ar" ? "لا يوجد وصف متاح لهذه الفعالية" : "No description available") }} />
        </div>

        {/* Accordions */}
        <div className="space-y-0 border-t border-gray-100">
          {[
            { 
              title: language === "ar" ? "الشروط والأحكام" : "Terms & Conditions",
              content: event.terms?.[language] || event.terms?.en || (language === "ar" ? "تطبق الشروط والأحكام الخاصة بالفعالية." : "Event terms and conditions apply.")
            },
            { 
              title: language === "ar" ? "معلومات الحفل" : "Event Info",
              content: event.info?.[language] || event.info?.en || (language === "ar" ? "معلومات إضافية حول الحفل." : "Additional info about the event.")
            },
            { 
              title: language === "ar" ? "كيف تصل إلى وجهتك؟" : "How to get there?",
              content: event.gettingThere?.[language] || event.gettingThere?.en || (language === "ar" ? "يمكنك الوصول إلى المكان بسهولة عبر وسائل النقل العام." : "You can reach the venue easily via public transport.")
            }
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100">
              <details className="group">
                <summary className="w-full py-6 flex items-center justify-between list-none cursor-pointer">
                  <span className="font-black text-gray-900 text-[16px]">{item.title}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </summary>
                <div className="pb-6 text-sm text-gray-500 leading-relaxed font-medium">
                  {item.content}
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Location Section */}
        <div className="space-y-5 pt-4">
          <h2 className="text-2xl font-black text-gray-900">{language === "ar" ? "الموقع" : "Location"}</h2>
          <div className="relative rounded-[32px] overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="font-black text-[15px] text-gray-900">{venueName}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{language === "ar" ? "الموقع على الخريطة" : "LOCATION ON MAP"}</p>
                </div>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1b0620] text-white text-[11px] font-black px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-[#2b0730] transition-all shadow-md"
              >
                View on map
              </a>
            </div>
            <div className="h-56 bg-gray-100 relative">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0 grayscale contrast-[1.1] brightness-[1.05]"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10"></div>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-black text-gray-900 px-1">{language === "ar" ? "قد يعجبك أيضاً" : "You may also like"}</h2>
            <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
              {similarEvents.map((ev: any) => (
                <Link key={ev._id} href={`/events/${ev._id}`} className="flex-shrink-0 w-[260px] group">
                  <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 bg-gray-100">
                    <Image src={ev.image || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9"} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {ev.statusBadge && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#ffdd00] text-black text-[9px] font-black uppercase tracking-wider">{ev.statusBadge}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-2 px-1">
                    <h3 className="font-black text-[15px] leading-tight text-gray-900 line-clamp-2 group-hover:text-[#9b3cf7] transition-colors">{ev.title}</h3>
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] text-[#9b3cf7] font-black uppercase tracking-wider">{language === "ar" ? "أفضل المقاعد متاحة" : "Best seats available"}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        {new Date(ev.showTimes?.[0]?.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", { weekday: "long", day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Why Platinum Tickets */}
        <div className="space-y-10 py-12 border-t border-gray-100">
          <h3 className="text-center font-black text-gray-900 text-lg">{language === "ar" ? "ما الذي يجعل منصة بلاتينيوم ليست هي الأفضل؟" : "Why Platinum List?"}</h3>
          <div className="grid grid-cols-2 gap-y-10 gap-x-6">
            <div className="text-center space-y-3 group">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                 <svg className="w-8 h-8 text-gray-400 group-hover:text-[#9b3cf7] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div className="space-y-1">
                <p className="font-black text-sm text-gray-900">{language === "ar" ? "عملية حجز آمنة" : "Secure Booking"}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">{language === "ar" ? "نطبق معايير أمان عالمية" : "Global security standards"}</p>
              </div>
            </div>
            <div className="text-center space-y-3 group">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                 <svg className="w-8 h-8 text-gray-400 group-hover:text-[#9b3cf7] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
              </div>
              <div className="space-y-1">
                <p className="font-black text-sm text-gray-900">{language === "ar" ? "خيارات دفع متعددة" : "Payment Options"}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">{language === "ar" ? "دفع سهل وسريع" : "Easy and fast payment"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Support */}
      <footer className="bg-gray-50 px-5 py-12 space-y-10 border-t border-gray-100 pb-32">
        <div className="space-y-8">
          <div className="flex items-center gap-4 bg-white p-5 rounded-[24px] shadow-sm border border-gray-50">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <div>
              <p className="font-black text-sm text-gray-900">{language === "ar" ? "تحتاج مساعدة؟" : "Need help?"}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{language === "ar" ? "مركز الدعم متاح 24/7" : "Support center available 24/7"}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 h-14 bg-black rounded-[18px] flex items-center justify-center gap-3 text-white px-4 hover:bg-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.06 1.18-3.12.73-1.11-.48-2.13-1.47-3.23-1.47-1.14 0-2.18.99-3.23 1.47-1.09.48-2.12.28-3.12-.73-4.27-4.32-3.66-12.04 1.25-12.04 1.25 0 2.21.64 2.94.64.72 0 1.96-.75 3.42-.6 1.46.15 2.58.74 3.23 1.64-3.17 1.84-2.65 6.13.56 7.4-1.05 2.53-2.05 4.96-2.7 6.04zm-4.02-15.11c-.15-1.47.88-3.04 2.25-3.17.21 1.57-1.02 3.03-2.25 3.17z"/></svg>
              <div className="text-[9px] leading-tight font-black uppercase tracking-wider">
                <p className="text-gray-400">Download on</p>
                <p className="text-sm">App Store</p>
              </div>
            </div>
            <div className="flex-1 h-14 bg-black rounded-[18px] flex items-center justify-center gap-3 text-white px-4 hover:bg-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.285.424-.285.679 0 .526.427.953.953.953.255 0 .499-.105.679-.285L15.823 12.67c.369-.369.369-.971 0-1.34L4.957.583C4.777.403 4.533.298 4.278.298c-.526 0-.953.427-.953.953 0 .255.105.499.285.679l.001-.116z"/></svg>
              <div className="text-[9px] leading-tight font-black uppercase tracking-wider">
                <p className="text-gray-400">Get it on</p>
                <p className="text-sm">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md bg-white/95">
        <div className="text-right space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] text-gray-400 font-black uppercase tracking-widest">{event.currency || "EGP"}</span>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">{minPrice.toLocaleString()}</span>
          </div>
          <p className="text-[#9b3cf7] text-[11px] font-black uppercase tracking-widest">{language === "ar" ? "أفضل المقاعد متاحة" : "Best seats available"}</p>
        </div>
        <Button 
          className="bg-[#1b0620] hover:bg-[#2b0730] text-white rounded-2xl px-10 py-7 font-black text-base shadow-lg hover:shadow-xl transition-all active:scale-95"
          asChild
        >
          <Link href={`/booking/${event._id}`}>
            {language === "ar" ? "اختيار التذاكر" : "Select tickets"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
