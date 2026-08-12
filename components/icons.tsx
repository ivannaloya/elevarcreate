import { SVGProps } from "react";

/** Thin-stroke, Phosphor/Heroicons-style inline icons — no icon font, no
 *  emoji, consistent 1.5px stroke weight across the set. */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <rect x="4" y="5.5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5c.35 0 .69.04 1 .12" />
      <path d="M14 3c.4 2.4 2.1 4.1 4.5 4.4" />
    </svg>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12.5 17v-4a2 2 0 0 1 4 0v4M12.5 10.5V17" />
    </svg>
  );
}
