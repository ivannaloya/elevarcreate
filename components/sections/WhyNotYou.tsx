import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

const body =
  "You already have a brand and real results, but your presence does not match your level. Why have you not been seen the way you deserve? Most brands lack a clear identity, or they post without a strategy that actually scales globally. But the real reason a brand stays small is simpler: it never built a world for its audience to step into. That world is exactly what we create.";

const pullQuote = "Your brand is already halfway up the climb. So why not you?";

/**
 * Full-bleed photo background — a single spotlit figure inside a dark
 * crowd, which is exactly the section's argument (you're already in the
 * room; nothing points the light at you yet). An 80% ink scrim sits over
 * it, measured against the image's brightest pixel (the light beam) to
 * keep paper text at ~8.9:1 and the sage accent at ~5.9:1 — both clear AA
 * even in that hottest spot. Text flips to paper/sage here, matching the
 * Hero's dark treatment, since ink-on-ink would be unreadable.
 */
export function WhyNotYou() {
  return (
    <Section id="why-not-you" tone="ink" folio="02">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/spotlight-crowd.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-ink/80 absolute inset-0" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-sage">The Problem</p>
            </Reveal>
            <MaskReveal
              as="h2"
              delay={0.05}
              className="text-display-lg text-paper mt-4 font-serif italic"
            >
              Why Not You
            </MaskReveal>
            <Reveal delay={0.1}>
              <p className="text-paper/75 mt-8 max-w-xl text-lg leading-relaxed">{body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="text-display-md text-sage font-serif leading-snug italic lg:text-right">
              {pullQuote}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
