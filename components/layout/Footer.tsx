import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconInstagram, IconLinkedin, IconTikTok } from "@/components/icons";
import { CONTACT_EMAIL, FOOTER_NAV, SOCIAL_LINKS } from "@/lib/nav";

const socialIcon = {
  instagram: IconInstagram,
  tiktok: IconTikTok,
  linkedin: IconLinkedin,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="border-paper/15 grid gap-12 border-b pb-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8 md:pb-16">
          <div>
            <p className="font-serif text-3xl italic">ELEVAR</p>
            <p className="text-paper/60 mt-4 max-w-xs">
              Brand and content strategy for brands that are already established and ready to scale.
            </p>
            <ul className="mt-8 flex items-center gap-4" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcon[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={`${social.label} (opens in a new tab)`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-paper/20 text-paper/80 hover:border-paper hover:text-paper grid size-11 place-items-center rounded-full border transition-colors"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Site</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-draw text-paper/75 hover:text-paper inline-block transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Contact</p>
            <ul className="text-paper/75 mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link-draw hover:text-paper inline-block transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>Based in Miami, FL — working worldwide</li>
            </ul>
          </div>
        </div>

        <div className="text-paper/50 flex flex-col-reverse items-start gap-4 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {year} ELEVAR. All rights reserved.</p>
          <p className="italic">Elevar — to elevate, to raise, to lift higher.</p>
        </div>
      </Container>
    </footer>
  );
}
