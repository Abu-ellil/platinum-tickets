"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    MapPin,
    Users,
    Image as ImageIcon,
    BarChart3,
    Settings,
    LogOut,
    Ticket,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";

const MENU_ITEMS = [
    { href: "/admin", icon: LayoutDashboard, label: "dashboard", labelAr: "لوحة التحكم" },
    { href: "/admin/events", icon: Calendar, label: "events", labelAr: "الفعاليات" },
    { href: "/admin/cities", icon: MapPin, label: "cities", labelAr: "المدن" },
    { href: "/admin/artists", icon: Users, label: "artists", labelAr: "المشاهير" },
    { href: "/admin/slides", icon: ImageIcon, label: "slides", labelAr: "سلايدز العرض" },
    { href: "/admin/stats", icon: BarChart3, label: "stats", labelAr: "الأرقام والإحصائيات" },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { language, dir } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-white border-e border-gray-200 w-64 fixed top-0 bottom-0 z-50">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/pl-logo-desktop-ar.svg"
                        alt="Platinumlist"
                        width={150}
                        height={30}
                        className="h-6 w-auto"
                    />
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-blue-600")} />
                            <span className="font-medium">
                                {language === "ar" ? item.labelAr : item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@platinum.com</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
