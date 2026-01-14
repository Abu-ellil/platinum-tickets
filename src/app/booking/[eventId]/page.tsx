"use client";

import { useState, useMemo, useCallback, useEffect, use } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatinumStageMap } from "@/components/platinum-stage-map";
import { getTheaterConfig } from "@/lib/theater-data";
import { Seat, Theater } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";

// Helper to find seat price/details by ID
const findSeatInTheater = (theater: Theater, seatId: string) => {
  for (const section of theater.sections) {
    for (const row of section.rows) {
      const seat = row.seats.find(s => s.id === seatId);
      if (seat) return seat;
    }
  }
  return null;
};

export default function BookingPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const { language, dir } = useLanguage();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [event, setEvent] = useState<any>(null);
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

  const { theater, categories } = useMemo(() => {
    if (!event) return getTheaterConfig(eventId);
    return getTheaterConfig(eventId, event.pricing);
  }, [eventId, event]);

  const toggleSeat = useCallback((seat: Seat) => {
    if (seat.status !== 'available') return;

    setSelectedSeatIds(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(id => id !== seat.id);
      } else {
        return [...prev, seat.id];
      }
    });
  }, []);

  const totalAmount = useMemo(() => {
    return selectedSeatIds.reduce((sum, id) => {
      const seat = findSeatInTheater(theater, id);
      return sum + (seat?.price || 0);
    }, 0);
  }, [selectedSeatIds, theater]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p className="text-gray-500">{language === 'ar' ? 'لم يتم العثور على الفعالية' : 'Event not found'}</p>
        <Button asChild>
          <Link href="/">{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/events/${eventId}`}>
              {language === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-sm md:text-base line-clamp-1">{event.title}</h1>
            <p className="text-xs text-gray-500">
              {event.venueId?.name?.[language] || event.venueName} • {event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : ''}
            </p>
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
                  <p className="text-gray-500 text-sm mb-1">
                    {language === 'ar' ? `المحدد: ${selectedSeatIds.length} تذاكر` : `Selected: ${selectedSeatIds.length} tickets`}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {totalAmount.toLocaleString()} <span className="text-sm font-normal text-gray-400">{event.currency || 'SAR'}</span>
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
                {language === 'ar' ? 'متابعة للدفع' : 'Continue to Payment'}
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-2">
              {language === 'ar' ? 'الرجاء تحديد المقاعد للمتابعة' : 'Please select seats to continue'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
