"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Full-bleed hero background video.
 *
 * A static poster frame is the default render (lightweight, zero layout
 * shift); the ~5MB clip only mounts once JS confirms a tablet/desktop
 * viewport and the user hasn't requested reduced motion — a deliberate
 * per-breakpoint asset choice that keeps mobile payload light.
 *
 * The media layer is oversized (scale-110) so the parallax drift can never
 * expose an edge, and the whole thing is transform-only so it never
 * triggers layout.
 *
 * Legibility is handled by the scrim in `HeroScrim` below — the video is
 * high-contrast black and white, so text can't sit on it unprotected.
 */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const canPlayVideo = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const showVideo = canPlayVideo && !prefersReducedMotion;

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className="absolute inset-0 scale-110"
        style={prefersReducedMotion ? undefined : { y }}
      >
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            src="/video/elevar-hero.mp4"
            poster="/video/elevar-hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        ) : (
          <Image
            src="/video/elevar-hero-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Scrim over the hero video, weighted differently per breakpoint because
 * the copy occupies a different part of the frame at each size — this is a
 * layout decision, not a resize.
 *
 * Desktop: copy sits in the left column, so the gradient runs left-heavy
 * (≥86% ink there) and eases off to the right, keeping the staircase and
 * the climbing figure clearly visible.
 *
 * Mobile: copy spans nearly the full width, so a left-weighted gradient
 * would leave line-ends stranded over the lit staircase. Portrait gets a
 * vertically-weighted scrim instead — heavy through the text band, lighter
 * at the bottom so the figure still reads below the CTA.
 *
 * Both are measured to keep cream text and the sage accent above 4.5:1
 * against the brightest frame of the footage.
 */
export function HeroScrim() {
  return (
    <>
      {/* Mobile / portrait — vertical weighting through the copy band. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.72) 0%, rgba(17,17,17,0.74) 20%, rgba(17,17,17,0.88) 38%, rgba(17,17,17,0.88) 70%, rgba(17,17,17,0.52) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Desktop — directional weighting toward the left column. */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(100deg, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.86) 32%, rgba(17,17,17,0.62) 58%, rgba(17,17,17,0.28) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Gentle top/bottom falloff so the fixed nav and the section seam
          below both have something to sit against. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0) 22%, rgba(17,17,17,0) 72%, rgba(17,17,17,0.5) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
