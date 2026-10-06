import React, { useState } from "react";
import { Cpu, ChevronDown, ChevronUp, Layers, Activity, Sliders } from "lucide-react";
import { MatchResult } from "@/lib/nlp";

interface AiAnalysisPanelProps {
  analysis?: Partial<MatchResult>;
  forceOpen?: boolean;
}

export const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({
  analysis,
  forceOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen);

  if (!analysis) return null;

  const confidencePct = Math.round((analysis.confidence || 0) * 100);
  const isConfident = analysis.isConfident ?? false;

  return (
    <div className="mt-2.5 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/80 text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-left font-medium text-slate-600 transition-colors hover:bg-slate-100"
      >
        <div className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-dsc-blue" />
          <span className="font-semibold text-slate-700">AI / NLP Analysis</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
              isConfident
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {confidencePct}% Confidence
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <span>{isOpen ? "Hide" : "Details"}</span>
          {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white p-3 space-y-2.5">
          {/* Intent & Confidence Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded border border-slate-100 bg-slate-50 p-2">
              <div className="text-[10px] font-medium text-slate-600 uppercase">Detected Intent</div>
              <div className="mt-0.5 font-mono font-bold text-dsc-navy truncate" title={analysis.detectedIntentId}>
                {analysis.detectedIntentId || "unknown"}
              </div>
            </div>

            <div className="rounded border border-slate-100 bg-slate-50 p-2">
              <div className="text-[10px] font-medium text-slate-600 uppercase">Confidence Score</div>
              <div className="mt-0.5 font-mono font-bold text-dsc-blue">
                {analysis.confidence ?? 0} ({confidencePct}%)
              </div>
            </div>

            <div className="rounded border border-slate-100 bg-slate-50 p-2">
              <div className="text-[10px] font-medium text-slate-600 uppercase">Threshold</div>
              <div className="mt-0.5 font-mono text-slate-700">
                &gt;= {analysis.threshold ?? 0.38}
              </div>
            </div>

            <div className="rounded border border-slate-100 bg-slate-50 p-2">
              <div className="text-[10px] font-medium text-slate-600 uppercase">Processing Time</div>
              <div className="mt-0.5 font-mono text-emerald-700">
                {analysis.executionTimeMs ? `${analysis.executionTimeMs} ms` : "< 2 ms"}
              </div>
            </div>
          </div>

          {/* Progress Bar for Confidence */}
          <div>
            <div className="mb-1 flex justify-between text-[10px] font-medium text-slate-600">
              <span>Similarity Score vs Threshold</span>
              <span>{confidencePct}% / 100%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full transition-all duration-500 ${
                  isConfident ? "bg-dsc-blue" : "bg-amber-500"
                }`}
                style={{ width: `${Math.min(100, Math.max(5, confidencePct))}%` }}
              />
            </div>
          </div>

          {/* Alternatives */}
          {analysis.alternatives && analysis.alternatives.length > 0 && (
            <div>
              <div className="mb-1 text-[10px] font-semibold text-slate-600 uppercase">
                Candidate Alternatives
              </div>
              <div className="space-y-1">
                {analysis.alternatives.map((alt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-slate-50 px-2 py-1 text-[11px]"
                  >
                    <span className="font-medium text-slate-700">{alt.title}</span>
                    <span className="font-mono text-slate-500">
                      Score: {alt.score} ({Math.round(alt.score * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Method and Tokens */}
          <div className="flex flex-wrap items-center justify-between gap-1 border-t border-slate-100 pt-1.5 text-[10px] text-slate-600">
            <span>
              <strong className="text-slate-600">Method:</strong>{" "}
              {analysis.method || "TF-IDF + Cosine Similarity"}
            </span>
            {analysis.tokens && analysis.tokens.length > 0 && (
              <span className="font-mono text-slate-600">
                Tokens: [{analysis.tokens.join(", ")}]
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
