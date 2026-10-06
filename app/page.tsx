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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Search,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function HomePage() {
  const topicCards = [
    {
      title: "Admissions",
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-700",
      description: "Eligibility criteria, application procedures, and required document verification.",
      sampleQuery: "How do I apply for BCA?",
      badge: "Eligibility & Forms",
    },
    {
      title: "Courses",
      icon: BookOpen,
      color: "from-emerald-600 to-teal-700",
      description: "Undergraduate (BCA, BBA, B.Com, B.Sc) and Postgraduate (MCA, MBA, M.Com) curriculums.",
      sampleQuery: "What courses are available at DSCASC?",
      badge: "UG & PG Degrees",
    },
    {
      title: "Academics",
      icon: Calendar,
      color: "from-violet-600 to-purple-700",
      description: "Semester schedules, continuous assessments, circulars, and exam notifications.",
      sampleQuery: "When are semester exams?",
      badge: "Exams & Circulars",
    },
    {
      title: "BCA Department",
      icon: Laptop,
      color: "from-sky-600 to-blue-700",
      description: "Department leadership, SEP 2024 syllabus, class timetables, and Centers of Excellence.",
      sampleQuery: "Where can I find the BCA timetable?",
      badge: "Timetable & Syllabus",
    },
    {
      title: "Fees & Quotas",
      icon: Coins,
      color: "from-amber-600 to-yellow-700",
      description: "Official fee guidelines, merit/management quotas, and state scholarship assistance.",
      sampleQuery: "What is BCA fee?",
      badge: "Official Guidance",
    },
    {
      title: "Placements",
      icon: Rocket,
      color: "from-rose-600 to-pink-700",
      description: "Verified statistics: 300 companies, 8 LPA highest package, placement cell contact.",
      sampleQuery: "What is the placement record of DSCASC?",
      badge: "Verified Statistics",
    },
    {
      title: "Contact & Campus",
      icon: PhoneCall,
      color: "from-slate-700 to-slate-900",
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

  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 overflow-hidden blur-3xl opacity-20 pointer-events-none">
        <div className="aspect-1155/678 w-[72rem] bg-gradient-to-tr from-dsc-blue to-dsc-navy" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="text-center">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-dsc-navy shadow-2xs backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dayananda Sagar College of Arts, Science & Commerce</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-dsc-blue">Bangalore University</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
            Your DSCASC questions.{" "}
            <span className="bg-gradient-to-r from-dsc-navy via-dsc-blue to-dsc-maroon bg-clip-text text-transparent">
              Answered instantly.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
            Ask about admissions, courses, academics, timetables, syllabus, verified placement statistics, and official student services.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
            <Cpu className="h-3.5 w-3.5 text-dsc-blue" />
            <span>Powered by explainable NLP-based intent matching &bull; TF-IDF & Cosine Similarity</span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-dsc-navy px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-dsc-blue hover:shadow-lg active:scale-98"
            >
              <MessageSquare className="h-4 w-4 text-dsc-gold" />
              <span>Start Chatting</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#topics"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <span>Explore Topics</span>
            </a>
          </div>

          {/* Quick interactive questions bar */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="mb-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Try Asking
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickQuestions.map((q, idx) => (
                <Link
                  key={idx}
                  href={`/chat?q=${encodeURIComponent(q)}`}
                  className="rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-all hover:border-dsc-blue hover:text-dsc-blue hover:bg-blue-50/50"
                >
                  &ldquo;{q}&rdquo;
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topic Cards Section */}
      <section id="topics" className="border-t border-slate-200/80 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-dsc-blue">
                Curated Knowledge Base
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore College Knowledge Areas
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-slate-500 max-w-md">
              40+ verified intents covering Dayananda Sagar College of Arts, Science and Commerce student services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topicCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={`/chat?q=${encodeURIComponent(card.sampleQuery)}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:border-dsc-blue/50 hover:bg-white hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-dsc-blue transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-200/60 pt-3 flex items-center justify-between text-xs font-medium text-dsc-blue">
                    <span className="italic truncate pr-2 text-slate-500 group-hover:text-dsc-navy">
                      &ldquo;{card.sampleQuery}&rdquo;
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works / NLP Architecture Section */}
      <section className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-dsc-blue">
              Academic AI Architecture
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Transparent, Explainable NLP Engine
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Unlike black-box generative models, DSCASC AI utilizes an explainable mathematical pipeline designed for academic viva evaluation.
            </p>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-dsc-blue font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Normalization & Tokens</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Cleans query text, handles typos (e.g. <em>tymtable &rarr; timetable</em>), strips punctuation, and builds unigrams and bigrams.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-dsc-blue font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">TF-IDF Vectorization</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Weights terms by Term Frequency &amp; Inverse Document Frequency with Laplace smoothing and L2 Euclidean normalization.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-dsc-blue font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Cosine Similarity</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Calculates geometric angle between normalized vectors &bull; cos(&theta;) = q &bull; d, ranking intent candidates.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-dsc-blue font-bold text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Confidence & Fallback</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Checks against configurable threshold (38%). Retrieves rich verified cards or safely delivers a structured fallback.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-dsc-blue hover:text-dsc-navy hover:underline"
            >
              <span>Explore the deep mathematical formulas & interactive pipeline tester</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
