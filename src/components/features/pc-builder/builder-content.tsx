"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "@/lib/mockData";
import { BuilderProductCard } from "./builder-product-card";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Loader2, SearchX, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface BuilderContentProps {
  activeCategory: string;
  platform: "intel" | "amd";
}

type ConditionFilter = 'all' | 'new' | 'used';

export function BuilderContent({ activeCategory, platform }: BuilderContentProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all');

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const filtered = PRODUCTS.filter((p) => {
        // 1. Category Match (Strict)
        if (p.category !== activeCategory) return false;

        // 2. Condition Match (Loose for 'all')
        if (conditionFilter !== 'all') {
          if (p.condition !== conditionFilter) return false;
        }

        // 3. Platform Logic (Smart Filter)
        // Only applies to CPUs and Motherboards. GPUs/RAM/Storage are universal.
        if (activeCategory === 'processors' || activeCategory === 'motherboards') {
          const brand = p.brand.toLowerCase();
          const socket = p.specs?.socket || '';
          const socketSupport = (p.specs?.socket_support as string[]) || [];

          if (platform === 'intel') {
            // Logic: Must be Intel Brand OR have 'LGA' in socket specs
            const isIntel = brand === 'intel' || socket.includes('LGA');
            const supportsIntel = socket.includes('LGA') || socketSupport.some(s => s.includes('LGA'));

            if (activeCategory === 'processors' && !isIntel) return false;
            if (activeCategory === 'motherboards' && !supportsIntel) return false;
          }

          if (platform === 'amd') {
            // Logic: Must be AMD Brand OR have 'AM' in socket specs
            const isAmd = brand === 'amd' || socket.includes('AM');
            const supportsAmd = socket.includes('AM') || socketSupport.some(s => s.includes('AM'));

            if (activeCategory === 'processors' && !isAmd) return false;
            if (activeCategory === 'motherboards' && !supportsAmd) return false;
          }
        }

        return true;
      });

      setProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeCategory, platform, conditionFilter]);

  return (
    <div className="flex-1 rounded-2xl border border-white/5 bg-white/5 p-4 md:p-6 min-h-[600px] relative">

      {/* HEADER & FILTERS */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-gaming text-xl font-bold uppercase tracking-widest text-white">
            Select {activeCategory.replace('-', ' ')}
          </h2>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {products.length} Parts Available
          </span>
        </div>

      </div>

      {/* CONDITION TABS & FAN COUNTER */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">

        {/* FAN COUNTER */}
        {activeCategory === 'case-fans' && (
          <div className="flex items-center gap-2 bg-zinc-900 rounded-lg border border-white/10 px-3 py-1.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fans Selected</span>
            <div className="flex items-center gap-1">
              <span className={cn(
                "font-mono font-bold text-sm",
                products.reduce((acc, p) => acc + (useBuilderStore.getState().selectedParts['case-fans']?.find(i => i.product.id === p.id)?.quantity || 0), 0) >= 9 ? "text-red-500" : "text-cyan-500"
              )}>
                {useBuilderStore.getState().getCategoryCount('case-fans')}
              </span>
              <span className="text-zinc-600 font-bold">/</span>
              <span className="text-zinc-600 font-bold">9</span>
            </div>
          </div>
        )}

        <div className="flex items-center rounded-lg bg-black/40 p-1 border border-white/10">
          <Filter className="h-3 w-3 text-muted-foreground mx-2" />
          {(['all', 'new', 'used'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setConditionFilter(filter)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
                conditionFilter === filter
                  ? filter === 'used'
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    : filter === 'new'
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {
        loading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {products.length > 0 ? (
                products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BuilderProductCard
                      product={product}
                      categorySlug={activeCategory}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="mb-4 rounded-full bg-white/5 p-4">
                    <SearchX className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-white">No Parts Found</h3>
                  <p className="max-w-xs text-sm text-muted-foreground mt-2">
                    No parts match your filters. Try switching the <span className="text-cyan-400 font-bold">Platform</span> or <span className="text-amber-400 font-bold">Condition</span>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }
    </div >
  );
}