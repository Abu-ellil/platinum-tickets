"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Share2, Info, Loader2, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/events/${id}`);
        const json = await res.json();

        if (json.success) {
          setEvent(json.data);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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
        <h1 className="text-2xl font-bold text-gray-900">{language === 'ar' ? 'الفعالية غير موجودة' : 'Event Not Found'}</h1>
        <Link href="/">
          <Button>{language === 'ar' ? 'العودة للرئيسية' : 'Go Home'}</Button>
        </Link>
      </div>
    );
  }

  const eventTitle = typeof event.title === 'string' ? event.title : event.title[language] || event.title.en;
  const venueName = event.venueId?.name?.[language] || event.venueId?.name?.en || "Unknown Venue";

  // Format date
  const eventDate = event.showTimes?.[0]?.date
    ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : '';

  const eventTime = event.showTimes?.[0]?.time || '';

  return (
    <div className="min-h-screen bg-gray-50 pb-10" dir={dir}>
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[500px] w-full">
        <Image
          src={event.image || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9"}
          alt={eventTitle}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link href={`/city/${event.cityId?.name?.en?.toLowerCase() || 'doha'}`}>
            <Button variant="secondary" size="sm" className="rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border-none">
              <ArrowRight className={`w-4 h-4 mr-2 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              {language === 'ar' ? 'عودة' : 'Back'}
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase mb-3">
                    {event.type}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">{eventTitle}</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-8 text-gray-600 border-t border-b border-gray-50 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">{language === 'ar' ? 'التاريخ' : 'Date'}</p>
                    <p className="font-bold text-gray-900">{eventDate}</p>
                    {eventTime && <p className="text-sm text-gray-500">{eventTime}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">{language === 'ar' ? 'المكان' : 'Venue'}</p>
                    <p className="font-bold text-gray-900">{venueName}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none text-gray-600">
                <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  {language === 'ar' ? 'تفاصيل الفعالية' : 'Event Details'}
                </h3>
                <p className="leading-relaxed">
                  {language === 'ar'
                    ? `استعد لتجربة لا تُنسى في ${venueName}. هذا الحدث يجمع بين الإثارة والترفيه ليقدم لك أمسية استثنائية. احجز تذاكرك الآن ولا تفوت الفرصة!`
                    : `Get ready for an unforgettable experience at ${venueName}. This event brings together excitement and entertainment for an exceptional evening. Book your tickets now and don't miss out!`}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <div className="text-center mb-8">
                <p className="text-gray-400 text-sm font-bold uppercase mb-2">{language === 'ar' ? 'سعر التذكرة يبدأ من' : 'Tickets start from'}</p>
                <div className="text-4xl font-black text-gray-900 flex items-center justify-center gap-1">
                  {event.pricing?.[0]?.price} <span className="text-lg font-bold text-gray-400">{event.currency}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button size="lg" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200" asChild>
                  <Link href={`/booking/${event._id}`}>
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Link>
                </Button>
                <p className="text-xs text-center text-gray-400 font-medium">
                  {language === 'ar' ? 'شامل ضريبة القيمة المضافة' : 'VAT Included'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
