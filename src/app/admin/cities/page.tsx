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
    Calendar,
    X,
    Upload,
    Globe
} from "lucide-react";
import { VENUES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

export default function CitiesManagement() {
    const { language } = useLanguage();
    const [cities, setCities] = useState(VENUES);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);

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
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة المدن والأماكن" : "Cities & Venues Management"}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                        {language === "ar" ? `لديك ${cities.length} موقع مسجل.` : `You have ${cities.length} registered locations.`}
                    </p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 md:h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100 w-full sm:w-auto"
                    onClick={() => setIsAddOpen(true)}
                >
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة مدينة" : "Add City"}
                </Button>
            </div>

            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 border-none w-full sm:max-w-md">
                    <div className="flex flex-col h-full bg-white">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-black">{language === 'ar' ? 'إضافة مدينة / مكان' : 'Add City / Venue'}</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'صورة المكان' : 'Venue Image'}</label>
                                <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer">
                                    <Upload className="h-8 w-8 mb-2" />
                                    <span className="text-xs font-bold">{language === 'ar' ? 'رفع صورة بجودة عالية' : 'Upload HD image'}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم المكان' : 'Venue Name'}</label>
                                    <Input placeholder={language === 'ar' ? 'مثال: أرينا كوكا كولا' : 'e.g. Coca-Cola Arena'} className="h-12 bg-gray-50 border-none rounded-xl" />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'المدينة' : 'City'}</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input placeholder={language === 'ar' ? 'مثال: دبي' : 'e.g. Dubai'} className="h-12 bg-gray-50 border-none rounded-xl pl-10" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'الموقع الجغرافي (Google Maps)' : 'Location Link'}</label>
                                    <Input placeholder="https://maps.google.com/..." className="h-12 bg-gray-50 border-none rounded-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50/50">
                            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100" onClick={() => setIsAddOpen(false)}>
                                {language === 'ar' ? 'حفظ البيانات' : 'Save Details'}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="bg-white p-3 md:p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "البحث بالاسم..." : "Search..."}
                        className="pl-10 h-11 md:h-12 bg-gray-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((venue) => (
                    <div key={venue.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-40 md:h-48 overflow-hidden">
                            <img src={venue.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-right">
                                <h3 className="text-lg md:text-xl font-bold text-white uppercase">{venue.city}</h3>
                                <p className="text-white/80 text-xs md:text-sm flex items-center justify-end gap-1">
                                    {venue.name}
                                    <MapPin className="h-3 w-3" />
                                </p>
                            </div>
                        </div>
                        <div className="p-4 md:p-6">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                                    <Building2 className="h-4 w-4" />
                                    <span>{language === 'ar' ? '12 فعالية' : '12 Events'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>{language === 'ar' ? 'نشط' : 'Active'}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 h-10 md:h-11 rounded-xl border-gray-100 hover:bg-blue-50 hover:text-blue-600 gap-2 font-bold text-xs md:text-sm">
                                    <Edit2 className="h-4 w-4" />
                                    {language === 'ar' ? 'تعديل' : 'Edit'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-10 w-10 md:h-11 md:w-11 rounded-xl border-gray-100 hover:bg-red-50 hover:text-red-600 p-0"
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
