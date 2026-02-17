// ============================================================
// DATABASE SEED SCRIPT
// Run with: npx prisma db seed
// Seeds the database with categories, products, component specs,
// site settings, and a default SUPER_ADMIN user.
// ============================================================

import { PrismaClient, Condition } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// --- Import existing mock data ---
import { CATEGORIES, PRODUCTS, SITE_SETTINGS } from "../src/lib/mockData";

async function main() {
    console.log("🌱 Starting database seed...\n");

    // ==========================================================
    // 1. SEED SITE SETTINGS
    // ==========================================================
    console.log("⚙️  Seeding site settings...");
    await prisma.siteSettings.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            storeName: SITE_SETTINGS.storeName,
            heroVideoUrl: SITE_SETTINGS.heroVideoUrl,
            currency: SITE_SETTINGS.currency,
        },
    });

    // ==========================================================
    // 2. SEED DEFAULT SUPER_ADMIN USER
    // ==========================================================
    console.log("👤 Seeding default admin user...");
    const adminPasswordHash = await bcrypt.hash("Admin@123456", 12);

    await prisma.user.upsert({
        where: { email: "admin@nexuspc.com" },
        update: {},
        create: {
            name: "Super Admin",
            email: "admin@nexuspc.com",
            passwordHash: adminPasswordHash,
            role: "SUPER_ADMIN",
            phone: "+94771234567",
        },
    });

    // ==========================================================
    // 3. SEED CATEGORIES
    // ==========================================================
    console.log("📂 Seeding categories...");
    const categoryMap: Record<string, string> = {};

    for (const cat of CATEGORIES) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: { name: cat.name, image: cat.image },
            create: {
                name: cat.name,
                slug: cat.slug,
                image: cat.image,
            },
        });
        categoryMap[cat.slug] = created.id;
    }

    // ==========================================================
    // 4. SEED PRODUCTS + COMPONENT SPECS
    // ==========================================================
    console.log("📦 Seeding products and component specs...");

    for (const product of PRODUCTS) {
        // Determine stock from existing data
        const stock = product.inStock ? 10 : 0;

        // Map condition
        const condition: Condition = product.condition === "used" ? "USED" : "NEW";

        // Check if the category exists in our map
        const categoryId = categoryMap[product.category];
        if (!categoryId) {
            console.warn(`  ⚠️ Skipping product "${product.name}" — unknown category "${product.category}"`);
            continue;
        }

        // Build specs JSON from detailedSpecs + features
        const specsJson: Record<string, any> = {};
        if (product.detailedSpecs) {
            specsJson.detailedSpecs = product.detailedSpecs;
        }
        if (product.features) {
            specsJson.features = product.features;
        }
        if (product.technicalSpecs) {
            specsJson.technicalSpecs = product.technicalSpecs;
        }

        // Create or update the product
        const createdProduct = await prisma.product.upsert({
            where: { id: product.id },
            update: {
                name: product.name,
                brand: product.brand,
                price: product.price,
                categoryId,
                condition,
                stock,
                inStock: product.inStock,
                rating: product.rating,
                badge: product.badge || null,
                description: product.description || null,
                image: product.image,
                images: product.images || [],
                features: product.features || [],
                specs: Object.keys(specsJson).length > 0 ? specsJson : undefined,
            },
            create: {
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                categoryId,
                condition,
                stock,
                inStock: product.inStock,
                rating: product.rating,
                badge: product.badge || null,
                description: product.description || null,
                image: product.image,
                images: product.images || [],
                features: product.features || [],
                specs: Object.keys(specsJson).length > 0 ? specsJson : undefined,
            },
        });

        // Create ComponentSpec if product has typed specs
        if (product.specs) {
            const s = product.specs;

            await prisma.componentSpec.upsert({
                where: { productId: createdProduct.id },
                update: {
                    socket: s.socket || null,
                    chipset: s.chipset || null,
                    memoryType: s.memory_type || null,
                    formFactor: s.form_factor || null,
                    memorySlots: s.memory_slots || null,
                    storageSlots: s.storage_slots || null,
                    coreCount: s.core_count || null,
                    baseClock: s.base_clock || null,
                    boostClock: s.boost_clock || null,
                    vram: s.vram || null,
                    gpuLength: s.length || null,
                    wattage: s.wattage || null,
                    capacity: s.capacity || null,
                    speed: s.speed || null,
                    latency: s.latency || null,
                    efficiency: s.efficiency || null,
                    modular: s.modular || null,
                    psuStandard: s.standard || null,
                    socketSupport: s.socket_support || [],
                    radiatorSize: s.radiator_size || null,
                    coolerHeight: s.height || null,
                    fanCount: s.fan_count || null,
                    storageType: s.type || null,
                    readSpeed: s.read_speed || null,
                    casePanels: s.panels || null,
                    caseAirflow: s.airflow || null,
                    conditionNote: s.condition_note || null,
                },
                create: {
                    productId: createdProduct.id,
                    socket: s.socket || null,
                    chipset: s.chipset || null,
                    memoryType: s.memory_type || null,
                    formFactor: s.form_factor || null,
                    memorySlots: s.memory_slots || null,
                    storageSlots: s.storage_slots || null,
                    coreCount: s.core_count || null,
                    baseClock: s.base_clock || null,
                    boostClock: s.boost_clock || null,
                    vram: s.vram || null,
                    gpuLength: s.length || null,
                    wattage: s.wattage || null,
                    capacity: s.capacity || null,
                    speed: s.speed || null,
                    latency: s.latency || null,
                    efficiency: s.efficiency || null,
                    modular: s.modular || null,
                    psuStandard: s.standard || null,
                    socketSupport: s.socket_support || [],
                    radiatorSize: s.radiator_size || null,
                    coolerHeight: s.height || null,
                    fanCount: s.fan_count || null,
                    storageType: s.type || null,
                    readSpeed: s.read_speed || null,
                    casePanels: s.panels || null,
                    caseAirflow: s.airflow || null,
                    conditionNote: s.condition_note || null,
                },
            });
        }
    }

    // ==========================================================
    // SUMMARY
    // ==========================================================
    const counts = {
        categories: await prisma.category.count(),
        products: await prisma.product.count(),
        componentSpecs: await prisma.componentSpec.count(),
        users: await prisma.user.count(),
    };

    console.log("\n✅ Seed complete!");
    console.log(`   📂 Categories:      ${counts.categories}`);
    console.log(`   📦 Products:        ${counts.products}`);
    console.log(`   🔧 Component Specs: ${counts.componentSpecs}`);
    console.log(`   👤 Users:           ${counts.users}`);
    console.log(`   ⚙️  Site Settings:   1\n`);
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
