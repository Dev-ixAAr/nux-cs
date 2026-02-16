import type { Metadata } from "next";
import { Inter, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

// 1. Text Body (Readable)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// 2. Technical Headings (Sharp)
const rajdhani = Rajdhani({ 
  weight: ["300", "400", "500", "600", "700"], 
  subsets: ["latin"],
  variable: "--font-rajdhani" 
});

// 3. GAMING/SCI-FI HERO (The requested font)
const orbitron = Orbitron({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron", // This matches our globals.css config
});

export const metadata: Metadata = {
  title: "NexusPC | Premium Custom Computers",
  description: "High-performance custom PC builder and premium hardware shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20",
        inter.variable,
        rajdhani.variable,
        orbitron.variable // <--- Crucial: Injecting the variable
      )}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}