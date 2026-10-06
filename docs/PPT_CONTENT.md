# PRESENTATION SLIDES (PPT CONTENT)

**Project Title:**
DSCASC AI — An NLP-Based Automated Admission and Student Guidance Chatbot

**Institution:**
Dayananda Sagar College of Arts, Science and Commerce (DSCASC), Bangalore
Affiliated to Bangalore University

**Academic Context:**
BCA Semester III — Artificial Intelligence Presentation

---

## Slide 1: Title Slide

### DSCASC AI
**An NLP-Based Automated Admission and Student Guidance Chatbot**

- **Institution:** Dayananda Sagar College of Arts, Science and Commerce (DSCASC)
- **Affiliation:** Bangalore University
- **Program:** Bachelor of Computer Applications (BCA)
- **Subject:** Artificial Intelligence (BCA Sem III)
- **Engine:** Explainable Statistical NLP (TF-IDF + Cosine Similarity)

*Key Motto: "Live the Dream" — Late Sri R. Dayananda Sagar*

---

## Slide 2: Problem Statement & Motivation

### The Challenge in College Administration

- **Repetitive Query Burden:** Administrative staff and faculty receive hundreds of identical queries regarding BCA admissions, timetables, syllabus, exams, fees, and placements daily.
- **Communication Bottlenecks:** Long queues and telephonic delays during admission and semester exam periods.
- **Fragmented Information:** Timetables and circular PDFs are dispersed across multiple sub-pages on the official portal.
- **Keyword Search Failures:** Basic site search fails on student misspellings (*tymtable, placment*).

**Goal:** Create a 24/7 web-based NLP chatbot delivering instant, factual student guidance anchored to verified DSCASC records.

---

## Slide 3: Existing System vs. Proposed System

| Dimension | Existing System | DSCASC AI (Proposed) |
|---|---|---|
| **Channel** | Physical desk / phone / static website | Interactive 24/7 Web Chatbot |
| **Response Time** | Hours to days during peak admission | < 2 milliseconds instant resolution |
| **Search Intelligence** | Exact string matching | NLP normalization, n-grams & TF-IDF |
| **Typo Resilience** | Zero (*fails on misspelled queries*) | High (*auto-corrects common student slang*) |
| **Transparency** | None | Real-time AI Analysis mathematical panel |
| **Hallucination Risk** | High if using generic LLMs | **Zero** (*enforces strict 0.38 threshold*) |

---

## Slide 4: Objectives of the Project

- **1. Standalone Explainable NLP:** Develop an explainable NLP engine in TypeScript without external LLM API dependencies.
- **2. Verified Knowledge Base:** Curate 40+ official intents from `dscasc.edu.in` (courses, BCA details, verified 2024-25 placement statistics).
- **3. Noise & Slang Resilience:** Preprocess student informal typing, contractions, and typos.
- **4. Strict Fallback Guardrail:** Enforce a $\ge 0.38$ threshold to route unknown queries to structured guidance rather than guessing.
- **5. Academic Transparency:** Provide a live AI Analysis panel demonstrating vector similarity scores for viva examination.

---

## 5. System Architecture

```
[ Student Query (Web Interface) ]
                 ↓
[ Text Normalization (lower, strip punctuation, typo map) ]
                 ↓
[ Tokenization (unigrams + composite bigrams) ]
                 ↓
[ Stopwords Filter (domain-aware noise elimination) ]
                 ↓
[ TF-IDF Vectorization (Laplace smoothed weights) ]
                 ↓
[ Cosine Similarity (vector dot product vs corpus) ]
                 ↓
       [ Score ≥ 0.38? ]
          /           \
     YES /             \ NO
        v               v
 [ Matched Intent ]  [ Fallback Guidance ]
        \               /
         v             v
[ Rich UI Response Cards (Stats, Contacts, Links) ]
```

---

## Slide 6: NLP Methodology — Mathematical Foundations

### 1. Term Frequency (TF)
$$\text{TF}(t, d) = \frac{\text{count}(t, d)}{\text{total terms in } d}$$

### 2. Inverse Document Frequency (IDF) with Laplace Smoothing
$$\text{IDF}(t) = \ln\left(\frac{1 + N}{1 + \text{DF}(t)}\right) + 1$$

