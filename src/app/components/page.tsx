"use client";

import { PRODUCTS } from "@/lib/mockData";
import { useState, useMemo, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { ComponentCard } from "@/components/products/ComponentCard";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

// Filter Mapping matching the user's request
const FILTERS = [
    { label: "All", slug: "all" },
    { label: "Processor", slug: "processors" },
    { label: "Motherboard", slug: "motherboards" },
    { label: "Graphic Card", slug: "graphics-cards" },
    { label: "Memory", slug: "memory" },
    { label: "Storage", slug: "storage" },
    { label: "Power Supply", slug: "power-supply" },
    { label: "Case", slug: "pc-cases" },
    { label: "Cooler", slug: "coolers" },
    { label: "Thermal Paste", slug: "thermal-paste" },
    { label: "Monitor", slug: "monitors" },
    { label: "Accessories", slug: "accessories" }
];

function ComponentsContent() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [conditionFilter, setConditionFilter] = useState<"all" | "new" | "used">("all");
    const searchParams = useSearchParams();

    // Handle URL Params for Category
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const matchedFilter = FILTERS.find(f => f.slug === categoryParam);
            if (matchedFilter) {
                setActiveFilter(matchedFilter.slug);
            }
        }
    }, [searchParams]);

    // Filter Products
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesCategory = activeFilter === "all" || product.category === activeFilter;
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.brand.toLowerCase().includes(search.toLowerCase());
            const matchesCondition = conditionFilter === "all" || product.condition === conditionFilter;
            return matchesCategory && matchesSearch && matchesCondition;
        });
    }, [activeFilter, search, conditionFilter]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-2">
                        PC Components
                    </h1>
                    <p className="text-zinc-400">Browse our selection of premium parts.</p>
                </div>

                {/* SEARCH */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search for components..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-zinc-600"
                    />
                </div>
            </div>

            {/* FILTER FILTER BAR (SCROLLABLE) */}
            <div className="space-y-6 mb-10">
                {/* CATEGORIES */}
                <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex items-center gap-2 min-w-max">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.slug}
                                onClick={() => setActiveFilter(filter.slug)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                    activeFilter === filter.slug
                                        ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
                                        : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONDITION TOGGLE */}
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg w-fit border border-white/10">
                    <button
                        onClick={() => setConditionFilter("all")}
                        className={cn(
                            "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                            conditionFilter === "all"
                                ? "bg-zinc-700 text-white shadow-sm"
                                : "text-zinc-400 hover:text-white"
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setConditionFilter("new")}
                        className={cn(
                            "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                            conditionFilter === "new"
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_-2px_rgba(6,182,212,0.3)]"
                                : "text-zinc-400 hover:text-white"
                        )}
                    >
                        Brand New
                    </button>
                    <button
                        onClick={() => setConditionFilter("used")}
                        className={cn(
                            "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                            conditionFilter === "used"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-[0_0_10px_-2px_rgba(245,158,11,0.3)]"
                                : "text-zinc-400 hover:text-white"
                        )}
                    >
                        Used
                    </button>
                </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="min-h-[400px]">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/20">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-zinc-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No components found</h3>
                        <p className="text-zinc-500 max-w-md">
                            Try adjusting your search or filters.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setActiveFilter("all"); setConditionFilter("all"); }}
                            className="mt-6 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ComponentCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ComponentsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ComponentsContent />
        </Suspense>
    );
}
