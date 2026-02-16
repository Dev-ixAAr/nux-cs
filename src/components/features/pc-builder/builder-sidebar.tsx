"use client";

import { motion } from "framer-motion";
import { Check, Circle, ChevronRight, Cpu } from "lucide-react";
import { CATEGORIES } from "@/lib/mockData";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

interface BuilderSidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export function BuilderSidebar({ activeCategory, onSelectCategory }: BuilderSidebarProps) {
  const selectedParts = useBuilderStore((state) => state.selectedParts);

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 sticky top-4 z-30 bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:static">
      <div className="mb-2 md:mb-4 px-4 hidden md:block">
        <h3 className="font-gaming text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Component List
        </h3>
      </div>

      <nav className="flex flex-row overflow-x-auto pb-4 md:pb-0 md:flex-col md:overflow-visible gap-2 md:space-y-1 px-4 md:px-0 scrollbar-hide snap-x">
        {CATEGORIES.map((category) => {
          const isSelected = activeCategory === category.id;
          const isCompleted = !!selectedParts[category.id];

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "group relative flex items-center gap-3 shrink-0 rounded-lg md:rounded-none px-4 py-2 md:py-3 text-sm font-medium transition-all duration-200 snap-start",
                "border border-white/10 md:border-0 md:border-l-2 md:w-full md:justify-between", // Mobile: Bordered Pill, Desktop: Left Border
                isSelected
                  ? "bg-cyan-950/30 text-cyan-400 border-cyan-500/50 md:bg-cyan-500/10 md:border-cyan-500"
                  : "bg-black/40 text-muted-foreground md:bg-transparent md:border-transparent hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2 md:gap-3">
                {/* STATUS INDICATOR */}
                <div className={cn(
                  "flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full border transition-all duration-300",
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : isSelected
                      ? "border-cyan-500 bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      : "border-white/20 bg-transparent text-transparent group-hover:border-white/40"
                )}>
                  {isCompleted ? (
                    <Check className="h-2.5 w-2.5 md:h-3 md:w-3 stroke-[3]" />
                  ) : (
                    <div className={cn("h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-current", isSelected ? "opacity-100" : "opacity-0")} />
                  )}
                </div>

                <span className={cn("uppercase tracking-wide transition-colors whitespace-nowrap", isSelected && "font-bold")}>
                  {category.name}
                </span>
              </div>

              {isSelected && (
                <motion.div layoutId="sidebar-arrow" className="hidden md:block">
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}