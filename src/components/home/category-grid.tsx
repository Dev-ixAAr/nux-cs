"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Cpu,
  CircuitBoard,
  Fan,
  MemoryStick,
  HardDrive,
  Database,
  Monitor,
  Zap,
  PcCase,
  Component,
  Syringe,
  LucideIcon
} from "lucide-react";

// 1. Icon Mapping Strategy
const ICON_MAP: Record<string, LucideIcon> = {
  'processors': Cpu,
  'motherboards': CircuitBoard,
  'coolers': Fan,
  'memory': MemoryStick,
  'ssd': HardDrive, // M.2 lookalike
  'storage': Database, // HDD lookalike
  'graphics-cards': Monitor,
  'power-supply': Zap,
  'pc-cases': PcCase,
  'thermal-paste': Syringe,
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

export function CategoryGrid() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* HEADER */}
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <h2 className="font-gaming text-3xl md:text-5xl font-black uppercase tracking-widest text-white mb-4">
            Components <span className="text-cyan-400">Armory</span>
          </h2>
          <div className="h-1 w-24 bg-cyan-500 shadow-[0_0_15px_var(--primary)] rounded-full" />
        </div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {CATEGORIES.map((cat) => {
            // Resolve Icon
            const Icon = ICON_MAP[cat.slug] || ICON_MAP[cat.id] || Component;

            const href = cat.slug === 'laptops'
              ? '/laptops'
              : `/components?category=${cat.slug}`;

            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }} // Strong Hover Pop
                className="h-full"
              >
                <Link href={href} className="block h-full group">
                  <div className={cn(
                    "relative h-[220px] md:h-[260px] w-full overflow-hidden rounded-xl",
                    "border border-white/10 bg-gray-900",
                    "transition-all duration-300 ease-out",
                    "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  )}>

                    {/* BACKGROUND IMAGE (Zoom Effect) */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className={cn(
                          "h-full w-full object-cover transition-transform duration-700 ease-out",
                          "opacity-70 grayscale-[0.3]", // Default
                          "group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110" // Zoom on Hover
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    </div>

                    {/* TOP-RIGHT ICON (Glass Circle) */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className={cn(
                        "flex items-center justify-center p-2 rounded-full",
                        "bg-black/40 backdrop-blur-md border border-white/10",
                        "text-white transition-all duration-300",
                        "group-hover:border-cyan-500 group-hover:text-cyan-400 group-hover:bg-black/80 group-hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      )}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>

                    {/* BOTTOM CONTENT (Text Reveal) */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
                      <div className="overflow-hidden">
                        <h3 className={cn(
                          "font-gaming text-sm md:text-base font-bold uppercase tracking-widest text-white",
                          "transition-colors duration-300",
                          "group-hover:text-cyan-400 text-shadow-sm"
                        )}>
                          {cat.name}
                        </h3>

                        {/* Animated Underline */}
                        <div className="mt-2 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_var(--primary)]" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}