"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    MoreHorizontal,
    PlusCircle,
    Image as ImageIcon,
    LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const { language } = useLanguage();
    const [events, setEvents] = useState<any[]>([]);
    const [artists, setArtists] = useState<any[]>([]);
    const [venues, setVenues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, artistsRes, venuesRes] = await Promise.all([
                    fetch('/api/events?limit=1000'),
                    fetch('/api/artists?limit=1000'),
                    fetch('/api/venues?limit=1000'),
                ]);
                
                const [eventsJson, artistsJson, venuesJson] = await Promise.all([
                    eventsRes.json(),
                    artistsRes.json(),
                    venuesRes.json(),
                ]);

                if (eventsJson.success) setEvents(eventsJson.data);
                if (artistsJson.success) setArtists(artistsJson.data);
                if (venuesJson.success) setVenues(venuesJson.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stats = [
        {
            label: language === "ar" ? "الفعاليات" : "Events",
            value: events.length,
            change: "+12%",
            trend: "up",
            icon: Calendar,
            color: "blue"
        },
        {
            label: language === "ar" ? "الأماكن" : "Venues",
            value: venues.length,
            change: "+3%",
            trend: "up",
            icon: MapPin,
            color: "purple"
        },
        {
            label: language === "ar" ? "المشاهير" : "Artists",
            value: artists.length,
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

    const quickActions = [
        {
            label: language === "ar" ? "إضافة حفلة" : "Add Event",
            icon: Calendar,
            href: "/admin/events?add=true",
            color: "bg-blue-600",
            hoverColor: "hover:bg-blue-700",
            description: language === "ar" ? "إنشاء فعالية أو حفلة جديدة" : "Create a new event or concert"
        },
        {
            label: language === "ar" ? "إضافة مشهور" : "Add Artist",
            icon: Star,
            href: "/admin/artists?add=true",
            color: "bg-orange-500",
            hoverColor: "hover:bg-orange-600",
            description: language === "ar" ? "إضافة فنان أو شخصية مشهورة" : "Add a new artist or celebrity"
        },
        {
            label: language === "ar" ? "إضافة مدينة/مكان" : "Add City/Venue",
            icon: MapPin,
            href: "/admin/cities?add=true",
            color: "bg-purple-600",
            hoverColor: "hover:bg-purple-700",
            description: language === "ar" ? "إضافة مدينة أو موقع فعاليات" : "Add a city or event venue"
        },
        {
            label: language === "ar" ? "إضافة سلايد" : "Add Slide",
            icon: ImageIcon,
            href: "/admin/slides?add=true",
            color: "bg-green-600",
            hoverColor: "hover:bg-green-700",
            description: language === "ar" ? "إضافة صورة للواجهة الرئيسية" : "Add a slide to the home hero"
        }
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 flex items-center gap-4">
                        <LayoutDashboard className="h-10 w-10 text-blue-600" />
                        {language === "ar" ? "لوحة التحكم" : "Admin Dashboard"}
                    </h1>
                    <p className="text-base md:text-lg text-gray-500 mt-3 font-medium">
                        {language === "ar" ? "مرحباً بك، ابدأ بإضافة المحتوى أو متابعة الإحصائيات." : "Welcome back, start adding content or track your stats."}
                    </p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                {quickActions.map((action, index) => (
                    <Link key={index} href={action.href} className="group">
                        <div className="bg-white border-2 border-gray-100 p-8 rounded-[2.5rem] hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 h-full relative overflow-hidden flex flex-col">
                            <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                                <action.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3">{action.label}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-6 flex-1">{action.description}</p>
                            <div className="flex items-center text-blue-600 font-black text-sm uppercase tracking-wider">
                                {language === "ar" ? "ابدأ الآن" : "Get Started"}
                                <PlusCircle className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                            </div>
                            {/* Decorative background circle */}
                            <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${action.color} opacity-[0.04] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Stats Section */}
            <div className="pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <TrendingUp className="h-7 w-7 text-green-600" />
                    {language === "ar" ? "إحصائيات عامة" : "General Statistics"}
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                    <stat.icon className="h-7 w-7" />
                                </div>
                                <span className={`flex items-center text-sm font-black ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                    {stat.trend === 'up' ? <ArrowUpRight className="ms-1 h-5 w-5" /> : <ArrowDownRight className="ms-1 h-5 w-5" />}
                                </span>
                            </div>
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                            <h4 className="text-3xl font-black text-gray-900">{stat.value}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Items Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Events List */}
                <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <h2 className="text-xl font-black flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-blue-600" />
                            {language === "ar" ? "أحدث الفعاليات" : "Latest Events"}
                        </h2>
                        <Link href="/admin/events">
                            <Button variant="ghost" className="font-black text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                {language === 'ar' ? 'عرض الكل' : 'View All'}
                            </Button>
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {events.slice(0, 5).map((event) => (
                            <div key={event._id} className="p-6 flex items-center gap-5 hover:bg-gray-50 transition-colors group">
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                                    <img src={event.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-black text-gray-900 truncate text-base">
                                        {event.title[language] || event.title.en || event.title.ar}
                                    </p>
                                    <p className="text-xs text-gray-400 font-bold truncate uppercase mt-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {event.venueId?.name[language] || event.venueId?.name.en || event.venueId?.name.ar || ""}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-blue-600 text-base">
                                        {event.pricing && event.pricing.length > 0 ? Math.min(...event.pricing.map((p: any) => p.price)) : 0} 
                                        <span className="text-[10px] ms-1">{event.currency}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth/Info Card */}
                <div className="bg-blue-600 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                    <div className="h-24 w-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                        <TrendingUp className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-black leading-tight mb-4">
                        {language === "ar" ? "نمو ملحوظ في الأداء" : "Exceptional Performance"}
                    </h2>
                    <p className="text-blue-100 font-medium text-lg max-w-sm">
                        {language === "ar" ? "زادت مبيعاتك بنسبة 25٪ هذا الشهر. أداء ممتاز!" : "Sales increased by 25% this month. Great performance!"}
                    </p>
                    <Link href="/admin/stats" className="mt-10 w-full sm:w-auto px-12 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all shadow-xl text-base">
                        {language === "ar" ? "التقارير المفصلة" : "Detailed Reports"}
                    </Link>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-[0.05] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </div>
        </div>
    );
}
