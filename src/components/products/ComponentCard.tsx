"use client";

import { Product } from "@/lib/mockData";
import { useBuilderStore } from "@/store/useBuilderStore";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NeonButton } from "@/components/ui/neon-button";
import { CATEGORIES } from "@/lib/mockData";

interface ComponentCardProps {
    product: Product;
}

export function ComponentCard({ product }: ComponentCardProps) {
    const { addToCart } = useBuilderStore();

    // Find category display name
    const categoryName = CATEGORIES.find(c => c.slug === product.category)?.name || product.category;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col rounded-xl border border-white/10 bg-black/40 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:bg-black/60 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]"
        >
            {/* BADGES */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <span className="w-fit px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    {categoryName}
                </span>

                {product.condition === 'new' ? (
                    <span className="w-fit px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-cyan-400 shadow-[0_0_10px_-2px_rgba(6,182,212,0.3)]">
                        Brand New
                    </span>
                ) : (
                    <span className="w-fit px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-amber-500 shadow-[0_0_10px_-2px_rgba(245,158,11,0.3)]">
                        Used
                    </span>
                )}
            </div>

            {/* IMAGE */}
            <Link href={`/components/${product.id}`} className="block relative aspect-square w-full overflow-hidden rounded-lg bg-white/5 p-4 mb-4 border border-white/5 flex items-center justify-center cursor-pointer">
                <div className="relative w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col">
                <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                            {product.brand}
                        </span>
                        {product.rating > 0 && (
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-[10px] font-bold">{product.rating}</span>
                            </div>
                        )}
                    </div>
                    <Link href={`/components/${product.id}`}>
                        <h3 className="font-bold text-sm md:text-base leading-tight text-white line-clamp-2 min-h-[2.5rem] hover:text-cyan-400 transition-colors" title={product.name}>
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* SPECS PREVIEW */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.specs && Object.entries(product.specs).slice(0, 3).map(([key, value], index) => {
                        if (key === 'condition_note' || key === 'socket_support' || key === 'socket') return null;
                        return (
                            <span
                                key={index}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 uppercase"
                            >
                                {value}
                            </span>
                        );
                    })}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/10">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Price</p>
                        <p className="font-mono text-lg md:text-xl font-bold text-cyan-400">
                            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(product.price)}
                        </p>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>

                    <a
                        href={`https://wa.me/94771234567?text=Hi, I'm interested in the ${product.name}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <NeonButton variant="primary" className="h-10 px-4 text-xs md:text-sm">
                            Buy
                        </NeonButton>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
