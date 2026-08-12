export type Client = {
  name: string;
  slug: string;
  /** Path under /public. Real client lockups, supplied by the client. */
  logo: string;
  /**
   * Zoom factor applied inside the logo tile. Every supplied asset is a
   * 2000×2000 canvas with the mark floating small in the middle, and the
   * amount of empty padding differs per file — so `object-contain` alone
   * renders them all tiny and at wildly different optical sizes. These
   * values normalise them to roughly equal visual weight. Tune per logo if
   * an asset is ever re-exported.
   */
  scale: number;
  /**
   * True for assets that ship light-on-dark (e.g. gold on a black plate).
   * The logo wall renders everything as a single monochrome family, so those
   * need an extra invert before the grayscale + multiply treatment — see
   * ClientWall for why the wall is monochrome rather than full colour.
   */
  invert?: boolean;
};

export const clients: Client[] = [
  { name: "Gorilla", slug: "gorilla", logo: "/logos/gorilla.png", scale: 1.9 },
  {
    name: "The Emerald Group",
    slug: "the-emerald-group",
    logo: "/logos/the-emerald-group.png",
    scale: 2.7,
  },
  { name: "BELLA VIDA", slug: "bella-vida", logo: "/logos/bella-vida.png", scale: 2.6 },
  { name: "Luna Rooftop", slug: "luna-rooftop", logo: "/logos/luna-rooftop.png", scale: 2.6 },
  { name: "Amar", slug: "amar", logo: "/logos/amar.png", scale: 3.0 },
  {
    name: "Tulum DJ Academy",
    slug: "tulum-dj-academy",
    logo: "/logos/tulum-dj-academy.png",
    scale: 2.6,
  },
  { name: "Das Beige", slug: "das-beige", logo: "/logos/das-beige.png", scale: 2.2 },
  {
    name: "Vinizza Avila",
    slug: "vinizza-avila",
    logo: "/logos/vinizza-avila.png",
    scale: 2.1,
    invert: true,
  },
];
