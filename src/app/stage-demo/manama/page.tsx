"use client";

import { useState, useCallback } from "react";
import { PlatinumStageMap } from "@/components/platinum-stage-map";
import { PLATINUM_STAGE, STAGE_CATEGORIES } from "@/lib/platinum-stage-data";
import { Seat } from "@/lib/types";

export default function ManamaStagePage() {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleSeatSelect = useCallback((seat: Seat) => {
        setSelectedSeats(prev => {
            if (prev.includes(seat.id)) {
                return prev.filter(id => id !== seat.id);
            }
            return [...prev, seat.id];
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <div className="px-6 py-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    حفل الفنان ماجد المهندس
                </h1>
                <p className="text-slate-300 text-sm">
                    مسرح بيون الدانة • الخميس 22 يناير 2026
                </p>
            </div>

            {/* Stage Map Container */}
            <div className="max-w-5xl mx-auto px-4 pb-8">
                <PlatinumStageMap
                    theater={PLATINUM_STAGE}
                    categories={STAGE_CATEGORIES}
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelect}
                />
            </div>

            {/* Instructions */}
            <div className="max-w-2xl mx-auto px-6 pb-12 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                    <h2 className="text-lg font-semibold mb-3">كيفية الاستخدام</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
                        <div className="p-3 bg-white/5 rounded-lg">
                            <span className="text-2xl mb-2 block">👆</span>
                            اضغط على أي منطقة للتكبير
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg">
                            <span className="text-2xl mb-2 block">🎫</span>
                            اختر المقاعد المتاحة
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg">
                            <span className="text-2xl mb-2 block">🔍</span>
                            استخدم أزرار +/- للتحكم
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
