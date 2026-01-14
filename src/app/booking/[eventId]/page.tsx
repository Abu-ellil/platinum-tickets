"use client";

import { useState, useMemo, useEffect, use } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TheaterLayout from "./TheaterLayout";
import { useLanguage } from "@/lib/language-context";

export default function BookingPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const { language, dir } = useLanguage();
  const [selectedSeats, setSelectedSeats] = useState<{
    sectionId: number;
    rowName: string;
    seatNumber: number;
    price: number;
    sectionName: string;
  }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
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

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

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

  if (!showSummary) {
    return (
      <TheaterLayout
        title={event.title}
        subtitle={`${event.venueId?.name?.[language] || event.venueName} • ${event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : ''}`}
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
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden" dir={dir}>
      {/* Header */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowSummary(false)}>
            {language === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
          </Button>
          <div>
            <h1 className="font-bold text-sm md:text-base line-clamp-1">{event.title}</h1>
            <p className="text-xs text-gray-500">
              {language === 'ar' ? 'ملخص الحجز' : 'Booking Summary'}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Summary */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-lg mx-auto space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
            <h2 className="font-bold text-lg border-b pb-2">
              {language === 'ar' ? 'المقاعد المختارة' : 'Selected Seats'}
            </h2>
            <div className="space-y-3">
              {selectedSeats.map(seat => (
                  <div key={`${seat.sectionId}-${seat.rowName}-${seat.seatNumber}`} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">
                        {language === 'ar' ? 'مقعد' : 'Seat'} {seat.seatNumber} - {language === 'ar' ? 'صف' : 'Row'} {seat.rowName}
                      </p>
                      <p className="text-sm text-gray-500">{seat.sectionName}</p>
                    </div>
                    <p className="font-bold text-primary">
                      {seat.price?.toLocaleString() || '0'} <span className="text-xs font-normal">{event.currency || 'SAR'}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
            <h2 className="font-bold text-lg border-b pb-2">
              {language === 'ar' ? 'تفاصيل السداد' : 'Payment Details'}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span>{totalAmount.toLocaleString()} {event.currency || 'SAR'}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{language === 'ar' ? 'رسوم الخدمة' : 'Service Fee'}</span>
                <span>0 {event.currency || 'SAR'}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                <span className="text-primary">{totalAmount.toLocaleString()} {event.currency || 'SAR'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Final Action */}
      <div className="bg-white border-t p-4 pb-8 shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
        <div className="container max-w-lg mx-auto">
          <Button size="lg" className="w-full text-lg font-bold">
            {language === 'ar' ? 'تأكيد الدفع' : 'Confirm Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
}
