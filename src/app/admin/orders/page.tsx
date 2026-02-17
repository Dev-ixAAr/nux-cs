"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Clock,
    Truck,
    Package,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

import { OrderDetails, Order } from "@/components/admin/OrderDetails";

// Mock Data Types - Replaced by import
// type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
// type Order = ...

const INITIAL_ORDERS: Order[] = [
    {
        id: "ORD-7829",
        customer: "Alex Chen",
        email: "alex.c@example.com",
        phone: "+94 77 123 4567",
        date: "2024-03-10",
        amount: 350000,
        status: "Pending",
        paymentMethod: "Card",
        shippingAddress: { street: "123 Tech Lane", city: "Colombo 03", zip: "00300" },
        items: [
            { name: "RTX 4090", price: 290000, quantity: 1 },
            { name: "Ryzen 9 7950X", price: 60000, quantity: 1 }
        ]
    },
    {
        id: "ORD-7828",
        customer: "Sarah Miller",
        email: "sarah.m@example.com",
        phone: "+94 71 987 6543",
        date: "2024-03-09",
        amount: 125000,
        status: "Confirmed",
        paymentMethod: "Transfer",
        shippingAddress: { street: "45 Lotus Grove", city: "Kandy", zip: "20000" },
        items: [
            { name: "i7-14700K", price: 125000, quantity: 1 }
        ]
    },
    // ... add more mock data if needed
];

const STATUS_CONFIG = {
    "Pending": { color: "text-yellow-500 bg-yellow-950/20 border-yellow-900/50", icon: Clock },
    "Confirmed": { color: "text-cyan-500 bg-cyan-950/20 border-cyan-900/50", icon: CheckCircle2 },
    "Shipped": { color: "text-purple-500 bg-purple-950/20 border-purple-900/50", icon: Truck },
    "Delivered": { color: "text-emerald-500 bg-emerald-950/20 border-emerald-900/50", icon: Package },
    "Cancelled": { color: "text-red-500 bg-red-950/20 border-red-900/50", icon: XCircle },
};

export default function OrderManagerPage() {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Filtering Logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (id: string, newStatus: any) => {
        setOrders(prev => prev.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm">
                <div>
                    <h1 className="text-2xl font-bold text-white font-gaming tracking-wide">
                        ORDER OPERATIONS
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Track and fulfill customer orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 text-sm">
                        <span className="text-zinc-500 mr-2">Total Value:</span>
                        <span className="text-emerald-400 font-mono font-bold">LKR {orders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search Order ID or Customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-zinc-600"
                    />
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Filter className="w-4 h-4 text-zinc-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-transparent border-none text-sm text-zinc-300 focus:outline-none cursor-pointer"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders List / Kanban-style Table */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                        const StatusIcon = STATUS_CONFIG[order.status].icon;
                        return (
                            <div
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group cursor-pointer"
                            >
                                <div className="p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center">

                                    {/* Order Info */}
                                    <div className="flex-1 min-w-[200px]">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-lg font-bold text-cyan-400 font-mono tracking-wider">{order.id}</span>
                                            <span className="text-xs text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                                                {order.date}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">{order.customer}</span>
                                            <span className="text-xs text-zinc-500">{order.email}</span>
                                        </div>
                                    </div>

                                    {/* Items Preview */}
                                    <div className="flex-[2] text-sm text-zinc-400">
                                        <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Items</p>
                                        <div className="flex flex-wrap gap-2">
                                            {order.items.slice(0, 3).map((item, idx) => (
                                                <span key={idx} className="bg-zinc-950 px-2 py-1 rounded text-xs border border-zinc-800/50">
                                                    {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                                                </span>
                                            ))}
                                            {order.items.length > 3 && (
                                                <span className="bg-zinc-950 px-2 py-1 rounded text-xs border border-zinc-800/50 text-zinc-500">
                                                    +{order.items.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex-1 text-right lg:text-center">
                                        <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Amount</p>
                                        <span className="text-xl font-bold text-white font-mono">
                                            {order.amount.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Status Control */}
                                    <div className="flex-none min-w-[180px]">
                                        <div className="relative group/dropdown">
                                            <button className={cn(
                                                "w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium",
                                                STATUS_CONFIG[order.status].color
                                            )}>
                                                <div className="flex items-center gap-2">
                                                    <StatusIcon className="w-4 h-4" />
                                                    {order.status}
                                                </div>
                                                <ChevronDown className="w-4 h-4 opacity-50" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className="absolute right-0 top-full mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl z-20 hidden group-hover/dropdown:block overflow-hidden">
                                                {Object.keys(STATUS_CONFIG).map((statusKey) => (
                                                    <button
                                                        key={statusKey}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStatusChange(order.id, statusKey as any);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors flex items-center gap-2"
                                                    >
                                                        {statusKey}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500">
                        No orders found matching your search.
                    </div>
                )}
            </div>
            {/* DETAILS MODAL */}
            {selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
}
