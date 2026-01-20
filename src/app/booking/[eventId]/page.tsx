"use client";

import { useState, useMemo, useEffect, use } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TheaterLayout from "./TheaterLayout";
import PaymentForm from "./PaymentForm";
import { useLanguage } from "@/lib/language-context";
import { useCity } from "@/lib/city-context";
import { Event } from "@/lib/types";

export default function BookingPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const { language, dir } = useLanguage();
  const { selectedCity } = useCity();
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

  if (loading || !event) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const displayCurrency = event.currency || "SAR";

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
