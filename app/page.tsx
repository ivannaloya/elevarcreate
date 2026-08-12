import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { WhyNotYou } from "@/components/sections/WhyNotYou";
import { OurSecret } from "@/components/sections/OurSecret";
import { TheClimb } from "@/components/sections/TheClimb";
import { Services } from "@/components/sections/Services";
import { TheRise } from "@/components/sections/TheRise";
import { ClientWall } from "@/components/sections/ClientWall";
import { PathMaker } from "@/components/sections/PathMaker";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <WhyNotYou />
      <OurSecret />
      <TheClimb />
      {/* Services sits after the process and before the work: "here's how we
          work" → "here's what you can actually buy" → "here's the proof". */}
      <Services />
      <TheRise />
      <ClientWall />
      <PathMaker />
      <Testimonials />
      <Contact />
    </>
  );
}
