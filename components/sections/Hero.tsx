"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { HeroVideo, HeroScrim } from "@/components/visual/HeroVideo";
import { Magnetic } from "@/components/motion/Magnetic";
import { IconArrowRight } from "@/components/icons";
import { cn } from "@/lib/cn";

const headlineLines = [
  { text: "The Rise", italic: false },
  { text: "Starts Here.", italic: true },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="bg-ink text-paper relative flex min-h-dvh items-center overflow-hidden pt-32 pb-20"
    >
      <HeroVideo />
      <HeroScrim />

      <Container className="relative z-10">
        <p className="eyebrow text-sage">Brand &amp; Content Strategy</p>

        <h1 className="text-display-xl text-paper mt-6 max-w-4xl font-serif">
          {headlineLines.map((line, i) => (
            <motion.span
              key={line.text}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={cn("block", line.italic && "text-sage italic")}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="text-paper/80 mt-8 max-w-lg text-lg leading-relaxed"
        >
          We build the brand and content system that lifts you into your highest version.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <Magnetic>
            <Link
              href="/#contact"
              className="group bg-paper text-ink hover:bg-sage inline-flex min-h-11 items-center gap-3 rounded-full px-7 py-4 transition-colors"
            >
              <span className="eyebrow">Start the climb</span>
              <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>
      </Container>
    </section>
  );
}
