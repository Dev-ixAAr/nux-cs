"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { X, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export function CartDrawer() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, getCartTotal, addOrder, clearCart } = useBuilderStore();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isCartOpen]);

    const total = getCartTotal();
    const formatPrice = (price: number) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(price);

    const handleCheckout = () => {
        // 1. Create Order Object
        const newOrder = {
            id: `#ORD-${Date.now().toString().slice(-6)}`,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            items: [...cart],
            total: total,
            status: 'Processing' as const,
        };

        // 2. Save to Store
        addOrder(newOrder);

        // 3. Generate WhatsApp Link
        const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('%0A');
        const totalText = `Total: ${formatPrice(total)}`;
        const message = `Hi, I want to confirm my order:%0A%0AOrder ID: ${newOrder.id}%0A%0A${itemsList}%0A%0A${totalText}%0A%0APlease confirm availability.`;

        // 4. Open WhatsApp
        window.open(`https://wa.me/94771234567?text=${message}`, '_blank');

        // 5. Clear Cart & Close
        clearCart();
        toggleCart();
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[70] h-full w-full max-w-md border-l border-white/10 bg-zinc-950 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/10 p-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-cyan-500" />
                                Your Cart
                                <span className="text-zinc-500 text-sm font-normal">({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="h-20 w-20 rounded-full bg-zinc-900/50 flex items-center justify-center">
                                        <ShoppingCart className="h-10 w-10 text-zinc-700" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-white">Your cart is empty</p>
                                        <p className="text-zinc-500 text-sm">Looks like you haven't added any gear yet.</p>
                                    </div>
                                    <button onClick={toggleCart} className="text-cyan-500 hover:text-cyan-400 font-bold text-sm uppercase tracking-widest mt-4">
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex gap-4 rounded-xl bg-zinc-900/50 p-3 border border-white/5 hover:border-cyan-500/20 transition-colors"
                                    >
                                        {/* Image */}
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black border border-white/5 p-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-1 flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold text-white line-clamp-1 text-sm">{item.name}</h4>
                                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mt-1">{item.category}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-cyan-400 font-mono font-bold text-sm">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>

                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 bg-black rounded-lg px-2 py-1 border border-white/10">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="text-zinc-500 hover:text-white transition-colors px-1"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold w-3 text-center text-white">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="text-zinc-500 hover:text-white transition-colors px-1"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-zinc-500 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-white/10 p-6 bg-black/50 backdrop-blur-md">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Total</span>
                                    <span className="text-2xl font-black text-white font-mono">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                >
                                    Order via WhatsApp
                                </button>
                                <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase tracking-widest font-bold">
                                    Secure Checkout powered by WhatsApp
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
