import React from "react";
import { Check, Info } from "lucide-react";

interface InformationCardProps {
  highlights?: string[];
  title?: string;
}

export const InformationCard: React.FC<InformationCardProps> = ({ highlights, title }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="mt-3 border-2 border-black bg-white shadow-brutal-sm">
      <div className="brutal-strip">
        <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{title || "Key Information & Highlights"}</span>
        </span>
      </div>

      <ul className="divide-y-2 divide-black">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 px-3.5 py-2.5">
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border-2 border-black bg-brand-yellow"
              aria-hidden="true"
            >
              <Check className="h-2.5 w-2.5 text-black" strokeWidth={4} />
            </span>
            <span className="text-xs leading-relaxed text-brand-charcoal sm:text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
