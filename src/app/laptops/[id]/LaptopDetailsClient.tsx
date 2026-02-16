"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ShoppingCart, Cpu, Monitor, MemoryStick, Disc, ArrowRight, ShoppingBag, ChevronRight, Star, Truck, Shield, RotateCcw, Database } from 'lucide-react';
import { NeonButton } from '../../../components/ui/neon-button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useBuilderStore } from "@/store/useBuilderStore";
import { LaptopCard } from '@/components/features/laptops/laptop-card';
import { Product } from '@/lib/mockData';

interface LaptopDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export function LaptopDetailsClient({ product, relatedProducts }: LaptopDetailsClientProps) {
    const { addToCart } = useBuilderStore();
    console.log('LaptopDetailsClient mounted, addToCart:', addToCart);
    const [activeImage, setActiveImage] = useState(product.images?.[0] || product.image);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto space-y-16">

            {/* HERO SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* GALLERY */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={activeImage}
                        className="relative aspect-[16/10] w-full bg-zinc-900/50 rounded-2xl border border-white/10 p-8 flex items-center justify-center overflow-hidden group"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={activeImage}
                                alt={product.name}
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    {/* THUMBNAILS */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={cn(
                                        "relative h-20 w-20 flex-shrink-0 rounded-lg border bg-zinc-900/50 p-2 transition-all",
                                        activeImage === img
                                            ? "border-cyan-500 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/50"
                                            : "border-white/10 hover:border-white/30"
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* INFO */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                            {product.brand}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 leading-tight mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-cyan-400 font-mono">
                                {new Intl.NumberFormat('en-LK', {
                                    style: 'currency',
                                    currency: 'LKR',
                                    maximumFractionDigits: 0
                                }).format(product.price)}
                            </span>
                            {product.inStock ? (
                                <span className="text-green-400 text-sm font-medium flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                    In Stock
                                </span>
                            ) : (
                                <span className="text-red-400 text-sm font-medium">Out of Stock</span>
                            )}
                        </div>
                    </div>

                    {/* KEY SPECS GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <KeySpec icon={Cpu} label="Processor" value={product.specs?.core_count + ' Cores'} delay={0.1} />
                        <KeySpec icon={Monitor} label="Graphics" value={product.specs?.chipset?.replace('Laptop', '').trim() || ''} delay={0.2} />
                        <KeySpec icon={MemoryStick} label="RAM" value={product.specs?.memory_type?.split(' ')[0] || ''} delay={0.3} />
                        <KeySpec icon={Disc} label="Storage" value={product.specs?.capacity || ''} delay={0.4} />
                    </div>


                    {/* ACTIONS */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <NeonButton
                            variant="secondary"
                            className="flex-1 h-14 text-lg gap-2"
                            onClick={() => addToCart(product)}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </NeonButton>

                        <a
                            href={`https://wa.me/94771234567?text=Hi, I'm interested in the ${product.name} laptop.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <NeonButton variant="primary" className="w-full h-14 text-lg gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Buy Now
                            </NeonButton>
                        </a>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION */}
            {product.description && (
                <section className="border-t border-white/10 pt-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-cyan-500 rounded-full" />
                        Product Overview
                    </h2>
                    <p className="text-zinc-300 leading-relaxed text-lg max-w-4xl">
                        {product.description}
                    </p>
                </section>
            )}

            {/* FULL SPECS TABLE */}
            <section className="border-t border-white/10 pt-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="w-1 h-8 bg-cyan-500 rounded-full" />
                    Technical Specifications
                </h2>

                {product.technicalSpecs ? (
                    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/20">
                        <div className="flex flex-col">
                            <SpecRowDetailed label="Processor" value={product.technicalSpecs.processor} idx={0} />
                            <SpecRowDetailed label="Operating System" value={product.technicalSpecs.os} idx={1} />
                            <SpecRowDetailed label="Graphics" value={product.technicalSpecs.graphics} idx={2} />
                            <SpecRowDetailed label="Memory" value={product.technicalSpecs.memory} idx={3} />
                            <SpecRowDetailed label="Storage" value={product.technicalSpecs.storage} idx={4} />
                            <SpecRowDetailed label="Display" value={product.technicalSpecs.display} idx={5} />
                            <SpecRowDetailed label="Ports" value={product.technicalSpecs.ports} idx={6} isList />
                            <SpecRowDetailed label="Connectivity" value={product.technicalSpecs.connectivity} idx={7} />
                            <SpecRowDetailed label="Audio" value={product.technicalSpecs.audio} idx={8} />
                            <SpecRowDetailed label="Webcam" value={product.technicalSpecs.webcam} idx={9} />
                            <SpecRowDetailed label="Battery" value={product.technicalSpecs.battery} idx={10} />
                            <SpecRowDetailed label="Dimensions" value={product.technicalSpecs.dimensions} idx={11} />
                            <SpecRowDetailed label="Weight" value={product.technicalSpecs.weight} idx={12} />
                            <SpecRowDetailed label="Warranty" value={product.technicalSpecs.warranty} idx={13} />
                        </div>
                    </div>
                ) : (
                    /* Fallback to old simple specs if detailed ones aren't available */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/20">
                        <SpecRow label="Processor Cores" value={product.specs?.core_count} idx={0} />
                        <SpecRow label="Graphics Chipset" value={product.specs?.chipset} idx={1} />
                        <SpecRow label="Video Memory (VRAM)" value={product.specs?.vram} idx={2} />
                        <SpecRow label="Memory Type" value={product.specs?.memory_type} idx={3} />
                        <SpecRow label="Memory Slots" value={product.specs?.memory_slots} idx={4} />
                        <SpecRow label="Storage Capacity" value={product.specs?.capacity} idx={5} />
                        <SpecRow label="Display Shield" value={product.specs?.screen} idx={6} />
                        <SpecRow label="Weight" value={product.specs?.weight} idx={7} />
                        {product.specs?.feature && <SpecRow label="Special Feature" value={product.specs?.feature} idx={8} />}
                    </div>
                )}
            </section>

            {/* RELATED PRODUCTS */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-white/10 pt-16 pb-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-8 bg-pink-500 rounded-full" />
                            You Might Also Like
                        </h2>
                        <Link href="/laptops" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm font-medium transition-colors">
                            View all laptops <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedProducts.map((p) => (
                            <LaptopCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function KeySpec({ icon: Icon, label, value, delay }: { icon: any, label: string, value: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
            <Icon className="w-6 h-6 text-cyan-400 mb-2" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">{label}</span>
            <span className="text-sm font-semibold text-white text-center">{value}</span>
        </motion.div>
    );
}

function SpecRow({ label, value, idx }: { label: string; value?: string | number, idx: number }) {
    if (!value) return null;

    return (
        <div className={cn(
            "grid grid-cols-2 px-6 py-4 border-b border-white/5 last:border-0 md:last:border-0",
            idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
        )}>
            <span className="text-zinc-400 font-medium text-sm">{label}</span>
            <span className="text-zinc-100 font-medium text-sm">{value}</span>
        </div>
    );
}

function SpecRowDetailed({ label, value, idx, isList = false }: { label: string; value?: string | string[], idx: number, isList?: boolean }) {
    if (!value) return null;

    return (
        <div className={cn(
            "flex flex-col md:flex-row md:items-start px-6 py-4 border-b border-white/5 last:border-0",
            idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
        )}>
            <span className="text-zinc-400 font-medium text-sm w-full md:w-1/3 mb-1 md:mb-0">{label}</span>
            <div className="text-zinc-100 font-medium text-sm w-full md:w-2/3">
                {isList && Array.isArray(value) ? (
                    <ul className="list-disc list-inside space-y-1">
                        {value.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <span>{value}</span>
                )}
            </div>
        </div>
    );
}
