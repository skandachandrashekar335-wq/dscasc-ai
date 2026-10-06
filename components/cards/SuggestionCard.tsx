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
    <div className="mt-3 border-t-2 border-dashed border-black pt-3">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
        <MessageSquarePlus className="h-3 w-3" aria-hidden="true" />
        <span>Suggested questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelectSuggestion(suggestion)}
            className="brutal-chip"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
