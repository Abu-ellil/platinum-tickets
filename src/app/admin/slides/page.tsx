"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    ImageIcon,
    Edit2,
    Trash2,
    MoveUp,
    MoveDown,
    Eye,
    CheckCircle2,
    X,
    Upload,
    Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Slide {
    _id: string;
    title: { ar: string; en: string };
    image: string;
    active: boolean;
    link?: string;
}

export default function SlidesManagement() {
    const { language } = useLanguage();
    const searchParams = useSearchParams();
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch('/api/slides');
            const json = await res.json();
            if (json.success) {
                setSlides(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch slides:", error);
        } finally {
            setLoading(false);
        }
    };
    const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");

    const handleDelete = async (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذا السلايد؟" : "Are you sure you want to delete this slide?")) {
            try {
                const res = await fetch(`/api/slides/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setSlides(slides.filter(s => s._id !== id));
                }
            } catch (error) {
                console.error("Failed to delete slide:", error);
            }
        }
    };

    const toggleActive = async (id: string) => {
        try {
            const res = await fetch(`/api/slides/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: !slides.find(s => s._id === id)?.active })
            });
            if (res.ok) {
                setSlides(slides.map(s => s._id === id ? { ...s, active: !s.active } : s));
            }
        } catch (error) {
            console.error("Failed to update slide:", error);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة سلايدز العرض" : "Slides Management"}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                        {language === "ar" ? "تحكم في الصور والنصوص المعروضة." : "Control the images and content."}
                    </p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 md:h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100 w-full sm:w-auto"
                    onClick={() => setIsAddOpen(true)}
                >
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة سلايد" : "Add Slide"}
                </Button>
            </div>

            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 border-none w-full sm:max-w-md">
                    <div className="flex flex-col h-full bg-white">
                        <SheetHeader className="p-6 border-b flex flex-row items-center justify-between space-y-0">
                            <SheetTitle className="text-xl font-black">{language === 'ar' ? 'إضافة سلايد جديد' : 'Add New Slide'}</SheetTitle>
                            <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">{language === 'ar' ? 'صورة السلايد (عرضي)' : 'Slide Image (Landscape)'}</label>
                                <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer">
                                    <Upload className="h-8 w-8 mb-2" />
                                    <span className="text-xs font-bold">1920 x 1080 px</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'العنوان الرئيسي' : 'Main Title'}</label>
                                    <Input placeholder={language === 'ar' ? 'مثال: خصم 20% على حفلات الصيف' : 'e.g. 20% OFF Summer Concerts'} className="h-12 bg-gray-50 border-none rounded-xl" />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'رابط التوجيه' : 'Action Link'}</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input placeholder="https://..." className="h-12 bg-gray-50 border-none rounded-xl pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50/50">
                            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100" onClick={() => setIsAddOpen(false)}>
                                {language === 'ar' ? 'نشر السلايد' : 'Publish Slide'}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
</div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-500">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {slides.map((slide, index) => (
                    <div key={slide._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row p-3 md:p-4 gap-4 md:gap-6 group">
                        <div className="relative w-full lg:w-80 h-40 md:h-48 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                            <img src={slide.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm ${slide.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                                    }`}>
                                    {slide.active ? (
                                        <>
                                            <CheckCircle2 className="h-3 w-3" />
                                            {language === 'ar' ? 'نشط' : 'Active'}
                                        </>
                                    ) : (
                                        language === 'ar' ? 'غير نشط' : 'Inactive'
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg md:text-2xl font-black text-gray-900 truncate pr-2">{slide.title[language]}</h3>
                                    <span className="text-xl md:text-2xl font-black text-gray-100">#0{index + 1}</span>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg font-bold">
                                        <ImageIcon className="h-3 w-3" />
                                        1920x1080
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg font-bold">
                                        <Eye className="h-3 w-3" />
                                        1.2k
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={cn(
                                            "flex-1 sm:flex-none h-9 md:h-11 px-4 rounded-xl gap-2 font-bold transition-all text-xs",
                                            slide.active ? "text-orange-600 border-orange-100 hover:bg-orange-50" : "text-green-600 border-green-100 hover:bg-green-50"
                                        )}
                                        onClick={() => toggleActive(slide._id)}
                                    >
                                        {slide.active ? (language === 'ar' ? 'إيقاف' : 'Stop') : (language === 'ar' ? 'تفعيل' : 'Start')}
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-9 md:h-11 px-4 rounded-xl border-gray-100 hover:bg-blue-50 hover:text-blue-600 gap-2 font-bold text-xs">
                                        <Edit2 className="h-4 w-4" />
                                        {language === 'ar' ? 'تعديل' : 'Edit'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-9 w-9 md:h-11 md:w-11 rounded-xl border-gray-100 hover:bg-red-50 hover:text-red-600 p-0 shrink-0"
                                        onClick={() => handleDelete(slide._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex gap-2 justify-end">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-300 hover:bg-gray-100 rounded-xl" disabled={index === 0}>
                                        <MoveUp className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-300 hover:bg-gray-100 rounded-xl" disabled={index === slides.length - 1}>
                                        <MoveDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}
