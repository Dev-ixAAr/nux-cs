"use client";

import { useState, useMemo } from "react";
import { ACCESSORIES, Accessory } from "@/lib/mockData";
import { AccessoryCard } from "@/components/accessories/AccessoryCard";
import { AccessoryFilter } from "@/components/accessories/AccessoryFilter";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AccessoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([500000]); // Max price

    // Function to get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(ACCESSORIES.map(a => a.category)));
        return ["All", ...cats];
    }, []);

    // Filter Logic
    const filteredAccessories = useMemo(() => {
        return ACCESSORIES.filter((accessory) => {
            const matchesCategory = selectedCategory === "All" || accessory.category === selectedCategory;
            const matchesPrice = accessory.price <= priceRange[0];
            return matchesCategory && matchesPrice;
        });
    }, [selectedCategory, priceRange]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Accessories</h1>
                    <p className="text-zinc-400">Upgrade your setup with premium peripherals.</p>
                </div>

                {/* MOBILE FILTER TRIGGER */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="lg:hidden w-full md:w-auto border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-zinc-950 border-white/10 w-[300px] pt-12">
                        <AccessoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* DESKTOP SIDEBAR */}
                <div className="hidden lg:block">
                    <div className="sticky top-24">
                        <AccessoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                        />
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <div className="flex-1">
                    {filteredAccessories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAccessories.map((accessory) => (
                                <AccessoryCard key={accessory.id} accessory={accessory} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-zinc-400 text-lg">No accessories found matching your criteria.</p>
                            <Button
                                variant="link"
                                className="text-cyan-400 mt-2"
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setPriceRange([500000]);
                                }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
