import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderVisual } from "@/components/case-study/PlaceholderVisual";
import { InstagramGridCompare } from "@/components/case-study/InstagramGridCompare";
import { IconArrowRight, IconArrowUpRight } from "@/components/icons";
import { caseStudies, getAdjacentCaseStudy, getCaseStudyBySlug } from "@/content/case-studies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.title} — ELEVAR`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const next = getAdjacentCaseStudy(slug);

  return (
    <>
      <Section tone="paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-forest">{study.category}</p>
            <h1 className="text-display-lg text-ink mt-4 max-w-3xl font-serif italic">
              {study.title}
            </h1>
            <p className="text-ink/70 mt-6 max-w-2xl text-lg leading-relaxed">{study.summary}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            {study.hasInstagramCompare ? (
              <InstagramGridCompare />
            ) : study.heroImage ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                  src={study.heroImage.src}
                  alt={study.heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1400px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <PlaceholderVisual label={study.title} aspect="aspect-[16/9]" />
            )}
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper-dim">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-forest">The Challenge</p>
              <p className="text-ink/80 mt-4 text-lg leading-relaxed">{study.challenge}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow text-forest">The Approach</p>
              <p className="text-ink/80 mt-4 text-lg leading-relaxed">{study.approach}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Only rendered for case studies that have real deck imagery. The old
          placeholder "Visuals" grid is gone — an empty section of stand-in
          blocks read as unfinished, so a study without assets simply skips
          straight from the approach to the next project. */}
      {study.pitchDeck && (
        <Section tone="paper">
          <Container>
            <Reveal>
              <p className="eyebrow text-forest">Pitch Deck</p>
              <p className="text-ink/70 mt-4 max-w-2xl text-lg leading-relaxed">
                The brand deck built to sell this exact vision — positioning, the world it
                creates, the people in it. Three slides below; the full deck is one click away.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {study.pitchDeck.visuals.map((visual, i) => (
                <Reveal key={visual.src} delay={i * 0.06}>
                  <a
                    href={study.pitchDeck!.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </div>
                    <p className="eyebrow text-ink/50 group-hover:text-forest mt-3 transition-colors">
                      {visual.caption}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <a
                href={study.pitchDeck.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group eyebrow btn-wipe border-forest text-forest hover:text-paper mt-10 inline-flex min-h-11 items-center gap-3 rounded-full border px-6 py-3 transition-colors"
              >
                View the full pitch deck (PDF)
                <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section tone="paper">
        <Container>
          <Reveal className="border-ink/10 flex flex-col items-start gap-6 border-t pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-ink/50">Next Project</p>
              <p className="text-ink mt-2 font-serif text-3xl italic">{next.title}</p>
            </div>
            <Link
              href={`/work/${next.slug}`}
              className="group eyebrow btn-wipe border-forest text-forest hover:text-paper inline-flex min-h-11 items-center gap-3 rounded-full border px-6 py-3 transition-colors"
            >
              View project
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
