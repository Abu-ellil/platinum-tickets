import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@/lib/data";
import { Calendar, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { language } = useLanguage();
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg h-full flex flex-col">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Badge Overlay */}
          {event.category && (
            <div className="absolute top-3 right-3">
              <Badge
                variant={event.category === 'Sold Out' ? 'destructive' : 'default'}
                className="shadow-sm"
              >
                {event.category === 'New' ? 'جديد' : event.category === 'Sold Out' ? 'نفذت الكمية' : 'مميز'}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{event.date} • {event.venue}</p>
            {/* Rating */}
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>

          <h3 className="font-bold text-base md:text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {event.title}
          </h3>

          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">
                  {event.price} <span className="text-xs font-normal text-gray-400">{event.currency}</span>
                </span>
                {/* Mock original price for visual demo if not present */}
                <span className="text-xs text-gray-400 line-through">
                  {Math.round(event.price * 1.2)} {event.currency}
                </span>
              </div>
              {/* Status Badge from Platinumlist */}
              <span className="text-[10px] font-bold text-red-600 mt-1">
                {event.category === 'Popular' ? (
                  language === 'ar' ? 'يُباع سريعًا' : 'Selling Fast'
                ) : (
                  language === 'ar' ? 'متوفر الآن' : 'Available Now'
                )}
              </span>
            </div>
            {event.type === 'adventure' && (
              <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-medium">مغامرة</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
