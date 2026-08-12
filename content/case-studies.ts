export type PitchDeckVisual = {
  src: string;
  alt: string;
  caption: string;
};

export type PitchDeck = {
  /** Path under /public to the full deck, compressed for web (~6MB, down
   *  from a 44MB raw Canva export). */
  url: string;
  /** Cover slides shown as a preview grid; each links into the full PDF. */
  visuals: PitchDeckVisual[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  /** One-line summary shown on The Rise work grid card. */
  summary: string;
  challenge: string;
  approach: string;
  /** Lead image at the top of the case study page. When absent, the page
   *  falls back to the print-plate PlaceholderVisual. */
  heroImage?: { src: string; alt: string };
  /** Only true for Tulum DJ Academy — renders the before/after IG grid compare. */
  hasInstagramCompare?: boolean;
  /** Real client-supplied pitch deck, shown as a preview + full-PDF link
   *  instead of the generic placeholder visuals. Currently only BELLA VIDA
   *  has one. */
  pitchDeck?: PitchDeck;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tulum-dj-academy",
    title: "Tulum DJ Academy",
    category: "DJ School, Retreat & Event Company",
    summary: "Turning a feed of disconnected clips into a world people wanted to enroll in.",
    challenge:
      "Tulum DJ Academy had the thing every brand says it wants: real talent, real students, real transformation happening every cohort. What it didn't have was a feed that looked like any of that. The grid was a mix of phone footage, inconsistent color, and captions written in a rush between classes. People scrolled past a genuinely good program because nothing on screen told them it was one.",
    approach:
      "We didn't start with a content calendar. We started with an audit of every post from the last year, sorted by what actually built trust versus what was just noise. From there we built a visual system — a consistent grade, a shot list tied to the actual student journey, and a posting rhythm built around cohort milestones instead of arbitrary days. The before-and-after grid below is the story in one image: same school, same talent, a brand finally built to match it.",
    hasInstagramCompare: true,
  },
  {
    slug: "bella-vida",
    title: "BELLA VIDA",
    category: "Event Brand",
    summary: "Building a brand strong enough to outlast any single event on the calendar.",
    challenge:
      "BELLA VIDA had thrown consistently good events, but the brand reset every time — new visual identity per event, no throughline, no reason for someone who loved one night to expect anything specific from the next. It was growing in attendance, but not compounding in reputation. Every event started from zero.",
    approach:
      "We built BELLA VIDA as a brand first, event calendar second: a fixed visual language, a voice that carried across every announcement, and a content system that let each event feel distinct while still being unmistakably BELLA VIDA. We also rebuilt the pre-launch sequence for each event, so anticipation compounds instead of resetting, and mapped a content structure for the 48 hours after each event to convert energy into the next sale.",
    heroImage: {
      src: "/images/bella-vida-hero.jpg",
      alt: "BELLA VIDA brand cover — the wordmark in red over a silhouette, 'Collective | Immersive Experience'",
    },
    pitchDeck: {
      url: "/documents/bella-vida-overview.pdf",
      visuals: [
        {
          // Deliberately not the cover — that art is now the page's lead
          // image above, and showing it twice on one page reads as an
          // accident. This is the deck's origin slide instead.
          src: "/images/bella-vida-deck-origin.jpg",
          alt: "BELLA VIDA pitch deck slide: The Origin — 'We lost someone. And grief taught us how to truly live.'",
          caption: "The origin",
        },
        {
          src: "/images/bella-vida-deck-universe.jpg",
          alt: "BELLA VIDA pitch deck slide: A World Built to Celebrate — the feeling, the sound, the space",
          caption: "The brand universe",
        },
        {
          src: "/images/bella-vida-deck-bellas.jpg",
          alt: "BELLA VIDA pitch deck slide introducing 'the Bellas'",
          caption: "Who are the Bellas",
        },
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAdjacentCaseStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return caseStudies[0];
  return caseStudies[(index + 1) % caseStudies.length];
}
