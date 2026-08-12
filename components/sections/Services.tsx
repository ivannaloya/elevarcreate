"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { services } from "@/content/services";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "framer-motion";

/**
 * Services, laid out from the supplied reference: a vertical "SERVICES"
 * wordmark down the left edge and a 2×2 grid of service groups over a
 * moving water background.
 *
 * Translated into the site's own system rather than copied literally — the
 * reference used a heavy geometric sans on stark white; here the group
 * titles are the same Playfair italic as every other section heading, the
 * lists are Instrument Sans, and the palette is the established
 * paper/sage-on-ink used by the Hero and Why Not You. Same layout idea,
 * same house style.
 *
 * Video only mounts on tablet/desktop and never under reduced motion —
 * mobile gets the poster frame, which keeps ~3MB off small-screen loads
 * (same strategy as HeroVideo).
 */
export function Services() {
  const canPlayVideo = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  const showVideo = canPlayVideo && !prefersReducedMotion;

  return (
    <Section id="services" tone="ink" folio="05">
      {/* Background: water footage + a heavy scrim. The copy sits across the
          full width here, so the scrim is flat-but-strong rather than
          directional — measured to keep paper text well clear of AA even
          over the brightest foam. */}
      <div className="absolute inset-0" aria-hidden="true">
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            src="/video/services-bg.mp4"
            poster="/video/services-bg-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src="/video/services-bg-poster.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="bg-ink/82 absolute inset-0" />
      </div>

      <Container className="relative z-10">
        <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Vertical wordmark — the reference's signature move. Hidden on
              small screens, where a sideways word would eat the width that
              the lists need. */}
          <Reveal className="hidden lg:block">
            <p
              className="text-paper/90 font-serif text-[clamp(4rem,7vw,7.5rem)] leading-none tracking-tight italic"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Services
            </p>
          </Reveal>

          <div>
            <Reveal className="lg:hidden">
              <p className="eyebrow text-sage">What We Do</p>
            </Reveal>
            <MaskReveal
              as="h2"
              delay={0.05}
              className="text-display-lg text-paper mt-4 font-serif italic lg:hidden"
            >
              Services
            </MaskReveal>

            <div className="mt-10 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:mt-0 lg:gap-y-20">
              {services.map((group, i) => (
                <Reveal key={group.title} delay={i * 0.06}>
                  <h3 className="text-paper font-serif text-2xl italic md:text-3xl">
                    {group.title}
                  </h3>
                  <span className="bg-sage/40 mt-4 block h-px w-10" aria-hidden="true" />
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="text-paper/75 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
