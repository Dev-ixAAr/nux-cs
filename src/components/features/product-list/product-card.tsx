"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/services/productService";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-card transition-colors hover:border-primary/50",
        className
      )}
    >
      {/* IMAGE AREA */}
      <div className="relative aspect-square overflow-hidden bg-black/40 p-6">
        {/* Placeholder for actual Next.js Image - using a div for now if no real image */}
        <div className="relative h-full w-full flex items-center justify-center">
            {/* In a real app, use next/image here */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={product.image} 
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        
        {/* Floating Badge */}
        <div className="absolute top-3 right-3 z-20">
           {product.inStock ? (
             <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
               In Stock
             </span>
           ) : (
             <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full border border-red-500/30 backdrop-blur-md">
               Out of Stock
             </span>
           )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-xs text-muted-foreground">{product.rating}</span>
            </div>
        </div>
        
        <h3 className="font-heading text-lg font-bold leading-tight text-white line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-xl text-primary font-bold">
            ${product.price.toLocaleString()}
          </span>
          
          <NeonButton 
            variant="ghost" 
            size="sm" // Assuming you add size prop or handle it via class
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/10 text-primary hover:bg-primary hover:text-black"
          >
            <ShoppingCart className="h-4 w-4" />
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}