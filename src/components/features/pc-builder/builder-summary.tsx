"use client";
import { useState } from "react";

import { useBuilderStore } from "@/store/useBuilderStore";
import { NeonButton } from "@/components/ui/neon-button";
import { ArrowRight, AlertTriangle, Zap, CheckCircle2, Download } from "lucide-react";
import { generateQuotationPDF, mapBuilderPartsToPDF } from "@/utils/pdfGenerator";
import { CheckoutModal } from "./checkout-modal";
import { cn } from "@/lib/utils";

interface BuilderSummaryProps {
  onShowFullSummary?: () => void;
}

export function BuilderSummary({ onShowFullSummary }: BuilderSummaryProps) {
  const totalPrice = useBuilderStore((state) => state.totalPrice);
  const estimatedWattage = useBuilderStore((state) => state.estimatedWattage);
  const compatibilityIssues = useBuilderStore((state) => state.compatibilityIssues);
  const selectedParts = useBuilderStore((state) => state.selectedParts);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const hasIssues = compatibilityIssues.length > 0;

  // Calculate Power Safety Status
  const psuItem = selectedParts['power-supply']?.[0]?.product;
  const psuCapacity = psuItem?.specs?.wattage || 0;

  let powerStatus: 'safe' | 'warning' | 'danger' | 'neutral' = 'neutral';

  if (psuItem) {
    if (estimatedWattage > psuCapacity) powerStatus = 'danger';
    else if (estimatedWattage > (psuCapacity - 100)) powerStatus = 'warning';
    else powerStatus = 'safe';
  } else if (estimatedWattage > 0) {
    powerStatus = 'warning'; // Warning because no PSU selected
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyan-500/30 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 md:px-6 gap-4 md:gap-0">

          {/* LEFT: STATUS ALERTS */}
          <div className="flex flex-col gap-1 w-full md:w-auto">
            {hasIssues ? (
              <div className="flex items-center gap-2 text-red-400 animate-pulse bg-red-500/10 px-3 py-1 rounded">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">{compatibilityIssues[0]}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 px-3 py-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">System Compatible</span>
              </div>
            )}
          </div>

          {/* CENTER: POWER METER */}
          <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/10">
            <div className={cn(
              "p-1.5 rounded-full",
              powerStatus === 'safe' ? "bg-emerald-500/20 text-emerald-500" :
                powerStatus === 'warning' ? "bg-amber-500/20 text-amber-500" :
                  powerStatus === 'danger' ? "bg-red-500/20 text-red-500" :
                    "bg-white/10 text-muted-foreground"
            )}>
              <Zap className={cn("h-4 w-4 fill-current", powerStatus === 'danger' && "animate-pulse")} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Est. Wattage</span>
              <div className="flex items-end gap-1 leading-none">
                <span className={cn(
                  "font-mono font-bold text-sm",
                  powerStatus === 'danger' ? "text-red-500" : "text-white"
                )}>
                  {estimatedWattage}W
                </span>
                {psuCapacity > 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    / {psuCapacity}W
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: TOTAL & CHECKOUT */}
          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Estimated Total
              </p>
              <p className="font-gaming text-2xl font-bold text-cyan-400 text-glow">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(totalPrice)}
              </p>
            </div>

            <NeonButton
              variant="secondary"
              className="px-3 md:px-6 font-bold uppercase tracking-widest flex"
              onClick={onShowFullSummary}
              disabled={Object.keys(selectedParts).length === 0}
            >
              <Download className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">View Summary</span>
            </NeonButton>

            <NeonButton
              className="px-8 font-bold uppercase tracking-widest"
              disabled={hasIssues || Object.keys(selectedParts).length === 0}
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </NeonButton>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedParts={selectedParts}
        totalPrice={totalPrice}
      />
    </>
  );
}