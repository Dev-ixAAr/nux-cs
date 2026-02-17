"use client";

import { useState } from "react";
import {
    Search,
    Users,
    Mail,
    Phone,
    History,
    ShieldCheck,
    UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data Types
type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalSpent: number;
    joinDate: string;
    status: "Active" | "Inactive";
    orderCount: number;
};

// Initial Mock Data
const INITIAL_CUSTOMERS: Customer[] = [
    { id: "CUST-001", name: "Alex Chen", email: "alex.c@example.com", phone: "+94 77 123 4567", totalSpent: 450000, joinDate: "Jan 12, 2024", status: "Active", orderCount: 3 },
    { id: "CUST-002", name: "Sarah Miller", email: "sarah.m@example.com", phone: "+94 71 987 6543", totalSpent: 125000, joinDate: "Feb 05, 2024", status: "Active", orderCount: 1 },
    { id: "CUST-003", name: "Mike Ross", email: "mike.r@example.com", phone: "+94 76 555 1212", totalSpent: 89000, joinDate: "Feb 28, 2024", status: "Active", orderCount: 1 },
    { id: "CUST-004", name: "Jessica Pearson", email: "jess.p@example.com", phone: "+94 70 111 2222", totalSpent: 1250000, joinDate: "Dec 10, 2023", status: "Active", orderCount: 5 },
    { id: "CUST-005", name: "Harvey Specter", email: "harvey.s@example.com", phone: "+94 75 333 4444", totalSpent: 2100000, joinDate: "Nov 01, 2023", status: "Active", orderCount: 8 },
];

export default function CustomerPage() {
    const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
    const [searchQuery, setSearchQuery] = useState("");

    // Filtering Logic
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm">
                <div>
                    <h1 className="text-2xl font-bold text-white font-gaming tracking-wide">
                        CUSTOMER DATABASE
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Manage user profiles and history.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/20 border border-cyan-900/50 text-cyan-400 text-xs font-mono">
                    <Users className="w-3 h-3" />
                    <span>Total Members: {customers.length}</span>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search by Name, Email or Phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-zinc-600"
                />
            </div>

            {/* Customer List */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-950/50 text-zinc-500 uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User Profile</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Stats</th>
                                <th className="px-6 py-4">Join Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-cyan-500 font-bold text-sm border border-zinc-700">
                                                    {customer.name.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-zinc-200 flex items-center gap-2">
                                                        {customer.name}
                                                        {customer.totalSpent > 1000000 && (
                                                            <ShieldCheck className="w-3 h-3 text-yellow-500" aria-label="VIP Customer" />
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-zinc-500">ID: {customer.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Mail className="w-3 h-3 text-zinc-600" />
                                                    {customer.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Phone className="w-3 h-3 text-zinc-600" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-zinc-500 font-medium uppercase">Spent</span>
                                                <span className="font-mono text-emerald-400 font-bold">LKR {customer.totalSpent.toLocaleString()}</span>
                                                <span className="text-[10px] text-zinc-600">{customer.orderCount} Orders</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 text-xs">
                                            {customer.joinDate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-medium text-cyan-500 hover:text-cyan-400 border border-cyan-900/50 bg-cyan-950/20 px-3 py-1.5 rounded-lg hover:bg-cyan-900/30 transition-colors flex items-center gap-2 ml-auto">
                                                <History className="w-3 h-3" />
                                                View History
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
