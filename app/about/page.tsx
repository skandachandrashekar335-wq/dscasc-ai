"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle,
  Cpu,
  HelpCircle,
} from "lucide-react";
import {
  matchUserQuery,
  MatchResult,
} from "@/lib/nlp";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pipelineSteps = [
  { step: "01", name: "Student Query", detail: "Raw natural-language input typed by the student" },
  { step: "02", name: "Normalization", detail: "Lowercase, punctuation strip, typo & slang repair" },
  { step: "03", name: "Tokenization", detail: "Unigrams plus composite bigram features" },
  { step: "04", name: "Stopword Handling", detail: "Filters grammatical noise, keeps domain terms" },
  { step: "05", name: "TF-IDF", detail: "Weighted term vectors, L2 normalized" },
  { step: "06", name: "Cosine Similarity", detail: "Angle between query vector and every intent" },
  { step: "07", name: "Intent Matching", detail: "Candidates ranked by descending score" },
  { step: "08", name: "Confidence", detail: "Top score tested against threshold τ = 0.38" },
  { step: "09", name: "Knowledge Base", detail: "Matched intent retrieves verified content" },
  { step: "10", name: "Response", detail: "Structured answer, official links & suggestions" },
];

const deepDiveStages = [
  {
    n: "01",
    title: "Text Normalization & Noise Cleaning",
    body: (
      <>
        Real student queries contain typographical noise, abbreviations, and informal slang (e.g.
        <em> &ldquo;whn is bca tymtable&rdquo;</em>). The normalizer applies lowercasing, expands
        contractions, maps common academic slang (<em>tymtable &rarr; timetable, placment &rarr;
        placement</em>), normalizes academic acronyms (<em>b.c.a &rarr; bca</em>), and removes
        extraneous punctuation while keeping alphanumeric tokens.
      </>
    ),
  },
  {
    n: "02",
    title: "Tokenization & Composite Bigrams",
    body: (
      <>
        Splits text into discrete word tokens. In addition to individual unigrams, it generates
        composite bigram features (e.g. <em>highest_package</em>, <em>placement_record</em>,{" "}
        <em>bca_timetable</em>). This preserves multi-word semantics that a pure bag-of-words
        representation would lose.
      </>
    ),
  },
  {
    n: "03",
    title: "Stopword Filtering",
    body: (
      <>
        Filters non-informative grammatical noise particles (<em>&ldquo;a&rdquo;, &ldquo;the&rdquo;,
        &ldquo;is&rdquo;, &ldquo;for&rdquo;, &ldquo;of&rdquo;</em>) while preserving crucial question
        discriminators. If an entire input consists of words in the stopword list, the system
        preserves tokens so greetings and help requests are processed properly.
      </>
    ),
  },
];

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
    <div className="overflow-x-hidden">
      {/* ============================= HEADER ============================= */}
      <section className="relative border-b-2 border-black bg-brand-charcoal">
        <div className="dot-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <span className="brutal-tag">
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            Academic AI Assignment &bull; BCA Semester III
          </span>

          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            How DSCASC AI{" "}
            <span className="mt-2 block w-fit bg-brand-yellow px-2 py-1.5 leading-[0.95] text-black">
              actually works
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-brand-sage sm:text-base">
            A transparent, mathematically grounded NLP intent matching pipeline built with
            TypeScript, TF-IDF vectorization, and Cosine Similarity — no black-box model, no
            external APIs.
          </p>
        </div>
      </section>

      {/* ============================= PROBLEM / SOLUTION ============================= */}
      <section className="border-b-2 border-black bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-2 border-black bg-white p-6 shadow-brutal">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-black bg-brand-sage shadow-brutal-sm">
                <AlertTriangle className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-xl font-extrabold text-brand-charcoal">
                The academic problem
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                College administrative offices and department faculty receive hundreds of repetitive
                student questions regarding admissions, timetables, syllabus documents, examination
                schedules, fees, and placements. Students frequently face delays during peak
                admission and exam cycles.
              </p>
            </div>

            <div className="border-2 border-black bg-brand-yellow p-6 shadow-brutal">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white shadow-brutal-sm">
                <CheckCircle className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-xl font-extrabold text-black">
                The NLP solution
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                DSCASC AI deploys an explainable NLP intent-matching architecture. Student queries in
                varying natural language forms are normalized, vectorized into high-dimensional
                TF-IDF space, compared via cosine angle against verified DSCASC knowledge intents,
                and answered instantly with official source references.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= LIVE INSPECTOR ============================= */}
      <section className="border-b-2 border-black bg-brand-sage-light py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Interactive pipeline inspector"
              title="Test any query, step by step"
              description="Type a student question and watch the exact mathematical transformation the engine performs."
            />
            <span className="brutal-tag self-start sm:self-auto">
              <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
              {/* Timing differs slightly between server and client render */}
              <span suppressHydrationWarning>
                Execution: {pipelineAnalysis?.executionTimeMs ?? 0} ms
              </span>
            </span>
          </div>

          <div className="mt-8 border-2 border-black bg-white shadow-brutal-lg">
            <div className="brutal-strip">
              <span className="text-[11px] font-extrabold uppercase tracking-widest">
                Live NLP Inspector
              </span>
              <span className="hidden text-[10px] font-bold text-brand-sage sm:inline">
                Runs entirely in your browser
              </span>
            </div>

            <div className="p-4 sm:p-6">
              {/* Input */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="pipeline-query" className="sr-only">
                  Query to inspect
                </label>
                <input
                  id="pipeline-query"
                  type="text"
                  value={testQuery}
                  onChange={(e) => handleTestQuery(e.target.value)}
                  placeholder="Type a student query to inspect mathematical transformation..."
                  className="brutal-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleTestQuery(testQuery)}
                  className="brutal-btn brutal-btn-primary shrink-0"
                >
                  Inspect step-by-step
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Presets */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="self-center text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  Presets:
                </span>
                {sampleQueries.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleTestQuery(q)}
                    className="brutal-chip"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Stage outputs */}
              {pipelineAnalysis && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="border-2 border-black bg-brand-sage-light p-3.5">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-600">
                        01 &bull; Normalized output
                      </div>
                      <div className="mt-1.5 break-words font-mono text-sm font-bold text-brand-charcoal">
                        &ldquo;{pipelineAnalysis.normalizedQuery || "(empty)"}&rdquo;
                      </div>
                      <div className="mt-1.5 text-[11px] text-slate-600">
                        Lowercased, punctuation stripped, slang/typos corrected.
                      </div>
                    </div>

                    <div className="border-2 border-black bg-white p-3.5">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-600">
                        02 &bull; Tokens &amp; bigrams
                      </div>
                      <div
                        className="mt-1.5 break-words font-mono text-sm font-bold text-brand-charcoal"
                        title={pipelineAnalysis.tokens.join(", ")}
                      >
                        [{pipelineAnalysis.tokens.join(", ")}]
                      </div>
                      <div className="mt-1.5 text-[11px] text-slate-600">
                        Stopwords removed, composite bigrams added for phrase context.
                      </div>
                    </div>

                    <div className="border-2 border-black bg-brand-yellow p-3.5">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-black/70">
                        03 &bull; Score &amp; decision
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono font-black text-black">
                        <span className="text-base">
                          {pipelineAnalysis.confidence} (
                          {Math.round(pipelineAnalysis.confidence * 100)}%)
                        </span>
                        <span className="text-xs font-bold text-black/60">
                          threshold {pipelineAnalysis.threshold}
                        </span>
                      </div>
                      <div className="mt-1.5 text-[11px] font-bold text-black">
                        Status:{" "}
                        {pipelineAnalysis.isConfident ? "Confident match" : "Fallback triggered"}
                      </div>
                    </div>
                  </div>

                  {/* Match result */}
                  <div className="border-2 border-black bg-brand-charcoal p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xs font-bold text-white">
                        Detected target intent:{" "}
                        <span className="font-mono font-black text-brand-yellow">
                          {pipelineAnalysis.detectedIntentId}
                        </span>{" "}
                        &bull; &ldquo;{pipelineAnalysis.matchedIntent.title}&rdquo;
                      </span>
                      <span className="text-[11px] font-semibold text-brand-sage">
                        Method: {pipelineAnalysis.method}
                      </span>
                    </div>

                    {pipelineAnalysis.alternatives.length > 0 && (
                      <div className="mt-3 border-t-2 border-white/20 pt-3">
                        <div className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-brand-yellow">
                          Candidate intent ranking
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {pipelineAnalysis.alternatives.map((alt) => (
                            <span
                              key={alt.id}
                              className="border-2 border-black bg-white px-2 py-1 font-mono text-[11px] font-bold text-brand-charcoal"
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
          </div>
        </div>
      </section>

      {/* ============================= 10-STEP PIPELINE ============================= */}
      <section className="on-dark border-b-2 border-black bg-brand-charcoal py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="dark"
            align="center"
            kicker="System architecture"
            title="The 10-stage NLP pipeline"
            description="From raw student input to a verified answer — every stage is deterministic, testable and explainable."
          />

          <ol className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pipelineSteps.map((item, idx) => (
              <li key={item.step} className="border-2 border-black bg-white p-4 shadow-brutal">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center border-2 border-black bg-brand-yellow font-display text-sm font-black text-black">
                    {item.step}
                  </span>
                  {idx < pipelineSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-3 font-display text-sm font-extrabold uppercase tracking-wide text-brand-charcoal">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================= DEEP DIVE ============================= */}
      <section className="border-b-2 border-black bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Deep dive"
            title="The mathematics behind each stage"
            description="Viva-ready explanations of the pipeline components, formulas and guardrails."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {deepDiveStages.map((stage) => (
              <div key={stage.n} className="border-2 border-black bg-white p-5 shadow-brutal">
                <h3 className="flex items-center gap-2 font-display text-sm font-extrabold text-brand-charcoal">
                  <span className="flex h-7 w-7 items-center justify-center border-2 border-black bg-brand-yellow text-xs font-black">
                    {stage.n}
                  </span>
                  {stage.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">{stage.body}</p>
              </div>
            ))}
          </div>

          {/* Formulas */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="border-2 border-black bg-brand-sage-light p-5 shadow-brutal">
              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
                04 &bull; TF-IDF vectorization
              </h3>
              <div className="mt-3 overflow-x-auto border-2 border-black bg-white p-3 font-mono text-[11px] leading-relaxed text-brand-charcoal sm:text-xs">
                TF(t, d) = count(t, d) / total_terms(d)
                <br />
                IDF(t) = ln((1 + N) / (1 + DF(t))) + 1 &nbsp;[Laplace smoothing]
                <br />
                Weight(t, d) = TF(t, d) * IDF(t)
                <br />
                ||v|| = 1 &nbsp;(L2 normalization)
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Every document is mapped onto the unit sphere so vector magnitude is normalized and
                only direction (angle) drives similarity.
              </p>
            </div>

            <div className="border-2 border-black bg-brand-sage-light p-5 shadow-brutal">
              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
                05 &bull; Cosine similarity
              </h3>
              <div className="mt-3 overflow-x-auto border-2 border-black bg-white p-3 font-mono text-[11px] leading-relaxed text-brand-charcoal sm:text-xs">
                Cosine Similarity = (q &bull; d) / (||q|| * ||d||) = &Sigma;(q_i * d_i)
                <br />
                Decision: confident if max_score &ge; &tau; = 0.38
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Because vectors are pre-normalized, the calculation reduces to a fast dot product
                across overlapping dimensions.
              </p>
            </div>
          </div>

          {/* Confidence & fallback */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="border-2 border-black bg-brand-yellow p-5 shadow-brutal">
              <h3 className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider text-black">
                <Calculator className="h-4 w-4" aria-hidden="true" />
                06 &bull; Confidence threshold
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-black/75">
                A configurable confidence threshold (&tau; = 0.38) prevents false positive
                hallucinations. If the highest cosine score falls below &tau;, the assistant
                acknowledges uncertainty instead of guessing.
              </p>
              <div className="mt-3 border-2 border-black bg-white p-3 font-mono text-xs font-bold text-brand-charcoal">
                confident &hArr; score &ge; 0.38
              </div>
            </div>

            <div className="border-2 border-black bg-white p-5 shadow-brutal">
              <h3 className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
                07 &bull; Knowledge base &amp; fallback
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                A confident match retrieves a curated intent containing the response text, highlights,
                official links, contact details and source credits. An unmatched query returns the
                structured fallback intent, which explains the limitation and offers working
                suggestions.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="border-2 border-black bg-brand-sage-light px-2 py-1 text-[11px] font-bold">
                  39 curated intents
                </span>
                <span className="border-2 border-black bg-brand-sage-light px-2 py-1 text-[11px] font-bold">
                  23/23 unit tests
                </span>
                <span className="border-2 border-black bg-brand-sage-light px-2 py-1 text-[11px] font-bold">
                  Zero external APIs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="relative overflow-hidden border-b-2 border-black bg-brand-yellow">
        <div className="dot-grid-black pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            Experience the chatbot in action
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold text-black/70">
            Test the NLP pipeline with real admissions, timetable, placement, or examination queries.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/chat" className="brutal-btn brutal-btn-dark w-full text-base sm:w-auto">
              Launch chat assistant
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/" className="brutal-btn w-full bg-white text-base sm:w-auto">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
