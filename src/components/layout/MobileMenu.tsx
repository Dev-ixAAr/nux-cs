"use client";

import Link from "next/link";
import { X, Facebook, Instagram, Phone, Mail, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Laptops", href: "/laptops" },
    { name: "Components", href: "/components" },
    { name: "PC Builder", href: "/builder" },
    { name: "Accessories", href: "/accessories" },
    { name: "Contact", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    // Prevent scrolling when menu is open
    if (typeof window !== "undefined") {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-zinc-950 p-6 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-heading text-xl font-bold text-white">
                                ELITE <span className="text-cyan-500"> LAPTOPS</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex-1 flex flex-col gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Footer Actions */}
                        <div className="mt-8 space-y-6 pt-6 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/login"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-bold text-white hover:bg-zinc-800 border border-white/5"
                                >
                                    <LogIn className="h-4 w-4" />
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 py-3 text-sm font-bold text-black hover:bg-cyan-400"
                                >
                                    Sign Up
                                </Link>
                            </div>

                            {/* Social Icons */}
                            <div className="flex justify-center gap-6 text-zinc-500">
                                <a href="#" className="hover:text-cyan-500 transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-cyan-500 transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-cyan-500 transition-colors">
                                    {/* TikTok Icon placeholder using plain SVG or generic icon if preferred, but reusing existing styles */}
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="0"
                                        className="h-5 w-5"
                                    >
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
