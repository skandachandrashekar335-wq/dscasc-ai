import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  GraduationCap,
  BookOpen,
  Calendar,
  Laptop,
  Coins,
  Rocket,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  Cpu,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { KNOWLEDGE_BASE } from "@/lib/knowledgeBase";

const INTENT_COUNT = KNOWLEDGE_BASE.length;

const explorePrograms = [
  {
    level: "Undergraduate",
    badge: "UG",
    note: "3 years · 6 semesters",
    color: "bg-brand-yellow",
    items: [
      { abbr: "BCA", name: "Bachelor of Computer Applications" },
      { abbr: "BBA", name: "Bachelor of Business Administration" },
      { abbr: "B.Com", name: "Bachelor of Commerce" },
      { abbr: "B.Sc", name: "Bachelor of Science" },
    ],
  },
  {
    level: "Postgraduate",
    badge: "PG",
    note: "MBA & M.Com: 2 years · MCA: see prospectus",
    color: "bg-brand-sage",
    items: [
      { abbr: "MCA", name: "Master of Computer Applications" },
      { abbr: "MBA", name: "Master of Business Administration" },
      { abbr: "M.Com", name: "Master of Commerce" },
    ],
  },
];

const topicCards = [
  {
    title: "Admissions",
    icon: GraduationCap,
    emoji: "🎓",
    color: "bg-brand-yellow",
    description:
      "Eligibility criteria, application procedures, and required document verification.",
    sampleQuery: "How do I apply for BCA?",
    badge: "Eligibility & Forms",
  },
  {
    title: "Courses",
    icon: BookOpen,
    emoji: "📚",
    color: "bg-brand-sage",
    description:
      "Undergraduate (BCA, BBA, B.Com, B.Sc) and Postgraduate (MCA, MBA, M.Com) curriculums.",
    sampleQuery: "What courses are available at DSCASC?",
    badge: "UG & PG Degrees",
  },
  {
    title: "Academics",
    icon: Calendar,
    emoji: "📅",
    color: "bg-white",
    description: "Semester schedules, continuous assessments, circulars, and exam notifications.",
    sampleQuery: "When are semester exams?",
    badge: "Exams & Circulars",
  },
  {
    title: "BCA",
    icon: Laptop,
    emoji: "💻",
    color: "bg-brand-yellow",
    description: "Department leadership, SEP 2024 syllabus, class timetables, and Centers of Excellence.",
    sampleQuery: "Where can I find the BCA timetable?",
    badge: "Timetable & Syllabus",
  },
  {
    title: "Fees",
    icon: Coins,
    emoji: "💰",
    color: "bg-brand-sage",
    description: "Official fee guidelines, merit/management quotas, and state scholarship assistance.",
    sampleQuery: "What is BCA fee?",
    badge: "Official Guidance",
  },
  {
    title: "Placements",
    icon: Rocket,
    emoji: "🚀",
    color: "bg-white",
    description: "Verified statistics: 300 companies, 8 LPA highest package, placement cell contact.",
    sampleQuery: "What is the placement record of DSCASC?",
    badge: "Verified Statistics",
  },
  {
    title: "Contact",
    icon: PhoneCall,
    emoji: "📞",
    color: "bg-brand-yellow",
    description: "Campus location at Kumaraswamy Layout, official admissions numbers, and office emails.",
    sampleQuery: "How do I contact DSCASC?",
    badge: "Official Office",
  },
];

const quickQuestions = [
  "How can I apply for BCA?",
  "What courses does DSCASC offer?",
  "Where can I find the BCA timetable?",
  "What is the placement record?",
  "What is the highest package?",
  "How do I contact the college?",
];

