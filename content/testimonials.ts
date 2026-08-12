export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

// Real client testimonials, supplied by the client.
// Quotes are stored without surrounding quote marks — the Testimonials
// component adds the typographic “ ” so the punctuation stays consistent.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Before Elevar, we were just another academy with good instructors and no system. What Ivanna brought wasn’t just a brand — it was clarity, structure, a way to scale that we couldn’t have built alone. That’s what turned potential into actual success.",
    name: "Steve Ash",
    title: "Director, Tulum DJ Academy",
  },
  {
    quote:
      "Ivanna doesn’t just build brands, she connects them. She saw what made ours work before we did, and matched us with people who actually made sense. That’s a rare kind of clarity. She has this instinct for brand identity that most people spend years trying to develop.",
    name: "Lori Blanco",
    title: "Patron",
  },
  {
    quote:
      "It used to be just another party — no brand, no through-line. Now it’s a movement, a collection people know, and it scaled far past Texas faster than we imagined. Ivanna gave us a brand identity we could actually be proud of.",
    name: "Alyssa Marquez",
    title: "Co-Founder, BELLA VIDA",
  },
];
