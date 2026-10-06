import React from "react";
import { CheckCircle2, Info } from "lucide-react";

interface InformationCardProps {
  highlights?: string[];
  title?: string;
}

export const InformationCard: React.FC<InformationCardProps> = ({ highlights, title }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 text-sm text-slate-800 shadow-sm transition-all hover:bg-blue-50">
      <div className="mb-2 flex items-center gap-1.5 font-semibold text-dsc-navy">
        <Info className="h-4 w-4 text-dsc-blue" />
        <span>{title || "Key Information & Highlights"}</span>
      </div>
      <ul className="space-y-1.5">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
