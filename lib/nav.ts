export type NavLink = { label: string; href: string };

/** Primary header nav — kept short and predictable across every page. */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Work", href: "/#the-rise" },
  { label: "Process", href: "/#the-climb" },
  { label: "About", href: "/#the-path-maker" },
  { label: "Contact", href: "/#contact" },
];

/** Fuller section index shown in the footer. */
export const FOOTER_NAV: NavLink[] = [
  { label: "Manifesto", href: "/#manifesto" },
  { label: "Why Not You", href: "/#why-not-you" },
  { label: "Our Secret", href: "/#our-secret" },
  { label: "The Climb", href: "/#the-climb" },
  { label: "The Rise", href: "/#the-rise" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

/** Section ids tracked for the header's active-link indicator (home only). */
export const NAV_OBSERVED_IDS = ["the-rise", "the-climb", "the-path-maker", "contact"];

// Only real, working profiles belong here — a social icon that links to "#"
// is a dead link, which reads worse than simply not showing the icon.
// Re-add TikTok / LinkedIn (icons already exist in components/icons.tsx)
// once those handles are live.
export const SOCIAL_LINKS: {
  label: string;
  href: string;
  icon: "instagram" | "tiktok" | "linkedin";
}[] = [
  { label: "Instagram", href: "https://www.instagram.com/elevar.create", icon: "instagram" },
];

export const BOOK_A_CALL_URL = "https://calendly.com/ivanna-elevarcreate/30min";

/** Single source of truth for the contact address — used by the footer and
 *  anywhere else that needs to reach Elevar directly. */
export const CONTACT_EMAIL = "ivanna@elevarcreate.com";
