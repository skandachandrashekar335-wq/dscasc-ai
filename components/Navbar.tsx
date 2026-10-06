"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  MessageSquare,
  Briefcase,
  Info,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: GraduationCap },
    { href: "/chat", label: "Chat", icon: MessageSquare, badge: "NLP" },
    { href: "/placements", label: "Placements", icon: Briefcase },
    { href: "/about", label: "How It Works", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center border-2 border-black bg-brand-charcoal shadow-brutal-sm transition-all duration-150 group-hover:bg-brand-yellow group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-brutal-none">
            <GraduationCap
              className="h-5 w-5 text-brand-yellow transition-colors group-hover:text-black"
              aria-hidden="true"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-brand-charcoal">
              DSCASC AI
            </span>
            <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:block lg:hidden xl:block">
              Student Guidance Assistant
            </span>
          </span>
          <span className="ml-1 hidden border-2 border-black bg-brand-yellow px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black md:inline-block">
            UG + PG
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap border-2 px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-wide transition-all duration-150 ${
                  isActive
                    ? "border-black bg-brand-charcoal text-white shadow-brutal-sm"
                    : "border-transparent text-brand-charcoal hover:border-black hover:bg-brand-yellow hover:text-black"
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`border border-current px-1 text-[8px] font-black ${
                      isActive ? "text-brand-yellow" : "text-brand-charcoal"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <span className="mx-2 h-6 w-0.5 bg-black" aria-hidden="true" />

          <Link href="/chat" className="brutal-btn brutal-btn-primary brutal-btn-sm">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Start Chatting
          </Link>

          <a
            href="https://www.dscasc.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden xl:flex items-center gap-1 border-2 border-black bg-white px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider text-brand-charcoal shadow-brutal-sm transition-all duration-150 hover:bg-brand-sage hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-none"
          >
            <span>Official Portal</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="brutal-btn brutal-btn-sm lg:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="border-t-2 border-black bg-white px-4 pb-4 pt-3 animate-slide-up lg:hidden"
          role="navigation"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between border-2 border-black px-3 py-2.5 text-sm font-extrabold uppercase tracking-wider transition-colors ${
                    isActive ? "bg-brand-charcoal text-white" : "bg-white text-brand-charcoal"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{link.label}</span>
                  </span>
                  {link.badge && (
                    <span
                      className={`border px-1.5 py-0.5 text-[9px] font-black ${
                        isActive ? "border-white text-brand-yellow" : "border-black bg-brand-yellow text-black"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="brutal-btn brutal-btn-primary mt-1 w-full"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Start Chatting
            </Link>

            <a
              href="https://www.dscasc.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-2 border-black bg-brand-sage px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-brand-charcoal"
            >
              <span>Visit Official DSCASC Portal</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
