"use client";

import { useState } from "react";
import {
    Search,
    ShoppingCart,
    Trash2,
    CreditCard,
    Printer,
    User,
    Plus,
    Minus,
    Receipt,
    Banknote,
    QrCode
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data Types
type POSProduct = {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
};

type CartItem = POSProduct & {
    quantity: number;
};

const MOCK_PRODUCTS: POSProduct[] = [
    { id: "1", name: "RTX 4090 Gaming OC", price: 650000, stock: 2, image: "/placeholder-gpu.png", category: "GPU" },
    { id: "2", name: "Intel i9-14900K", price: 210000, stock: 15, image: "/placeholder-cpu.png", category: "CPU" },
    { id: "3", name: "Samsung 990 Pro 2TB", price: 65000, stock: 8, image: "/placeholder-ssd.png", category: "Storage" },
    { id: "4", name: "Corsair RM1000x", price: 72000, stock: 5, image: "/placeholder-psu.png", category: "PSU" },
    { id: "5", name: "Lian Li O11 Dynamic", price: 55000, stock: 3, image: "/placeholder-case.png", category: "Case" },
    { id: "6", name: "DDR5 32GB Kit", price: 45000, stock: 12, image: "/placeholder-ram.png", category: "RAM" },
    { id: "7", name: "RTX 4070 Ti", price: 320000, stock: 4, image: "/placeholder-gpu.png", category: "GPU" },
    { id: "8", name: "Ryzen 7 7800X3D", price: 165000, stock: 10, image: "/placeholder-cpu.png", category: "CPU" },
];

export default function POSPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Computed
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0; // Assuming tax included or 0 for now
    const total = subtotal + tax;

    // Filter Logic
    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Cart Actions
    const addToCart = (product: POSProduct) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) return prev; // Check stock limit
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                if (newQty < 1) return item;
                if (newQty > item.stock) return item;
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;
        if (confirm(`Process payment of LKR ${total.toLocaleString()}?`)) {
            alert("Payment Processed Successfully!");
            setCart([]);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6 overflow-hidden">
            {/* LEFT: Product Grid */}
            <div className="flex-1 flex flex-col gap-6 h-full">
                {/* Search Bar */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex gap-4 backdrop-blur-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Scan Barcode or Search Product..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {["All", "GPU", "CPU", "RAM", "Storage", "Case", "PSU"].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                    selectedCategory === cat
                                        ? "bg-cyan-950/50 text-cyan-400 border border-cyan-900/50"
                                        : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-20">
                    {filteredProducts.map(product => (
                        <button
                            key={product.id}
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className={cn(
                                "group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left hover:border-cyan-500/30 hover:bg-zinc-800 transition-all relative overflow-hidden",
                                product.stock === 0 && "opacity-50 cursor-not-allowed grayscale"
                            )}
                        >
                            <div className="aspect-square bg-zinc-950 rounded-lg mb-3 flex items-center justify-center text-zinc-700 font-mono text-xs overflow-hidden relative">
                                {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-red-500 font-bold -rotate-12 border-2 border-red-500 px-2 py-1 rounded">SOLD OUT</span>
                                    </div>
                                )}
                                IMG
                            </div>
                            <h3 className="text-sm font-medium text-zinc-200 line-clamp-2 h-10 group-hover:text-cyan-400 transition-colors">
                                {product.name}
                            </h3>
                            <div className="mt-2 flex items-end justify-between w-full">
                                <p className="font-mono text-cyan-500 font-bold">
                                    {product.price.toLocaleString()}
                                </p>
                                <span className={cn("text-[10px]", product.stock < 5 ? "text-red-400" : "text-zinc-500")}>
                                    Qty: {product.stock}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT: Cart Panel */}
            <div className="w-[400px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl h-full">
                {/* Header */}
                <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                    <h2 className="font-bold text-white flex items-center gap-2 font-gaming tracking-wide">
                        <ShoppingCart className="w-5 h-5 text-cyan-500" />
                        CURRENT ORDER
                    </h2>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <User className="w-4 h-4" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                            <ShoppingCart className="w-12 h-12 opacity-20" />
                            <p className="text-sm font-medium">Cart is empty</p>
                            <p className="text-xs text-center max-w-[200px]">Scan products or select from the grid to add items.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-3 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800 group">
                                <div className="w-12 h-12 bg-zinc-900 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] text-zinc-600">
                                    IMG
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                                    <p className="text-xs text-cyan-500 font-mono mt-0.5">
                                        {item.price.toLocaleString()} <span className="text-zinc-500">x {item.quantity}</span>
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center bg-zinc-900 rounded-md border border-zinc-800">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 hover:text-cyan-400 text-zinc-500"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-6 text-center text-xs font-mono text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 hover:text-cyan-400 text-zinc-500"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <p className="text-xs font-bold text-white font-mono">
                                        {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-zinc-600 hover:text-red-500 self-center pl-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                <div className="border-t border-zinc-800 bg-zinc-950 p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Subtotal</span>
                            <span>LKR {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Tax (0%)</span>
                            <span>LKR {tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-zinc-800">
                            <span>Total Pay</span>
                            <span className="text-cyan-400 font-mono">LKR {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800 transition-colors gap-1 text-zinc-400 hover:text-white">
                            <Banknote className="w-5 h-5" />
                            <span className="text-[10px] uppercase font-bold">Cash</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800 transition-colors gap-1 text-zinc-400 hover:text-white">
                            <CreditCard className="w-5 h-5" />
                            <span className="text-[10px] uppercase font-bold">Card</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800 transition-colors gap-1 text-zinc-400 hover:text-white">
                            <QrCode className="w-5 h-5" />
                            <span className="text-[10px] uppercase font-bold">Transfer</span>
                        </button>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_-5px_rgba(8,145,178,0.5)] transition-all flex items-center justify-center gap-2"
                    >
                        <Printer className="w-5 h-5" />
                        COMPLETE ORDERS
                    </button>
                </div>
            </div>
        </div>
    );
}
