"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowDown,
  BookOpen,
  Code2,
  Sliders,
  Sparkles,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { matchUserQuery, normalizeText, tokenize, removeStopwords, MatchResult } from "@/lib/nlp";

export default function AboutPage() {
  const [testQuery, setTestQuery] = useState("When are BCA exams?");
  const [pipelineAnalysis, setPipelineAnalysis] = useState<MatchResult | null>(() => {
    return matchUserQuery("When are BCA exams?");
  });

  const handleTestQuery = (queryToTest: string) => {
    setTestQuery(queryToTest);
    const result = matchUserQuery(queryToTest);
    setPipelineAnalysis(result);
  };

  const sampleQueries = [
    "When are BCA exams?",
    "whn is bca tymtable",
    "What is the placement record of DSCASC?",
    "How much are the fees for BCA?",
    "Who is the BCA HOD?",
    "What's the weather tomorrow?",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-dsc-blue">
          Academic AI Assignment &bull; BCA Semester III
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How DSCASC AI Works
        </h1>
        <p className="mt-3 text-base text-slate-600">
          A transparent, mathematically grounded NLP intent matching pipeline built with TypeScript, TF-IDF vectorization, and Cosine Similarity.
        </p>
      </div>

      {/* Academic Problem Statement & Proposed Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-rose-800 font-bold">
            <AlertTriangle className="h-5 w-5" />
            <span>The Academic Problem</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            College administrative offices and department faculty receive hundreds of repetitive student questions regarding admissions, timetables, syllabus documents, examination schedules, fees, and placements. Students frequently face delays during peak admission and exam cycles.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold">
            <CheckCircle className="h-5 w-5" />
            <span>The NLP Solution</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            DSCASC AI deploys an explainable NLP intent-matching architecture. Student queries in varying natural language forms are normalized, vectorized into high-dimensional TF-IDF space, compared via cosine angle against verified DSCASC knowledge intents, and answered instantly with official source references.
          </p>
        </div>
      </div>

      {/* Interactive Live Pipeline Demonstration (Viva Showstopper) */}
      <div className="mb-16 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-dsc-blue">
              <Calculator className="h-4 w-4" />
              <span>Interactive Pipeline Inspector (Viva Tool)</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Test Any Query Step-by-Step
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Real-time execution: {pipelineAnalysis?.executionTimeMs ?? 0} ms
          </span>
        </div>

        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => handleTestQuery(e.target.value)}
            placeholder="Type a student query to inspect mathematical transformation..."
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium focus:border-dsc-blue focus:bg-white focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleTestQuery(testQuery)}
            className="rounded-xl bg-dsc-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-dsc-blue transition-colors cursor-pointer"
          >
            Inspect Step-by-Step
          </button>
        </div>

        {/* Quick test pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs text-slate-400 self-center">Presets:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTestQuery(q)}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:border-dsc-blue hover:text-dsc-blue cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Mathematical Step Visualizer */}
        {pipelineAnalysis && (
          <div className="space-y-4">
            {/* Step 1 & 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs">
                <div className="font-bold text-slate-700 uppercase mb-1">
                  1. Normalized Output
                </div>
                <div className="font-mono text-dsc-navy font-semibold">
                  &ldquo;{pipelineAnalysis.normalizedQuery || "(empty)"}&rdquo;
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Lowercased, punctuation stripped, slang/typos corrected.
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs">
                <div className="font-bold text-slate-700 uppercase mb-1">
                  2. Tokens & Bigrams
                </div>
                <div className="font-mono text-dsc-blue truncate" title={pipelineAnalysis.tokens.join(", ")}>
                  [{pipelineAnalysis.tokens.join(", ")}]
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Stopwords removed, composite bigrams added for phrase context.
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs">
                <div className="font-bold text-slate-700 uppercase mb-1">
                  3. Similarity Score & Decision
                </div>
                <div className="flex items-center gap-2 font-mono font-bold text-base">
                  <span className={pipelineAnalysis.isConfident ? "text-emerald-700" : "text-amber-600"}>
                    {pipelineAnalysis.confidence} ({Math.round(pipelineAnalysis.confidence * 100)}%)
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    (Threshold: {pipelineAnalysis.threshold})
                  </span>
                </div>
                <div className="mt-1 text-[11px]">
                  Status:{" "}
                  <strong className={pipelineAnalysis.isConfident ? "text-emerald-700" : "text-amber-600"}>
                    {pipelineAnalysis.isConfident ? "Confident Match" : "Fallback Triggered"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Step 3: Match Result */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-dsc-navy">
                  Detected Target Intent:{" "}
                  <span className="font-mono text-dsc-blue">
                    {pipelineAnalysis.detectedIntentId}
                  </span>{" "}
                  &bull; &ldquo;{pipelineAnalysis.matchedIntent.title}&rdquo;
                </span>
                <span className="text-slate-500 text-[11px]">
                  Method: {pipelineAnalysis.method}
                </span>
              </div>

              {pipelineAnalysis.alternatives.length > 0 && (
                <div className="border-t border-blue-200/60 pt-2">
                  <div className="font-semibold text-slate-700 mb-1">Candidate Intent Ranking:</div>
                  <div className="flex flex-wrap gap-2">
                    {pipelineAnalysis.alternatives.map((alt, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-white px-2 py-1 text-[11px] border border-blue-200 font-mono"
                      >
                        {alt.title}: {alt.score}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Deep Mathematical Pipeline Explanation */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            The 8-Stage NLP Pipeline Architecture
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Viva-ready explanation of each mathematical component
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Stage 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-dsc-blue text-xs font-bold">1</span>
              <span>Text Normalization & Noise Cleaning</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Real student queries contain typographical noise, abbreviations, and informal slang (e.g. <em>&ldquo;whn is bca tymtable&rdquo;</em>). The normalizer applies lowercasing, expands contractions, maps common academic slang (<em>tymtable &rarr; timetable, placment &rarr; placement</em>), normalizes academic acronyms (<em>b.c.a &rarr; bca</em>), and removes extraneous punctuation while keeping alphanumeric tokens.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-dsc-blue text-xs font-bold">2</span>
              <span>Tokenization & Composite Bigrams</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Splits text into discrete word tokens. In addition to individual unigrams, it generates composite bigram features (e.g., <em>highest_package</em>, <em>placement_record</em>, <em>bca_timetable</em>). This preserves multi-word semantics that a pure bag-of-words representation would lose.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-dsc-blue text-xs font-bold">3</span>
              <span>Stopwords Filtering</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Filters non-informative grammatical noise particles (<em>&ldquo;a&rdquo;, &ldquo;the&rdquo;, &ldquo;is&rdquo;, &ldquo;for&rdquo;, &ldquo;of&rdquo;</em>) while preserving crucial question discriminators. If an entire input consists of words in the stopword list (e.g., <em>&ldquo;hello&rdquo;, &ldquo;help&rdquo;</em>), the system preserves tokens so greetings and help requests are processed properly.
            </p>
          </div>

          {/* Stage 4 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-dsc-blue text-xs font-bold">4</span>
              <span>TF-IDF Vectorization</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Computes the numerical importance of each term within the institutional corpus:
            </p>
            <div className="my-2 rounded bg-slate-50 p-2.5 font-mono text-[11px] text-slate-700">
              TF(t, d) = count(t, d) / total_terms(d)
              <br />
              IDF(t) = ln((1 + N) / (1 + DF(t))) + 1 &nbsp; [Laplace Smoothing]
              <br />
              Weight(t, d) = TF(t, d) * IDF(t)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vectors are then mapped onto an L2 Euclidean unit sphere so vector magnitude is normalized: ||v|| = 1.
            </p>
          </div>

          {/* Stage 5 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-dsc-blue text-xs font-bold">5</span>
              <span>Cosine Similarity Geometric Angle</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Measures similarity between query vector q and intent candidate vector d as the cosine of the angle between them:
            </p>
            <div className="my-2 rounded bg-slate-50 p-2.5 font-mono text-[11px] text-slate-700">
              Cosine Similarity = (q &bull; d) / (||q|| * ||d||) = &Sigma;(q_i * d_i)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because vectors are pre-normalized, the calculation is reduced to a fast dot product across non-zero overlapping dimensions.
            </p>
          </div>

          {/* Stage 6 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-dsc-blue text-xs font-bold">6</span>
              <span>Confidence Threshold &amp; Fallback Handling</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              A configurable confidence threshold ($\tau = 0.38$) prevents false positive hallucinations. If the highest cosine score is below $\tau$, the assistant acknowledges uncertainty and triggers the Fallback Intent, guiding the user with suggested topics rather than guessing.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="rounded-2xl bg-dsc-navy p-8 text-center text-white">
        <h3 className="text-2xl font-extrabold tracking-tight">
          Experience the Chatbot in Action
        </h3>
        <p className="mt-2 text-sm text-blue-200 max-w-xl mx-auto">
          Test the NLP pipeline with real admissions, timetable, placement, or examination queries.
        </p>
        <div className="mt-6">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-dsc-gold px-6 py-3 text-sm font-bold text-dsc-navy hover:bg-yellow-400 transition-colors shadow-md"
          >
            <span>Launch Chat Assistant</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
