"use client";

import { X, MapPin, Phone, Mail, Package, Truck, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export type Order = {
    id: string;
    customer: string;
    email: string;
    phone: string;
    date: string;
    amount: number;
    status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
    items: {
        name: string;
        price: number;
        quantity: number;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        zip: string;
    };
    paymentMethod: "Card" | "Cod" | "Transfer";
};

interface OrderDetailsProps {
    order: Order;
    onClose: () => void;
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm">
            <div className="h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <div>
                        <h2 className="text-xl font-bold text-white font-gaming flex items-center gap-3">
                            ORDER #{order.id}
                            <span className={cn(
                                "text-xs px-2 py-0.5 rounded border uppercase tracking-wider",
                                order.status === "Pending" && "text-yellow-500 border-yellow-900 bg-yellow-950/20",
                                order.status === "Confirmed" && "text-cyan-500 border-cyan-900 bg-cyan-950/20",
                                order.status === "Shipped" && "text-purple-500 border-purple-900 bg-purple-950/20",
                                order.status === "Delivered" && "text-emerald-500 border-emerald-900 bg-emerald-950/20",
                                order.status === "Cancelled" && "text-red-500 border-red-900 bg-red-950/20",
                            )}>
                                {order.status}
                            </span>
                        </h2>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Placed on {order.date}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Customer Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-wider border-b border-zinc-800 pb-2">
                            Customer Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-zinc-500 mt-1" />
                                <div>
                                    <p className="text-sm text-zinc-300 font-medium">{order.shippingAddress.street}</p>
                                    <p className="text-xs text-zinc-500">{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-zinc-300">
                                    <Mail className="w-4 h-4 text-zinc-500" />
                                    {order.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-300">
                                    <Phone className="w-4 h-4 text-zinc-500" />
                                    {order.phone}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-wider border-b border-zinc-800 pb-2 flex justify-between items-center">
                            <span>Purchased Items</span>
                            <span className="text-xs text-zinc-500 font-normal">{order.items.length} Items</span>
                        </h3>
                        <div className="space-y-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-600">
                                            IMG
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.name}</p>
                                            <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-mono text-zinc-300">
                                        {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Subtotal</span>
                            <span>LKR {order.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Shipping</span>
                            <span>LKR 0</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800 mt-2">
                            <span>Total</span>
                            <span className="text-cyan-400">LKR {order.amount.toLocaleString()}</span>
                        </div>
                        <div className="pt-2">
                            <div className="inline-flex items-center gap-2 px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
                                Payment: <span className="text-white font-medium uppercase">{order.paymentMethod}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex gap-3">
                    <button className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <Package className="w-4 h-4" />
                        Print Invoice
                    </button>
                    {(order.status === "Pending" || order.status === "Confirmed") && (
                        <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_-3px_rgba(8,145,178,0.5)]">
                            <Truck className="w-4 h-4" />
                            Mark as Shipped
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
