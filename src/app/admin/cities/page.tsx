"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    MapPin,
    Edit2,
    Trash2,
    Building2,
    Calendar
} from "lucide-react";
import { VENUES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CitiesManagement() {
    const { language } = useLanguage();
    const [cities, setCities] = useState(VENUES);
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذه المدينة/المكان؟" : "Are you sure you want to delete this city/venue?")) {
            setCities(cities.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة المدن والأماكن" : "Cities & Venues Management"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {language === "ar" ? `لديك ${cities.length} موقع مسجل.` : `You have ${cities.length} registered locations.`}
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100">
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة مدينة جديدة" : "Add New City"}
                </Button>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "البحث بالاسم..." : "Search by name..."}
                        className="pl-10 h-12 bg-gray-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((venue) => (
                    <div key={venue.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 overflow-hidden">
                            <img src={venue.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold text-white uppercase">{venue.city}</h3>
                                <p className="text-white/80 text-sm flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {venue.name}
                                </p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Building2 className="h-4 w-4" />
                                    <span>{language === 'ar' ? '12 فعالية نشطة' : '12 Active Events'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>{language === 'ar' ? 'يومياً' : 'Daily'}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 h-11 rounded-xl border-gray-100 hover:bg-blue-50 hover:text-blue-600 gap-2 font-bold">
                                    <Edit2 className="h-4 w-4" />
                                    {language === 'ar' ? 'تعديل' : 'Edit'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-11 w-11 rounded-xl border-gray-100 hover:bg-red-50 hover:text-red-600 p-0"
                                    onClick={() => handleDelete(venue.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
