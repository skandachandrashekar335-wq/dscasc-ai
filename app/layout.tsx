import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DSCASC AI — Smart Student Guidance Assistant",
  description:
    "NLP-based automated admission and student guidance chatbot for Dayananda Sagar College of Arts, Science and Commerce (Bangalore).",
  keywords: [
    "DSCASC",
    "Dayananda Sagar College",
    "BCA AI Chatbot",
    "Admissions",
    "Bangalore University",
    "BCA Timetable",
    "Placements",
    "NLP Intent Matching",
  ],
  authors: [{ name: "DSCASC BCA AI Department" }],
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
    <html lang="en" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-dsc-navy">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
