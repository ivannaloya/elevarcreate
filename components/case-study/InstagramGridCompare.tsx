"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

const views = {
  before: {
    src: "/images/tda-feed-before.jpg",
    alt: "Tulum DJ Academy's Instagram grid before Elevar — mixed lighting, inconsistent colour and no shared visual system between posts.",
    caption: "Nine posts, nine different looks. Nothing tells you it's one school.",
  },
  after: {
    src: "/images/tda-feed-after.jpg",
    alt: "Tulum DJ Academy's Instagram grid after Elevar — a consistent green waveform frame, uniform grade and recurring 'Live Recording' and 'Meet Our Student' labels across every post.",
    caption: "One frame, one grade, recurring labels. The grid reads as a brand.",
  },
} as const;

type ViewKey = keyof typeof views;

export function InstagramGridCompare() {
  const [mode, setMode] = useState<ViewKey>("before");
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.35;

  return (
    <div>
      <div
        className="mb-6 flex items-center gap-2"
        role="tablist"
        aria-label="Instagram grid, before and after"
      >
        {(Object.keys(views) as ViewKey[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            aria-controls={`ig-panel-${key}`}
            onClick={() => setMode(key)}
            className={cn(
              "eyebrow min-h-11 cursor-pointer rounded-full border px-5 py-2 transition-colors",
              mode === key
                ? "border-forest bg-forest text-paper"
                : "border-ink/20 text-ink/70 hover:border-forest hover:text-forest",
            )}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="border-ink/10 bg-ink/5 relative aspect-[864/1080] w-full max-w-md overflow-hidden rounded-sm border">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            id={`ig-panel-${mode}`}
            role="tabpanel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={views[mode].src}
              alt={views[mode].alt}
              fill
              sizes="(min-width: 768px) 448px, 90vw"
              priority={mode === "before"}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-ink/60 mt-4 max-w-md text-sm">{views[mode].caption}</p>
    </div>
  );
}
