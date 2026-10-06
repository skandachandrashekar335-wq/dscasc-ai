"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, MessageSquare, Briefcase, Info, Menu, X, ExternalLink, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: GraduationCap },
    { href: "/chat", label: "Chat Assistant", icon: MessageSquare, badge: "NLP" },
    { href: "/placements", label: "Placements", icon: Briefcase },
    { href: "/about", label: "How It Works", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-dsc-navy to-dsc-blue text-white shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5 text-dsc-gold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-dsc-navy tracking-tight text-base sm:text-lg">
              <span>DSCASC AI</span>
              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-dsc-blue">
                BCA AI
              </span>
            </div>
            <div className="text-[10px] font-medium text-slate-500 hidden sm:block">
              Dayananda Sagar College of Arts, Science & Commerce
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-50 text-dsc-blue shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-dsc-blue" : "text-slate-400"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-full bg-dsc-gold/20 px-1.5 py-0.2 text-[9px] font-bold text-dsc-gold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="ml-2 h-4 w-px bg-slate-200" />

          <a
            href="https://www.dscasc.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <span>Official Portal</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-4 md:hidden animate-slide-up">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-dsc-blue font-bold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-dsc-blue">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <a
              href="https://www.dscasc.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-700"
            >
              <span>Visit Official DSCASC Portal</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
