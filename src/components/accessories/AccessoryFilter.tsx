"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface AccessoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    priceRange: number[];
    onPriceChange: (value: number[]) => void;
}

export function AccessoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
    priceRange,
    onPriceChange
}: AccessoryFilterProps) {
    return (
        <aside className="w-full lg:w-64 space-y-8">
            {/* CATEGORIES */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={cn(
                                "whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border",
                                selectedCategory === category
                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                    : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* PRICE RANGE */}
            <div className="hidden lg:block">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Price Range</h3>
                    <span className="text-xs text-cyan-400 font-mono">
                        {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(priceRange[0])}
                    </span>
                </div>

                <Slider
                    value={priceRange}
                    max={500000}
                    step={1000}
                    onValueChange={onPriceChange}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                    <span>0</span>
                    <span>500k+</span>
                </div>
            </div>
        </aside>
    );
}
