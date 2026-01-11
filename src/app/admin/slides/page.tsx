"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    Image as ImageIcon,
    Edit2,
    Trash2,
    MoveUp,
    MoveDown,
    Eye,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_SLIDES = [
    { id: "1", title: "مهرجان الموسيقى العربية", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200", active: true },
    { id: "2", title: "مغامرات الربع الخالي", image: "https://images.unsplash.com/photo-1547234935-80c7142ee969?w=1200", active: true },
    { id: "3", title: "عروض كوميدية في دبي", image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200", active: false },
];

export default function SlidesManagement() {
    const { language } = useLanguage();
    const [slides, setSlides] = useState(MOCK_SLIDES);

    const handleDelete = (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذا السلايد؟" : "Are you sure you want to delete this slide?")) {
            setSlides(slides.filter(s => s.id !== id));
        }
    };

    const toggleActive = (id: string) => {
        setSlides(slides.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة سلايدز العرض" : "Slides Management"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {language === "ar" ? "تحكم في الصور والنصوص المعروضة في الصفحة الرئيسية." : "Control the images and text displayed on the home page."}
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100">
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة سلايد جديد" : "Add New Slide"}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row p-4 gap-6 group">
                        <div className="relative w-full md:w-80 h-48 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                            <img src={slide.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${slide.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
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

                        <div className="flex-1 flex flex-col justify-between py-2">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-gray-900">{slide.title}</h3>
                                    <div className="flex items-center gap-1 font-bold text-gray-400">
                                        <span className="text-2xl">#0{index + 1}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                                        <ImageIcon className="h-4 w-4" />
                                        1920x1080px
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                                        <Eye className="h-4 w-4" />
                                        1.2k {language === 'ar' ? 'مشاهدة' : 'Views'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "h-11 px-4 rounded-xl gap-2 font-bold transition-all",
                                            slide.active ? "text-orange-600 border-orange-100 hover:bg-orange-50" : "text-green-600 border-green-100 hover:bg-green-50"
                                        )}
                                        onClick={() => toggleActive(slide.id)}
                                    >
                                        {slide.active ? (language === 'ar' ? 'إيقاف التفعيل' : 'Deactivate') : (language === 'ar' ? 'تفعيل' : 'Activate')}
                                    </Button>
                                    <Button variant="outline" className="h-11 px-4 rounded-xl border-gray-100 hover:bg-blue-50 hover:text-blue-600 gap-2 font-bold">
                                        <Edit2 className="h-4 w-4" />
                                        {language === 'ar' ? 'تعديل' : 'Edit'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-11 w-11 rounded-xl border-gray-100 hover:bg-red-50 hover:text-red-600 p-0"
                                        onClick={() => handleDelete(slide.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:bg-gray-100 rounded-xl" disabled={index === 0}>
                                        <MoveUp className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:bg-gray-100 rounded-xl" disabled={index === slides.length - 1}>
                                        <MoveDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helper to avoid build error
import { cn } from "@/lib/utils";
