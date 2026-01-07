import { Button } from "@/components/ui/button";
import { EVENTS } from "@/lib/data";
import { Calendar, MapPin, Share2, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventDetailsPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const event = EVENTS.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-10">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[500px] w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="container px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border">
              <div className="flex justify-between items-start">
                 <h1 className="text-2xl md:text-4xl font-bold text-primary">{event.title}</h1>
                 <Button variant="ghost" size="icon" className="text-gray-500">
                   <Share2 className="w-5 h-5" />
                 </Button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                تفاصيل الفعالية
              </h2>
              <p className="text-gray-600 leading-relaxed">
                استعد لتجربة لا تُنسى في {event.venue}. هذا الحدث يجمع بين الإثارة والترفيه ليقدم لك أمسية استثنائية. 
                احجز تذاكرك الآن ولا تفوت الفرصة!
              </p>
            </div>
          </div>

          {/* Sidebar / Sticky Bottom on Mobile */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-xl shadow-sm p-6 border sticky top-20 hidden lg:block">
               <div className="text-center mb-6">
                 <p className="text-gray-500 text-sm mb-1">سعر التذكرة يبدأ من</p>
                 <div className="text-3xl font-bold text-primary">
                   {event.price} <span className="text-sm font-normal text-gray-500">{event.currency}</span>
                 </div>
               </div>
               <Button size="lg" className="w-full text-lg font-bold" asChild>
                 <Link href={`/booking/${event.id}`}>
                   احجز الآن
                 </Link>
               </Button>
               <p className="text-xs text-center text-gray-400 mt-4">
                 شامل ضريبة القيمة المضافة
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between lg:hidden z-50">
        <div>
           <p className="text-xs text-gray-500">يبدأ من</p>
           <p className="font-bold text-primary">
             {event.price} {event.currency}
           </p>
        </div>
        <Button size="lg" className="font-bold px-8" asChild>
          <Link href={`/booking/${event.id}`}>
            احجز الآن
          </Link>
        </Button>
      </div>
    </div>
  );
}
