import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { EVENTS } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">جميع الفعاليات</h1>
          <p className="text-gray-500 mt-1">{EVENTS.length} فعاليات متوفرة</p>
        </div>
        
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          تصفية النتائج
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
