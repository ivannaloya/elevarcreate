"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Standard scroll-reveal wrapper used across every section: fade + slight
 * upward translate, staggered via the `delay` prop (30-50ms per item).
 * Transform/opacity only, respects prefers-reduced-motion.
 *
 * Failsafe: content must never depend on an animation to be readable. If
 * the viewport trigger hasn't fired shortly after mount — backgrounded
 * tab, throttled observer, anything unexpected — we reveal anyway. See
 * also the <noscript> rule in app/layout.tsx, which covers JS-off.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setFailsafe(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView || failsafe ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
