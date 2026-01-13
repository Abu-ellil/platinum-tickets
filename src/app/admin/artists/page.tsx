"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Users,
    Star,
    MoreVertical,
    X,
    Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

interface Artist {
    _id: string;
    name: {
        ar: string;
        en: string;
    };
    image: string;
}

export default function ArtistsManagement() {
    const { language } = useLanguage();
    const searchParams = useSearchParams();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const res = await fetch('/api/artists?limit=1000');
            const json = await res.json();
            if (json.success) {
                setArtists(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch artists:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredArtists = artists.filter(artist =>
        artist.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.name.ar.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المشهور؟" : "Are you sure you want to delete this artist?")) {
            setArtists(artists.filter(a => a.id !== id));
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة المشاهير" : "Artists Management"}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                        {language === "ar" ? `${artists.length} مشهور مسجل.` : `${artists.length} artists registered.`}
                    </p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 md:h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100 w-full sm:w-auto"
                    onClick={() => setIsAddOpen(true)}
                >
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة مشهور" : "Add Artist"}
                </Button>
            </div>

            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 border-none w-full sm:max-w-md">
                    <div className="flex flex-col h-full bg-white">
                        <SheetHeader className="p-6 border-b flex flex-row items-center justify-between space-y-0">
                            <SheetTitle className="text-xl font-black">{language === 'ar' ? 'إضافة مشهور جديد' : 'Add New Artist'}</SheetTitle>
                            <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative h-32 w-32 group">
                                    <div className="h-full w-full rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group-hover:border-blue-400 group-hover:text-blue-600 transition-all cursor-pointer overflow-hidden">
                                        <Upload className="h-8 w-8" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                                        <Plus className="h-4 w-4" />
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-gray-400">{language === 'ar' ? 'صورة الشخصية' : 'Profile Image'}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</label>
                                    <Input placeholder={language === 'ar' ? 'مثال: عمرو دياب' : 'e.g. Amr Diab'} className="h-12 bg-gray-50 border-none rounded-xl" />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'التخصص / المهنة' : 'Specialty / Job'}</label>
                                    <Input placeholder={language === 'ar' ? 'مثال: مغني' : 'e.g. Singer'} className="h-12 bg-gray-50 border-none rounded-xl" />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}</label>
                                    <div className="space-y-2">
                                        <Input placeholder="Instagram URL" className="h-11 bg-gray-50 border-none rounded-xl text-xs" />
                                        <Input placeholder="Twitter URL" className="h-11 bg-gray-50 border-none rounded-xl text-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50/50">
                            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100" onClick={() => setIsAddOpen(false)}>
                                {language === 'ar' ? 'إضافة المشهور' : 'Save Artist'}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="bg-white p-3 md:p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "ابحث بالاسم..." : "Search..."}
                        className="pl-10 h-11 md:h-12 bg-gray-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredArtists.map((artist) => (
                    <div key={artist._id} className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col items-center">
                        <div className="relative mb-4 md:mb-6 w-20 h-20 md:w-32 md:h-32">
                            <img
                                src={artist.image}
                                alt={language === 'ar' ? artist.name.ar : artist.name.en}
                                className="w-full h-full rounded-full object-cover border-4 border-gray-50 group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-yellow-400 text-white p-1 md:p-2 rounded-full shadow-lg">
                                <Star className="h-3 w-3 md:h-4 md:w-4 fill-white" />
                            </div>
                        </div>

                        <div className="text-center w-full min-w-0">
                            <h3 className="text-sm md:text-xl font-bold text-gray-900 truncate leading-tight">{language === 'ar' ? artist.name.ar : artist.name.en}</h3>
                            <p className="text-[10px] md:text-sm text-gray-400 mt-1">ID: #{artist._id}</p>
                        </div>

                        <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 w-full">
                            <Button variant="outline" size="sm" className="flex-1 h-9 md:h-10 rounded-xl gap-2 hover:bg-blue-50 hover:text-blue-600 border-gray-100 p-0 md:px-4">
                                <Edit2 className="h-3.5 w-3.5" />
                                <span className="hidden md:inline">{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 w-9 md:h-10 md:w-10 rounded-xl hover:bg-red-50 hover:text-red-600 border-gray-100 p-0 shrink-0"
                                onClick={() => handleDelete(artist._id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Add Card Placeholder */}
                <button
                    className="bg-gray-50 border-2 border-dashed border-gray-200 p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all gap-3 md:gap-4 min-h-[180px] md:min-h-[250px]"
                    onClick={() => setIsAddOpen(true)}
                >
                    <div className="h-10 w-10 md:h-16 md:w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Plus className="h-5 w-5 md:h-8 md:w-8" />
                    </div>
                    <span className="font-bold text-xs md:text-base">{language === 'ar' ? 'إضافة مشهور' : 'Add Artist'}</span>
                </button>
            </div>
        </div>
    );
}
