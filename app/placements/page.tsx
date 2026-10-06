import React from "react";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
  Compass,
  Rocket,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PlacementsPage() {
  // ---------- EXISTING VERIFIED DATA (unchanged) ----------
  const stats2024 = [
    { label: "Companies Visited", value: "300", subtext: "Active corporate recruitment drives" },
    { label: "Total Offers Made", value: "320", subtext: "Offers across UG & PG streams" },
    { label: "Offers Accepted", value: "300", subtext: "High conversion & student joining" },
    { label: "Highest Package", value: "8 LPA", subtext: "Top salary offered in 2024-25" },
    { label: "Average Package", value: "5.08 LPA", subtext: "Competitive entry-level CTC" },
    { label: "Lowest Package", value: "2.16 LPA", subtext: "Standard initial career baseline" },
  ];

  const historicalStats = [
    { year: "2024-25", companies: 300, offers: 320, accepted: 300, highest: "8 LPA", avg: "5.08 LPA", lowest: "2.16 LPA" },
    { year: "2023-24", companies: 300, offers: 245, accepted: 211, highest: "14 LPA", avg: "7.90 LPA", lowest: "1.80 LPA" },
    { year: "2022-23", companies: 100, offers: 175, accepted: 152, highest: "10 LPA", avg: "6.49 LPA", lowest: "2.99 LPA" },
    { year: "2021-22", companies: 310, offers: 279, accepted: 276, highest: "12 LPA", avg: "7.00 LPA", lowest: "2.00 LPA" },
    { year: "2020-21", companies: 145, offers: 283, accepted: 180, highest: "10 LPA", avg: "4.50 LPA", lowest: "3.00 LPA" },
  ];

  const companiesList = [
    "Infosys", "Wipro", "TCS", "Cognizant", "Capgemini", "Accenture", "Mindtree", "LTI",
    "DXC Technology", "Deloitte", "EY", "KPMG", "PwC", "JPMorgan Chase", "ICICI Bank",
    "Oracle", "SAP Labs", "Northern Trust",
  ];

  const placementQueries = [
    "What is the placement record of DSCASC?",
    "How many companies visited?",
    "What is the highest package?",
    "What is the average salary?",
    "Who handles placements?",
    "How does the placement process work?",
    "Does DSCASC have placements for BCA?",
  ];

  const processSteps = [
    { title: "Placement Registration", body: "Final and pre-final year students register with the placement cell." },
    { title: "Pre-Placement Training", body: "Aptitude training, technical coding preparation, resume writing, and mock interviews." },
    { title: "Pre-Placement Talks (PPT)", body: "Recruiting companies share job profiles, CTC, and career paths." },
    { title: "Selection Rounds", body: "Online aptitude test / coding assessment followed by technical and HR interview rounds." },
    { title: "Offer Release", body: "Verified offers are distributed to selected candidates." },
  ];

  const careerSupport = [
    { title: "Industry Certifications", body: "Skill Enhancement Courses in Full Stack Web Development, AWS Cloud, Data Science, and Machine Learning." },
    { title: "Seminars & Tech Talks", body: "Frequent guest sessions from industry experts (e.g. Docker, Imarticus, AI Centers of Excellence)." },
    { title: "Higher Education Counseling", body: "Guidance for MCA, MBA, M.Sc, GRE, and CAT aspirants." },
    { title: "Alumni Mentorship", body: "Interaction with accomplished alumni working in top multinationals." },
  ];

  const internshipNotes = [
    "Summer internships in technology startups, software firms, and corporate research units.",
    "The Department of Computer Applications and Placement Cell facilitate corporate internship connections and provide institutional letters of recommendation.",
    "Real-world final semester projects are guided by experienced faculty and evaluated as per university regulations.",
  ];

  const officialSources = [
    {
      title: "Official DSCASC Placement Portal",
      url: "https://dscasc.edu.in/placement",
      description: "Published placement records, tables and contact details",
    },
    {
      title: "NAAC Overall Placed Students List (PDF)",
      url: "https://www.dscasc.edu.in/naac/criteria5/5.2/5.2.1_Students_Placed/Overall%20Placement%20List.pdf",
      description: "Official NAAC Criteria 5 verification document",
    },
    {
      title: "DSCASC Official Website",
      url: "https://www.dscasc.edu.in/",
      description: "Institutional homepage and department listings",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ============================= HERO ============================= */}
      <section className="relative border-b-2 border-black bg-brand-charcoal">
        <div className="dot-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <span className="brutal-tag">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            Official Institutional Placement Records
          </span>

          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Campus placements &amp;{" "}
            <span className="mt-2 block w-fit bg-brand-yellow px-2 py-1.5 leading-[0.95] text-black">
              corporate relations
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-brand-sage sm:text-base">
            According to the currently published DSCASC placement information, the Career Guidance &
            Placement Unit coordinates placement drives, aptitude coaching, and industry training for
            BCA, MCA, BBA, MBA, B.Com, and B.Sc graduates.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/chat?q=What%20is%20the%20placement%20record%20of%20DSCASC%3F" className="brutal-btn brutal-btn-primary">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Ask the chatbot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="https://dscasc.edu.in/placement"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn bg-white"
            >
              View official table
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================= SNAPSHOT ============================= */}
      <section className="border-b-2 border-black bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Placement snapshot"
              title="Academic Year 2024-25"
              description="Verified, publicly published DSCASC placement statistics — displayed exactly as reported."
            />
            <span className="brutal-tag self-start sm:self-auto">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verified official data
            </span>
          </div>

          <div className="stagger mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats2024.map((stat) => (
              <div
                key={stat.label}
                className="border-2 border-black bg-white p-5 shadow-brutal transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
              >
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                  {stat.label}
                </div>
                <div className="mt-2 font-display text-5xl font-extrabold leading-none tracking-tight text-brand-charcoal sm:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-3 border-t-2 border-black pt-2 text-xs font-semibold text-slate-600">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= HISTORICAL TABLE ============================= */}
      <section className="border-b-2 border-black bg-brand-sage-light py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Year over year"
            title="5-year placement record comparison"
            description="2020 – 2025, published by Dayananda Sagar College of Arts, Science and Commerce. Historical rows are for reference; the current year is highlighted."
          />

          <div className="mt-8 overflow-hidden border-2 border-black bg-white shadow-brutal">
            <div className="flex flex-col gap-2 border-b-2 border-black bg-brand-charcoal px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow">
                Official Placement Table
              </span>
              <a
                href="https://dscasc.edu.in/placement"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white underline decoration-2 underline-offset-2 hover:text-brand-yellow"
              >
                View official source
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="sr-only">
                  DSCASC placement record by academic year, including companies visited, offers made,
                  offers accepted and salary figures
                </caption>
                <thead>
                  <tr className="border-b-2 border-black bg-brand-yellow text-[11px] font-extrabold uppercase tracking-wider text-black">
                    <th scope="col" className="px-4 py-3 sm:px-6">Academic Year</th>
                    <th scope="col" className="px-4 py-3">Companies Visited</th>
                    <th scope="col" className="px-4 py-3">Total Offers</th>
                    <th scope="col" className="px-4 py-3">Offers Accepted</th>
                    <th scope="col" className="px-4 py-3">Highest Salary</th>
                    <th scope="col" className="px-4 py-3">Average Salary</th>
                    <th scope="col" className="px-4 py-3">Lowest Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {historicalStats.map((row, idx) => (
                    <tr
                      key={row.year}
                      className={
                        idx === 0
                          ? "bg-brand-sage-light font-bold text-brand-charcoal"
                          : "bg-white text-slate-700"
                      }
                    >
                      <th scope="row" className="px-4 py-3 text-left font-extrabold sm:px-6">
                        {row.year}
                        {idx === 0 && (
                          <span className="ml-2 border-2 border-black bg-brand-yellow px-1.5 py-0.5 align-middle text-[9px] font-black uppercase tracking-wider text-black">
                            Current
                          </span>
                        )}
                        {idx > 0 && (
                          <span className="ml-2 align-middle text-[9px] font-black uppercase tracking-wider text-slate-600">
                            Historical
                          </span>
                        )}
                      </th>
                      <td className="px-4 py-3 font-semibold">{row.companies}</td>
                      <td className="px-4 py-3 font-semibold">{row.offers}</td>
                      <td className="px-4 py-3 font-semibold">{row.accepted}</td>
                      <td className="px-4 py-3 font-black text-brand-charcoal">{row.highest}</td>
                      <td className="px-4 py-3 font-bold">{row.avg}</td>
                      <td className="px-4 py-3 text-slate-600">{row.lowest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= PROCESS + CAREER ============================= */}
      <section className="border-b-2 border-black bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Placement process */}
            <div>
              <SectionHeading
                kicker="Placement process"
                title="How campus recruitment runs"
                description="The DSCASC campus placement process operates systematically through the following steps."
              />
              <ol className="stagger mt-7 space-y-4">
                {processSteps.map((step, idx) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-brand-yellow font-display text-sm font-black text-black shadow-brutal-sm">
                      {idx + 1}
                    </span>
                    <div className="flex-1 border-2 border-black bg-white p-3.5 shadow-brutal-sm">
                      <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-charcoal">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-2 border-black bg-brand-sage-light p-3.5">
                <ul className="space-y-1.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black" aria-hidden="true" />
                    Structured pre-placement training modules
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black" aria-hidden="true" />
                    Assistance for resume building and interview readiness
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black" aria-hidden="true" />
                    Transparent placement policies
                  </li>
                </ul>
              </div>
            </div>

            {/* Career guidance */}
            <div>
              <SectionHeading
                kicker="Career guidance"
                title="Preparing students for industry"
                description="DSCASC provides dedicated career guidance and professional mentoring to assist students in shaping their future paths."
              />
              <div className="stagger mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {careerSupport.map((item) => (
                  <div
                    key={item.title}
                    className="border-2 border-black bg-white p-4 shadow-brutal-sm transition-colors hover:bg-brand-yellow"
                  >
                    <span className="flex h-8 w-8 items-center justify-center border-2 border-black bg-brand-sage-light">
                      <Compass className="h-4 w-4 text-black" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 font-display text-sm font-extrabold text-brand-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.body}</p>
                  </div>
                ))}
              </div>

              {/* Internships */}
              <div className="mt-4 border-2 border-black bg-brand-charcoal p-4 shadow-brutal">
                <h3 className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider text-brand-yellow">
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                  Internships &amp; project work
                </h3>
                <ul className="mt-3 space-y-2">
                  {internshipNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2 text-xs leading-relaxed text-brand-sage sm:text-sm">
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-brand-yellow" aria-hidden="true" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= RECRUITERS + CONTACT ============================= */}
      <section className="border-b-2 border-black bg-brand-sage-light py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Recruiters */}
          <div className="border-2 border-black bg-white shadow-brutal">
            <div className="brutal-strip">
              <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                Prominent recruiting partners
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Leading multinational corporations
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {companiesList.map((comp) => (
                  <span
                    key={comp}
                    className="border-2 border-black bg-brand-sage-light px-3 py-1.5 text-xs font-extrabold text-brand-charcoal shadow-brutal-sm transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-yellow"
                  >
                    {comp}
                  </span>
                ))}
              </div>
              <div className="mt-5 border-2 border-black bg-brand-yellow p-3 text-xs font-semibold leading-relaxed text-black">
                <strong className="font-black uppercase">Policy Notice:</strong> DSCASC provides
                extensive placement assistance and corporate connectivity. The college does not
                guarantee job offers or fixed salaries. Actual offers depend on candidate performance
                in evaluation rounds.
              </div>
            </div>
          </div>

          {/* Placement cell contact */}
          <div className="border-2 border-black bg-white shadow-brutal">
            <div className="brutal-strip">
              <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Corporate relations &amp; placement cell
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact for fresher hiring &amp; campus drives
              </p>

              <div className="mt-4 border-2 border-black bg-brand-sage-light p-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-600">
                  Head of Placement
                </div>
                <div className="mt-1 font-display text-xl font-extrabold text-brand-charcoal">
                  Geetha H Raheja
                </div>
                <div className="text-xs font-bold text-slate-600">
                  Head - Placements &amp; Corporate Relations
                </div>

                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center border-2 border-black bg-emerald-400">
                      <Phone className="h-3 w-3 text-black" aria-hidden="true" />
                    </span>
                    <a
                      href="tel:+919036968288"
                      className="font-mono font-bold text-brand-charcoal hover:underline"
                    >
                      +91 9036968288
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center border-2 border-black bg-brand-yellow">
                      <Mail className="h-3 w-3 text-black" aria-hidden="true" />
                    </span>
                    <a
                      href="mailto:geetha.raheja@dayanandasagar.edu"
                      className="break-all font-semibold text-brand-charcoal underline decoration-2 underline-offset-2 hover:bg-brand-yellow"
                    >
                      geetha.raheja@dayanandasagar.edu
                    </a>
                  </li>
                </ul>

                <div className="mt-3 border-t-2 border-black pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Eligible streams: MCA / MBA / M.Com / BCA / BBA / B.Sc / B.Com
                </div>
              </div>

              <a
                href="https://www.dscasc.edu.in/naac/criteria5/5.2/5.2.1_Students_Placed/Overall%20Placement%20List.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn brutal-btn-dark mt-4 w-full text-xs"
              >
                <FileCheck className="h-4 w-4 text-brand-yellow" aria-hidden="true" />
                Download NAAC placed students report (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= OFFICIAL SOURCES ============================= */}
      <section className="border-b-2 border-black bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Official sources"
            title="Verify everything yourself"
            description="All figures on this page are drawn from the sources below — no estimates, no invented numbers."
          />

          <div className="stagger mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {officialSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card-interactive group flex flex-col justify-between p-5"
              >
                <div>
                  <span className="flex h-10 w-10 items-center justify-center border-2 border-black bg-brand-yellow shadow-brutal-sm">
                    <TrendingUp className="h-5 w-5 text-black" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-extrabold text-brand-charcoal">
                    {source.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {source.description}
                  </p>
                </div>
                <span className="mt-4 flex items-center gap-1.5 border-t-2 border-black pt-3 text-xs font-extrabold uppercase tracking-wider text-brand-charcoal">
                  Open source
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="relative overflow-hidden border-b-2 border-black bg-brand-yellow">
        <div className="dot-grid-black pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-black sm:text-3xl">
                <MessageSquare className="h-6 w-6" aria-hidden="true" />
                Have specific questions about DSCASC placements?
              </h2>
              <p className="mt-2 max-w-xl text-sm font-semibold text-black/70">
                Ask the NLP assistant directly about companies, BCA packages, training schedules, or
                the recruitment process.
              </p>
            </div>
            <Link href="/chat" className="brutal-btn brutal-btn-dark shrink-0">
              Ask Chatbot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t-2 border-black pt-5">
            {placementQueries.map((q) => (
              <Link
                key={q}
                href={`/chat?q=${encodeURIComponent(q)}`}
                className="brutal-chip"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