### 3. Cosine Similarity Geometric Metric
$$\text{Cosine Similarity}(\hat{\mathbf{q}}, \hat{\mathbf{d}}) = \hat{\mathbf{q}} \cdot \hat{\mathbf{d}} = \sum_{t} q_t \cdot d_t \quad (\in [0.0, 1.0])$$

- **L2 Euclidean Normalization:** Maps vectors onto a unit sphere, ensuring query length does not bias similarity.

---

## Slide 7: Intent Matching Example Walkthrough

### Example Input: *"whn is bca tymtable"*

1. **Normalization:** `"whn is bca tymtable"` &rarr; `"when is bca timetable"`
2. **Tokens & Bigrams:** `["bca", "timetable", "bca_timetable"]` (stopwords filtered)
3. **TF-IDF Transformation:** Non-zero weights assigned to `"bca"` and `"timetable"`.
4. **Cosine Similarity Evaluation:**
   - Candidate: `bca_timetable` &rarr; **Score: 0.884**
   - Candidate: `timetable` &rarr; Score: 0.452
   - Candidate: `syllabus` &rarr; Score: 0.180
5. **Threshold Verification:** $0.884 \ge 0.38$ &rarr; **Confident Match!**
6. **Output Delivered:** Link to 2026 Odd/Even semester PDFs + official timetable portal.

---

## Slide 8: Major Feature — Verified Placement Experience

### Sourced from Official DSCASC Placement Portal (`https://dscasc.edu.in/placement`)

- **Academic Year 2024-25 Published Data:**
  - **300** Companies Visited
  - **320** Total Offers Made
  - **300** Offers Accepted
  - **8 LPA** Highest Salary
  - **5.08 LPA** Average Salary
  - **2.16 LPA** Lowest Salary
- **Previous Year Reference (2023-24):** 14 LPA Highest Salary, 7.9 LPA Average
- **Placement Officer Contact:** Geetha H Raheja, Head - Placements & Corporate Relations (+91 9036968288)
- **Top Recruiters:** Infosys, Wipro, TCS, Deloitte, EY, KPMG, Capgemini, Accenture, ICICI Bank

---

## Slide 9: User Interface & User Experience

- **Design Philosophy:** "DSCASC + Modern AI"
- **Landing Page:** Hero banner, interactive quick questions, 7 curated topic cards, NLP architecture diagram.
- **Chat Interface:**
  - Real-time online status indicator
  - Right-aligned student chat bubbles
  - Left-aligned rich assistant response cards (StatisticsCard, ContactCard, LinkCard, InformationCard, SuggestionCard)
  - Unobtrusive, expandable "AI Analysis" panel
- **Responsive & Accessible:** Seamless experience on mobile, tablet, and desktop viewports.

---

## Slide 10: Testing, Verification & Results

- **Automated Test Suite (Vitest):**
  - **23/23 Tests Passed (100% Pass Rate)** in < 200 milliseconds.
  - Normalizer, Tokenizer, Stopwords, TF-IDF, Cosine Similarity, Confidence Threshold, and End-to-End Chat.
- **Hallucination Prevention:**
  - Queries like *"What's the weather tomorrow?"* produce 0.00 score and safely trigger fallback.
  - Fee queries provide verified administrative policy and phone numbers without inventing fee numbers.
- **Production Build:** Next.js static page pre-rendering succeeds with 0 TypeScript/lint warnings.

---

## Slide 11: Future Enhancements

- **Multilingual Support:** Adding Kannada and Hindi translation for regional vernacular accessibility.
- **Voice Interface:** Web Speech API integration for speech-to-text queries and spoken responses.
- **Dense Embeddings + SLM:** Hybrid statistical NLP + on-device Small Language Models.
- **College ERP Integration:** Authenticated dashboard for personalized attendance and examination marks.
- **Dynamic RAG Scraping:** Automated indexing of new circular PDFs from `dscasc.edu.in`.

---

## Slide 12: Conclusion & Viva Summary

- **100% Explainable:** Every response traces directly to normalized tokens, TF-IDF weights, and vector dot products.
- **Factual & Safe:** Grounded in verified DSCASC public portal records with active source links.
- **Production Ready:** Zero external API latency, zero token costs, and 100% responsive design.
- **Academic Milestone:** Successfully demonstrates artificial intelligence fundamentals for BCA Semester III.

*Live Demo & Technical Q&A Ready!*
