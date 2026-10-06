import React from "react";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  Building2,
  Award,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function PlacementsPage() {
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
    "Infosys",
    "Wipro",
    "TCS",
    "Cognizant",
    "Capgemini",
    "Accenture",
    "Mindtree",
    "LTI",
    "DXC Technology",
    "Deloitte",
    "EY",
    "KPMG",
    "PwC",
    "JPMorgan Chase",
    "ICICI Bank",
    "Oracle",
    "SAP Labs",
    "Northern Trust",
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-dsc-blue mb-3">
          <Briefcase className="h-3.5 w-3.5" />
          <span>Official Institutional Placement Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Campus Placements & Corporate Relations
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
          According to the currently published DSCASC placement information, the Career Guidance & Placement Unit coordinates placement drives, aptitude coaching, and industry training for BCA, MCA, BBA, MBA, B.Com, and B.Sc graduates.
        </p>
      </div>

      {/* Snapshot Cards */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-dsc-blue" />
            <span>Placement Snapshot (Academic Year 2024-25)</span>
          </h2>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            Verified Official Data
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats2024.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-dsc-blue hover:shadow-xs"
            >
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
                {stat.label}
              </div>
              <div className="my-1.5 text-2xl font-black text-dsc-navy tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] text-slate-400 leading-snug">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Year Comparison Table */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              5-Year Placement Record Comparison (2020 – 2025)
            </h3>
            <p className="text-xs text-slate-500">
              Published by Dayananda Sagar College of Arts, Science and Commerce
            </p>
          </div>
          <a
            href="https://dscasc.edu.in/placement"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-dsc-blue hover:underline"
          >
            <span>View Official Table</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Academic Year</th>
                <th className="px-6 py-3">Companies Visited</th>
                <th className="px-6 py-3">Total Offers</th>
                <th className="px-6 py-3">Offers Accepted</th>
                <th className="px-6 py-3">Highest Salary</th>
                <th className="px-6 py-3">Average Salary</th>
                <th className="px-6 py-3">Lowest Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historicalStats.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-blue-50/40 transition-colors ${
                    idx === 0 ? "bg-blue-50/20 font-bold text-dsc-navy" : "text-slate-700"
                  }`}
                >
                  <td className="px-6 py-3.5">
                    {row.year}{" "}
                    {idx === 0 && (
                      <span className="ml-1 rounded-sm bg-blue-100 px-1.5 py-0.2 text-[9px] font-extrabold text-dsc-blue">
                        Current
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5">{row.companies}</td>
                  <td className="px-6 py-3.5">{row.offers}</td>
                  <td className="px-6 py-3.5">{row.accepted}</td>
                  <td className="px-6 py-3.5 text-emerald-700 font-semibold">{row.highest}</td>
                  <td className="px-6 py-3.5 font-semibold">{row.avg}</td>
                  <td className="px-6 py-3.5 text-slate-500">{row.lowest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column: Placement Cell Contact & Recruiting Companies */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-12">
        {/* Placement Cell Contact */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-dsc-blue">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Corporate Relations & Placement Cell
              </h3>
              <p className="text-xs text-slate-500">Contact for Fresher Hiring & Campus Drives</p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs">
            <div>
              <div className="text-slate-400 font-medium">Head of Placement</div>
              <div className="text-sm font-bold text-dsc-navy">Geetha H Raheja</div>
              <div className="text-slate-600">Head - Placements & Corporate Relations</div>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="h-4 w-4 text-emerald-600" />
              <span className="font-mono font-medium">+91 9036968288</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-4 w-4 text-blue-600" />
              <a
                href="mailto:geetha.raheja@dayanandasagar.edu"
                className="font-medium text-dsc-blue hover:underline"
              >
                geetha.raheja@dayanandasagar.edu
              </a>
            </div>

            <div className="border-t border-slate-200 pt-2 text-[11px] text-slate-500">
              Eligible Streams: MCA / MBA / M.Com / BCA / BBA / B.Sc / B.Com
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <a
              href="https://www.dscasc.edu.in/naac/criteria5/5.2/5.2.1_Students_Placed/Overall%20Placement%20List.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-dsc-blue hover:underline"
            >
              <FileCheck className="h-4 w-4" />
              <span>Download NAAC Overall Placed Students Report (PDF)</span>
            </a>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Prominent Recruiting Partners</h3>
              <p className="text-xs text-slate-500">Leading multinational corporations</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {companiesList.map((comp, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs"
              >
                {comp}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
            <strong>Policy Notice:</strong> DSCASC provides extensive placement assistance and corporate connectivity. The college does not guarantee job offers or fixed salaries. Actual offers depend on candidate performance in evaluation rounds.
          </div>
        </div>
      </div>

      {/* Ask the Chatbot Interactive Strip */}
      <div className="rounded-2xl border border-blue-200 bg-linear-to-r from-dsc-navy to-dsc-blue p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-dsc-gold" />
              <span>Have specific questions about DSCASC placements?</span>
            </h3>
            <p className="mt-1 text-xs text-blue-100 max-w-xl">
              Ask our NLP assistant directly about companies, BCA packages, training schedules, or the recruitment process.
            </p>
          </div>

          <Link
            href="/chat?q=What+is+the+placement+record+of+DSCASC%3F"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-dsc-navy transition-all hover:bg-dsc-gold hover:text-white"
          >
            <span>Ask Chatbot</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
          {placementQueries.map((q, idx) => (
            <Link
              key={idx}
              href={`/chat?q=${encodeURIComponent(q)}`}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20 transition-colors"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
