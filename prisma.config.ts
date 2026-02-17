import path from "node:path";
import { defineConfig } from "prisma/config";

// ============================================================
// Prisma 7 Configuration
// Manages datasource URL (replaces inline url in schema.prisma)
// ============================================================

// Load environment variables
import "dotenv/config";

export default defineConfig({
    schema: path.join(__dirname, "prisma", "schema.prisma"),
});
