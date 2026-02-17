import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// ============================================================
// NextAuth.js API Route Handler
// Handles GET and POST for /api/auth/*
// ============================================================

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
