"use client";

import Link from "next/link";
import { Cpu, ArrowRight, User, Mail, Lock } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">

            {/* BACKGROUND GLOW */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[100px]" />
            </div>

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">

                {/* HEADER */}
                <div className="mb-8 text-center">
                    <Link href="/" className="mb-6 inline-flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                            <Cpu className="h-6 w-6 text-cyan-500" />
                        </div>
                        <span className="font-heading text-2xl font-bold tracking-wider text-white">
                            NEXUS<span className="text-cyan-500">PC</span>
                        </span>
                    </Link>
                    <h1 className="font-heading text-2xl font-bold text-white">Create Account</h1>
                    <p className="mt-2 text-sm text-zinc-400">Join the elite gaming community</p>
                </div>

                {/* FORM */}
                <form className="space-y-4">

                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-300">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link href="/login" className="w-full">
                            <NeonButton variant="primary" className="w-full justify-center font-bold">
                                Create Account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </NeonButton>
                        </Link>
                    </div>
                </form>

                {/* FOOTER */}
                <div className="mt-8 text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-cyan-500 hover:text-cyan-400 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
