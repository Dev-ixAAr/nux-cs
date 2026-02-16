"use client";

import { useMemo, useState } from 'react';
import { PRODUCTS } from '@/lib/mockData';
import { LaptopCard } from '@/components/features/laptops/laptop-card';
import { LaptopFilterSidebar } from '@/components/features/laptops/laptop-filter-sidebar';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

export default function LaptopsPage() {
    // Filter State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
    const [selectedGpus, setSelectedGpus] = useState<string[]>([]);
    const [selectedRam, setSelectedRam] = useState<string[]>([]);

    // Toggle Helpers
    const toggleSelection = (item: string, current: string[], setFunction: (val: string[]) => void) => {
        if (current.includes(item)) {
            setFunction(current.filter(i => i !== item));
        } else {
            setFunction([...current, item]);
        }
    };

    const clearAllFilters = () => {
        setPriceRange([0, 2000000]);
        setSelectedBrands([]);
        setSelectedProcessors([]);
        setSelectedGpus([]);
        setSelectedRam([]);
    };

    // Filter Logic
    const laptops = useMemo(() => {
        return PRODUCTS.filter(p => {
            if (p.category !== 'laptops') return false;

            // 1. Price
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

            // 2. Brand
            if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

            // Helper to check specs
            const specs = p.technicalSpecs || {};
            const simpleSpecs = p.specs || {};

            // 3. Processor (Partial Match)
            if (selectedProcessors.length > 0) {
                const cpu = (specs.processor || simpleSpecs.chipset || '').toLowerCase();
                const hasMatch = selectedProcessors.some(proc => cpu.includes(proc.toLowerCase()));
                if (!hasMatch) return false;
            }

            // 4. GPU (Partial Match)
            if (selectedGpus.length > 0) {
                const gpu = (specs.graphics || simpleSpecs.gpuShort || '').toLowerCase();
                const hasMatch = selectedGpus.some(g => gpu.includes(g.toLowerCase()));
                if (!hasMatch) return false;
            }

            // 5. RAM (Partial Match)
            if (selectedRam.length > 0) {
                const ram = (specs.memory || simpleSpecs.ramShort || '').toLowerCase();
                const hasMatch = selectedRam.some(r => ram.includes(r.toLowerCase()));
                if (!hasMatch) return false;
            }

            return true;
        });
    }, [priceRange, selectedBrands, selectedProcessors, selectedGpus, selectedRam]);

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 max-w-[1920px]">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight"
                    >
                        GAMING <span className="text-cyan-500">LAPTOPS</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl"
                    >
                        High-performance machines for gaming and creation.
                    </motion.p>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 border border-white/10 rounded-lg text-white font-bold"
                >
                    <Filter className="w-5 h-5" />
                    Filters
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <LaptopFilterSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedBrands={selectedBrands}
                    toggleBrand={(b) => toggleSelection(b, selectedBrands, setSelectedBrands)}
                    selectedProcessors={selectedProcessors}
                    toggleProcessor={(p) => toggleSelection(p, selectedProcessors, setSelectedProcessors)}
                    selectedGpus={selectedGpus}
                    toggleGpu={(g) => toggleSelection(g, selectedGpus, setSelectedGpus)}
                    selectedRam={selectedRam}
                    toggleRam={(r) => toggleSelection(r, selectedRam, setSelectedRam)}
                    clearAll={clearAllFilters}
                />

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {laptops.map((laptop) => (
                            <LaptopCard key={laptop.id} product={laptop} />
                        ))}
                    </div>

                    {laptops.length === 0 && (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                            <p className="text-zinc-500 text-lg mb-4">No laptops match your filters.</p>
                            <button
                                onClick={clearAllFilters}
                                className="text-cyan-500 hover:text-cyan-400 font-bold underline underline-offset-4"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
