import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

export function OurSecret() {
  return (
    <Section id="our-secret" tone="paper-dim" folio="03">
      <Container>
        <Reveal>
          <p className="eyebrow text-forest">Our Secret</p>
        </Reveal>
        <MaskReveal
          as="h2"
          delay={0.05}
          className="text-display-lg text-ink mt-4 max-w-2xl font-serif italic"
        >
          Growth versus scale.
        </MaskReveal>
        <Reveal delay={0.1}>
          <p className="text-ink/70 mt-6 max-w-2xl text-lg leading-relaxed">
            There is a difference between growth and scale, the same way there is a difference
            between goals and results. A lot of people use those words interchangeably. They should
            not.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="border-ink/10 bg-paper relative flex h-full flex-col gap-8 rounded-sm border p-8 md:p-10">
              <span className="text-ink/25 eyebrow absolute right-6 top-6 font-normal tabular-nums md:right-8 md:top-8">
                A
              </span>
              <div>
                <p className="eyebrow text-ink/50">Growth</p>
                <p className="text-ink mt-3 text-xl leading-snug">
                  Growth means the numbers are moving.
                </p>
              </div>
              <div className="border-ink/10 border-t pt-8">
                <p className="eyebrow text-ink/50">A Goal</p>
                <p className="text-ink mt-3 text-xl leading-snug">A goal is something you chase.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-forest text-paper relative flex h-full flex-col gap-8 rounded-sm p-8 md:p-10">
              <span className="text-paper/30 eyebrow absolute right-6 top-6 font-normal tabular-nums md:right-8 md:top-8">
                B
              </span>
              <div>
                <p className="eyebrow text-paper/60">Scale</p>
                <p className="mt-3 text-xl leading-snug">
                  Scale means the brand becomes stronger as it grows. That is why most brands never
                  scale — instead of strengthening the brand, they push harder on a machine that was
                  underbuilt from the start.
                </p>
              </div>
              <div className="border-paper/20 border-t pt-8">
                <p className="eyebrow text-paper/60">A Result</p>
                <p className="mt-3 text-xl leading-snug">
                  A result is something you can see and measure.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <p className="text-ink/70 mt-14 max-w-2xl text-lg leading-relaxed">
            We are not here to help you hit a goal. We help you define the exact results you want,
            then build the brand and content that will get you there.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
