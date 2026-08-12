"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { cn } from "@/lib/cn";

const steps = [
  {
    number: "01",
    name: "Base Camp",
    description: "We audit your brand and content and map where you actually stand.",
  },
  {
    number: "02",
    name: "The Route",
    description: "We define the direction of your positioning, voice, and message.",
  },
  {
    number: "03",
    name: "The Lift",
    description: "We build the content strategy and system. Now it is time to climb.",
  },
];

export function TheClimb() {
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollTriggers: ScrollTrigger[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;

      // Drives the active-step highlight in sequence as each step crosses
      // the viewport center — this is the "reveal in order" part.
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        }),
      );

      // Shifts the pinned sculpture between steps — transform-only (rotate
      // + translateY), scrubbed against scroll position, skipped entirely
      // when the user has requested reduced motion.
      if (!prefersReducedMotion && sculptureRef.current) {
        const tween = gsap.fromTo(
          sculptureRef.current,
          { rotate: i * 8 - 8, y: 0 },
          {
            rotate: i * 8,
            y: i * 18 - 18,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top center",
              end: "bottom center",
              scrub: 0.5,
            },
          },
        );
        scrollTriggers.push(tween.scrollTrigger as ScrollTrigger);
      }
    });

    return () => {
      scrollTriggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section id="the-climb" tone="paper" folio="04">
      <Container>
        <Reveal>
          <p className="eyebrow text-forest">The Climb</p>
        </Reveal>
        <MaskReveal
          as="h2"
          delay={0.05}
          className="text-display-lg text-ink mt-4 max-w-2xl font-serif italic"
        >
          No brand rises by accident.
        </MaskReveal>
        <Reveal delay={0.1}>
          <p className="text-ink/70 mt-6 max-w-xl text-lg leading-relaxed">
            Creating content stops being hard the moment you know where you are headed.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="relative hidden lg:block">
            <div className="sticky top-32 flex h-[420px] items-center justify-center">
              {/* Transparent-background artwork, so it sits directly on the
                  paper tone with no plate behind it. `sculptureRef` is the
                  GSAP target — the scroll-driven rotate/drift between steps
                  is unchanged. */}
              <div ref={sculptureRef} className="relative aspect-square w-[360px]">
                <Image
                  src="/images/the-climbers.png"
                  alt="Three climbers rappelling from a floating boulder"
                  fill
                  sizes="360px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Elevation track — a static line plus a forest fill that
                climbs step by step, instead of three independent borders
                toggling color. It's a literal progress-up-the-mountain
                readout, not decoration. */}
            <div className="bg-ink/10 absolute left-0 top-1 bottom-1 w-px" aria-hidden="true" />
            <div
              className="bg-forest absolute left-0 top-1 w-px origin-top transition-transform duration-500 ease-out"
              style={{ height: "calc(100% - 0.5rem)", transform: `scaleY(${(activeStep + 1) / steps.length})` }}
              aria-hidden="true"
            />

            <ol className="space-y-14">
              {steps.map((step, i) => (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative pl-8"
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1 size-2 -translate-x-1/2 rounded-full transition-colors duration-300",
                      activeStep >= i ? "bg-forest" : "bg-ink/20",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "font-serif text-5xl italic transition-colors duration-300",
                      activeStep === i ? "text-forest" : "text-ink/25",
                    )}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-ink mt-3 font-serif text-2xl">{step.name}</h3>
                  <p className="text-ink/70 mt-2 max-w-md">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
