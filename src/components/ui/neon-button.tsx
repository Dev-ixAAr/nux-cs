"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: 
        "bg-primary text-black font-bold border-transparent hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:bg-cyan-400",
      secondary: 
        "bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white hover:shadow-[0_0_20px_rgba(189,0,255,0.5)]",
      ghost: 
        "bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

NeonButton.displayName = "NeonButton";