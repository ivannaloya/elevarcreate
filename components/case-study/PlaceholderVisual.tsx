import { cn } from "@/lib/cn";

const corners = [
  "top-4 left-4 border-t border-l",
  "top-4 right-4 border-t border-r",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
];

/**
 * PLACEHOLDER visual — stands in for real case-study photography/video.
 * Styled as a print plate (registration marks + a caption rule) rather
 * than a generic gradient block with a giant watermark letter, so it reads
 * as an intentional placeholder in an editorial system, not filler.
 * Pure CSS, no external image request. Fixed aspect-ratio so the eventual
 * real asset can drop in with zero layout shift.
 */
export function PlaceholderVisual({
  label,
  className,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={cn("relative flex items-end overflow-hidden rounded-sm", aspect, className)}>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #16291d 48%, #111111 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Print registration marks — a plate, not a swatch. */}
      {corners.map((position) => (
        <span
          key={position}
          className={cn("border-paper/30 pointer-events-none absolute size-3", position)}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 m-6 flex flex-col gap-2">
        <span className="bg-paper/40 h-px w-8" aria-hidden="true" />
        <span className="eyebrow text-paper/80">{label}</span>
      </div>
    </div>
  );
}
