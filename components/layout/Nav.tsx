"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IconClose, IconMenu } from "@/components/icons";
import { NAV_OBSERVED_IDS, PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const elements = NAV_OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Over the full-bleed hero video the bar is transparent, so its contents
  // have to invert to light — dark ink on that footage is unreadable. Once
  // scrolled onto paper (or with the mobile sheet open) it returns to ink.
  const overHero = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "bg-paper/90 border-ink/10 border-b backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-serif text-xl font-semibold tracking-wide transition-colors",
            overHero ? "text-paper" : "text-ink",
          )}
          onClick={() => setMenuOpen(false)}
        >
          ELEVAR
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((link) => {
            const id = link.href.replace("/#", "");
            const isActive = isHome && activeId === id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "eyebrow group relative py-2 transition-colors",
                  overHero
                    ? "text-paper/80 hover:text-paper"
                    : "text-ink/70 hover:text-forest",
                  isActive && (overHero ? "text-paper" : "text-forest"),
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-300",
                    overHero ? "bg-paper" : "bg-forest",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            className={cn(
              "eyebrow hidden rounded-full border px-5 py-2.5 transition-colors md:inline-flex",
              overHero
                ? "border-paper/50 text-paper hover:bg-paper hover:text-ink"
                : "btn-wipe border-forest text-forest hover:text-paper",
            )}
          >
            Start the climb
          </Link>

          <button
            type="button"
            className={cn(
              "grid size-11 place-items-center transition-colors md:hidden",
              overHero ? "text-paper" : "text-ink",
            )}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-ink/10 bg-paper border-t md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-ink/5 text-ink min-h-11 border-b py-4 font-serif text-2xl italic"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="eyebrow border-forest text-forest mt-4 inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3"
              >
                Start the climb
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
