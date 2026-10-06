import React from "react";
import { TrendingUp } from "lucide-react";
import { StatItem } from "@/lib/knowledgeBase";

interface StatisticsCardProps {
  stats?: StatItem[];
  title?: string;
  badge?: string;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  stats,
  title = "Placement Snapshot (2024-25)",
  badge = "Official DSCASC Published Data",
}) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="mt-3 border-2 border-black bg-white shadow-brutal">
      <div className="brutal-strip">
        <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{title}</span>
        </span>
        <span className="hidden border border-brand-yellow px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white sm:inline">
          {badge}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between border-2 border-black bg-brand-sage-light p-2.5 transition-colors hover:bg-brand-yellow"
          >
            <div className="text-[10px] font-extrabold uppercase leading-tight tracking-wider text-slate-600">
              {stat.label}
            </div>
            <div className="my-1 font-display text-xl font-extrabold tracking-tight text-brand-charcoal sm:text-2xl">
              {stat.value}
            </div>
            {stat.subtext && (
              <div className="text-[10px] font-medium leading-snug text-slate-600">
                {stat.subtext}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-black bg-brand-charcoal px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-brand-sage">
        Verified institutional report &bull; DSCASC
      </div>
    </div>
  );
};
