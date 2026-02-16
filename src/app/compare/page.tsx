"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart, AlertCircle, Scale, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";

// Define the comparison rows configuration
const COMPARE_ROWS = [
    { label: 'Price', key: 'price', isPrice: true },
    { label: 'Brand', key: 'brand' },
    { label: 'Processor', key: 'technicalSpecs.processor' },
    { label: 'Graphics (GPU)', key: 'technicalSpecs.graphics' },
    { label: 'Memory (RAM)', key: 'technicalSpecs.memory' },
    { label: 'Storage', key: 'technicalSpecs.storage' },
    { label: 'Display', key: 'technicalSpecs.display' },
    { label: 'Operating System', key: 'technicalSpecs.os' },
    { label: 'Ports', key: 'technicalSpecs.ports', isList: true },
    { label: 'Battery', key: 'technicalSpecs.battery' },
    { label: 'Weight', key: 'technicalSpecs.weight' },
    { label: 'Warranty', key: 'technicalSpecs.warranty' },
];

export default function ComparePage() {
    const { compareList, removeFromCompare, addToCart, clearCompare } = useBuilderStore();

    // Helper to safely access nested properties
    const getValue = (item: any, path: string) => {
        return path.split('.').reduce((obj, key) => obj?.[key], item);
    };

    if (compareList.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
                    <Scale className="w-10 h-10 text-zinc-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Compare Products</h1>
                <p className="text-zinc-500 mb-8 text-center max-w-md">
                    You haven't added any products to compare yet. Browse our products and click the scale icon to add them here.
                </p>
                <div className="flex gap-4">
                    <Link href="/laptops">
                        <NeonButton variant="primary">Browse Laptops</NeonButton>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                        Compare Specs
                    </h1>
                    <p className="text-zinc-400">Detailed side-by-side comparison.</p>
                </div>
                <button
                    onClick={clearCompare}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                </button>
            </div>

            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <table className="w-full min-w-[1000px] border-collapse text-left">
                    <thead>
                        <tr>
                            {/* Sticky Top-Left Corner */}
                            <th className="p-4 w-64 bg-black/90 border-b border-white/10 sticky left-0 top-0 z-20 backdrop-blur-md shadow-[4px_0_24px_-2px_rgba(0,0,0,0.5)]">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-xs">Product Details</span>
                            </th>

                            {/* Product Headers */}
                            {compareList.map(product => (
                                <th key={product.id} className="p-4 w-96 min-w-[300px] border-b border-white/10 align-top bg-black/80 backdrop-blur-sm sticky top-0 z-10">
                                    <div className="flex flex-col h-full relative group">
                                        <button
                                            onClick={() => removeFromCompare(product.id)}
                                            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                                            title="Remove"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        <div className="relative aspect-[16/10] w-full mb-4 bg-white/5 rounded-lg p-4 border border-white/5">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 min-h-[3.5rem] leading-tight">
                                            {product.name}
                                        </h3>

                                        <div className="mt-auto pt-4">
                                            <NeonButton
                                                variant="primary"
                                                className="w-full text-xs h-9"
                                                onClick={() => addToCart(product)}
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                                                Add to Cart
                                            </NeonButton>
                                        </div>
                                    </div>
                                </th>
                            ))}

                            {/* Empty Slot Placeholder */}
                            {compareList.length < 3 && (
                                <th className="p-4 w-96 min-w-[300px] border-b border-white/10 align-middle text-center bg-transparent text-zinc-600 border-l border-white/5 border-dashed">
                                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                            <Plus className="w-8 h-8" />
                                        </div>
                                        <span className="text-sm font-medium">Add Product</span>
                                    </div>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {COMPARE_ROWS.map((row, index) => (
                            <tr key={row.key} className="group odd:bg-white/[0.02] even:bg-transparent hover:bg-white/[0.04] transition-colors">
                                {/* Sticky Row Label */}
                                <td className="p-4 text-zinc-400 font-medium sticky left-0 z-10 bg-black/95 group-odd:bg-black/95 backdrop-blur-md border-r border-white/5 shadow-[4px_0_24px_-2px_rgba(0,0,0,0.5)]">
                                    {row.label}
                                </td>

                                {/* Product Data Cells */}
                                {compareList.map(product => {
                                    const value = getValue(product, row.key);

                                    return (
                                        <td key={product.id} className="p-4 align-top text-sm">
                                            {row.isPrice ? (
                                                <span className="text-cyan-400 font-mono font-bold text-xl">
                                                    {value ? new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(value) : '-'}
                                                </span>
                                            ) : row.isList ? (
                                                Array.isArray(value) ? (
                                                    <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-300">
                                                        {value.map((item: string, i: number) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span className="text-zinc-500 italic">None listed</span>
                                                )
                                            ) : (
                                                <span className={cn(
                                                    "text-zinc-300",
                                                    !value && "text-zinc-600 italic"
                                                )}>
                                                    {value || '-'}
                                                </span>
                                            )}
                                        </td>
                                    );
                                })}

                                {compareList.length < 3 && <td className="border-l border-white/5 border-dashed" />}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
