"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Filter, X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LaptopFilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    priceRange: [number, number];
    setPriceRange: (vals: [number, number]) => void;
    selectedBrands: string[];
    toggleBrand: (brand: string) => void;
    selectedProcessors: string[];
    toggleProcessor: (processor: string) => void;
    selectedGpus: string[];
    toggleGpu: (gpu: string) => void;
    selectedRam: string[];
    toggleRam: (ram: string) => void;
    clearAll: () => void;
}

const BRANDS = ["MSI", "ASUS", "RAZER", "LENOVO", "DELL", "HP"];
const PROCESSORS = ["Core i9", "Core i7", "Core i5", "Ryzen 9", "Ryzen 7", "Ryzen 5"];
const GPUS = ["RTX 4090", "RTX 4080", "RTX 4070", "RTX 4060", "RTX 4050", "RTX 3050"];
const RAM_OPTIONS = ["8GB", "16GB", "32GB", "64GB"];

// Reusable Filter Section Component
function FilterSection({
    title,
    children,
    defaultOpen = true
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-white/5 py-4 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full group mb-2"
            >
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{title}</h3>
                {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 pb-1 space-y-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function LaptopFilterSidebar({
    isOpen,
    onClose,
    priceRange,
    setPriceRange,
    selectedBrands,
    toggleBrand,
    selectedProcessors,
    toggleProcessor,
    selectedGpus,
    toggleGpu,
    selectedRam,
    toggleRam,
    clearAll
}: LaptopFilterSidebarProps) {

    return (
        <>
            {/* OVERLAY for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR CONTENT */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-white/10 p-6 shadow-2xl transition-transform duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent md:translate-x-0 md:static md:h-[calc(100vh-80px)] md:sticky md:top-24 md:w-64 md:bg-transparent md:border-0 md:p-0 md:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>

                {/* HEADER (Mobile Only) */}
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <h2 className="text-xl font-bold font-gaming uppercase tracking-widest text-white">Filters</h2>
                    <button onClick={onClose} className="p-2 text-muted-foreground hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* CLEAR ALL BUTTON */}
                <div className="mb-6">
                    <button
                        onClick={clearAll}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all text-sm font-medium text-zinc-400"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear All Filters
                    </button>
                </div>

                <div className="space-y-1">
                    {/* PRICE FILTER */}
                    <FilterSection title="Price Range">
                        <div className="px-1">
                            <Slider
                                defaultValue={[0, 2000000]}
                                max={2000000}
                                step={50000}
                                value={priceRange}
                                onValueChange={(val: number[]) => setPriceRange(val as [number, number])}
                                className="mb-4 pt-4"
                            />
                            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500 font-bold">
                                <span>{(priceRange[0] / 1000).toFixed(0)}K</span>
                                <span>{(priceRange[1] / 1000).toFixed(0)}K+ LKR</span>
                            </div>
                        </div>
                    </FilterSection>

                    {/* BRAND FILTER */}
                    <FilterSection title="Brand">
                        {BRANDS.map(brand => (
                            <div key={brand} className="flex items-center space-x-3 group/item">
                                <Checkbox
                                    id={`brand-${brand}`}
                                    checked={selectedBrands.includes(brand)}
                                    onCheckedChange={() => toggleBrand(brand)}
                                    className="border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                />
                                <label
                                    htmlFor={`brand-${brand}`}
                                    className="text-sm font-medium leading-none text-zinc-400 group-hover/item:text-white transition-colors cursor-pointer w-full py-1"
                                >
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </FilterSection>

                    {/* PROCESSOR FILTER */}
                    <FilterSection title="Processor">
                        {PROCESSORS.map(cpu => (
                            <div key={cpu} className="flex items-center space-x-3 group/item">
                                <Checkbox
                                    id={`cpu-${cpu}`}
                                    checked={selectedProcessors.includes(cpu)}
                                    onCheckedChange={() => toggleProcessor(cpu)}
                                    className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                />
                                <label
                                    htmlFor={`cpu-${cpu}`}
                                    className="text-sm font-medium leading-none text-zinc-400 group-hover/item:text-white transition-colors cursor-pointer w-full py-1"
                                >
                                    {cpu}
                                </label>
                            </div>
                        ))}
                    </FilterSection>

                    {/* GPU FILTER */}
                    <FilterSection title="Graphics Card (GPU)">
                        {GPUS.map(gpu => (
                            <div key={gpu} className="flex items-center space-x-3 group/item">
                                <Checkbox
                                    id={`gpu-${gpu}`}
                                    checked={selectedGpus.includes(gpu)}
                                    onCheckedChange={() => toggleGpu(gpu)}
                                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                />
                                <label
                                    htmlFor={`gpu-${gpu}`}
                                    className="text-sm font-medium leading-none text-zinc-400 group-hover/item:text-white transition-colors cursor-pointer w-full py-1"
                                >
                                    {gpu}
                                </label>
                            </div>
                        ))}
                    </FilterSection>

                    {/* RAM FILTER */}
                    <FilterSection title="Memory (RAM)">
                        {RAM_OPTIONS.map(ram => (
                            <div key={ram} className="flex items-center space-x-3 group/item">
                                <Checkbox
                                    id={`ram-${ram}`}
                                    checked={selectedRam.includes(ram)}
                                    onCheckedChange={() => toggleRam(ram)}
                                    className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                />
                                <label
                                    htmlFor={`ram-${ram}`}
                                    className="text-sm font-medium leading-none text-zinc-400 group-hover/item:text-white transition-colors cursor-pointer w-full py-1"
                                >
                                    {ram}
                                </label>
                            </div>
                        ))}
                    </FilterSection>
                </div>
            </aside>
        </>
    );
}
