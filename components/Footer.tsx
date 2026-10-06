import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Institutional Profile */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dsc-navy text-white">
                <GraduationCap className="h-4 w-4 text-dsc-gold" />
              </div>
              <span className="font-extrabold text-dsc-navy tracking-tight text-base">
                DSCASC AI Assistant
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-md">
              An NLP-based automated admission and student guidance chatbot for Dayananda Sagar College of Arts, Science and Commerce (DSCASC), Bangalore. Affiliated to Bangalore University.
            </p>
            <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-2.5 text-[11px] text-amber-900">
              <div className="font-semibold flex items-center gap-1 mb-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                <span>Academic Prototype Disclaimer</span>
              </div>
              <span>
                Prototype information is based on publicly available DSCASC information and should be verified with the college for time-sensitive details. Never invent current fees, admission deadlines, examination dates, or placement guarantees.
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Application
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-dsc-blue">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-dsc-blue">
                  Chat Assistant (NLP)
                </Link>
              </li>
              <li>
                <Link href="/placements" className="hover:text-dsc-blue">
                  Placement Statistics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-dsc-blue">
                  NLP Pipeline Walkthrough
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Official College Links */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Official Portals
            </div>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://www.dscasc.edu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-dsc-blue"
                >
                  <span>DSCASC Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.dscasc.edu.in/courses/ug/bca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-dsc-blue"
                >
                  <span>BCA Department</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dscasc.edu.in/placement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-dsc-blue"
                >
                  <span>Placements Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://apply.dayanandasagar.edu/dscasc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-dsc-blue"
                >
                  <span>Admissions Enquiry</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2">
          <div>
            &copy; {new Date().getFullYear()} DSCASC AI &bull; Dayananda Sagar College of Arts, Science and Commerce
          </div>
          <div>
            BCA Semester III Artificial Intelligence Academic Assignment &bull; Built with Next.js & TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
};
