"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MouseEvent, ReactNode, useRef, useState } from "react";

/**
 * Subtle magnetic-hover wrapper — reserved for the single primary CTA per
 * the animation spec ("keep it subtle"). Transform-only, spring physics,
 * fully inert when prefers-reduced-motion is set.
 */
export function Magnetic({ children, strength = 14 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: (relX / rect.width) * strength, y: (relY / rect.height) * strength });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
