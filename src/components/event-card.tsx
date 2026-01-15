import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCity } from "@/lib/city-context";
import { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { language } = useLanguage();
  const { currencySymbol, selectedCity } = useCity();
  
  const title = event.title || '';
  const venueName = (event.venueId && typeof event.venueId === 'object' && 'name' in event.venueId)
    ? (language === 'ar' ? event.venueId.name.ar : event.venueId.name.en) 
    : event.venueName || '';
  const cityName = (event.cityId && typeof event.cityId === 'object' && 'name' in event.cityId) ? (language === 'ar' ? event.cityId.name.ar : event.cityId.name.en) : '';
  const price = event.pricing && event.pricing.length > 0 ? Math.min(...event.pricing.map(p => p.price)) : 0;
  const rating = event.rating || 4.8;
  const badgeText = event.statusBadge || null;
  const showDate = event.showTimes && event.showTimes.length > 0 ? new Date(event.showTimes[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  const displayCurrency = event.currency || selectedCity?.currency || "SAR";
  const displayCurrencySymbol = event.currency || currencySymbol;

  return (
    <Link href={`/events/${event._id}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg h-full flex flex-col">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={event.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {badgeText && (
            <div className="absolute top-3 right-3">
              <Badge
                variant={event.status === 'soldOut' ? 'destructive' : 'default'}
                className="shadow-sm"
              >
                {badgeText}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{showDate} • {venueName || cityName}</p>
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-base md:text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {title}
          </h3>

          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">
                  {price} <span className="text-xs font-normal text-gray-400">{displayCurrencySymbol}</span>
                </span>
                {event.originalPrice && event.originalPrice > price && (
                  <span className="text-xs text-gray-400 line-through">
                    {event.originalPrice} {displayCurrencySymbol}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-red-600 mt-1">
                {event.status === 'soldOut' ? (
                  language === 'ar' ? 'نفذت الكمية' : 'Sold Out'
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
