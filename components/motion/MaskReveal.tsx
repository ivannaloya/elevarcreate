"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Signature headline reveal — the text rises up from behind a clean mask
 * edge, rather than fading in place. Thematically it enacts "the rise."
 *
 * SCOPE: short headlines only (one to two lines). On a long multi-line
 * paragraph the clip box gets tall, the slide distance becomes huge, and
 * the motion reads clumsy rather than quiet — use `Reveal` for body copy
 * and multi-line statements instead.
 *
 * The clip container carries a little bottom padding (offset by an equal
 * negative margin) so descenders on italic serif aren't shaved off by
 * `overflow: hidden`, and the layout box stays exactly where it was.
 *
 * Failsafe: same as `Reveal` — clipped text must never be permanently
 * hidden just because a viewport trigger didn't fire.
 */
export function MaskReveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setFailsafe(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={cn("mb-[-0.12em] block overflow-hidden pb-[0.12em]", className)}>
      <motion.span
        ref={ref}
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={inView || failsafe ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
