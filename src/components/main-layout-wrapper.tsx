"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/SiteHeader";

export function MainLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");
    const isBookingRoute = pathname?.startsWith("/booking");
    const isHomePage = pathname === "/";

    return (
        <>
            {!isAdminRoute && !isHomePage && <SiteHeader />}
            {!isAdminRoute && !isBookingRoute && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {!isAdminRoute && !isBookingRoute && <Footer />}
        </>
    );
}
