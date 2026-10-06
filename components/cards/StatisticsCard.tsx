import React from "react";
import { TrendingUp, Award, Building2, Briefcase } from "lucide-react";
import { StatItem } from "@/lib/knowledgeBase";

interface StatisticsCardProps {
  stats?: StatItem[];
  title?: string;
  badge?: string;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  stats,
  title = "PLACEMENT SNAPSHOT (2024-25)",
  badge = "Official DSCASC Published Data",
}) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm transition-all">
      <div className="flex items-center justify-between border-b border-indigo-50 bg-gradient-to-r from-dsc-navy to-dsc-blue px-4 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-dsc-gold" />
          <span className="text-xs font-bold tracking-wider uppercase">{title}</span>
        </div>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm">
          {badge}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3.5 sm:grid-cols-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 transition-all hover:border-blue-200 hover:bg-blue-50/40"
          >
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
              {stat.label}
            </div>
            <div className="my-1 text-xl font-extrabold text-dsc-navy tracking-tight">
              {stat.value}
            </div>
            {stat.subtext && (
              <div className="text-[10px] text-slate-600 line-clamp-1">{stat.subtext}</div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 px-3 py-1.5 text-center text-[11px] text-slate-500">
        Verified institutional report &bull; Dayananda Sagar College of Arts, Science and Commerce
      </div>
    </div>
  );
};
