"use client";

import { Product } from "@/lib/mockData";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";
import {
    ShoppingCart,
    Scale,
    Check,
    X
} from "lucide-react";

import { motion } from "framer-motion";
import Link from "next/link";

interface LaptopCardProps {
    product: Product;
}

export function LaptopCard({ product }: LaptopCardProps) {
    const { addToCart, addToCompare } = useBuilderStore();

    const handleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCompare(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    // Construct Specs Summary (e.g., "i9-13900HX | RTX 4090 | 32GB")
    const cpu = product.technicalSpecs?.processor || product.specs?.chipset || "Unknown CPU";
    const gpu = product.specs?.gpuShort || product.technicalSpecs?.graphics || "Integrated GPU";
    const ram = product.specs?.ramShort || product.technicalSpecs?.memory || "8GB";

    // Simplification for cleaner display
    const simpleCpu = cpu.split(' ').slice(0, 2).join(' ').replace('Intel Core ', '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]"
        >
            <Link href={`/laptops/${product.id}`} className="absolute inset-0 z-0" />

            {/* TOP IMAGE SECTION */}
            <div className="relative aspect-[16/10] w-full bg-black/20 p-6 flex items-center justify-center overflow-hidden">
                {/* BRAND BADGE - Top Left (Subtle) */}
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-cyan-500 transition-colors z-10">
                    {product.brand}
                </span>

                {/* CORNER RIBBON BADGE */}
                {product.badge && (
                    <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none z-20">
                        <div className={cn(
                            "absolute top-[18px] -right-[28px] w-[120px] rotate-45 text-center text-[9px] font-bold uppercase tracking-wider py-1 shadow-md",
                            product.badge === 'Best Seller'
                                ? "bg-amber-500 text-black"
                                : "bg-cyan-500 text-black"
                        )}>
                            {product.badge}
                        </div>
                    </div>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl z-0"
                />

                {/* STOCK STATUS - Bottom Right of Image */}
                <div className="absolute bottom-3 right-3 z-10">
                    {product.stockStatus === 'Out of Stock' ? (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-900/90 border border-red-500/30 text-red-400 text-[10px] font-medium backdrop-blur-sm shadow-sm">
                            <X className="w-3 h-3" />
                            <span>Out of Stock</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium backdrop-blur-sm shadow-sm">
                            <Check className="w-3 h-3" />
                            <span>In Stock</span>
                        </div>
                    )}
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5 flex-1 flex flex-col z-10 border-t border-white/5 bg-zinc-900/50">
                <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                </h3>

                {/* Specs Summary */}
                <div className="text-xs text-zinc-400 font-medium mb-6 flex items-center gap-2 opacity-80">
                    <span className="truncate max-w-[33%]">{simpleCpu}</span>
                    <span className="text-zinc-700">|</span>
                    <span className="truncate max-w-[33%]">{gpu}</span>
                    <span className="text-zinc-700">|</span>
                    <span className="truncate max-w-[33%]">{ram}</span>
                </div>

                {/* FOOTER */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <p className="font-mono text-xl font-bold text-cyan-400 tracking-tight">
                        {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(product.price)}
                    </p>

                    <div className="flex items-center gap-2 relative z-20">
                        <button
                            onClick={handleCompare}
                            className="p-2.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors border border-white/5"
                            title="Compare"
                        >
                            <Scale size={18} />
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="p-2.5 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-all active:scale-95 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
