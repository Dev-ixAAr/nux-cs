"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/shared/ProductCard";

export function FeaturedSection() {
  return (
    <section className="relative py-24 bg-black">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">

        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-gaming text-3xl font-black uppercase tracking-widest text-white md:text-4xl text-glow">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Drops</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
              Limited edition hardware & high-performance gears
            </p>
          </div>

          <Link
            href="/products"
            className="group flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan-400"
          >
            View All Collection
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/components/${product.id}`}
              className="group block h-full"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {/* Mobile View All Button (visible only on small screens) */}
        <div className="mt-8 md:hidden">
          <Link
            href="/products"
            className="flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}