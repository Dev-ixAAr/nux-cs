import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

// Custom TikTok Icon (since it's not in older lucide versions or sometimes buggy in previews)
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Custom WhatsApp Icon
const WhatsApp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 pt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8 lg:gap-12">

          {/* COLUMN 1: BRAND */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold tracking-wider text-white">
              ELITE <span className="text-cyan-500">LAPTOPS</span>
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              The best gaming gear in Sri Lanka.
              High-performance laptops, custom PCs, and premium accessories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 transition-colors hover:text-cyan-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-zinc-400 transition-colors hover:text-cyan-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-zinc-400 transition-colors hover:text-cyan-500">
                <TikTok className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>
              <a href="#" className="text-zinc-400 transition-colors hover:text-cyan-500">
                <WhatsApp className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* COLUMN 2: SHOP */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li>
                <Link href="/products/laptops" className="transition-colors hover:text-cyan-500">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/components" className="transition-colors hover:text-cyan-500">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/builder" className="transition-colors hover:text-cyan-500">
                  PC Builder
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="transition-colors hover:text-cyan-500">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li>
                <Link href="/contact" className="transition-colors hover:text-cyan-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-cyan-500">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-cyan-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-cyan-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: VISIT US */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider text-white">
              Visit Us
            </h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                <span>
                  No. 123, Galle Road,
                  <br />
                  Colombo 04
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-cyan-500" />
                <span>+94 7X XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-cyan-500" />
                <span>sales@elitelaptops.lk</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-16 border-t border-white/5 bg-black/40 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-center text-xs text-zinc-500 md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} Elite Laptops. All Rights Reserved.</p>
          <p>
            Designed by <span className="text-zinc-400">Nova Web</span>
          </p>
        </div>
      </div>
    </footer>
  );
}