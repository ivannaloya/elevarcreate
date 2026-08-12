import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

const story =
  "I am Ivanna, founder of Elevar. I am a singer, producer, DJ, and creative director. I curate events and build brands people want to belong to. I know how to create identity, set a tone, and turn a crowd into a following, because I live it, I do not just strategize it. Elevar is where I bring that same world building to your brand.";

export function PathMaker() {
  return (
    <Section id="the-path-maker" tone="paper" folio="08">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-sm">
              <Image
                src="/images/ivanna-loya.png"
                alt="Ivanna Loya, founder of Elevar"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="eyebrow text-forest">The Path Maker</p>
            </Reveal>
            <MaskReveal as="h2" delay={0.15} className="text-display-lg text-ink mt-4 font-serif italic">
              Ivanna Loya
            </MaskReveal>
            <Reveal delay={0.2}>
              <p className="text-ink/70 mt-6 max-w-xl text-lg leading-relaxed">{story}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
