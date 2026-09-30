"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/constants/faqs";

export default function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={cn(
              "rounded-xl border bg-card shadow-soft transition-colors duration-300",
              isOpen ? "border-primary/40" : "border-border"
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {f.q}
              <Plus
                size={16}
                className={cn(
                  "shrink-0 text-muted transition-transform duration-300 motion-reduce:transition-none",
                  isOpen && "rotate-45 text-primary"
                )}
              />
            </button>

            {/* Smooth height animation: grid row goes 0fr -> 1fr */}
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "px-5 pb-4 text-sm leading-relaxed text-muted transition-opacity duration-300 motion-reduce:transition-none",
                    isOpen ? "opacity-100" : "opacity-0"
                  )}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}