import React from "react";
import { ExternalLink, FileText, Globe, Link2 } from "lucide-react";
import { LinkItem, SourceInfo } from "@/lib/knowledgeBase";

interface LinkCardProps {
  links?: LinkItem[];
  source?: SourceInfo;
}

export const LinkCard: React.FC<LinkCardProps> = ({ links, source }) => {
  if (!links && !source) return null;

  return (
    <div className="mt-3 space-y-2">
      {links && links.length > 0 && (
        <div className="border-2 border-black bg-white shadow-brutal-sm">
          <div className="brutal-strip">
            <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest">
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Official Links</span>
            </span>
          </div>
          <ul className="divide-y-2 divide-black">
            {links.map((link, idx) => {
              const isPdf = link.url.toLowerCase().endsWith(".pdf");
              return (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors hover:bg-brand-yellow"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black bg-brand-sage-light group-hover:bg-white">
                        {isPdf ? (
                          <FileText className="h-3 w-3 text-black" aria-hidden="true" />
                        ) : (
                          <Globe className="h-3 w-3 text-black" aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-extrabold text-brand-charcoal sm:text-sm">
                          {link.title}
                        </span>
                        {link.description && (
                          <span className="block truncate text-[11px] text-slate-500">
                            {link.description}
                          </span>
                        )}
                      </span>
                    </span>
                    <ExternalLink
                      className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-black"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {source && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-2 border-black bg-brand-sage-light px-2.5 py-1.5 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="font-extrabold uppercase tracking-wider text-slate-500">Source:</span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-charcoal underline decoration-2 underline-offset-2 hover:bg-brand-yellow"
            >
              {source.name}
            </a>
          </span>
          <span className="font-semibold uppercase tracking-wider text-slate-500">
            {source.lastVerified}
          </span>
        </div>
      )}
    </div>
  );
};
