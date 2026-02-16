import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/90 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">

          {/* BRAND COLUMN */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Cpu className="h-6 w-6 text-cyan-500" />
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                NEXUS<span className="text-cyan-500">PC</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-xs mx-auto md:mx-0">
              Building the future of high-performance computing.
              Custom loops, extreme overclocking, and premium aesthetics.
            </p>
          </div>

          {/* LINKS COLUMNS */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Shop</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/builder" className="hover:text-cyan-400 transition-colors">Custom Builder</Link></li>
              <li><Link href="/products/laptops" className="hover:text-cyan-400 transition-colors">Laptops</Link></li>
              <li><Link href="/components" className="hover:text-cyan-400 transition-colors">Components</Link></li>
              <li><Link href="/accessories" className="hover:text-cyan-400 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Support</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Order Status</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Warranty Info</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* SOCIALS */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 transition-all">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} NexusPC Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}