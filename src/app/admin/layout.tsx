import Link from "next/link";
import {
    LayoutDashboard,
    Cpu,
    ClipboardList,
    Users,
    Settings,
    LogOut,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Z-50 and fixed inset-0 ensures this overlays the root layout's Navbar/Footer
        // effectively creating a dedicated "Space" for the admin panel.
        <div className="fixed inset-0 z-50 flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">

            {/* Sidebar */}
            <aside className="w-72 border-r border-zinc-900 bg-zinc-950 flex flex-col shadow-2xl z-10">

                {/* Branding */}
                <div className="p-8 border-b border-zinc-900/50 bg-zinc-950/50">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h1 className="text-xl font-bold tracking-wider text-cyan-400 font-gaming">
                                ELITE COMMAND
                            </h1>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">
                                Authorized Personnel
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <div className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4 pl-3">
                        Main Module
                    </div>
                    <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
                    <NavItem href="/admin/inventory" icon={Cpu} label="Inventory Control" />
                    <NavItem href="/admin/orders" icon={ClipboardList} label="Order Management" />

                    <div className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4 pl-3 mt-8">
                        Database
                    </div>
                    <NavItem href="/admin/customers" icon={Users} label="Customer Records" />
                    <NavItem href="/admin/config" icon={Settings} label="System Config" />
                </nav>

                {/* User / Logout */}
                <div className="p-6 border-t border-zinc-900/50 bg-zinc-900/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-900/20 border border-cyan-800/50 flex items-center justify-center">
                            <span className="text-cyan-400 font-bold text-sm">NM</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Nexus Master</p>
                            <p className="text-xs text-zinc-500">Administrator</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-red-950/30 hover:text-red-400 border border-zinc-800 transition-colors p-2 rounded-md text-sm text-zinc-400 font-medium group">
                        <LogOut className="w-4 h-4 group-hover:stroke-red-400" />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-black relative">
                {/* Background Grid Pattern for "Tech" feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

                <div className="relative p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    // Simple check for active state would usually use usePathname hook, 
    // but for now we'll just style them generally. 
    // Ideally, use usePathname from navigation.
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                "text-zinc-400 hover:text-cyan-400 hover:bg-cyan-950/10"
            )}
        >
            <Icon className="w-5 h-5 transition-colors group-hover:stroke-cyan-400" />
            <span className="font-medium tracking-wide text-sm">{label}</span>

            {/* Active Indicator (Mock logic for now, or could use usePathname) */}
            {href === "/admin" && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-500 rounded-r-full shadow-[0_0_10px_2px_rgba(6,182,212,0.5)]" />
            )}
        </Link>
    );
}
