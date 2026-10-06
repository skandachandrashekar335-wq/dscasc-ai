import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSCASC AI — Smart Student Guidance Assistant",
  description:
    "NLP-based student guidance chatbot for Dayananda Sagar College of Arts, Science and Commerce (Bangalore) — covering admissions, all UG & PG programs (BCA, BBA, B.Com, B.Sc, MCA, MBA, M.Com), academics and placements.",
  keywords: [
    "DSCASC",
    "Dayananda Sagar College",
    "DSCASC AI Chatbot",
    "Admissions",
    "Bangalore University",
    "BCA",
    "BBA",
    "B.Com",
    "B.Sc",
    "MCA",
    "MBA",
    "M.Com",
    "UG and PG Programs",
    "Placements",
    "NLP Intent Matching",
  ],
  authors: [{ name: "DSCASC AI — Student Guidance" }],
  openGraph: {
    title: "DSCASC AI — Smart Student Guidance Assistant",
    description:
      "Automated Student Guidance & Admissions Chatbot powered by custom explainable NLP (TF-IDF + Cosine Similarity).",
    url: "https://dscasc.ai",
    siteName: "DSCASC AI",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-brand-charcoal antialiased selection:bg-brand-yellow selection:text-black">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-black focus:bg-brand-yellow focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
