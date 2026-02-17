import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

// ============================================================
// NextAuth.js Configuration
// ============================================================

export const authOptions: NextAuthOptions = {
    // --- Session Strategy ---
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // --- Pages ---
    pages: {
        signIn: "/login",
        newUser: "/signup",
    },

    // --- Providers ---
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Find user in database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("No account found with this email");
                }

                // Verify password
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // Return user object for JWT
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    // --- Callbacks ---
    callbacks: {
        async jwt({ token, user }) {
            // On initial sign-in, add user data to token
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },

        async session({ session, token }) {
            // Expose role and id on the session object
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },

    // --- Secret ---
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
