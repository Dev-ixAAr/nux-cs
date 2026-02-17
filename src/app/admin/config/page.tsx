"use client";

import { useState } from "react";
import { Save, Store, ImageIcon, Users, Shield, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ConfigPage() {
    const [activeTab, setActiveTab] = useState("general");

    const [generalSettings, setGeneralSettings] = useState({
        storeName: "Premium PC Shop",
        storeEmail: "contact@premiumpc.lk",
        storePhone: "+94 77 123 4567",
        address: "123 Tech Street, Colombo 03, Sri Lanka",
        currency: "LKR",
        taxRate: 0
    });

    const [banners, setBanners] = useState([
        { id: 1, title: "RTX 4090 Launch", image: "/banners/rtx4090.jpg", active: true },
        { id: 2, title: "Summer Sale", image: "/banners/summer.jpg", active: false }
    ]);

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGeneralSettings({ ...generalSettings, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm">
                <div>
                    <h1 className="text-2xl font-bold text-white font-gaming tracking-wide">
                        SYSTEM CONFIGURATION
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Manage global store settings and content.</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-[0_0_15px_-3px_rgba(8,145,178,0.5)]"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    {[
                        { id: "general", label: "General Settings", icon: Store },
                        { id: "appearance", label: "Banners & UI", icon: ImageIcon },
                        { id: "users", label: "Users & Roles", icon: Users },
                        { id: "security", label: "Security", icon: Shield },
                        { id: "notifications", label: "Notifications", icon: Bell },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                                activeTab === tab.id
                                    ? "bg-cyan-950/50 text-cyan-400 border border-cyan-900/50"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[500px]">

                    {/* GENERAL SETTINGS */}
                    {activeTab === "general" && (
                        <div className="max-w-2xl space-y-6">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-2">Store Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase">Store Name</label>
                                    <input
                                        type="text"
                                        name="storeName"
                                        value={generalSettings.storeName}
                                        onChange={handleGeneralChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase">Currency</label>
                                    <input
                                        type="text"
                                        name="currency"
                                        value={generalSettings.currency}
                                        onChange={handleGeneralChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase">Contact Email</label>
                                    <input
                                        type="email"
                                        name="storeEmail"
                                        value={generalSettings.storeEmail}
                                        onChange={handleGeneralChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase">Phone Number</label>
                                    <input
                                        type="text"
                                        name="storePhone"
                                        value={generalSettings.storePhone}
                                        onChange={handleGeneralChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase">Address</label>
                                    <textarea
                                        name="address"
                                        value={generalSettings.address}
                                        onChange={handleGeneralChange}
                                        rows={3}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPEARANCE / BANNERS */}
                    {activeTab === "appearance" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                                <h2 className="text-lg font-bold text-white">Promotional Banners</h2>
                                <button className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded transition-colors">
                                    + Add Banner
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {banners.map(banner => (
                                    <div key={banner.id} className="group relative aspect-video bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-sm">
                                            {banner.image}
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <p className="font-bold text-white">{banner.title}</p>
                                            <p className={cn("text-xs font-mono mt-1", banner.active ? "text-emerald-400" : "text-zinc-500")}>
                                                {banner.active ? "ACTIVE" : "INACTIVE"}
                                            </p>
                                        </div>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <button className="bg-zinc-900/80 p-1.5 rounded text-zinc-300 hover:text-white hover:bg-zinc-800">
                                                <Users className="w-4 h-4" /> {/* Edit Icon placeholder */}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* USERS */}
                    {activeTab === "users" && (
                        <div>
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-2">User Management</h2>
                            <p className="text-zinc-500 text-sm italic">User management module coming soon.</p>
                        </div>
                    )}

                    {/* SECURITY & NOTIFICATIONS PLACEHOLDERS */}
                    {(activeTab === "security" || activeTab === "notifications") && (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                            <Shield className="w-12 h-12 opacity-20" />
                            <p>This section is under development.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
