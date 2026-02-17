"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 2000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
    { name: "Jul", revenue: 3490 },
    { name: "Aug", revenue: 4000 },
    { name: "Sep", revenue: 3000 },
    { name: "Oct", revenue: 2000 },
    { name: "Nov", revenue: 2780 },
    { name: "Dec", revenue: 3890 },
];

export function RevenueChart() {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-zinc-100 font-bold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-cyan-500" />
                        Revenue Analytics
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        Monthly revenue performance
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded hover:bg-zinc-700 transition-colors flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        This Year
                    </button>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272a"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#18181b",
                                borderColor: "#27272a",
                                borderRadius: "8px",
                                color: "#f4f4f5",
                            }}
                            itemStyle={{ color: "#06b6d4" }}
                            formatter={(value: number) => [`$${value}`, "Revenue"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
