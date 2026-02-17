import { z } from "zod";

// ============================================================
// ZOD v4 VALIDATION SCHEMAS
// Input validation for API routes
// ============================================================

// --- Authentication Schemas ---

export const registerSchema = z.object({
    name: z
        .string()
        .check(
            z.minLength(2, "Name must be at least 2 characters"),
            z.maxLength(100, "Name must be under 100 characters")
        ),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .check(
            z.minLength(8, "Password must be at least 8 characters"),
            z.regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain uppercase, lowercase, and a number"
            )
        ),
    phone: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().check(z.minLength(1, "Password is required")),
});

// --- Product Schemas ---

export const productSchema = z.object({
    name: z
        .string()
        .check(
            z.minLength(2, "Product name must be at least 2 characters"),
            z.maxLength(200)
        ),
    brand: z.string().check(z.minLength(1, "Brand is required")),
    price: z.number().check(z.positive("Price must be positive")),
    costPrice: z.number().check(z.positive()).optional(),
    categoryId: z.string().check(z.minLength(1, "Category is required")),
    condition: z.enum(["NEW", "USED"]),
    stock: z.number().check(z.int(), z.gte(0, "Stock cannot be negative")),
    description: z.string().optional(),
    image: z.url("Must be a valid URL"),
    images: z.array(z.url()).optional(),
    serialNumbers: z.array(z.string()).optional(),
    specs: z.record(z.string(), z.any()).optional(),
    features: z.array(z.string()).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

// --- Component Spec Schema ---

export const componentSpecSchema = z.object({
    productId: z.string(),
    socket: z.string().optional(),
    chipset: z.string().optional(),
    memoryType: z.string().optional(),
    formFactor: z.string().optional(),
    memorySlots: z.number().check(z.int()).optional(),
    storageSlots: z.number().check(z.int()).optional(),
    coreCount: z.number().check(z.int()).optional(),
    baseClock: z.string().optional(),
    boostClock: z.string().optional(),
    vram: z.string().optional(),
    gpuLength: z.number().check(z.int()).optional(),
    wattage: z.number().check(z.int()).optional(),
    capacity: z.string().optional(),
    speed: z.string().optional(),
    latency: z.string().optional(),
    efficiency: z.string().optional(),
    modular: z.string().optional(),
    socketSupport: z.array(z.string()).optional(),
    radiatorSize: z.string().optional(),
    conditionNote: z.string().optional(),
});

// --- Order Schemas ---

export const orderItemSchema = z.object({
    productId: z.string().check(z.minLength(1, "Product ID is required")),
    quantity: z.number().check(z.int(), z.positive("Quantity must be at least 1")),
    unitPrice: z.number().check(z.positive("Unit price must be positive")),
});

export const orderSchema = z.object({
    items: z.array(orderItemSchema).check(z.minLength(1, "Order must have at least 1 item")),
    paymentMethod: z.enum(["CASH", "CARD", "BANK_TRANSFER", "ONLINE_PAYMENT"]),
    orderType: z.enum(["ONLINE", "POS"]),
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    notes: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

// --- Site Settings Schema ---

export const siteSettingsSchema = z.object({
    storeName: z.string().check(z.minLength(1)).optional(),
    heroVideoUrl: z.url().optional(),
    currency: z.string().check(z.minLength(1)).optional(),
    contactPhone: z.string().optional(),
    contactEmail: z.email().optional(),
    address: z.string().optional(),
});
