import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ============================================================
// ROLE-BASED AUTHENTICATION MIDDLEWARE
// Protects routes based on user role from JWT token
// ============================================================

// Routes that require ADMIN or SUPER_ADMIN role
const ADMIN_ROUTES = ["/admin", "/api/admin"];

// Routes that require any authenticated user
const AUTH_ROUTES = ["/profile"];

// Public routes (no auth needed)
const PUBLIC_ROUTES = ["/", "/login", "/signup", "/laptops", "/components", "/accessories", "/prebuilts", "/compare", "/contact"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files, images, and Next.js internals
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Get JWT token from the request
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // --- Admin Route Protection ---
    const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
    if (isAdminRoute) {
        if (!token) {
            // Not authenticated — redirect to login
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (token.role !== "ADMIN" && token.role !== "SUPER_ADMIN") {
            // Authenticated but insufficient role — redirect to home
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    }

    // --- Authenticated Route Protection ---
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
    if (isAuthRoute) {
        if (!token) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    // --- Login/Signup Redirect (already authenticated) ---
    if ((pathname === "/login" || pathname === "/signup") && token) {
        // If admin, send to admin dashboard; otherwise send to profile
        if (token.role === "ADMIN" || token.role === "SUPER_ADMIN") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
}

// Only run middleware on these path patterns
export const config = {
    matcher: [
        "/admin/:path*",
        "/profile/:path*",
        "/login",
        "/signup",
        "/api/admin/:path*",
    ],
};
