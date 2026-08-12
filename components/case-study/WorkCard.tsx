"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { PlaceholderVisual } from "@/components/case-study/PlaceholderVisual";
import { IconArrowUpRight } from "@/components/icons";
import type { CaseStudy } from "@/content/case-studies";

/**
 * Selected-work card with a cursor-following "View" pill — a signature
 * portfolio interaction, not another fade-up card. Hover-only: skipped
 * entirely on touch devices via the (hover: hover) media query, so it
 * never gets in the way of a tap.
 */
export function WorkCard({ study }: { study: CaseStudy }) {
  const canHover = useMediaQuery("(hover: hover)");
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <Link
      ref={ref}
      href={`/work/${study.slug}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-sm">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          <PlaceholderVisual label={study.title} />
        </div>
      </div>

      {canHover && (
        <motion.div
          className="eyebrow bg-paper text-ink pointer-events-none absolute left-0 top-0 z-20 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ x: springX, y: springY }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          View
        </motion.div>
      )}

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-ink font-serif text-xl">{study.title}</h3>
          <p className="text-ink/60 mt-1 text-sm">{study.category}</p>
        </div>
        <IconArrowUpRight className="text-forest mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
