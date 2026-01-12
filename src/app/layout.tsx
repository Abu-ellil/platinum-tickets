import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

import { LanguageProvider } from "@/lib/language-context";
import { MainLayoutWrapper } from "@/components/main-layout-wrapper";

export const metadata: Metadata = {
  title: "Platinumlist - Event Tickets, Attractions & Concerts",
  description: "Book tickets for concerts, events, attractions and festivals in the GCC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.variable} font-sans antialiased bg-gray-50 flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
