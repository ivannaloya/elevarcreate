import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import { clients } from "@/content/clients";
import { cn } from "@/lib/cn";

/**
 * Client logo wall.
 *
 * Tone is `paper`, not `ink`: seven of the eight supplied lockups ship as
 * dark art on a white plate, which can't sit on a dark band without showing
 * its box. On paper, `mix-blend-multiply` makes those white plates vanish
 * into the cream.
 *
 * The wall is monochrome by choice. The raw set spans red, two greens, gold
 * and black — dropped in as-is that reads as a rainbow and breaks the
 * three-colour system the rest of the site holds to. Grayscale unifies them
 * into one family and lets the marks themselves carry the variety. Logos
 * lift to full contrast on hover, so the real brands are still discoverable.
 */
export function ClientWall() {
  return (
    <Section id="clients" tone="paper" folio="07">
      <Container>
        <Reveal>
          <p className="text-display-md text-ink mx-auto max-w-3xl text-center font-serif leading-snug italic">
            Are you ready to take your vision to the next level?{" "}
            <span className="text-ink/45">These brands were.</span>
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed rail — the marquee should run edge to edge, so it sits
          outside Container, with masked ends so logos fade rather than
          getting chopped at the viewport edge. */}
      <Reveal delay={0.1}>
        <div
          className="mt-16 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
          role="list"
          aria-label="Selected clients"
        >
          <InfiniteSlider gap={72} duration={40} durationOnHover={90}>
            {clients.map((client) => (
              <div
                key={client.slug}
                role="listitem"
                className="group relative flex h-20 w-[160px] shrink-0 items-center justify-center overflow-hidden sm:w-[200px]"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={2000}
                  height={2000}
                  sizes="200px"
                  style={{ transform: `scale(${client.scale})` }}
                  className={cn(
                    "h-full w-full object-contain opacity-70 mix-blend-multiply grayscale transition-[opacity,filter] duration-500 ease-out group-hover:opacity-100",
                    // Inverted assets stay monochrome on hover — dropping
                    // grayscale would reveal the *inverted* hue (gold reads
                    // as blue), not the real brand colour.
                    client.invert ? "invert" : "group-hover:grayscale-0",
                  )}
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </Reveal>
    </Section>
  );
}
