"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { useLanguage } from "@/lib/language-context";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { dir, language } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        const checkAuth = async () => {
            if (isLoginPage) {
                setIsLoading(false);
                return;
            }

            try {
                // We'll check the session by calling a simple endpoint or checking cookies
                // Since we're client-side, we can just fetch a dummy protected route
                const res = await fetch("/api/auth/login", { method: "HEAD" });
                // Wait, login POST only. Let's create a simple session check helper or just use a dummy fetch to protected api

                // For now, let's assume if we can't get the session cookie, we're not logged in.
                // But cookies are HttpOnly. So we need an API endpoint to check session.
                const sessionRes = await fetch("/api/auth/session");
                if (!sessionRes.ok) {
                    router.push("/admin/login");
                }
            } catch (err) {
                router.push("/admin/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router, isLoginPage]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

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