const pipelineStages = [
  { step: "01", name: "Normalization", detail: "Lowercase, typo & slang repair, acronym folding" },
  { step: "02", name: "Tokenization", detail: "Unigrams plus composite bigram features" },
  { step: "03", name: "Stopword Handling", detail: "Removes grammatical noise, keeps domain terms" },
  { step: "04", name: "TF-IDF", detail: "Smoothed inverse document frequency, L2 normalized" },
  { step: "05", name: "Cosine Similarity", detail: "Angle between query vector and intent vectors" },
  { step: "06", name: "Intent Matching", detail: "Highest scoring intent is ranked first" },
  { step: "07", name: "Confidence", detail: "Score checked against the 0.38 threshold" },
  { step: "08", name: "Knowledge Base", detail: `${INTENT_COUNT} verified institutional intents` },
  { step: "09", name: "Response", detail: "Rich cards, official links and source credits" },
];

const howItWorks = [
  {
    step: "01",
    title: "Ask in plain language",
    body: "Type a question the way a student actually speaks — typos, slang and abbreviations are all handled by the normalizer.",
  },
  {
    step: "02",
    title: "The NLP engine matches an intent",
    body: "Your query is vectorized with TF-IDF and compared against every knowledge intent using cosine similarity, then gated by a confidence threshold.",
  },
  {
    step: "03",
    title: "Get a verified answer",
    body: "You receive a structured response with official source links — or an honest fallback when the query is outside the knowledge base.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ============================= HERO ============================= */}
      <section className="relative border-b-2 border-black bg-white">
        <div
          className="dot-grid-black pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <span className="brutal-tag">
              <span className="h-2 w-2 border border-black bg-black" aria-hidden="true" />
              Dayananda Sagar College &bull; Bangalore University
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-brand-charcoal sm:text-6xl lg:text-7xl">
              Your DSCASC questions.
              <span className="mt-2 block w-fit bg-brand-yellow px-2 py-1.5 leading-[0.95]">
                Answered instantly.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
              Ask about admissions, every UG &amp; PG program — BCA, BBA, B.Com, B.Sc, MCA, MBA,
              M.Com — plus academics, placements and student services.
            </p>

            <div className="mt-4 flex items-start gap-2 border-l-4 border-black bg-brand-sage-light py-2 pl-3">
              <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-black" aria-hidden="true" />
              <p className="text-xs font-semibold leading-relaxed text-brand-charcoal sm:text-sm">
                Powered by explainable NLP-based intent matching — TF-IDF vectorization and cosine
                similarity, running fully in your browser.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/chat" className="brutal-btn brutal-btn-primary w-full text-base sm:w-auto">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Start Chatting
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#topics" className="brutal-btn w-full text-base sm:w-auto">
                Explore Topics
              </a>
            </div>

            {/* Quick questions */}
            <div className="mt-10">
              <div className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                Try asking
              </div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <Link
                    key={q}
                    href={`/chat?q=${encodeURIComponent(q)}`}
                    className="brutal-chip"
                  >
                    <Sparkles className="h-3 w-3 text-brand-charcoal" aria-hidden="true" />
                    &ldquo;{q}&rdquo;
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: visual NLP composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md space-y-4 lg:space-y-0">
              {/* Query card */}
              <div className="rotate-[-1.5deg] border-2 border-black bg-brand-charcoal p-4 shadow-brutal-lg">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-yellow">
                    Student Query
                  </span>
                  <span className="border border-white/40 px-1.5 text-[9px] font-bold uppercase tracking-wider text-brand-sage">
                    Raw input
                  </span>
                </div>
                <p className="font-mono text-sm text-white">&ldquo;whn is bca tymtable&rdquo;</p>
              </div>

              {/* Pipeline card */}
              <div className="rotate-[1deg] border-2 border-black bg-white p-4 shadow-brutal-lg sm:-mt-2 lg:-mt-3 lg:ml-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-charcoal">
                    NLP Pipeline
                  </span>
                  <span className="brutal-tag !px-1.5 !py-0.5 !text-[9px]">Live</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["normalize", "tokenize", "stopwords", "tf-idf", "cosine", "rank"].map((step, i) => (
                    <React.Fragment key={step}>
                      <span className="border-2 border-black bg-brand-sage-light px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-charcoal">
                        {step}
                      </span>
                      {i < 5 && (
                        <span className="self-center text-[10px] font-black text-black" aria-hidden="true">
                          &rarr;
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-3 border-t-2 border-black pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    <span>Cosine score</span>
                    <span className="font-mono">0.94 &ge; 0.38</span>
                  </div>
                  <div className="mt-1.5 h-3 w-full border-2 border-black bg-white">
                    <div className="h-full w-[94%] bg-brand-yellow" />
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="rotate-[-0.75deg] border-2 border-black bg-brand-yellow p-4 shadow-brutal-lg sm:-mt-2 lg:-mt-4 lg:ml-2">
                <div className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-black">
                  Matched Intent
                </div>
                <div className="font-mono text-lg font-black text-black">bca_timetable</div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-black">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Verified answer with official source link
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= TRUST STRIP ============================= */}
      <section className="border-b-2 border-black bg-brand-charcoal" aria-label="Project facts">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 text-center sm:px-6 lg:px-8">
          {[
            `${INTENT_COUNT} Verified Intents`,
            "Full Test Suite Passing",
            "TF-IDF + Cosine Similarity",
            "0.38 Confidence Threshold",
            "Zero External APIs",
          ].map((fact, idx) => (
            <React.Fragment key={fact}>
              {idx > 0 && (
                <span className="hidden h-3 w-0.5 bg-brand-yellow sm:block" aria-hidden="true" />
              )}
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
                {fact}
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ============================= EXPLORE DSCASC ============================= */}
      <section
        id="explore"
        className="border-b-2 border-black bg-brand-sage-light py-16 sm:py-20"
        aria-labelledby="explore-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              kicker="Explore DSCASC"
              title={
                <span id="explore-heading">
                  The whole college.
                  <br className="hidden sm:block" /> One assistant.
                </span>
              }
              description="DSCASC AI covers every officially listed undergraduate and postgraduate program at Dayananda Sagar College of Arts, Science and Commerce. Pick a program — it opens the chatbot with a real question."
            />
            <Link
              href="/chat"
              className="brutal-btn brutal-btn-dark shrink-0 self-start md:self-auto"
            >
              Ask about a program
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="stagger mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {explorePrograms.map((group) => (
              <div
                key={group.level}
                className="brutal-card flex flex-col p-5"
                aria-label={`${group.level} programs`}
              >
                <div className="flex items-center justify-between gap-3 border-b-2 border-black pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-9 items-center justify-center border-2 border-black ${group.color} px-2 font-display text-xs font-black uppercase text-black shadow-brutal-sm`}
                    >
                      {group.badge}
                    </span>
                    <h3 className="font-display text-lg font-extrabold text-brand-charcoal">
                      {group.level}
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                    {group.items.length} programs
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((program) => (
                    <li key={program.abbr}>
                      <Link
                        href={`/chat?q=${encodeURIComponent(`Tell me about ${program.abbr}`)}`}
                        className="group flex items-center justify-between gap-3 border-2 border-black bg-white px-3 py-2.5 shadow-brutal-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-brutal focus-visible:-translate-y-0.5"
                      >
                        <span className="flex min-w-0 items-baseline gap-2.5">
                          <span className="font-display text-sm font-black tracking-tight text-brand-charcoal">
                            {program.abbr}
                          </span>
                          <span className="truncate text-xs font-medium text-slate-600">
                            {program.name}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-black transition-transform duration-150 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t-2 border-dashed border-black/20 pt-3 text-[11px] font-semibold text-slate-500">
                  {group.note} &middot; affiliated with Bangalore University. Details link to official
                  DSCASC sources.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= TOPIC CARDS ============================= */}
      <section id="topics" className="border-b-2 border-black bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              kicker="Curated knowledge base"
              title={
                <>
                  Explore college
                  <br className="hidden sm:block" /> knowledge areas
                </>
              }
              description={`${INTENT_COUNT} verified intents covering Dayananda Sagar College of Arts, Science and Commerce student services — from admissions and every UG & PG program to placements. Pick a card — it opens the chatbot with a real question.`}
            />
            <Link
              href="/chat"
              className="brutal-btn shrink-0 self-start md:self-auto"
            >
              Open full assistant
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="stagger mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topicCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={`/chat?q=${encodeURIComponent(card.sampleQuery)}`}
                  className="brutal-card-interactive group flex h-full flex-col justify-between p-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex h-12 w-12 items-center justify-center border-2 border-black ${card.color} text-xl shadow-brutal-sm transition-transform duration-150 group-hover:-translate-y-0.5`}
                        aria-hidden="true"
                      >
                        <span>{card.emoji}</span>
                      </span>
                      <span className="border-2 border-black bg-white px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-brand-charcoal">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-extrabold text-brand-charcoal">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t-2 border-black pt-3">
                    <span className="truncate text-xs font-semibold italic text-slate-500">
                      &ldquo;{card.sampleQuery}&rdquo;
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-brand-yellow transition-transform duration-150 group-hover:translate-x-1">
                      <ArrowRight className="h-3.5 w-3.5 text-black" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Filler tile keeps the 3-column grid balanced */}
            <div className="hidden flex-col justify-between border-2 border-dashed border-black bg-brand-sage-light p-5 lg:flex">
              <div>
                <span className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white text-xl shadow-brutal-sm" aria-hidden="true">
                  <MessageSquare className="h-6 w-6 text-black" />
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold text-brand-charcoal">
                  Something else?
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Ask the assistant directly — unrecognized queries fall back safely instead of
                  guessing.
                </p>
              </div>
              <Link href="/chat" className="brutal-btn brutal-btn-dark mt-5 w-full">
                Ask a question
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= NLP PIPELINE ============================= */}
      <section className="on-dark border-b-2 border-black bg-brand-charcoal py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="dark"
            align="center"
            kicker="Powered by NLP-based intent matching"
            title="One query. Nine stages. Zero guesswork."
            description="Every student question travels through the same transparent, mathematically explainable pipeline — no black-box model, no fabricated answers."
          />

          <ol className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipelineStages.map((stage, idx) => (
              <li
                key={stage.step}
                className="relative border-2 border-black bg-white p-4 shadow-brutal"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center border-2 border-black bg-brand-yellow font-display text-sm font-black text-black">
                    {stage.step}
                  </span>
                  {idx < pipelineStages.length - 1 && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      next &rarr;
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-base font-extrabold text-brand-charcoal">
                  {stage.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{stage.detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <Link href="/about" className="brutal-btn brutal-btn-primary">
              See the full methodology
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/chat" className="brutal-btn bg-white">
              Test it in the chat
            </Link>
          </div>
        </div>
      </section>

      {/* ============================= HOW IT WORKS ============================= */}
      <section className="border-b-2 border-black bg-brand-sage-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="How it works"
            title="Understand it in 10 seconds"
            description="Three steps from a student's question to a verified, sourced answer."
          />

          <div className="stagger mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative border-2 border-black bg-white p-6 shadow-brutal">
                <span className="font-display text-5xl font-extrabold leading-none text-brand-charcoal [-webkit-text-stroke:5px_#FFE17C]">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold text-brand-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="relative overflow-hidden border-b-2 border-black bg-brand-yellow">
        <div className="dot-grid-black pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              Ready to ask your DSCASC question?
            </h2>
            <p className="mt-2 max-w-xl text-sm font-semibold text-black/70 sm:text-base">
              No login, no waiting queues — the assistant answers instantly with official source
              references.
            </p>
          </div>
          <Link href="/chat" className="brutal-btn brutal-btn-dark w-full text-base sm:w-auto">
            <MessageSquare className="h-4 w-4 text-brand-yellow" aria-hidden="true" />
            Start Chatting
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
