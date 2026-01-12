"use client";

import { useLanguage } from "@/lib/language-context";
import { Bell, Search, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminHeaderProps {
    onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8  top-0 ">
            <div className="flex items-center gap-4 flex-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-full"
                    onClick={onMenuClick}
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </Button>

                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "ابحث هنا..." : "Search here..."}
                        className="pl-10 h-10 bg-gray-50 border-none rounded-full focus-visible:ring-1 focus-visible:ring-blue-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                    className="rounded-full flex items-center gap-2 px-2 md:px-4"
                >
                    <Globe className="h-4 w-4" />
                    <span className="uppercase font-bold text-xs md:text-sm">{language}</span>
                </Button>

                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>
            </div>
        </header>
    );
}
