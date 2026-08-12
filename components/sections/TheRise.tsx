import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { WorkCard } from "@/components/case-study/WorkCard";
import { caseStudies } from "@/content/case-studies";

export function TheRise() {
  return (
    <Section id="the-rise" tone="paper-dim" folio="06">
      <Container>
        <Reveal>
          <p className="eyebrow text-forest">The Rise</p>
        </Reveal>
        <MaskReveal
          as="h2"
          delay={0.05}
          className="text-display-lg text-ink mt-4 max-w-2xl font-serif italic"
        >
          Selected Work
        </MaskReveal>
        <Reveal delay={0.1}>
          <p className="text-ink/70 mt-6 max-w-xl text-lg leading-relaxed">
            Partnerships with brands across music, real estate, events, and fashion, using
            content and events to take them to their next level.
          </p>
        </Reveal>

        {/* Mobile: horizontal snap-scroll rail, bleeding to the viewport edge
            for a peek of the next card — a touch-native pattern, not a
            shrunk desktop grid. Desktop: standard grid, flush in Container. */}
        <div className="no-scrollbar -mx-6 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-10 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal
              key={study.slug}
              delay={i * 0.06}
              className="w-[78vw] shrink-0 snap-start sm:w-[55vw] md:w-auto"
            >
              <WorkCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
