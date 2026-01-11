"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { useLanguage } from "@/lib/language-context";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-50 flex" dir={dir}>
            <AdminSidebar />
            <div className="flex-1 ms-64 flex flex-col min-w-0">
                <AdminHeader />
                <main className="p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
