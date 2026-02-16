"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/ui/neon-button";

interface ProductProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  inStock: boolean;
  rating: number;
}

export function ProductCard({ product }: { product: ProductProps }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl",
        "bg-black/40 backdrop-blur-md border border-white/10",
        "transition-all duration-300 ease-out",
        "hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
      )}
    >
      {/* 
        IMAGE CONTAINER 
        Using a dark radial gradient background to make hardware pop without a harsh white box
      */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-gray-800 to-black p-6">

        {/* Badge */}
        <div className="absolute top-3 right-3 z-20">
          {product.inStock ? (
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">In Stock</span>
            </div>
          ) : (
            <div className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-red-400 backdrop-blur-md">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Image */}
        <div className="relative h-full w-full flex items-center justify-center z-10">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
          />
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* DETAILS CONTAINER */}
      <div className="flex flex-1 flex-col p-5">

        {/* Header info */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-medium text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4 block flex-1">
          <h3 className="font-gaming text-lg font-bold leading-tight text-white transition-colors group-hover:text-cyan-400 line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="relative mt-auto flex items-end justify-between overflow-hidden pt-2">

          {/* Price Tag */}
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="font-gaming text-xl font-bold text-cyan-400">
              {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}
            </span>
          </div>

          {/* 
             Floating Action Button 
             Hidden by default, slides up and fades in on hover 
          */}
          <div className="absolute right-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <NeonButton className="h-9 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </NeonButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}