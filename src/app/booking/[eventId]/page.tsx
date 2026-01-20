"use client";

import { useState, useMemo, useEffect, use } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TheaterLayout from "./TheaterLayout";
import PaymentForm from "./PaymentForm";
import { useLanguage } from "@/lib/language-context";
import { useCity } from "@/lib/city-context";
import { Event } from "@/lib/types";

export default function BookingPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const { language, dir } = useLanguage();
  const { currencySymbol, selectedCity } = useCity();
  const [selectedSeats, setSelectedSeats] = useState<{
    sectionId: number;
    rowName: string;
    seatNumber: number;
    price: number;
    sectionName: string;
  }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        const data = await res.json();
        if (data.success) {
          setEvent(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/events/${params.eventId}`}>
              <ChevronRight className="w-6 h-6" />
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-sm md:text-base line-clamp-1">{event.title}</h1>
            <p className="text-xs text-gray-500">{event.venue} • {event.date}</p>
          </div>
        </div>
      </header>

      {/* Main Content - Seat Map */}
      <main className="flex-1 relative bg-gray-100 touch-none">
        <PlatinumStageMap
          theater={theater}
          categories={categories}
          selectedSeats={selectedSeatIds}
          onSeatSelect={toggleSeat}
        />
      </main>

      {/* Footer Summary */}
      <div className="bg-white border-t p-4 pb-8 shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
        <div className="container max-w-lg mx-auto">
          {selectedSeatIds.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-500 text-sm mb-1">المحدد: {selectedSeatIds.length} تذاكر</p>
                  <p className="text-2xl font-bold text-primary">
                    {totalAmount} <span className="text-sm font-normal text-gray-400">SAR</span>
                  </p>
                </div>
                {/* Selected Seats Mini List */}
                <div className="flex gap-2 text-xs">
                  {selectedSeatIds.slice(0, 3).map(id => {
                    const s = findSeatInTheater(theater, id);
                    return (
                      <div key={id} className="bg-gray-100 px-2 py-1 rounded text-gray-600 border">
                        {s?.label}
                      </div>
                    )
                  })}
                  {selectedSeatIds.length > 3 && <span className="self-center">...</span>}
                </div>
              </div>

              <Button size="lg" className="w-full text-lg font-bold">
                متابعة للدفع
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-2">
              الرجاء تحديد المقاعد للمتابعة
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!showSummary) {
    return (
      <TheaterLayout
        title={event.title}
        subtitle={`${(event.venueId && typeof event.venueId === 'object' && 'name' in event.venueId) ? event.venueId.name[language as keyof typeof event.venueId.name] : (event.venueName || "")} • ${event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : ''}`}
        currency={displayCurrency}
        pricing={event.pricing}
        onContinue={(seats) => {
          setSelectedSeats(seats.map(s => ({
            sectionId: Number(s.sectionId),
            rowName: s.rowName,
            seatNumber: Number(s.seatNumber),
            price: s.price,
            sectionName: s.sectionName
          })));
          setShowSummary(true);
        }}
      />
    );
  }

  return (
    <PaymentForm
      event={event}
      selectedSeats={selectedSeats}
      onBack={() => setShowSummary(false)}
      totalAmount={totalAmount}
    />
  );
}
