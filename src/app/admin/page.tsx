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
    ArrowDownRight
} from "lucide-react";
import { EVENTS, ARTISTS, VENUES } from "@/lib/data";

export default function AdminDashboard() {
    const { language } = useLanguage();

    const stats = [
        {
            label: language === "ar" ? "إجمالي الفعاليات" : "Total Events",
            value: EVENTS.length,
            change: "+12%",
            trend: "up",
            icon: Calendar,
            color: "blue"
        },
        {
            label: language === "ar" ? "إجمالي المدن" : "Total Cities",
            value: VENUES.length,
            change: "+3%",
            trend: "up",
            icon: MapPin,
            color: "purple"
        },
        {
            label: language === "ar" ? "إجمالي المشاهير" : "Total Artists",
            value: ARTISTS.length,
            change: "+5%",
            trend: "up",
            icon: Star,
            color: "orange"
        },
        {
            label: language === "ar" ? "التذاكر المباعة" : "Tickets Sold",
            value: "1,284",
            change: "-2%",
            trend: "down",
            icon: Ticket,
            color: "green"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900">
                    {language === "ar" ? "نظرة عامة" : "Dashboard Overview"}
                </h1>
                <p className="text-gray-500 mt-2">
                    {language === "ar" ? "مرحباً بك مجدداً، إليك ما يحدث في موقعك اليوم." : "Welcome back, here's what's happening on your site today."}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            </div>
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm">{stat.label}</h3>
                        <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Events */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            {language === "ar" ? "آخر الفعاليات المضافة" : "Recently Added Events"}
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {EVENTS.slice(0, 5).map((event) => (
                            <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <img src={event.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate">{event.title}</p>
                                    <p className="text-sm text-gray-500">{event.date} • {event.venue}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600">{event.price} {event.currency}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Stats or something else */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                    <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                        <TrendingUp className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{language === "ar" ? "نمو المبيعات" : "Sales Growth"}</h2>
                    <p className="text-gray-500 mt-2 max-w-sm">
                        {language === "ar" ? "قمت بزيادة مبيعاتك بنسبة 25٪ مقارنة بالشهر الماضي. استمر في هذا العمل الرائع!" : "You've increased your sales by 25% compared to last month. Keep up the great work!"}
                    </p>
                    <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        {language === "ar" ? "عرض التقارير الكاملة" : "View Full Reports"}
                    </button>
                </div>
            </div>
        </div>
    );
}
