import React from "react";
import { ExternalLink, Globe, FileText } from "lucide-react";
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
        <div className="space-y-1.5">
          {links.map((link, idx) => {
            const isPdf = link.url.toLowerCase().endsWith(".pdf");
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5 text-xs transition-all hover:border-dsc-blue hover:bg-blue-50/50 hover:shadow-xs"
              >
                <div className="flex items-center gap-2">
                  {isPdf ? (
                    <FileText className="h-4 w-4 text-red-500 group-hover:scale-105 transition-transform" />
                  ) : (
                    <Globe className="h-4 w-4 text-dsc-blue group-hover:scale-105 transition-transform" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-dsc-blue">
                      {link.title}
                    </div>
                    {link.description && (
                      <div className="text-[11px] text-slate-500">{link.description}</div>
                    )}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-dsc-blue" />
              </a>
            );
          })}
        </div>
      )}

      {source && (
        <div className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="font-medium text-slate-600">Source:</span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dsc-blue hover:underline"
            >
              {source.name}
            </a>
          </span>
          <span className="text-[10px] text-slate-400">{source.lastVerified}</span>
        </div>
      )}
    </div>
  );
};
