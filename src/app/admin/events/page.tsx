"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Calendar,
    MapPin,
    Eye
} from "lucide-react";
import { EVENTS, Event } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EventsManagement() {
    const { language } = useLanguage();
    const [events, setEvents] = useState<Event[]>(EVENTS);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذه الفعالية؟" : "Are you sure you want to delete this event?")) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة الفعاليات" : "Events Management"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {language === "ar" ? `لديك إجمالي ${events.length} فعالية نشطة.` : `You have a total of ${events.length} active events.`}
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100">
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة فعالية جديدة" : "Add New Event"}
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "البحث بالاسم أو المكان..." : "Search by name or venue..."}
                        className="pl-10 h-12 bg-gray-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button variant="outline" className="h-12 px-4 rounded-2xl gap-2 border-gray-200">
                        <Filter className="h-4 w-4" />
                        {language === "ar" ? "تصفية" : "Filter"}
                    </Button>
                    <Button variant="outline" className="h-12 px-4 rounded-2xl gap-2 border-gray-200">
                        {language === "ar" ? "تصدير" : "Export"}
                    </Button>
                </div>
            </div>

            {/* Events Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50 text-gray-500 font-bold uppercase text-xs">
                                <th className="px-6 py-4">{language === "ar" ? "الفعالية" : "Event"}</th>
                                <th className="px-6 py-4">{language === "ar" ? "التاريخ" : "Date"}</th>
                                <th className="px-6 py-4">{language === "ar" ? "المكان" : "Venue"}</th>
                                <th className="px-6 py-4">{language === "ar" ? "السعر" : "Price"}</th>
                                <th className="px-6 py-4">{language === "ar" ? "الحالة" : "Status"}</th>
                                <th className="px-6 py-4 text-right">{language === "ar" ? "إجراءات" : "Actions"}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={event.image} alt="" className="h-12 w-20 object-cover rounded-xl shadow-sm" />
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 truncate">{event.title}</p>
                                                <p className="text-xs text-gray-500 uppercase">{event.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">{event.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm truncate max-w-[150px]">{event.venue}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {event.price} {event.currency}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.category === 'Sold Out' ? 'bg-red-50 text-red-600' :
                                                event.category === 'Popular' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-green-50 text-green-600'
                                            }`}>
                                            {event.category || (language === 'ar' ? 'نشط' : 'Active')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl border-gray-100">
                                                    <DropdownMenuItem className="gap-2 focus:bg-gray-50 cursor-pointer">
                                                        <Eye className="h-4 w-4" />
                                                        {language === 'ar' ? 'مشاهدة' : 'View'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 focus:bg-gray-50 cursor-pointer">
                                                        <ExternalLink className="h-4 w-4" />
                                                        {language === 'ar' ? 'فتح في الموقع' : 'Open in Site'}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="p-6 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                    <p>{language === 'ar' ? 'عرض 1-10 من 24 فعالية' : 'Showing 1-10 of 24 events'}</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-lg" disabled>{language === 'ar' ? 'السابق' : 'Previous'}</Button>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg">{language === 'ar' ? 'التالي' : 'Next'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
