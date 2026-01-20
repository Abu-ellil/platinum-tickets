import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "latin-ext", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

import { LanguageProvider } from "@/lib/language-context";
import { CityProvider } from "@/lib/city-context";
import { MainLayoutWrapper } from "@/components/main-layout-wrapper";

export const metadata: Metadata = {
  title: "Platinumlist - Event Tickets, Attractions & Concerts",
  description:
    "Book tickets for concerts, events, attractions and festivals in the GCC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} font-sans antialiased bg-gray-50 flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <CityProvider>
            <MainLayoutWrapper>{children}</MainLayoutWrapper>
          </CityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
