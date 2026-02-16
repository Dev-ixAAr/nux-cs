"use client";

import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/mockData";
import { useBuilderStore } from "@/store/useBuilderStore";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap, ChevronRight, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { use } from "react";
import { CATEGORIES } from "@/lib/mockData";
import { ComponentCard } from "@/components/products/ComponentCard";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ComponentDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const product = PRODUCTS.find((p) => p.id === id);
    const { addToCart } = useBuilderStore();

    if (!product) {
        notFound();
    }

    const categoryName = CATEGORIES.find(c => c.slug === product.category)?.name || "Component";

    // Helper to format currency
    const formatPrice = (price: number) =>
        new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(price);

    // Default to displaying detailedSpecs if available, otherwise fallback to specs object
    const displaySpecs = product.detailedSpecs ||
        Object.entries(product.specs || {}).reduce((acc, [key, value]) => {
            if (['condition_note', 'socket_support'].includes(key)) return acc;
            acc[key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())] = String(value);
            return acc;
        }, {} as Record<string, string>);

    // Filter related products
    const relatedProducts = PRODUCTS
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen pt-28 pb-20 container mx-auto px-4 max-w-7xl">
            {/* BREADCRUMBS */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/components" className="hover:text-white transition-colors">Components</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-cyan-500 font-medium truncate">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* LEFT COLUMN: IMAGE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white/5 rounded-2xl p-8 md:p-12 flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden group sticky top-24"
                >
                    <div className="relative aspect-square w-full max-w-[500px]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: DETAILS */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                        {product.name}
                    </h1>

                    {/* BADGES ROW */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {/* Stock Status */}
                        {product.stockStatus === 'Out of Stock' ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
                                <X className="w-3.5 h-3.5" /> Out of Stock
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                <Check className="w-3.5 h-3.5" /> In Stock
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="px-3 py-1 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                            {categoryName}
                        </div>

                        {/* Brand Badge */}
                        <div className="px-3 py-1 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                            {product.brand}
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-8 tracking-tight">
                        {formatPrice(product.price)}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 h-14 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 active:translate-y-0"
                        >
                            <ShoppingCart className="w-5 h-5 fill-current" />
                            Add to Cart
                        </button>

                        <a
                            href={`https://wa.me/94771234567?text=Hi, I'm interested in the ${product.name}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-14 rounded-xl bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/5 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] active:scale-95 active:translate-y-0"
                        >
                            <Zap className="w-5 h-5" />
                            Buy Now
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* PRODUCT OVERVIEW & INFO CARDS */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/10 pt-16">

                {/* LEFT COLUMN: DESCRIPTION & FEATURES */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-2"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-cyan-500 w-fit pb-1">Product Overview</h2>

                    {product.description && (
                        <p className="text-zinc-400 leading-relaxed text-lg mb-8">
                            {product.description}
                        </p>
                    )}

                    {product.features && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="mt-1 bg-green-500/20 p-1 rounded-full">
                                        <Check className="w-3 h-3 text-green-400" />
                                    </div>
                                    <span className="text-white font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* RIGHT COLUMN: INFO CARDS */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="sticky top-24 space-y-4">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">3 Years Warranty</h3>
                                <p className="text-sm text-zinc-500">Comprehensive coverage</p>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Island-wide Delivery</h3>
                                <p className="text-sm text-zinc-500">1-3 business days</p>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Secure Payment</h3>
                                <p className="text-sm text-zinc-500">Cash on Delivery / Bank Transfer</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* TECHNICAL SPECIFICATIONS SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden p-6"
            >
                <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-cyan-500 w-fit pb-1">
                    Technical Specifications
                </h2>

                {(!displaySpecs || Object.keys(displaySpecs).length === 0) ? (
                    <div className="text-zinc-500 italic py-8 text-center">
                        No detailed specifications available for this product.
                    </div>
                ) : (
                    <div className="border border-white/10 rounded-lg overflow-hidden">
                        {Object.entries(displaySpecs).map(([key, value], index) => (
                            <div
                                key={key}
                                className={`flex flex-col sm:flex-row p-4 ${index % 2 === 0 ? 'bg-zinc-800/50' : 'bg-transparent'} hover:bg-white/5 transition-colors`}
                            >
                                <span className="w-full sm:w-1/3 text-zinc-400 font-bold uppercase text-sm tracking-wide mb-1 sm:mb-0">
                                    {key}
                                </span>
                                <span className="w-full sm:w-2/3 text-zinc-100 font-medium leading-relaxed break-words">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* RELATED PRODUCTS */}
            {relatedProducts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-12 border-t border-white/10"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-cyan-500 w-fit pb-1">
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {relatedProducts.map((item) => (
                            <ComponentCard key={item.id} product={item} />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
