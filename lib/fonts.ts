import { Instrument_Sans, Playfair_Display } from "next/font/google";

/**
 * Display serif — high-contrast editorial serif used for headlines,
 * section titles, and italic pull quotes ("The Rise", "The Climb").
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/**
 * Body sans — chosen deliberately over Inter/Roboto. Instrument Sans has a
 * larger aperture and warmer curves that sit better against Playfair's
 * high-contrast serif without competing for attention.
 */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});
