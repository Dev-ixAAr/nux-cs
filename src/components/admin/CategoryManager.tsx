"use client";

import { useState } from "react";
import { X, Plus, Trash2, Save, Folder } from "lucide-react";

interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
}

const INITIAL_CATEGORIES: Category[] = [
    { id: "cat-1", name: "Processors (CPU)", slug: "cpu", count: 12 },
    { id: "cat-2", name: "Graphics Cards (GPU)", slug: "gpu", count: 8 },
    { id: "cat-3", name: "Motherboards", slug: "motherboard", count: 15 },
    { id: "cat-4", name: "Memory (RAM)", slug: "ram", count: 24 },
    { id: "cat-5", name: "Storage", slug: "storage", count: 30 },
];

export function CategoryManager({ onClose }: { onClose: () => void }) {
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [newCatName, setNewCatName] = useState("");

    const handleAddCategory = () => {
        if (!newCatName.trim()) return;
        const newCat: Category = {
            id: `cat-${Date.now()}`,
            name: newCatName,
            slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
            count: 0,
        };
        setCategories([...categories, newCat]);
        setNewCatName("");
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this category?")) {
            setCategories(categories.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <h3 className="text-xl font-bold text-white font-gaming flex items-center gap-2">
                        <Folder className="w-5 h-5 text-cyan-500" />
                        CATEGORIES
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="New Category Name..."
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                        />
                        <button
                            onClick={handleAddCategory}
                            disabled={!newCatName.trim()}
                            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-lg group hover:border-zinc-700 transition-colors"
                            >
                                <div>
                                    <p className="font-medium text-zinc-200 text-sm">
                                        {cat.name}
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        {cat.slug} • {cat.count} items
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
