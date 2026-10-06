import React from "react";
import { MessageSquarePlus } from "lucide-react";

interface SuggestionCardProps {
  suggestions?: string[];
  onSelectSuggestion: (text: string) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestions,
  onSelectSuggestion,
}) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-3 pt-2">
      <div className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        <MessageSquarePlus className="h-3 w-3 text-dsc-blue" />
        <span>Suggested Questions</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSuggestion(suggestion)}
            className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-dsc-blue transition-all hover:border-dsc-navy hover:bg-blue-50 active:scale-95 cursor-pointer shadow-2xs text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
