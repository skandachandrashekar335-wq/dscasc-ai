import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, ExternalLink, MessageSquare } from "lucide-react";

export const Footer: React.FC = () => {
  const navItems = [
    { href: "/", label: "Home Overview" },
    { href: "/chat", label: "Chat Assistant (NLP)" },
    { href: "/placements", label: "Placement Statistics" },
    { href: "/about", label: "How It Works" },
  ];

  const portalLinks = [
    { href: "https://www.dscasc.edu.in/", label: "DSCASC Website" },
    { href: "https://www.dscasc.edu.in/courses/ug/bca", label: "BCA Department" },
    { href: "https://dscasc.edu.in/placement", label: "Placements Portal" },
    { href: "https://apply.dayanandasagar.edu/dscasc", label: "Admissions Enquiry" },
  ];

  return (
    <footer className="on-dark relative overflow-hidden border-t-2 border-black bg-brand-charcoal text-white">
      <div className="dot-grid-dark pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand + disclaimer */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border-2 border-black bg-brand-yellow shadow-brutal">
                <GraduationCap className="h-6 w-6 text-black" aria-hidden="true" />
              </span>
              <div>
                <div className="font-display text-xl font-extrabold tracking-tight text-white">
                  DSCASC AI
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-sage">
                  Automated Student Guidance
                </div>
              </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-brand-sage">
              An NLP-based automated admission and student guidance chatbot for Dayananda Sagar
              College of Arts, Science and Commerce (DSCASC), Bangalore. Affiliated to Bangalore
              University.
            </p>

            <div className="max-w-md border-2 border-brand-yellow bg-black/40 p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-yellow">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Academic Prototype Disclaimer</span>
              </div>
              <p className="text-[11px] leading-relaxed text-brand-sage">
                Prototype information is based on publicly available DSCASC information and should be
                verified with the college for time-sensitive details. Never invent current fees,
                admission deadlines, examination dates, or placement guarantees.
              </p>
            </div>

            <Link
              href="/chat"
              className="brutal-btn brutal-btn-primary brutal-btn-sm inline-flex"
            >
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              Ask DSCASC AI
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <div className="mb-4 border-b-2 border-brand-yellow pb-2 text-xs font-extrabold uppercase tracking-widest text-brand-yellow">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-semibold text-white transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Official portals */}
          <nav aria-label="Official DSCASC links">
            <div className="mb-4 border-b-2 border-brand-yellow pb-2 text-xs font-extrabold uppercase tracking-widest text-brand-yellow">
              Official Portals
            </div>
            <ul className="space-y-2.5 text-sm">
              {portalLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-yellow"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t-2 border-white/20 pt-5 text-[11px] font-semibold uppercase tracking-wider text-brand-sage sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} DSCASC AI &bull; Dayananda Sagar College of Arts,
            Science and Commerce
          </span>
          <span>BCA Semester III AI Project &bull; Built with Next.js &amp; TypeScript</span>
        </div>
      </div>
    </footer>
  );
};
