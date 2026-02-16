"use client";

import { Accessory } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/ui/neon-button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { useBuilderStore } from "@/store/useBuilderStore";

interface AccessoryCardProps {
    accessory: Accessory;
}

export function AccessoryCard({ accessory }: AccessoryCardProps) {
    const { addToCart } = useBuilderStore();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col rounded-xl border border-white/10 bg-black/40 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:bg-black/60 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]"
        >
            {/* BADGE */}
            <div className="absolute top-4 left-4 z-10 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    {accessory.category}
                </span>
            </div>

            {/* IMAGE */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/5 p-4 mb-4 border border-white/5 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src={accessory.image}
                        alt={accessory.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col">
                <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        {accessory.brand}
                    </span>
                    <h3 className="font-bold text-lg leading-tight text-white line-clamp-2 min-h-[3.5rem]" title={accessory.name}>
                        {accessory.name}
                    </h3>
                </div>

                {/* SPECS PREVIEW */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {accessory.specs.slice(0, 2).map((spec, index) => (
                        <span
                            key={index}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
                        >
                            {spec}
                        </span>
                    ))}
                    {accessory.specs.length > 2 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-500">
                            +{accessory.specs.length - 2}
                        </span>
                    )}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/10">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Price</p>
                        <p className="font-mono text-xl font-bold text-white">
                            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(accessory.price)}
                        </p>
                    </div>

                    <button
                        onClick={() => addToCart(accessory as any)}
                        className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>

                    <a
                        href={`https://wa.me/94771234567?text=Hi, I'm interested in the ${accessory.name}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <NeonButton variant="primary" className="h-10 px-4 text-sm">
                            Buy
                        </NeonButton>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
