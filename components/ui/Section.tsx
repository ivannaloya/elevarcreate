import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Tone = "paper" | "paper-dim" | "ink";

/* Quiet depth instead of flat fills — a barely-there light-source gradient
   on paper tones, a soft vignette glow on ink. The shift should register as
   "this feels considered," not as a visible graphic element. */
const toneBackground: Record<Tone, string> = {
  paper: "bg-[linear-gradient(180deg,#f8f5ef_0%,var(--color-paper)_50%)] text-ink",
  "paper-dim": "bg-[linear-gradient(180deg,#f1ead9_0%,var(--color-paper-dim)_50%)] text-ink",
  ink: "bg-[radial-gradient(120%_80%_at_50%_0%,#1d1d1b_0%,var(--color-ink)_60%)] text-paper",
};

const folioTone: Record<Tone, string> = {
  paper: "text-ink/30",
  "paper-dim": "text-ink/30",
  ink: "text-paper/30",
};

/** Shared vertical rhythm for every home-page section. Reused instead of
 *  hand-picking py-* values per component so the section rhythm stays
 *  consistent end to end. `folio` renders a small print-style page number
 *  in the corner — a recurring editorial motif tying sections back to the
 *  "printed page" concept. */
export const Section = forwardRef<
  HTMLElement,
  {
    id?: string;
    children: ReactNode;
    className?: string;
    tone?: Tone;
    folio?: string;
  }
>(function Section({ id, children, className, tone = "paper", folio }, ref) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative overflow-hidden border-t border-current/10 py-24 md:py-32 lg:py-40",
        toneBackground[tone],
        className,
      )}
    >
      {folio && (
        <span
          className={cn(
            "eyebrow pointer-events-none absolute right-6 top-6 hidden font-normal tabular-nums md:right-10 md:top-8 sm:block",
            folioTone[tone],
          )}
          aria-hidden="true"
        >
          {folio}
        </span>
      )}
      {children}
    </section>
  );
});
