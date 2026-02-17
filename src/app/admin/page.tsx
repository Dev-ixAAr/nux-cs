import {
    TrendingUp,
    Users,
    Package,
    AlertTriangle,
    DollarSign,
    Activity,
    Clock,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevenueChart } from "@/components/admin/RevenueChart";

export default function AdminDashboard() {
    // Mock Data
    const recentOrders = [
        { id: "ORD-7829", customer: "Alex Chen", amount: "$3,499", status: "Processing", date: "2m ago" },
        { id: "ORD-7828", customer: "Sarah Miller", amount: "$1,250", status: "Completed", date: "15m ago" },
        { id: "ORD-7827", customer: "Mike Ross", amount: "$899", status: "Completed", date: "1h ago" },
        { id: "ORD-7826", customer: "Jessica Pearson", amount: "$4,200", status: "Pending", date: "2h ago" },
        { id: "ORD-7825", customer: "Harvey Specter", amount: "$5,600", status: "In Transit", date: "4h ago" },
    ];

    const inventoryAlerts = [
        { name: "RTX 4090 Gaming OC", stock: 2, status: "Critical" },
        { name: "Intel Core i9-14900K", stock: 4, status: "Critical" },
        { name: "Corsair 1000W PSU", stock: 5, status: "Low" },
        { name: "Lian Li O11 Dynamic", stock: 1, status: "Critical" },
        { name: "Samsung 990 Pro 2TB", stock: 8, status: "Low" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white font-gaming">
                        SYSTEM OVERVIEW
                    </h2>
                    <p className="text-zinc-400 mt-1 flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-cyan-500" />
                        Live Monitoring Active
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-mono text-zinc-300">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Revenue"
                    value="$124,592"
                    change="+12.5%"
                    isPositive={true}
                    icon={DollarSign}
                    accentColor="cyan"
                />
                <StatCard
                    title="Pending Orders"
                    value="14"
                    change="Needs Attention"
                    isPositive={false}
                    icon={Clock}
                    accentColor="yellow"
                />
                <StatCard
                    title="Critical Stock"
                    value="8 Items"
                    change="Low Inventory"
                    isPositive={false}
                    icon={AlertTriangle}
                    accentColor="red"
                />
                <StatCard
                    title="Active Users"
                    value="2,834"
                    change="+148 this week"
                    isPositive={true}
                    icon={Users}
                    accentColor="purple"
                />
            </div>

            {/* Revenue Analysis */}
            <div className="mt-8">
                <RevenueChart />
            </div>

            {/* Activity Feed Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* Recent Orders - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                            <Package className="w-5 h-5 text-cyan-500" />
                            Recent Transactions
                        </h3>
                        <button className="text-xs text-cyan-500 hover:text-cyan-400 font-medium uppercase tracking-wider">
                            View All
                        </button>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-900/80 text-zinc-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Order ID</th>
                                    <th className="px-6 py-3 font-medium">Customer</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4 font-mono text-cyan-400 group-hover:text-cyan-300">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white">{order.customer}</span>
                                                <span className="text-xs text-zinc-500">{order.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-xs font-medium border",
                                                order.status === "Completed" && "bg-emerald-950/30 text-emerald-400 border-emerald-900",
                                                order.status === "Processing" && "bg-blue-950/30 text-blue-400 border-blue-900",
                                                order.status === "Pending" && "bg-yellow-950/30 text-yellow-500 border-yellow-900",
                                                order.status === "In Transit" && "bg-purple-950/30 text-purple-400 border-purple-900",
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-white font-medium">
                                            {order.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Inventory Alerts - Takes up 1 column */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col">
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            Stock Alerts
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    </div>
                    <div className="flex-1 p-0 overflow-y-auto">
                        <div className="divide-y divide-zinc-800/50">
                            {inventoryAlerts.map((item, idx) => (
                                <div key={idx} className="p-4 hover:bg-zinc-800/20 transition-colors flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-zinc-200">{item.name}</p>
                                        <p className="text-xs text-zinc-500 mt-1">Stock Level: <span className="text-red-400 font-bold">{item.stock}</span></p>
                                    </div>
                                    <div className={cn(
                                        "text-xs font-bold px-2 py-1 rounded uppercase tracking-wider",
                                        item.stock < 3 ? "text-red-500 bg-red-950/20 border border-red-900/50" : "text-yellow-500 bg-yellow-950/20 border border-yellow-900/50"
                                    )}>
                                        {item.stock < 3 ? "CRITICAL" : "LOW"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-zinc-800">
                            <button className="w-full text-center text-xs text-zinc-500 hover:text-white transition-colors">
                                View Full Inventory Report
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, change, isPositive, icon: Icon, accentColor = "cyan" }: any) {
    const colorStyles = {
        cyan: "text-cyan-500 bg-cyan-950/20 border-cyan-900/50",
        yellow: "text-yellow-500 bg-yellow-950/20 border-yellow-900/50",
        red: "text-red-500 bg-red-950/20 border-red-900/50",
        purple: "text-purple-500 bg-purple-950/20 border-purple-900/50",
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all hover:bg-zinc-800/50 shadow-lg group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{title}</h3>
                    <div className="text-2xl font-bold text-white mt-1 font-gaming tracking-wide group-hover:scale-105 transition-transform origin-left">
                        {value}
                    </div>
                </div>
                <div className={cn("p-2 rounded-lg", colorStyles[accentColor as keyof typeof colorStyles])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : (
                    <AlertTriangle className={cn("w-4 h-4", accentColor === "red" ? "text-red-500" : "text-yellow-500")} />
                )}
                <span className={cn(
                    "text-xs font-medium",
                    isPositive ? "text-emerald-500" : (accentColor === "red" ? "text-red-400" : "text-yellow-500")
                )}>
                    {change}
                </span>
            </div>
        </div>
    )
}
