import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedSection } from "@/components/home/featured-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* 
        We use a negative margin on the first section to slightly 
        overlap the hero video for a modern layered look, 
        or just keep standard spacing.
      */}
      <div className="relative z-10 bg-background/95 backdrop-blur-sm border-t border-white/5">
        <CategoryGrid />
        <FeaturedSection />
      </div>
    </div>
  );
}