import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials" tone="paper-dim" folio="09">
      <Container>
        <Reveal>
          <p className="eyebrow text-forest">In Their Words</p>
        </Reveal>

        {/* Mobile: horizontal snap-scroll rail. Desktop: standard grid. */}
        <div className="no-scrollbar -mx-6 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
          {testimonials.map((testimonial, i) => (
            <Reveal
              key={testimonial.name}
              delay={i * 0.08}
              className="w-[82vw] shrink-0 snap-start sm:w-[60vw] md:w-auto"
            >
              <blockquote
                className="border-ink/10 bg-paper relative flex h-full origin-bottom flex-col justify-between overflow-hidden rounded-sm border p-8 transition-transform duration-500 ease-out hover:[transform:perspective(900px)_rotateX(1.5deg)_rotateY(-1.5deg)_translateY(-2px)]"
              >
                <span
                  className="text-ink/[0.05] pointer-events-none absolute -left-2 -top-6 select-none font-serif text-[8rem] italic leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-ink relative font-serif text-xl leading-snug italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="relative mt-8">
                  <p className="text-ink font-medium">{testimonial.name}</p>
                  <p className="text-ink/60 text-sm">{testimonial.title}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
