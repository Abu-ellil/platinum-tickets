"use client";

import { useLanguage } from "@/lib/language-context";
import {
    Users,
    Calendar,
    Ticket,
    TrendingUp,
    MapPin,
    Star,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from "lucide-react";
import { EVENTS, ARTISTS, VENUES } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const { language } = useLanguage();

    const stats = [
        {
            label: language === "ar" ? "الفعاليات" : "Events",
            value: EVENTS.length,
            change: "+12%",
            trend: "up",
            icon: Calendar,
            color: "blue"
        },
        {
            label: language === "ar" ? "المدن" : "Cities",
            value: VENUES.length,
            change: "+3%",
            trend: "up",
            icon: MapPin,
            color: "purple"
        },
        {
            label: language === "ar" ? "المشاهير" : "Artists",
            value: ARTISTS.length,
            change: "+5%",
            trend: "up",
            icon: Star,
            color: "orange"
        },
        {
            label: language === "ar" ? "المبيعات" : "Sales",
            value: "1.2k",
            change: "-2%",
            trend: "down",
            icon: Ticket,
            color: "green"
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                    {language === "ar" ? "نظرة عامة" : "Dashboard Overview"}
                </h1>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                    {language === "ar" ? "مرحباً بك، إليك ملخص اليوم." : "Welcome back, here's your summary."}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                            <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="h-4 w-4 md:h-6 md:w-6" />
                            </div>
                            <div className={`flex items-center gap-0.5 text-[10px] md:text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" /> : <ArrowDownRight className="h-3 w-3 md:h-4 md:w-4" />}
                            </div>
                        </div>
                        <h3 className="text-gray-500 font-medium text-[10px] md:text-sm uppercase tracking-wider">{stat.label}</h3>
                        <p className="text-lg md:text-2xl font-black text-gray-900 mt-0.5">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Recent Events */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 md:p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            {language === "ar" ? "الفعاليات المضافة" : "Recent Events"}
                        </h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="divide-y divide-gray-50 flex-1">
                        {EVENTS.slice(0, 4).map((event) => (
                            <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <img src={event.image} alt="" className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate text-sm md:text-base">{event.title}</p>
                                    <p className="text-[10px] md:text-xs text-gray-400 truncate uppercase mt-0.5">{event.venue}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600 text-sm">{event.price} <span className="text-[10px] uppercase">{event.currency}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50/50">
                        <Button variant="ghost" className="w-full text-xs font-bold text-gray-500 hover:text-blue-600">
                            {language === 'ar' ? 'عرض الكل' : 'View All'}
                        </Button>
                    </div>
                </div>

                {/* Growth Stats */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 md:h-20 md:w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                        <TrendingUp className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                        {language === "ar" ? "نمو ملحوظ في المبيعات" : "Significant Sales Growth"}
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-2 max-w-[280px] md:max-w-sm">
                        {language === "ar" ? "زادت مبيعاتك بنسبة 25٪ هذا الشهر. أداء ممتاز!" : "Sales increased by 25% this month. Great performance!"}
                    </p>
                    <button className="mt-8 w-full md:w-auto px-10 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-sm">
                        {language === "ar" ? "التقارير المفصلة" : "Detailed Reports"}
                    </button>
                </div>
            </div>
        </div>
    );
}
