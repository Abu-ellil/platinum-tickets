"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, UserRound, Globe, Ticket, ChevronLeft, ChevronRight, X, Phone, Users, MapPin, BadgeDollarSign, MoreHorizontal, LayoutDashboard } from "lucide-react";
import { FaUser } from "react-icons/fa";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/events", label: "الفعاليات" },
  { href: "/concerts", label: "الحفلات" },
  { href: "/attractions", label: "المعالم السياحية" },
  { href: "/sports", label: "الرياضة" },
  { href: "/adventures", label: "تجارب ومغامرات" },
];

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userCity, setUserCity] = useState<string>("...");

  const isHomePage = pathname === "/";

  useEffect(() => {
    // Fetch user location based on IP
    const fetchCity = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.city) {
          setUserCity(data.city);
        }
      } catch (error) {
        // Log error only in development if needed, but handle gracefully for user
        console.warn("Location fetch failed, using default:", error);
        setUserCity("Dubai"); // Fallback
      }
    };

    fetchCity();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  if (!isHomePage) return null;

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-transparent py-6"
    >
      <div className="container flex items-center justify-between px-4 md:px-6">

        {/* LEFT SIDE: Capsule with Menu and Profile */}

        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/pl-logo-desktop-ar.svg"
              alt="Platinumlist"
              width={162}
              height={32}
              className="h-6 w-auto transition-all  brightness-200"
            />
          </Link>

          {/* Desktop City Selector */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 cursor-pointer transition-all group/city">
            <MapPin className="w-4 h-4 text-white/70 group-hover/city:text-white" />
            <span className="text-white font-bold text-sm tracking-tight">{userCity}</span>
            <ChevronRight className="w-4 h-4 text-white/50 group-hover/city:text-white rotate-90" />
          </div>
        </div>
        {/* RIGHT SIDE: Logo */}
        <div className="flex items-center gap-1 p-1 rounded-full transition-colors bg-white/20 backdrop-blur-md border border-white/20">
          {/* Mobile Menu Trigger */}


          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center overflow-hidden bg-white/20 hover:bg-white/30"
          >
            {/* <UserRound className="h-6 w-6 text-white" /> */}
            <FaUser className=" text-white h-10w-10 " />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8 text-white hover:bg-white/10"
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "right" : "left"} className="bg-white p-0 w-full border-none">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col h-full bg-white">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    {language === "ar" ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="text-purple-600 font-black text-2xl">
                      <Image src="/pl-logo-desktop-ar.svg" alt="Platinumlist" width={120} height={24} className="h-6 w-auto" />
                    </div>
                  </div>
                  <div className="w-10 flex justify-center">
                    <UserRound className="h-10 w-10 text-gray-200 bg-gray-100 rounded-full p-2" />
                  </div>
                </div>

                {/* Mobile Links */}
                <div className="flex-1 overflow-y-auto pt-4">
                  <div className="px-2 space-y-1">
                    <Link href="#" className="flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-900 hover:bg-gray-50 rounded-xl">
                      {t("download_app")}
                    </Link>
                    <Link href="#" className="flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-900 hover:bg-gray-50 rounded-xl">
                      {t("contact_support")}
                    </Link>
                    <Link href="#" className="flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-900 hover:bg-gray-50 rounded-xl">
                      {t("join_team")}
                    </Link>
                  </div>

                  <div className="mt-6 border-t pt-6 px-2 space-y-1">
                    <div className="flex items-center justify-between px-4 py-4 text-gray-600">
                      <span className="text-lg">{t("location")}: <span className="text-gray-900 font-bold">{userCity}</span></span>
                    </div>
                    <div onClick={toggleLanguage} className="flex items-center justify-between px-4 py-4 text-gray-600 cursor-pointer hover:bg-gray-50 rounded-xl">
                      <span className="text-lg">{t("language")}: <span className="text-gray-900 font-bold uppercase">{language}</span></span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-4 text-gray-600">
                      <span className="text-lg">{t("currency")}: <span className="text-gray-900 font-bold">EUR</span></span>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-6 px-4 space-y-4">
                    <Link href="/admin" className="flex items-center gap-3 text-xl font-bold text-blue-600">
                      <LayoutDashboard className="h-6 w-6" />
                      {language === 'ar' ? 'لوحة التحكم للآدمن' : 'Admin Dashboard'}
                    </Link>
                    <Link href="#" className="block text-xl font-bold text-gray-900">
                      {t("sell_with_us")}
                    </Link>
                  </div>
                </div>

                {/* Mobile Footer Login */}
                <div className="p-4 border-t">
                  <Button className="w-full h-14 text-xl font-black rounded-2xl border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-50">
                    {t("login")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
