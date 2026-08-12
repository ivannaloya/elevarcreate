import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const manifesto =
  "ELEVAR is the Spanish verb for to elevate, to raise, to lift higher. It is not a thing, it is an action. That is the whole brand. Elevar is the act of taking something that is already real and lifting it into its highest, most potent version.";

export function Manifesto() {
  return (
    <Section id="manifesto" tone="paper-dim" folio="01">
      <Container>
        {/* Deliberately `Reveal`, not `MaskReveal` — this is a tall
            multi-line statement, and a clip-and-slide on a block this
            size reads clumsy (and hides the copy entirely until the
            trigger fires). Quiet fade + lift is the right call here. */}
        <Reveal>
          <p className="text-display-md text-ink mx-auto max-w-4xl text-center font-serif leading-snug italic">
            {manifesto}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
