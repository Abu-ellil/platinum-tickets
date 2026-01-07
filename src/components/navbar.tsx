"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, User, Globe, Ticket } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-white/95 backdrop-blur-md shadow-sm py-4",
        isScrolled && "py-2"
      )}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        
        {/* RIGHT SIDE: LOGO (RTL) */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo Mark */}
            <div className="relative flex items-center justify-center">
               <Image 
                 src="/pl-logo-desktop-ar.svg" 
                 alt="Platinumlist" 
                 width={162} 
                 height={32} 
                 className="h-8 w-auto"
               />
            </div>
          </Link>
          
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 mr-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-bold text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* LEFT SIDE: ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-gray-700 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white text-gray-900 w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-right text-gray-900">القائمة الرئيسية</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between p-3 text-lg font-medium hover:bg-white/5 rounded-lg border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Search Action */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex text-gray-700 hover:bg-gray-100 gap-2 h-9 rounded-full px-3"
          >
            <Search className="h-4 w-4" />
            <span className="hidden xl:inline text-xs font-bold">بحث</span>
          </Button>

          {/* Language Switcher */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-700 hover:bg-gray-100 gap-2 h-9 rounded-full px-3 hidden sm:flex"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-bold">En</span>
          </Button>

          {/* User Profile / Login */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-700 hover:bg-gray-100 gap-2 h-9 rounded-full px-3"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline text-xs font-bold">تسجيل الدخول</span>
          </Button>
          
          {/* CTA Button */}
          <Button 
            size="sm"
            className="hidden md:flex bg-[#4F46E5] text-white hover:bg-[#4338ca] font-bold rounded-full px-4 h-9 shadow-sm"
          >
            حمّل التطبيق
          </Button>

        </div>
      </div>
    </header>
  );
}
