"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ShoppingCart } from 'lucide-react';
import { NeonButton } from '@/components/ui/neon-button';
import { Product } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedParts: Record<string, { product: Product; quantity: number }[]>;
    totalPrice: number;
}

export function CheckoutModal({ isOpen, onClose, selectedParts, totalPrice }: CheckoutModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleOrder = () => {
        if (!name || !phone) {
            alert("Please enter your name and phone number.");
            return;
        }

        // specific number provided in previous artifacts context or just use a placeholder
        // Using a generic placeholder for now, user can update if needed.
        const SHOP_PHONE = "94771234567";

        let message = `*NEW ORDER - NEXUS PC*\n\n`;
        message += `*Customer:* ${name}\n`;
        message += `*Phone:* ${phone}\n\n`;
        message += `*Build Details:*\n`;

        Object.entries(selectedParts).forEach(([cat, items]) => {
            if (items && items.length > 0) {
                items.forEach(item => {
                    message += `- ${item.product.name} (x${item.quantity})\n`;
                });
            }
        });

        message += `\n*Total Estimate:* LKR ${totalPrice.toLocaleString()}\n`;
        message += `\n--------------------------------\n`;
        message += `I would like to place an order for this build.`;

        const url = `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* MODAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-black border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] rounded-xl w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">

                            {/* HEADER */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                                        <ShoppingCart className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-gaming text-white uppercase tracking-wider">Finalize Order</h2>
                                        <p className="text-xs text-muted-foreground">Review your build and submit</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* BODY */}
                            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">

                                {/* SUMMARY LIST */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wide border-l-2 border-cyan-500 pl-3">Build Summary</h3>
                                    <div className="bg-white/5 rounded-lg p-4 space-y-2 border border-white/5">
                                        {Object.entries(selectedParts).length === 0 ? (
                                            <p className="text-sm text-muted-foreground italic">No parts selected.</p>
                                        ) : (
                                            Object.values(selectedParts).flat().map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-start text-sm">
                                                    <span className="text-gray-300 line-clamp-1 w-[70%]">{item.product.name}</span>
                                                    <span className="text-cyan-400 font-mono">x{item.quantity}</span>
                                                </div>
                                            ))
                                        )}
                                        <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-muted-foreground text-xs uppercase font-bold">Total Estimate</span>
                                            <span className="text-xl font-bold text-white text-glow">
                                                {totalPrice.toLocaleString('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* FORM */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wide border-l-2 border-purple-500 pl-3">Contact Details</h3>
                                    <div className="grid gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-muted-foreground uppercase">Your Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your full name"
                                                className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-white/20"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-muted-foreground uppercase">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="e.g. 077 123 4567"
                                                className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-white/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* FOOTER */}
                            <div className="p-6 border-t border-white/10 bg-white/5 flex flex-col gap-3">
                                <NeonButton
                                    className="w-full justify-center font-bold text-lg h-12"
                                    onClick={handleOrder}
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" /> Order via WhatsApp
                                </NeonButton>
                                <p className="text-[10px] text-center text-muted-foreground">
                                    By clicking order, you will be redirected to WhatsApp to send your build details to our sales team.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
