"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";
import { ArrowRight, Loader2, Cpu } from "lucide-react";
import { settingsService } from "@/services/settingsService";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const url = await settingsService.getHeroVideoUrl();
        setVideoUrl(url);
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black py-10 md:py-20">
      
      {/* LAYER 1: DYNAMIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-black">
            <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
          </div>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            key={videoUrl}
            className="h-full w-full object-cover opacity-0 animate-in fade-in duration-1000"
            onLoadedData={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>

      {/* LAYER 2: AMBIENT ORBS (Responsive Scaling) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Orb 1: Cyan (Top Left) */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          // Mobile: w-[200px], Desktop: w-[500px]
          className="absolute -top-[10%] -left-[10%] h-[200px] w-[200px] rounded-full bg-cyan-500/20 blur-[80px] md:h-[500px] md:w-[500px] md:blur-[120px]"
        />
        
        {/* Orb 2: Purple (Bottom Right) */}
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          // Mobile: w-[250px], Desktop: w-[600px]
          className="absolute -bottom-[10%] -right-[10%] h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[80px] md:h-[600px] md:w-[600px] md:blur-[120px]"
        />
      </div>

      {/* LAYER 3: RESPONSIVE GLASS CONTAINER */}
      <div className="relative z-20 container mx-auto flex h-full items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // Mobile: w-[95%], p-6, rounded-xl | Desktop: max-w-4xl, p-12, rounded-3xl
          className={cn(
            "w-[95%] max-w-4xl overflow-hidden bg-black/40 shadow-[inset_0_0_30px_rgba(0,240,255,0.05)] backdrop-blur-xl border border-white/10",
            "rounded-xl p-6 md:rounded-3xl md:p-12"
          )}
        >
          {/* Badge */}
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)] font-gaming">
              <Cpu className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
              <span>Next-Gen Hardware</span>
            </div>
          </div>

          {/* HEADLINE: Responsive Orbitron Sizes */}
          <h1 className="font-gaming text-center md:text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-widest text-white">
            Build Your <br />
            {/* Gradient Text Shimmer */}
            <span className="animate-text-shimmer bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-lg">
              Ultimate Rig
            </span>
          </h1>

          {/* SUB-HEADLINE: Responsive Sizes */}
          <p className="font-gaming mt-6 text-center md:text-left text-xs sm:text-sm md:text-lg uppercase tracking-[0.15em] text-gray-300 max-w-2xl leading-relaxed mx-auto md:mx-0">
            Precision-engineered systems. Custom liquid cooling. Extreme overclocking.
          </p>

          {/* BUTTONS: Stack on Mobile, Row on Desktop */}
          <div className="mt-8 md:mt-10 flex flex-col gap-4 sm:flex-row justify-center md:justify-start">
            <Link href="/builder" className="w-full sm:w-auto">
              <NeonButton 
                variant="primary" 
                className="font-gaming uppercase tracking-widest h-12 md:h-14 w-full px-8 text-sm md:text-lg font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-shadow duration-300"
              >
                Start Building <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </NeonButton>
            </Link>
            
            <Link href="/products" className="w-full sm:w-auto">
              <NeonButton 
                variant="secondary" 
                className="font-gaming uppercase tracking-widest h-12 md:h-14 w-full px-8 text-sm md:text-lg font-bold backdrop-blur-md"
              >
                View Catalog
              </NeonButton>
            </Link>
          </div>

          {/* Tech Decorative Elements (Hidden on Mobile to save space) */}
          <div className="hidden md:flex absolute top-6 right-6 gap-2 opacity-30 pointer-events-none">
             <div className="h-1 w-8 bg-cyan-500 rounded-full animate-pulse"></div>
             <div className="h-1 w-2 bg-cyan-500 rounded-full"></div>
          </div>
          <div className="hidden md:flex absolute bottom-6 left-6 gap-2 opacity-30 pointer-events-none">
             <div className="h-1 w-2 bg-purple-500 rounded-full"></div>
             <div className="h-1 w-8 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}