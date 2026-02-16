
import Image from 'next/image';
import { PREBUILTS } from '@/lib/mockData';
import { Check, ShoppingCart } from 'lucide-react';

export const metadata = {
    title: 'Pre-built Gaming PCs | NEXUS PC',
    description: 'Ready to ship gaming systems built for performance.',
};

export default function PrebuiltsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Ready to Ship Systems
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Professionally built, tested, and ready for action. Choose your weapon and dominate the game.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PREBUILTS.map((pc) => (
                    <div
                        key={pc.id}
                        className="group relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 w-full bg-zinc-800/50 p-6 flex items-center justify-center group-hover:bg-zinc-800/80 transition-colors">
                            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                                <Image
                                    src={pc.image}
                                    alt={pc.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {pc.name}
                                </h3>
                                <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 mt-2 rounded-full" />
                            </div>

                            {/* Specs List */}
                            <ul className="space-y-3 mb-8 flex-grow">
                                {pc.specs.map((spec, index) => (
                                    <li key={index} className="flex items-start gap-3 text-zinc-300 text-sm">
                                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>{spec}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Price & Action */}
                            <div className="mt-auto pt-6 border-t border-white/10">
                                <div className="flex items-end justify-between mb-4">
                                    <span className="text-zinc-400 text-sm">Starting at</span>
                                    <span className="text-2xl font-bold text-white">
                                        {new Intl.NumberFormat('en-LK', {
                                            style: 'currency',
                                            currency: 'LKR',
                                            maximumFractionDigits: 0
                                        }).format(pc.price)}
                                    </span>
                                </div>

                                <a
                                    href={`https://wa.me/94771234567?text=Hi, I'm interested in buying the ${pc.name} pre-built PC.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Order on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
}
