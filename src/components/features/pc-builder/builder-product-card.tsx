"use client";

import { Plus, Minus, Star, Cpu, Info, RefreshCcw, Sparkles } from "lucide-react";
import { Product } from "@/lib/mockData";
import { useBuilderStore } from "@/store/useBuilderStore";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";

interface BuilderProductCardProps {
  product: Product;
  categorySlug: string;
}

export function BuilderProductCard({ product, categorySlug }: BuilderProductCardProps) {
  const { selectedParts, addPart, removePart, canAddPart } = useBuilderStore();

  // Find this specific product in the array
  const categoryItems = selectedParts[categorySlug] || [];
  const selectedItem = categoryItems.find(item => item.product.id === product.id);

  const quantity = selectedItem ? selectedItem.quantity : 0;
  const isSelected = quantity > 0;
  const isUsed = product.condition === 'used';

  // Check if we can add more
  const isLimitReached = !canAddPart(categorySlug);

  const handleAdd = () => {
    if (!isLimitReached || !isSelected) {
      addPart(categorySlug, product);
    }
  };

  const handleRemove = () => {
    removePart(categorySlug, product.id);
  };

  const specEntries = product.specs ? Object.entries(product.specs).slice(0, 6) : [];
  return (
    <div className={cn(
      "group relative grid grid-cols-[auto_1fr] md:flex md:flex-row items-stretch gap-4 rounded-sm border p-4 transition-all duration-300 hover:z-40",
      isSelected
        ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        : "border-white/10 bg-black/20 hover:border-cyan-500/30 hover:bg-black/40"
    )}>

      {/* --- TECH CORNERS --- */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan-500/50 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan-500/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan-500/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan-500/50 transition-colors" />

      {/* --- POPUP (Same as before) --- */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[120%] min-w-[320px] z-50 pointer-events-none transition-all duration-200 ease-out opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 hidden md:block">
        <div className="rounded border border-cyan-500/30 bg-black/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">Specs_Sheet.json</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {specEntries.map(([key, value]) => (
              <div key={key} className="flex justify-between items-baseline text-xs border-b border-white/5 pb-1">
                <span className="text-muted-foreground font-mono text-[10px] uppercase truncate mr-4">{key.replace(/_/g, ' ')}</span>
                <span className="font-mono text-cyan-100 text-right truncate max-w-[120px]">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- IMAGE AREA --- */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-black/40 p-2 border border-white/5 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Condition Badge (Tech Style) */}
        <div className={cn(
          "absolute top-0 right-0 px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest border-b border-l",
          isUsed ? "bg-amber-950/50 text-amber-500 border-amber-500/30" : "bg-cyan-950/50 text-cyan-500 border-cyan-500/30"
        )}>
          {isUsed ? "REV:B" : "NEW"}
        </div>
      </div>

      {/* --- DETAILS AREA --- */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              [{product.brand}]
            </span>
            {isUsed && <span className="text-[10px] font-mono text-amber-500 blinking-cursor">_RECYCLED</span>}
          </div>

          <h4 className={cn(
            "font-bold text-sm tracking-wide transition-colors uppercase",
            isSelected ? "text-cyan-400" : "text-gray-200 group-hover:text-white"
          )}>
            {product.name}
          </h4>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-lg text-white">
            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(product.price)}
          </span>
          {isUsed && (
            <span className="text-[10px] font-mono text-muted-foreground line-through decoration-red-500/40">
              {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(product.price * 1.3)}
            </span>
          )}
        </div>
      </div>

      {/* --- ACTION AREA --- */}
      <div className="w-full col-span-2 md:w-auto shrink-0 flex items-center justify-end">
        {isSelected ? (
          <div className="flex items-stretch h-10 border border-cyan-500/30 bg-black/40">
            <button
              onClick={handleRemove}
              className="w-10 flex items-center justify-center hover:bg-red-500/20 text-white hover:text-red-400 transition-colors border-r border-white/10"
            >
              <Minus className="h-3 w-3" />
            </button>

            <div className="w-10 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
              {quantity}
            </div>

            <button
              onClick={handleAdd}
              disabled={isLimitReached}
              className={cn(
                "w-10 flex items-center justify-center transition-colors border-l border-white/10",
                isLimitReached
                  ? "bg-white/5 text-muted-foreground cursor-not-allowed"
                  : "hover:bg-cyan-500/20 text-white hover:text-cyan-400"
              )}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="h-10 px-6 border border-white/10 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-cyan-400 transition-all flex items-center gap-2 group/btn"
          >
            <Plus className="h-3 w-3 group-hover/btn:rotate-90 transition-transform" />
            Add
          </button>
        )}
      </div>

    </div>
  );
}