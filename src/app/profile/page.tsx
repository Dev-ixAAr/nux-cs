"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, Heart, LogOut, MapPin, Mail, Phone, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData"; // For Wishlist Mock
import { NeonButton } from "@/components/ui/neon-button";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const MOCK_USER = {
    firstName: "Kasun",
    lastName: "Perera",
    email: "kasun@example.com",
    phone: "+94 77 123 4567",
    address: "No. 45, Temple Road, Colombo 03",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150",
};

const MOCK_ORDERS = [
    {
        id: "#1024",
        date: "Feb 15, 2024",
        total: "LKR 120,000",
        status: "Processing",
        items: ["MSI GeForce RTX 4060"],
    },
    {
        id: "#1023",
        date: "Jan 28, 2024",
        total: "LKR 45,000",
        status: "Delivered",
        items: ["Corsair Vengeance 32GB RAM", "Samsung 980 Pro 1TB"],
    },
    {
        id: "#1018",
        date: "Dec 10, 2023",
        total: "LKR 285,000",
        status: "Delivered",
        items: ["ASUS TUF Gaming F15"],
    },
];

// Reusing a simplified product card for wishlist
const WishlistCard = ({ product }: { product: any }) => (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="aspect-[4/3] w-full overflow-hidden bg-white/5 p-4">
            <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div className="p-4">
            <h3 className="line-clamp-1 text-lg font-bold text-white group-hover:text-cyan-400">
                {product.name}
            </h3>
            <p className="text-sm text-zinc-400">{product.brand}</p>
            <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-lg font-bold text-cyan-400">
                    LKR {product.price.toLocaleString()}
                </span>
                <button className="rounded-full bg-cyan-500/10 p-2 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors">
                    <ShoppingBag className="h-4 w-4" />
                </button>
            </div>
        </div>
        <button className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-red-500 backdrop-blur-sm hover:bg-red-500 hover:text-white transition-colors">
            <Heart className="h-4 w-4 fill-current" />
        </button>
    </div>
);

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist">("profile");
    const [loading, setLoading] = useState(false);
    const { orders } = useBuilderStore();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
                        My <span className="text-cyan-500">Dashboard</span>
                    </h1>
                    <p className="mt-2 text-zinc-400">Manage your profile, orders, and saved items.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

                    {/* SIDEBAR */}
                    <div className="h-fit rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm lg:col-span-1">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                <img src={MOCK_USER.avatar} alt="User Avatar" className="h-full w-full object-cover" />
                            </div>
                            <h2 className="text-xl font-bold text-white">{MOCK_USER.firstName} {MOCK_USER.lastName}</h2>
                            <p className="text-sm text-zinc-500">{MOCK_USER.email}</p>
                        </div>

                        <nav className="mt-8 space-y-2">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all",
                                    activeTab === "profile"
                                        ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <User className="h-4 w-4" />
                                My Profile
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all",
                                    activeTab === "orders"
                                        ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Package className="h-4 w-4" />
                                My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab("wishlist")}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all",
                                    activeTab === "wishlist"
                                        ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Heart className="h-4 w-4" />
                                Wishlist
                            </button>

                            <div className="my-4 h-px bg-white/10" />

                            <button className="flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {activeTab === "profile" && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 md:p-8"
                                >
                                    <h3 className="mb-6 text-xl font-bold text-white">Personal Information</h3>
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-zinc-400">First Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={MOCK_USER.firstName}
                                                    className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-zinc-400">Last Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={MOCK_USER.lastName}
                                                    className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-zinc-400">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                                                    <input
                                                        type="email"
                                                        defaultValue={MOCK_USER.email}
                                                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-zinc-400">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                                                    <input
                                                        type="tel"
                                                        defaultValue={MOCK_USER.phone}
                                                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Shipping Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                                                <textarea
                                                    defaultValue={MOCK_USER.address}
                                                    rows={3}
                                                    className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <NeonButton variant="primary" className="px-8">
                                                {loading ? "Saving..." : "Save Changes"}
                                            </NeonButton>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {activeTab === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    {orders.length === 0 ? (
                                        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-12 text-center text-zinc-500">
                                            <Package className="mx-auto mb-4 h-12 w-12 opacity-50" />
                                            <h3 className="text-lg font-bold text-white">No orders yet</h3>
                                            <p>Start building your dream PC to see orders here.</p>
                                            <Link href="/builder" className="mt-4 inline-block text-cyan-500 hover:underline">
                                                Go to Builder
                                            </Link>
                                        </div>
                                    ) : (
                                        orders.map((order) => (
                                            <div key={order.id} className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-white/20">
                                                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-lg font-bold text-white">Order {order.id}</h3>
                                                            <span className={cn(
                                                                "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                                                order.status === "Completed"
                                                                    ? "bg-green-500/10 text-green-400"
                                                                    : "bg-yellow-500/10 text-yellow-400"
                                                            )}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-zinc-500">{order.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-cyan-400">
                                                            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(order.total)}
                                                        </p>
                                                        <Link href="#" className="flex items-center justify-end gap-1 text-xs text-zinc-400 hover:text-white">
                                                            View Details <ArrowRight className="h-3 w-3" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="border-t border-white/5 pt-4">
                                                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Items</p>
                                                    <ul className="list-inside list-disc space-y-1 text-sm text-zinc-300">
                                                        {order.items.map((item, idx) => (
                                                            <li key={idx}>{item.name} (x{item.quantity})</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "wishlist" && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {PRODUCTS.slice(0, 5).map((product) => (
                                            <WishlistCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}
