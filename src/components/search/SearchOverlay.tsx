"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "@/lib/mockData";
import Image from "next/image";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Search Logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const filtered = PRODUCTS.filter((product) => {
            const searchLower = query.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower)
            );
        }).slice(0, 6); // Limit to top 6

        setResults(filtered);
    }, [query]);

    const handleClose = () => {
        setQuery("");
        onClose();
    };

    const POPULAR_SEARCHES = ["RTX 4090", "Gaming Laptop", "Ryzen 7 7800X3D", "Monitor", "DDR5 RAM"];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-md flex flex-col"
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-10 p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <div className="container mx-auto px-4 max-w-4xl pt-24 md:pt-32 flex-1 flex flex-col">

                        {/* Search Input */}
                        <div className="relative mb-12">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for gear..."
                                className="w-full bg-transparent border-b-2 border-white/10 py-4 pl-14 pr-4 text-3xl md:text-5xl font-bold text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500 transition-colors bg-none"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto pb-20">

                            {/* Case 1: Empty Query - Show Popular */}
                            {!query && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Popular Searches</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {POPULAR_SEARCHES.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => setQuery(term)}
                                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm font-medium"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Case 2: No Results */}
                            {query && results.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <p className="text-zinc-500 text-lg">No products found for <span className="text-white font-bold">"{query}"</span></p>
                                </motion.div>
                            )}

                            {/* Case 3: Results Found */}
                            {results.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={product.category === 'laptops' ? `/laptops/${product.id}` : `/components/${product.id}`}
                                            onClick={handleClose}
                                        >
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="group flex items-center gap-4 bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-cyan-500/30 p-4 rounded-xl transition-all"
                                            >
                                                <div className="bg-black p-2 rounded-lg h-16 w-16 shrink-0 border border-white/5">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold truncate group-hover:text-cyan-400 transition-colors">{product.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] uppercase font-bold text-zinc-500 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                                                            {product.category}
                                                        </span>
                                                        <span className="text-cyan-500 text-sm font-mono font-bold">
                                                            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(product.price)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-zinc-700 group-hover:text-cyan-500 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
