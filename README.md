# DSCASC AI — Automated Admission & Student Guidance Chatbot

> **An NLP-Based Automated Admission and Student Guidance Chatbot for Dayananda Sagar College of Arts, Science and Commerce (DSCASC)**  
> Academic Project — BCA Semester III Artificial Intelligence Submission  
> Affiliated to Bangalore University & Recognized by Government of Karnataka

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/tests-23%2F23%20passed-success.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)]()
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)]()

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Objectives](#objectives)
4. [Features](#features)
5. [NLP Methodology & Mathematical Foundations](#nlp-methodology--mathematical-foundations)
6. [System Architecture](#system-architecture)
7. [Tech Stack](#tech-stack)
8. [Project Structure](#project-structure)
9. [How Intent Matching Works](#how-intent-matching-works)
10. [Curated Knowledge Base](#curated-knowledge-base)
11. [Testing & Verification](#testing--verification)
12. [Running Locally](#running-locally)
13. [Production Build](#production-build)
14. [Deployment Guide](#deployment-guide)
15. [Limitations](#limitations)
16. [Future Enhancements](#future-enhancements)
17. [Academic Context](#academic-context)

---

## Project Overview

**DSCASC AI** is an intelligent, web-based student guidance assistant designed for **Dayananda Sagar College of Arts, Science and Commerce (DSCASC)**, Bangalore.

Administrative and admissions departments receive recurring questions regarding admissions, eligibility, document checklists, examination schedules, BCA timetables, course syllabi, fee policies, and campus placement records. DSCASC AI provides 24/7 instant, deterministic inquiry resolution through an explainable Natural Language Processing (NLP) pipeline running on Term Frequency–Inverse Document Frequency (TF-IDF) vectorization and Cosine Similarity pattern classification.

All responses are anchored directly in verified institutional data sourced from the official college portal ([dscasc.edu.in](https://www.dscasc.edu.in/)).

---

## Problem Statement

Administrative offices and faculty members receive hundreds of repetitive queries from students and parents during admission and examination cycles:
- How do I apply for BCA?
- What documents are required for admission?
- Where can I find the latest semester timetable?
- What was the highest placement package in 2024-25?
- Who handles corporate placements?

Manual response handling causes long phone waiting queues and administrative fatigue. Traditional website search tools fail on informal typing, typos, or natural queries. DSCASC AI solves this by automating query resolution with an explainable, zero-hallucination NLP engine.

---

## Objectives

1. **Explainable AI Engine:** Build a transparent NLP pipeline without dependencies on opaque third-party LLM APIs.
2. **Verified Academic Knowledge:** Index 40+ curated intents across admissions, courses, BCA academics, placements, and campus services.
3. **Typo & Slang Resilience:** Preprocess student shorthand (*whn*, *tymtable*, *placment*, *documnts*).
4. **Strict Fallback Guardrail:** Enforce a $\ge 0.38$ confidence threshold to prevent false positive hallucinations.
5. **Interactive Viva Inspector:** Provide a real-time "AI Analysis" toggle displaying vector math and candidate scores.

---

## Features

- **Conversational Chat Interface:** Modern, responsive chat UI featuring right-aligned student bubbles and rich assistant cards.
- **Verified Placement Snapshot (2024-25):** Sourced from the official DSCASC placement portal:
  - **300** Companies Visited
  - **320** Total Offers Made
  - **300** Offers Accepted
  - **8 LPA** Highest Salary (14 LPA in 2023-24 batch)
  - **5.08 LPA** Average Salary
  - **2.16 LPA** Lowest Salary
  - Placement Head Contact: Geetha H Raheja (+91 9036968288)
- **BCA Department Hub:** Odd/Even semester timetables, State Education Policy (SEP 2024) syllabus downloads, HOD details (Dr. Aruna Devi C).
- **Rich Response Cards:**
  - `StatisticsCard` for multi-year placement metrics
  - `ContactCard` with one-click dial and email links
  - `LinkCard` with direct official DSCASC PDF and web links
  - `InformationCard` for key highlights
  - `SuggestionCard` with clickable question pills
- **Real-Time AI Analysis Panel:** Displays detected intent, confidence percentage, processing latency (< 2 ms), and candidate rankings.
- **Interactive Pipeline Inspector (`/about`):** Test any sentence and watch text normalization, tokenization, and vector weights live.
- **Dedicated Placements Page (`/placements`):** Multi-year comparison table and corporate recruiter directory.

---

## NLP Methodology & Mathematical Foundations

DSCASC AI uses classical vector space modeling:

### 1. Text Normalization
Lowercases input, normalizes degree acronyms (*b.c.a &rarr; bca*), strips punctuation, and maps common typos:
```
"whn is bca tymtable" -> "when is bca timetable"
```

### 2. Tokenization & Bigrams
Extracts unigrams and adjacent bigrams to retain phrase semantics (*highest_package*, *bca_timetable*).

### 3. Stopwords Filtering
Removes non-informative words (*a, the, is, for, to*) while preserving intent words.

### 4. TF-IDF Weighting with Laplace Smoothing
$$\text{TF}(t, d) = \frac{\text{count}(t, d)}{\text{total terms in } d}$$
$$\text{IDF}(t) = \ln\left(\frac{1 + N}{1 + \text{DF}(t)}\right) + 1$$
$$\text{Weight}(t, d) = \text{TF}(t, d) \times \text{IDF}(t)$$

### 5. L2 Euclidean Normalization
$$\hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|_2}$$

### 6. Cosine Similarity Classification
$$\text{Similarity}(\hat{\mathbf{q}}, \hat{\mathbf{d}}) = \hat{\mathbf{q}} \cdot \hat{\mathbf{d}} = \sum_{t} q_t \cdot d_t \in [0.0, 1.0]$$

### 7. Confidence Thresholding
$$\text{If } \max(\text{Similarity}) \ge 0.38 \implies \text{Deliver Intent Response}$$
$$\text{If } \max(\text{Similarity}) < 0.38 \implies \text{Deliver Structured Fallback}$$

---

## System Architecture

```
User Query (Web Portal)
         ↓
Text Normalizer (lowercase, slang map, typo correction)
         ↓
Tokenizer (unigrams + composite bigrams)
         ↓
Stopwords Filter (domain-aware noise elimination)
         ↓
TF-IDF Vectorizer (Laplace smoothed weights)
         ↓
Cosine Similarity (dot product vs indexed intent corpus)
         ↓
Confidence Evaluator (Score >= 0.38?)
       /        \
  YES /          \ NO
     v            v
Matched Intent  Fallback Guidance
     \            /
      v          v
Rich UI Cards (Stats, Contact, Links) + AI Analysis Panel
```

---

## Tech Stack

- **Frontend & Full-Stack:** Next.js 14 (App Router), React 18
- **Language:** TypeScript 5.6 (Strict Type Checking)
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Unit & Integration Testing:** Vitest 2.1
- **Deployment:** Vercel / Node.js Server

---

## Project Structure

```
dscasc.ai/
├── app/
│   ├── about/page.tsx         # Mathematical NLP walkthrough & live tester
│   ├── api/chat/route.ts      # REST API endpoint for intent matching
│   ├── chat/page.tsx          # Real-time chat interface with AI panel
│   ├── placements/page.tsx    # Verified placement statistics & records
│   ├── globals.css            # Tailwind directives and styling
│   ├── layout.tsx             # Root layout, metadata & SEO
│   └── page.tsx               # Homepage / Landing page
├── components/
│   ├── cards/
│   │   ├── ContactCard.tsx    # Official contacts & departments
│   │   ├── InformationCard.tsx# Key information bullet points
│   │   ├── LinkCard.tsx       # Verified URLs and PDF links
│   │   ├── StatisticsCard.tsx # Visual placement metrics snapshot
│   │   └── SuggestionCard.tsx # Clickable question pills
│   ├── AiAnalysisPanel.tsx    # Expandable viva mathematical inspector
│   ├── ChatMessage.tsx        # Chat bubble and card renderer
│   ├── Footer.tsx             # Academic disclaimers & portal links
│   └── Navbar.tsx             # Header navigation and branding
├── docs/
│   ├── DEMO_SCRIPT.md         # 3-5 minute live demonstration walkthrough
│   ├── PPT_CONTENT.md         # 12-slide academic defense presentation
│   ├── PROJECT_REPORT.md      # Comprehensive 28-section academic report
│   └── VIVA_QUESTIONS.md      # 25 in-depth viva questions & answers
├── lib/
│   ├── nlp/
│   │   ├── confidence.ts      # Threshold evaluation logic
│   │   ├── cosineSimilarity.ts# Vector dot product calculation
│   │   ├── index.ts           # Barrel export
│   │   ├── intentMatcher.ts   # Core classification coordinator
│   │   ├── normalizer.ts      # Slang mapping and typo normalization
│   │   ├── stopwords.ts       # Domain-aware stopwords list
│   │   ├── tfidf.ts           # TF-IDF vectorizer class
│   │   └── tokenizer.ts       # Unigram and bigram token generator
│   └── knowledgeBase.ts       # 40+ verified DSCASC intents & responses
├── test/
│   └── nlp.test.ts            # 23 automated unit and integration tests
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## How Intent Matching Works

1. **Indexing Phase:** On startup, `IntentMatcher` tokenizes and vectorizes all example utterances in `lib/knowledgeBase.ts`.
2. **Inference Phase:** A user query arrives via web chat or `/api/chat`.
3. **Scoring:** The query vector is evaluated against each intent's examples using Cosine Similarity.
4. **Ranking:** The top scoring intent is selected.
5. **Decision:** If similarity exceeds $0.38$, the verified answer with rich cards is returned. If similarity is low or the query is out-of-domain (*"Who won the cricket match?"*), the fallback response is returned.

---

## Curated Knowledge Base

The knowledge base covers 40+ verified intents across 7 domains:
- **General:** `greeting`, `thanks`, `help`, `goodbye`, `unknown` (fallback)
- **Admissions:** `admission_process`, `admission_enquiry`, `eligibility`, `documents_required`, `application_information`
- **Courses:** `courses_available`, `bca_information`, `bba_information`, `bcom_information`, `bsc_information`, `mca_information`, `mba_information`, `mcom_information`
- **Academics:** `bca_timetable`, `timetable`, `syllabus`, `exam_information`, `academic_calendar`, `faculty_information`, `academic_circulars`
- **Fees:** `fee_information`, `fee_payment`, `scholarship_information` (no fabricated amounts; provides official accounts desk contacts)
- **College:** `college_information`, `vision_mission`, `facilities`, `college_location`, `contact_information`
- **Placements:** `placement_information`, `placement_statistics`, `placement_companies`, `placement_process`, `career_guidance`, `internship_information`, `placement_contact`

---

## Testing & Verification

Automated tests are powered by **Vitest**:
```bash
npm test
```

### Test Suite Summary:
- **Normalizer Tests:** Lowercasing, punctuation stripping, acronym expansion (*B.C.A &rarr; bca*), and student typos (*tymtable*, *placment*).
- **Tokenizer Tests:** Token extraction, bigram generation, empty string safety.
- **Stopwords Filter Tests:** Eliminating noise while retaining semantic tokens.
- **Vector Math Tests:** TF-IDF weight validation, smoothed IDF, and L2 unit norm checks.
- **Cosine Metric Tests:** Orthogonal vs. collinear vector scoring.
- **Confidence Tests:** Validating acceptance vs. fallback threshold boundaries.
- **Integration Tests:** Verifying end-to-end chat queries on admissions, BCA timetables, placement stats, and out-of-domain queries.

**Result:** 23/23 Tests Passed (100% Pass Rate).

---

## Running Locally

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9+

### Steps
1. Clone or navigate to the repository:
   ```bash
   cd /path/to/dscasc.ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the automated test suite:
   ```bash
   npm test
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at [http://localhost:3000](http://localhost:3000).

---

## Production Build

To test the optimized production build:
```bash
npm run build
npm start
```
The application will launch in production mode on port 3000 with pre-rendered static pages.

---

## Deployment Guide

### Deploying to Vercel (Recommended)
1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the repository.
4. Framework Preset: **Next.js** (auto-detected).
5. Build Command: `npm run build` (auto-detected).
6. Output Directory: `.next` (auto-detected).
7. Click **Deploy**.

Because DSCASC AI requires zero external databases or third-party API keys, deployment completes in under 60 seconds with 100% static edge compatibility.

---

## Limitations

- **Vocabulary Constraint:** Relies on statistical token overlap; entirely unseen vocabulary outside the training corpus will not be recognized.
- **Language:** English only.
- **Static Knowledge Base:** Updated circulars and dates must be added to `lib/knowledgeBase.ts`.

---

## Future Enhancements

- Multilingual regional support (Kannada & Hindi).
- Voice recognition and synthesis via Web Speech API.
- Dense semantic embeddings using lightweight on-device Small Language Models (SLMs).
- Automated web scraper syncing new notifications from `dscasc.edu.in`.
- Student ERP integration for authenticated attendance checks.

---

## Academic Context

- **Program:** Bachelor of Computer Applications (BCA)
- **Semester:** III
- **Course:** Artificial Intelligence Practical & Theoretical Project
- **Institution:** Dayananda Sagar College of Arts, Science and Commerce
- **Location:** Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore – 560111
- **Motto:** *"Live the Dream"* — Late Sri R. Dayananda Sagar
