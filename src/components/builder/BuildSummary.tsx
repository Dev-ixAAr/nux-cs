"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { X, Printer, Share2, MessageSquare, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { NeonButton } from "@/components/ui/neon-button";
import { useEffect } from "react";

interface BuildSummaryProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BuildSummary({ isOpen, onClose }: BuildSummaryProps) {
    const { selectedParts, totalPrice, estimatedWattage, compatibilityIssues } = useBuilderStore();

    // Prevent scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const hasIssues = compatibilityIssues.length > 0;
    const formatPrice = (price: number) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(price);

    const handlePrint = () => {
        window.print();
    };

    const handleWhatsApp = () => {
        let message = `*My Custom PC Build* %0A%0A`;

        Object.entries(selectedParts).forEach(([category, items]) => {
            if (Array.isArray(items)) {
                items.forEach(item => {
                    message += `- *${category.toUpperCase()}*: ${item.product.name} (x${item.quantity})%0A`;
                });
            }
        });

        message += `%0A*Total Estimate: ${formatPrice(totalPrice)}*`;
        message += `%0A*Est. Wattage: ${estimatedWattage}W*`;

        window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
    };

    const handleShare = () => {
        // For now, just copy the current URL as a placeholder or show a toast
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    // Group items for display
    const allItems = Object.entries(selectedParts).flatMap(([category, items]) =>
        Array.isArray(items)
            ? items.map(item => ({ ...item, category }))
            : []
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto"
                >
                    <div className="min-h-screen py-10 px-4 flex items-center justify-center">

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-4xl bg-white text-black rounded-lg shadow-2xl overflow-hidden print:shadow-none print:w-full print:max-w-none"
                        >
                            {/* Header */}
                            <div className="bg-zinc-900 text-white p-8 flex items-start justify-between print:bg-white print:text-black print:border-b print:border-black">
                                <div>
                                    <h1 className="text-3xl font-black uppercase tracking-widest mb-2">
                                        NEXUS<span className="text-cyan-400 print:text-black">PC</span>
                                    </h1>
                                    <p className="text-zinc-400 print:text-zinc-600 text-sm">Build Configuration Summary</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors print:hidden"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Status Bar */}
                            <div className={`p-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest ${hasIssues ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {hasIssues ? (
                                    <>
                                        <AlertTriangle className="h-5 w-5" />
                                        Compatibility Issues Found
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-5 w-5" />
                                        All Parts Compatible
                                    </>
                                )}
                            </div>

                            {/* Build Table */}
                            <div className="p-8">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                            <th className="py-4">Component</th>
                                            <th className="py-4">Product</th>
                                            <th className="py-4 text-center">Qty</th>
                                            <th className="py-4 text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {allItems.map((item, index) => (
                                            <tr key={`${item.product.id}-${index}`} className="border-b border-zinc-100">
                                                <td className="py-4 font-bold text-zinc-500 uppercase text-xs">{item.category}</td>
                                                <td className="py-4 font-semibold text-zinc-900">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 relative shrink-0 print:hidden">
                                                            <Image src={item.product.image} alt={item.product.name} fill className="object-contain" />
                                                        </div>
                                                        <span>{item.product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-center text-zinc-600">{item.quantity}</td>
                                                <td className="py-4 text-right font-mono font-medium">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-zinc-900">
                                            <td colSpan={2} className="pt-6">
                                                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Estimated Power Draw</p>
                                                <p className="font-mono font-bold text-lg">{estimatedWattage}W</p>
                                            </td>
                                            <td colSpan={2} className="pt-6 text-right">
                                                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Grand Total</p>
                                                <p className="font-mono font-black text-4xl text-cyan-600 print:text-black">{formatPrice(totalPrice)}</p>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Actions Footer */}
                            <div className="bg-zinc-50 p-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <button
                                        onClick={handlePrint}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold uppercase text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm"
                                    >
                                        <Printer className="h-4 w-4" /> Print
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold uppercase text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm"
                                    >
                                        <Share2 className="h-4 w-4" /> Share
                                    </button>
                                </div>

                                <NeonButton
                                    onClick={handleWhatsApp}
                                    className="w-full sm:w-auto px-8"
                                    variant="primary"
                                >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Order via WhatsApp
                                </NeonButton>
                            </div>

                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
