"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { useLanguage } from "@/lib/language-context";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { dir, language } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" dir={dir}>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar className="fixed h-full" />
            </div>

            {/* Mobile Sidebar (Sheet) */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 border-none w-64">
                    <AdminSidebar onClose={() => setIsSidebarOpen(false)} className="w-full" />
                </SheetContent>
            </Sheet>

            <div className="flex-1 lg:ms-64 flex flex-col min-w-0">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 md:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
