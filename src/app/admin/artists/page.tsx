"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Users,
    Star,
    MoreVertical
} from "lucide-react";
import { ARTISTS, Artist } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ArtistsManagement() {
    const { language } = useLanguage();
    const [artists, setArtists] = useState<Artist[]>(ARTISTS);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المشهور؟" : "Are you sure you want to delete this artist?")) {
            setArtists(artists.filter(a => a.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة المشاهير" : "Artists Management"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {language === "ar" ? `لديك إجمالي ${artists.length} مشهور مسجل.` : `You have a total of ${artists.length} registered artists.`}
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100">
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة مشهور جديد" : "Add New Artist"}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtists.map((artist) => (
                    <div key={artist.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <div className="relative mb-6 mx-auto w-32 h-32">
                            <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-full h-full rounded-full object-cover border-4 border-gray-50 group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                                <Star className="h-4 w-4 fill-white" />
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900">{artist.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">ID: #{artist.id}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2">
                            <Button variant="outline" size="sm" className="flex-1 h-10 rounded-xl gap-2 hover:bg-blue-50 hover:text-blue-600 border-gray-100">
                                <Edit2 className="h-4 w-4" />
                                {language === 'ar' ? 'تعديل' : 'Edit'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600 border-gray-100 p-0"
                                onClick={() => handleDelete(artist.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Add Card Placeholder */}
                <button className="bg-gray-50 border-2 border-dashed border-gray-200 p-6 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all gap-4 min-h-[250px]">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Plus className="h-8 w-8" />
                    </div>
                    <span className="font-bold">{language === 'ar' ? 'إضافة مشهور جديد' : 'Add New Artist'}</span>
                </button>
            </div>
        </div>
    );
}
