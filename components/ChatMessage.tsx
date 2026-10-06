import React from "react";
import { Bot, User, GraduationCap } from "lucide-react";
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
  /** Marks the initial greeting so the UI can render the empty-state identity block. */
  kind?: "welcome";
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
  const isWelcome = message.kind === "welcome";

  if (isUser) {
    return (
      <div className="mb-4 flex animate-slide-in-right justify-end">
        <div className="flex max-w-[85%] items-start gap-2.5 sm:max-w-[75%]">
          <div className="flex-1 rounded-none border-2 border-black bg-brand-charcoal px-4 py-3 text-white shadow-brutal-sm">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
            <div className="mt-1.5 text-right text-[10px] font-bold uppercase tracking-wider text-brand-sage">
              {message.timestamp}
            </div>
          </div>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-brand-yellow shadow-brutal-sm"
            aria-hidden="true"
          >
            <User className="h-4 w-4 text-black" />
          </span>
        </div>
      </div>
    );
  }

  const res = message.responseMetadata;

  return (
    <div className="mb-4 flex animate-fade-in justify-start">
      <div className="flex w-full max-w-[95%] items-start gap-2.5 sm:max-w-[88%] md:max-w-[80%]">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-brand-charcoal shadow-brutal-sm"
          aria-hidden="true"
        >
          <Bot className="h-4 w-4 text-brand-yellow" />
        </span>

        <div className="flex-1 border-2 border-black bg-white shadow-brutal">
          {/* Identity / header strip */}
          {isWelcome ? (
            <div className="border-b-2 border-black bg-brand-charcoal px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center border-2 border-black bg-brand-yellow">
                  <GraduationCap className="h-5 w-5 text-black" aria-hidden="true" />
                </span>
                <div>
                  <div className="font-display text-base font-extrabold leading-none text-white">
                    DSCASC AI
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
                    Smart Student Guidance Assistant
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between border-b-2 border-black bg-brand-sage-light px-3.5 py-2">
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-brand-charcoal">
                DSCASC AI
                <span className="inline-block h-1.5 w-1.5 bg-emerald-500" aria-hidden="true" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {message.timestamp}
              </span>
            </div>
          )}

          {/* Message body */}
          <div className="p-4">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-brand-charcoal">
              {message.text}
            </div>

            {/* Rich cards driven by existing intent metadata */}
            {res && (
              <>
                {res.cardType === "stats" && res.stats && <StatisticsCard stats={res.stats} />}

                {res.highlights && res.highlights.length > 0 && (
                  <InformationCard highlights={res.highlights} />
                )}

                {res.contact && <ContactCard contact={res.contact} />}

                {(res.links || res.source) && <LinkCard links={res.links} source={res.source} />}

                {res.suggestions && onSelectSuggestion && (
                  <SuggestionCard suggestions={res.suggestions} onSelectSuggestion={onSelectSuggestion} />
                )}
              </>
            )}

            {/* AI Analysis Panel (academic demonstration mode) */}
            {message.analysis && (
              <AiAnalysisPanel analysis={message.analysis} forceOpen={showAiAnalysisAlways} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
