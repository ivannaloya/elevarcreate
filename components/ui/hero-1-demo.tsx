import { Hero } from "@/components/ui/hero-1";

// Reference usage example for components/ui/hero-1.tsx — not routed/rendered
// anywhere on the live site. See the chat summary for why: its visual style
// (light/dark grid background, generic SaaS copy) doesn't match ELEVAR's
// editorial paper/forest brand system, so it's kept here for reference only.
export default function DemoOne() {
  return (
    <Hero
      title="Build smarter tools for modern teams"
      subtitle="Streamline your workflow and boost productivity with intuitive solutions. Security, speed, and simplicity—all in one platform."
      eyebrow="Next-Gen Productivity"
      ctaLabel="Get Started"
      ctaHref="#"
    />
  );
}
