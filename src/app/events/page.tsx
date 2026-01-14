"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Event } from "@/lib/types";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events?limit=1000');
      const json = await res.json();
      if (json.success) {
        setEvents(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">جميع الفعاليات</h1>
          <p className="text-gray-500 mt-1">{events.length} فعاليات متوفرة</p>
        </div>
        
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          تصفية النتائج
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
