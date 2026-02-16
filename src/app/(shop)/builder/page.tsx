"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BuilderSidebar } from "@/components/features/pc-builder/builder-sidebar";
import { BuilderContent } from "@/components/features/pc-builder/builder-content"; // NEW IMPORT
import { BuilderSummary } from "@/components/features/pc-builder/builder-summary";
import { cn } from "@/lib/utils";

import { BuildSummary } from "@/components/builder/BuildSummary";

export default function BuilderPage() {
  const [activeCategory, setActiveCategory] = useState("processors");
  const [platform, setPlatform] = useState<"intel" | "amd">("intel");
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="min-h-screen md:h-screen bg-black pt-6 pb-24 md:pb-0 flex flex-col overflow-hidden">

      {/* 1. HEADER & PLATFORM TOGGLE */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div>
            <h1 className="font-gaming text-2xl md:text-3xl font-black uppercase tracking-widest text-white">
              System <span className="text-cyan-400">Configurator</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Select your core platform to begin
            </p>
          </div>

          <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
            {(["intel", "amd"] as const).map((p) => {
              const isActive = platform === p;
              return (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={cn(
                    "relative px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors z-10",
                    isActive ? "text-white" : "text-muted-foreground hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="platform-pill"
                      className={cn(
                        "absolute inset-0 rounded-md shadow-sm",
                        p === 'intel' ? "bg-blue-600" : "bg-red-600"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {p}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="container mx-auto px-4 md:px-6 flex-1 h-full overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 h-full">

          {/* SIDEBAR - Mobile: Horizontal Scroll, Desktop: Vertical */}
          <div className="w-full md:w-1/4 md:h-full overflow-x-auto md:overflow-y-auto whitespace-nowrap md:whitespace-normal no-scrollbar order-1 md:order-none border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
            <BuilderSidebar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* DYNAMIC CONTENT AREA */}
          <div className="w-full md:w-3/4 h-full overflow-y-auto pb-32 md:pb-0">
            <BuilderContent
              activeCategory={activeCategory}
              platform={platform}
            />
          </div>

        </div>
      </div>

      <BuilderSummary onShowFullSummary={() => setShowSummary(true)} />
      <BuildSummary isOpen={showSummary} onClose={() => setShowSummary(false)} />
    </div>
  );
}