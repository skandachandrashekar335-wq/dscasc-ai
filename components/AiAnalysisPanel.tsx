import React, { useState } from "react";
import { ChevronDown, ChevronUp, Cpu } from "lucide-react";
import { MatchResult } from "@/lib/nlp";

interface AiAnalysisPanelProps {
  analysis?: Partial<MatchResult>;
  forceOpen?: boolean;
}

/**
 * Collapsible technical breakdown of the NLP decision — hidden by default,
 * primarily used for academic demonstration / viva.
 */
export const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({
  analysis,
  forceOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen);

  if (!analysis) return null;

  // forceOpen (global AI Analysis toggle) takes precedence so academic demos
  // can reveal every panel at once without expanding them individually.
  const open = isOpen || forceOpen;

  const confidencePct = Math.round((analysis.confidence || 0) * 100);
  const isConfident = analysis.isConfident ?? false;

  return (
    <div className="mt-3 border-2 border-black bg-brand-charcoal">
      <button
        type="button"
        onClick={() => setIsOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors hover:bg-black/80"
      >
        <span className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-brand-yellow" aria-hidden="true" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
            AI Analysis
          </span>
          <span
            className={`border border-black px-1.5 py-0.5 text-[10px] font-black ${
              isConfident ? "bg-emerald-400 text-black" : "bg-brand-yellow text-black"
            }`}
          >
            {confidencePct}%
          </span>
        </span>
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-sage">
          <span>{open ? "Hide" : "Details"}</span>
          {open ? (
            <ChevronUp className="h-3 w-3" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          )}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t-2 border-black bg-white p-3 animate-fade-in">
          {/* Key metrics */}
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="border-2 border-black bg-brand-sage-light p-2">
              <dt className="text-[9px] font-extrabold uppercase tracking-wider text-slate-600">
                Detected Intent
              </dt>
              <dd
                className="mt-1 truncate font-mono text-xs font-black text-brand-charcoal"
                title={analysis.detectedIntentId}
              >
                {analysis.detectedIntentId || "unknown"}
              </dd>
            </div>

            <div className="border-2 border-black bg-brand-yellow p-2">
              <dt className="text-[9px] font-extrabold uppercase tracking-wider text-black/70">
                Confidence
              </dt>
              <dd className="mt-1 font-mono text-xs font-black text-black">
                {analysis.confidence ?? 0} ({confidencePct}%)
              </dd>
            </div>

            <div className="border-2 border-black bg-white p-2">
              <dt className="text-[9px] font-extrabold uppercase tracking-wider text-slate-600">
                Threshold
              </dt>
              <dd className="mt-1 font-mono text-xs font-black text-brand-charcoal">
                &ge; {analysis.threshold ?? 0.38}
              </dd>
            </div>

            <div className="border-2 border-black bg-white p-2">
              <dt className="text-[9px] font-extrabold uppercase tracking-wider text-slate-600">
                Processing Time
              </dt>
              <dd className="mt-1 font-mono text-xs font-black text-emerald-700">
                {analysis.executionTimeMs ? `${analysis.executionTimeMs} ms` : "< 2 ms"}
              </dd>
            </div>
          </dl>

          {/* Confidence bar */}
          <div>
            <div className="mb-1 flex justify-between text-[9px] font-extrabold uppercase tracking-wider text-slate-600">
              <span>Similarity score vs threshold</span>
              <span>{confidencePct}% / 100%</span>
            </div>
            <div className="h-4 w-full border-2 border-black bg-white">
              <div
                className={`h-full transition-all duration-500 ${
                  isConfident ? "bg-brand-yellow" : "bg-brand-sage"
                }`}
                style={{ width: `${Math.min(100, Math.max(4, confidencePct))}%` }}
                role="img"
                aria-label={`Confidence ${confidencePct} percent`}
              />
            </div>
          </div>

          {/* Candidate alternatives */}
          {analysis.alternatives && analysis.alternatives.length > 0 && (
            <div>
              <div className="mb-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-600">
                Alternative intents
              </div>
              <ul className="space-y-1">
                {analysis.alternatives.map((alt, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-2 border-black bg-brand-sage-light px-2 py-1 text-[11px]"
                  >
                    <span className="font-bold text-brand-charcoal">{alt.title}</span>
                    <span className="font-mono font-black text-slate-600">
                      {alt.score} ({Math.round(alt.score * 100)}%)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Method + tokens */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-black pt-2 text-[10px] text-slate-600">
            <span className="font-bold">
              <span className="text-brand-charcoal">Method:</span>{" "}
              {analysis.method || "TF-IDF + Cosine Similarity"}
            </span>
            {analysis.tokens && analysis.tokens.length > 0 && (
              <span className="max-w-full truncate font-mono" title={analysis.tokens.join(", ")}>
                Tokens: [{analysis.tokens.join(", ")}]
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
