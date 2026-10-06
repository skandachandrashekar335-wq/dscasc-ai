import React from "react";
import { Bot, User, Sparkles } from "lucide-react";
import { IntentResponse } from "@/lib/knowledgeBase";
import { MatchResult } from "@/lib/nlp";
import { InformationCard } from "./cards/InformationCard";
import { StatisticsCard } from "./cards/StatisticsCard";
import { ContactCard } from "./cards/ContactCard";
import { LinkCard } from "./cards/LinkCard";
import { SuggestionCard } from "./cards/SuggestionCard";
import { AiAnalysisPanel } from "./AiAnalysisPanel";

export interface MessageItem {
  id: string;
  sender: "user" | "bot";
  text: string;
  responseMetadata?: IntentResponse;
  analysis?: MatchResult;
  timestamp: string;
}

interface ChatMessageProps {
  message: MessageItem;
  onSelectSuggestion?: (text: string) => void;
  showAiAnalysisAlways?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSelectSuggestion,
  showAiAnalysisAlways = false,
}) => {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="flex max-w-[85%] sm:max-w-[75%] items-start gap-2.5 flex-row-reverse">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-dsc-navy text-white shadow-xs">
            <User className="h-4 w-4" />
          </div>
          <div className="rounded-2xl rounded-tr-xs bg-dsc-navy px-4 py-2.5 text-white shadow-xs">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            <div className="mt-1 text-right text-[10px] text-blue-200">{message.timestamp}</div>
          </div>
        </div>
      </div>
    );
  }

  const res = message.responseMetadata;

  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="flex max-w-[95%] sm:max-w-[85%] md:max-w-[80%] items-start gap-2.5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-linear-to-br from-dsc-blue to-dsc-navy text-white shadow-xs ring-2 ring-blue-100">
          <Bot className="h-4 w-4 text-white" />
        </div>

        <div className="flex-1 rounded-2xl rounded-tl-xs border border-slate-200 bg-white p-4 text-slate-800 shadow-xs">
          {/* Header indicator */}
          <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-dsc-navy flex items-center gap-1">
              DSCASC AI
              <Sparkles className="h-3 w-3 text-dsc-gold" />
            </span>
            <span className="text-[10px] text-slate-600">{message.timestamp}</span>
          </div>

          {/* Formatted Text Content */}
          <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
            {message.text}
          </div>

          {/* Rich Card Components based on Intent Metadata */}
          {res && (
            <>
              {res.cardType === "stats" && res.stats && (
                <StatisticsCard stats={res.stats} />
              )}

              {res.highlights && res.highlights.length > 0 && (
                <InformationCard highlights={res.highlights} />
              )}

              {res.contact && (
                <ContactCard contact={res.contact} />
              )}

              {(res.links || res.source) && (
                <LinkCard links={res.links} source={res.source} />
              )}

              {res.suggestions && onSelectSuggestion && (
                <SuggestionCard
                  suggestions={res.suggestions}
                  onSelectSuggestion={onSelectSuggestion}
                />
              )}
            </>
          )}

          {/* AI Analysis Panel */}
          {message.analysis && (
            <AiAnalysisPanel
              analysis={message.analysis}
              forceOpen={showAiAnalysisAlways}
            />
          )}
        </div>
      </div>
    </div>
  );
};
