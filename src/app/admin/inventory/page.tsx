"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    Filter,
    Edit,
    Trash2,
    MoreVertical,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    X,
    Save
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductForm, ProductFormData } from "@/components/admin/ProductForm";
import { CategoryManager } from "@/components/admin/CategoryManager";

// Mock Data Types
// Mock Data Types
type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    image: string;
    brand: string;
    specs?: Record<string, string>;
    condition?: "new" | "used";
    serialNumbers?: string[];
    description?: string;
    images?: string[];
};

// Initial Mock Data
const INITIAL_INVENTORY: Product[] = [
    { id: "PROD-001", name: "NVIDIA RTX 4090 Gaming OC", category: "GPU", price: 650000, stock: 2, status: "Low Stock", image: "/placeholder-gpu.png", brand: "Gigabyte" },
    { id: "PROD-002", name: "Intel Core i9-14900K", category: "CPU", price: 210000, stock: 15, status: "In Stock", image: "/placeholder-cpu.png", brand: "Intel" },
    { id: "PROD-003", name: "Samsung 990 Pro 2TB", category: "Storage", price: 65000, stock: 8, status: "In Stock", image: "/placeholder-ssd.png", brand: "Samsung" },
    { id: "PROD-004", name: "Lian Li O11 Dynamic Evo", category: "Case", price: 55000, stock: 0, status: "Out of Stock", image: "/placeholder-case.png", brand: "Lian Li" },
    { id: "PROD-005", name: "Corsair RM1000x Shift", category: "PSU", price: 72000, stock: 4, status: "Low Stock", image: "/placeholder-psu.png", brand: "Corsair" },
];

export default function InventoryPage() {
    const [inventory, setInventory] = useState<Product[]>(INITIAL_INVENTORY);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Helper to map Product to ProductFormData
    const getInitialFormData = (): Partial<ProductFormData> | undefined => {
        if (!editingProduct) return undefined;
        return {
            name: editingProduct.name,
            brand: editingProduct.brand,
            category: editingProduct.category,
            price: editingProduct.price,
            stock: editingProduct.stock,
            condition: editingProduct.condition || "new",
            images: editingProduct.images || [editingProduct.image],
            description: editingProduct.description || "",
            specs: editingProduct.specs || {},
            serialNumbers: editingProduct.serialNumbers || []
        };
    };

    // Filtering Logic
    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Action Handlers
    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to remove this item?")) {
            setInventory(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleSaveProduct = (formData: ProductFormData) => {
        if (editingProduct) {
            // Edit Mode
            setInventory(prev => prev.map(item =>
                item.id === editingProduct.id
                    ? {
                        ...item,
                        ...formData,
                        image: formData.images[0] || "/placeholder.png",
                        status: formData.stock > 5 ? "In Stock" : formData.stock > 0 ? "Low Stock" : "Out of Stock"
                    }
                    : item
            ));
            setEditingProduct(null);
        } else {
            // Add Mode
            const mockId = `PROD-${Math.floor(Math.random() * 10000)}`;
            const newItem: Product = {
                id: mockId,
                ...formData,
                image: formData.images[0] || "/placeholder.png",
                status: formData.stock > 5 ? "In Stock" : formData.stock > 0 ? "Low Stock" : "Out of Stock"
            };
            setInventory([newItem, ...inventory]);
        }
        setIsModalOpen(false);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm">
                <div>
                    <h1 className="text-2xl font-bold text-white font-gaming tracking-wide">
                        INVENTORY CONTROL
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Manage physical records and stock levels.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsCategoryManagerOpen(true)}
                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg font-medium transition-colors border border-zinc-700"
                    >
                        <Filter className="w-4 h-4" />
                        Manage Categories
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-[0_0_15px_-3px_rgba(8,145,178,0.5)]"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Product
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-zinc-600"
                    />
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Filter className="w-4 h-4 text-zinc-500" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-transparent border-none text-sm text-zinc-300 focus:outline-none cursor-pointer"
                    >
                        <option value="All">All Categories</option>
                        <option value="GPU">GPU</option>
                        <option value="CPU">CPU</option>
                        <option value="Storage">Storage</option>
                        <option value="RAM">RAM</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="Case">Case</option>
                        <option value="PSU">PSU</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-950/50 text-zinc-500 uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price (LKR)</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {filteredInventory.length > 0 ? (
                                filteredInventory.map((item) => (
                                    <tr key={item.id} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-xs text-zinc-600 font-mono">
                                                    IMG
                                                </div>
                                                <div>
                                                    <p className="font-medium text-zinc-200 group-hover:text-cyan-400 transition-colors">{item.name}</p>
                                                    <p className="text-xs text-zinc-500">{item.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs border border-zinc-700">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-zinc-300">
                                            {item.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "font-mono font-bold",
                                                item.stock === 0 ? "text-zinc-600" : (item.stock < 5 ? "text-red-400" : "text-zinc-300")
                                            )}>
                                                {item.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {item.status === "In Stock" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                                {item.status === "Low Stock" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                                {item.status === "Out of Stock" && <XCircle className="w-4 h-4 text-red-500" />}
                                                <span className={cn(
                                                    "text-xs font-medium",
                                                    item.status === "In Stock" && "text-emerald-500",
                                                    item.status === "Low Stock" && "text-yellow-500",
                                                    item.status === "Out of Stock" && "text-red-500",
                                                )}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="p-2 hover:bg-cyan-950/30 hover:text-cyan-400 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 hover:bg-red-950/30 hover:text-red-400 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        No products found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ADD/EDIT MODAL */}
            {isModalOpen && (
                <ProductForm
                    initialData={getInitialFormData()}
                    onSave={handleSaveProduct}
                    onCancel={handleCloseModal}
                />
            )}

            {/* CATEGORY MANAGER */}
            {isCategoryManagerOpen && (
                <CategoryManager onClose={() => setIsCategoryManagerOpen(false)} />
            )}
        </div>
    );
}
