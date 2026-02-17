"use client";

import { useState } from "react";
import {
    X,
    Save,
    Image as ImageIcon,
    Plus,
    Trash2,
    AlertCircle,
    Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductFormData = {
    name: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    condition: "new" | "used";
    images: string[];
    description: string;
    specs: Record<string, string>;
    serialNumbers: string[];
};

interface ProductFormProps {
    initialData?: Partial<ProductFormData>;
    onSave: (data: ProductFormData) => void;
    onCancel: () => void;
}

const DEFAULT_FORM_DATA: ProductFormData = {
    name: "",
    brand: "",
    category: "GPU",
    price: 0,
    stock: 0,
    condition: "new",
    images: [],
    description: "",
    specs: {},
    serialNumbers: [],
};

export function ProductForm({
    initialData,
    onSave,
    onCancel,
}: ProductFormProps) {
    const [formData, setFormData] = useState<ProductFormData>({
        ...DEFAULT_FORM_DATA,
        ...initialData,
    });

    const [tempSpecKey, setTempSpecKey] = useState("");
    const [tempSpecValue, setTempSpecValue] = useState("");
    const [tempImage, setTempImage] = useState("");
    const [tempSerial, setTempSerial] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "stock" ? Number(value) : value,
        }));
    };

    const addSpec = () => {
        if (tempSpecKey && tempSpecValue) {
            setFormData((prev) => ({
                ...prev,
                specs: { ...prev.specs, [tempSpecKey]: tempSpecValue },
            }));
            setTempSpecKey("");
            setTempSpecValue("");
        }
    };

    const removeSpec = (key: string) => {
        const newSpecs = { ...formData.specs };
        delete newSpecs[key];
        setFormData((prev) => ({ ...prev, specs: newSpecs }));
    };

    const addImage = () => {
        if (tempImage) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, tempImage],
            }));
            setTempImage("");
        }
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const addSerial = () => {
        if (tempSerial) {
            setFormData(prev => ({
                ...prev,
                serialNumbers: [...prev.serialNumbers, tempSerial]
            }));
            setTempSerial("");
        }
    }

    const removeSerial = (index: number) => {
        setFormData(prev => ({
            ...prev,
            serialNumbers: prev.serialNumbers.filter((_, i) => i !== index)
        }));
    }

    const handleSubmit = () => {
        onSave(formData);
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 backdrop-blur-md z-10">
                    <div>
                        <h3 className="text-xl font-bold text-white font-gaming">
                            {initialData?.name ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                            Inventory Management System
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                    {/* Section 1: Core Details */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-cyan-500 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4">
                            Core Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                    placeholder="e.g. ASUS ROG Strix GeForce RTX 4090"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                                    placeholder="e.g. ASUS"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                                >
                                    <option value="GPU">Graphics Card (GPU)</option>
                                    <option value="CPU">Processor (CPU)</option>
                                    <option value="Motherboard">Motherboard</option>
                                    <option value="RAM">Memory (RAM)</option>
                                    <option value="Storage">Storage (SSD/HDD)</option>
                                    <option value="Case">PC Case</option>
                                    <option value="PSU">Power Supply</option>
                                    <option value="Cooling">Cooling</option>
                                    <option value="Peripherals">Peripherals</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase">
                                    Current Condition
                                </label>
                                <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                                    <button
                                        onClick={() =>
                                            setFormData((prev) => ({ ...prev, condition: "new" }))
                                        }
                                        className={cn(
                                            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
                                            formData.condition === "new"
                                                ? "bg-cyan-950/50 text-cyan-400 shadow-sm"
                                                : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Brand New
                                    </button>
                                    <button
                                        onClick={() =>
                                            setFormData((prev) => ({ ...prev, condition: "used" }))
                                        }
                                        className={cn(
                                            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
                                            formData.condition === "used"
                                                ? "bg-yellow-950/30 text-yellow-500 shadow-sm"
                                                : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Used / Refurbished
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase">
                                    Price (LKR)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">Rs.</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 uppercase">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all resize-none"
                                placeholder=" detailed product description..."
                            />
                        </div>
                    </section>

                    {/* Section 2: Media */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-cyan-500 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Media Gallery
                        </h4>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Image URL (e.g. https://...)"
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                value={tempImage}
                                onChange={e => setTempImage(e.target.value)}
                            />
                            <button
                                onClick={addImage}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="group relative aspect-square bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                                    <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-red-900/80 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                    {idx === 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1 font-bold uppercase tracking-wider backdrop-blur-sm">
                                            Cover Image
                                        </div>
                                    )}
                                </div>
                            ))}
                            {formData.images.length === 0 && (
                                <div className="col-span-4 py-8 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg text-zinc-600">
                                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="text-xs">No images added yet</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Section 3: Technical Specs */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-cyan-500 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4">
                            Technical Specifications
                        </h4>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Key (e.g. Memory)"
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                value={tempSpecKey}
                                onChange={e => setTempSpecKey(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Value (e.g. 24GB)"
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                                value={tempSpecValue}
                                onChange={e => setTempSpecValue(e.target.value)}
                            />
                            <button
                                onClick={addSpec}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Add Spec
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(formData.specs).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800 group">
                                    <div>
                                        <span className="text-zinc-500 text-xs uppercase font-bold block">{key}</span>
                                        <span className="text-zinc-200 text-sm">{value}</span>
                                    </div>
                                    <button
                                        onClick={() => removeSpec(key)}
                                        className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 4: Serial Numbers */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-cyan-500 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Inventory Tracking (Serial Numbers)
                        </h4>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Scan or Enter Serial Number"
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none font-mono"
                                value={tempSerial}
                                onChange={e => setTempSerial(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addSerial()}
                            />
                            <button
                                onClick={addSerial}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {formData.serialNumbers.map((sn, idx) => (
                                <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs font-mono text-zinc-300 group">
                                    {sn}
                                    <button onClick={() => removeSerial(idx)} className="text-zinc-500 hover:text-red-400">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            {formData.serialNumbers.length === 0 && (
                                <p className="text-zinc-600 text-xs italic">No serial numbers recorded.</p>
                            )}
                        </div>
                        {formData.serialNumbers.length !== formData.stock && formData.stock > 0 && (
                            <div className="flex items-center gap-2 text-yellow-500 text-xs mt-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-medium">Warning: Stock count ({formData.stock}) does not match serial number count ({formData.serialNumbers.length}).</span>
                            </div>
                        )}
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-between items-center sticky bottom-0 backdrop-blur-md z-10">
                    <div className="text-xs text-zinc-500">
                        <span className="text-red-400">*</span> Required Fields
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(8,145,178,0.5)] hover:shadow-[0_0_25px_-5px_rgba(8,145,178,0.6)]"
                        >
                            <Save className="w-4 h-4" />
                            Save Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
