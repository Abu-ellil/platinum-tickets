import { HeroSection } from "@/components/home/hero-section";
import { CityGrid } from "@/components/home/city-grid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      
      {/* 1. Hero Section */}
      <HeroSection />

      <main className="container px-4 md:px-0 mx-auto space-y-12 -mt-10 relative z-20 pb-12">
        
        {/* 2. City Selection */}
        <div className="pt-6">
           <CityGrid />
        </div>

      </main>
    </div>
  );
}
