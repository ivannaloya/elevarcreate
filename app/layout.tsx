import type { Metadata, Viewport } from "next";
import { instrumentSans, playfair } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELEVAR — Brand & Content Strategy for Brands Ready to Rise",
  description:
    "ELEVAR builds the brand and content system that lifts already-established brands into their highest version. Brand strategy and content strategy for music, real estate, events, hospitality, and fashion.",
  metadataBase: new URL("https://elevarcreate.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "ELEVAR — The Rise Starts Here.",
    description: "We build the brand and content system that lifts you into your highest version.",
    url: "https://elevarcreate.com",
    siteName: "ELEVAR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVAR — The Rise Starts Here.",
    description: "We build the brand and content system that lifts you into your highest version.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${instrumentSans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Scroll-reveal wrappers server-render at opacity:0 and wait for a
            client-side viewport trigger. With JS disabled that trigger never
            comes, so force everything visible — content must never depend on
            an animation to be readable (crawlers, no-JS, reader modes). */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-paper text-ink flex min-h-full flex-col">
        <div className="grain-overlay" aria-hidden="true" />
        <a
          href="#main-content"
          className="bg-forest text-paper fixed top-4 left-4 z-[60] -translate-y-20 rounded-full px-5 py-2.5 transition-transform focus-visible:translate-y-0"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
