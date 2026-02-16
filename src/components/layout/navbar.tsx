"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, User, Cpu, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";
import { CartDrawer } from "../cart/CartDrawer";
import { SearchOverlay } from "../search/SearchOverlay";
import { NeonButton } from "../ui/neon-button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "PC Builder" },
  { href: "/laptops", label: "Laptops" },
  { href: "/components", label: "Components" },
  { href: "/accessories", label: "Accessories" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cart, toggleCart, compareList } = useBuilderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <CartDrawer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

          {/* LEFT: LOGO */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
              <Cpu className="h-5 w-5 text-cyan-500 animate-pulse" />
            </div>
            <span className="font-heading text-xl font-bold tracking-wider text-white">
              NEXUS<span className="text-cyan-500">PC</span>
            </span>
          </Link>

          {/* CENTER: DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-cyan-400",
                    isActive ? "text-cyan-400" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_var(--cyan-500)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4 z-50">
            {/* SEARCH */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-cyan-400 transition-colors p-2"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* COMPARE */}
            <Link href="/compare" className="relative text-muted-foreground hover:text-cyan-400 transition-colors p-2 hidden sm:block">
              <Scale className="h-5 w-5" />
              {mounted && compareList.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black animate-in zoom-in duration-300">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* USER - Desktop Only */}
            <button className="text-muted-foreground hover:text-cyan-400 transition-colors p-2 hidden md:block">
              <User className="h-5 w-5" />
            </button>

            {/* CART */}
            <button
              onClick={toggleCart}
              className="relative text-muted-foreground hover:text-cyan-400 transition-colors p-2"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && cart.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black animate-in zoom-in duration-300">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="md:hidden text-muted-foreground hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-16 left-0 w-full border-b border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-4 space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium p-2 rounded-lg transition-colors",
                      pathname === link.href
                        ? "bg-white/10 text-cyan-400"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Extra Links */}
                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <Link href="/compare" className="flex items-center gap-3 text-muted-foreground hover:text-white p-2">
                    <Scale className="h-5 w-5" />
                    <span>Compare Products ({mounted ? compareList.length : 0})</span>
                  </Link>
                  <button className="flex items-center gap-3 text-muted-foreground hover:text-white p-2">
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>

                  <Link href="/products/laptops" className="w-full">
                    <NeonButton variant="primary" className="w-full justify-center">
                      Shop Now
                    </NeonButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}