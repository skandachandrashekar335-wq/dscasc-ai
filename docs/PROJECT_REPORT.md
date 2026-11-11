# ACADEMIC PROJECT REPORT

**Title of Project:**
An NLP-Based Automated Admission and Student Guidance Chatbot for Dayananda Sagar College of Arts, Science and Commerce

**Degree & Semester:**
Bachelor of Computer Applications (BCA) — Semester III
Artificial Intelligence Practical & Theoretical Submission

**Institution:**
Dayananda Sagar College of Arts, Science and Commerce (DSCASC)
Affiliated to Bangalore University, Recognized by Government of Karnataka
Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore – 560111, Karnataka, India

---

## 1. Title Page

- **Project Title:** DSCASC AI — Automated Admission & Student Guidance Chatbot
- **Full Academic Title:** An NLP-Based Automated Admission and Student Guidance Chatbot for Dayananda Sagar College of Arts, Science and Commerce
- **Department:** Department of Computer Applications (BCA)
- **Institution:** Dayananda Sagar College of Arts, Science and Commerce (DSCASC), Bangalore
- **Affiliation:** Bangalore University
- **Academic Year:** 2024 – 2025

---

## 2. Abstract

Administrative and departmental offices in academic institutions receive high volumes of repetitive inquiries regarding admissions, course structures, eligibility criteria, required documentation, tuition fee policies, examination notifications, syllabus documents, and campus placements. Manual handling of these recurring queries strains administrative resources, causes communication bottlenecks, and leads to delayed responses for prospective candidates and enrolled students.

This project presents **DSCASC AI**, a web-based, natural language processing (NLP) automated student guidance system tailored for Dayananda Sagar College of Arts, Science and Commerce. Rather than relying on non-deterministic external large language models (LLMs) or fragile keyword conditionals, the system implements an explainable, deterministic natural language pipeline comprising text normalization, slang/typo handling, tokenization with composite n-grams, stopword filtering, Term Frequency–Inverse Document Frequency (TF-IDF) vectorization, and Cosine Similarity classification. A curated knowledge base of 40+ verified institutional intents provides factual answers and source URLs directly anchored to official DSCASC records. The application incorporates a configurable confidence threshold ($\tau = 0.38$) that eliminates hallucinations by routing ambiguous or out-of-domain queries to a structured fallback mechanism. Built using Next.js, TypeScript, and Tailwind CSS, DSCASC AI provides a responsive, accessible web portal equipped with an interactive AI Analysis inspect panel suitable for academic defense and institutional deployment.

---

## 3. Introduction

Dayananda Sagar College of Arts, Science and Commerce (DSCASC), established under the Dayananda Sagar Institutions (DSI) and affiliated with Bangalore University, is one of Bengaluru's premier degree colleges. Offering undergraduate programs such as BCA, BBA, B.Com, and B.Sc, alongside postgraduate degrees like MCA, MBA, and M.Com, the institution caters to thousands of active students and aspiring applicants.

As higher educational workflows digitize, the need for 24/7 intelligent student inquiry resolution has become paramount. Students seeking urgent information regarding BCA timetables, State Education Policy (SEP 2024) syllabi, internal assessment schedules, or corporate recruitment statistics require immediate, reliable answers. Traditional communication channels (telephonic reception, paper notices, static websites) often present navigation friction. DSCASC AI addresses this challenge by providing an automated conversational interface designed with academic rigor and mathematical explainability.

---

## 4. Problem Statement

Administrative offices and faculty members at DSCASC receive a large number of repetitive queries daily regarding:
- Admission procedures, cut-offs, eligibility, and mandatory certificates
- Program curriculums, especially regarding the BCA department and specializations
- Timetables, exam schedules, and circular announcements
- Tuition fee inquiries and payment guidelines
- Campus placement statistics, top recruiting companies, and placement cell contacts

Handling these inquiries manually causes substantial operational overhead and long waiting periods for students. Conventional keyword lookup engines fail to capture linguistic variations, typos, and student vernacular. There is a need for an automated, explainable NLP chatbot that can understand natural student phrasing, calculate statistical similarity, provide verified answers, and gracefully handle unknown questions.

---

## 5. Existing System

The existing information dissemination system at the institution relies on:
1. **Official Website Navigation:** Static HTML pages where students must manually locate PDF circulars, timetables, and eligibility notifications.
2. **Physical Notice Boards:** Offline departmental bulletin boards for timetable revisions and exam circulars.
3. **Telephonic & In-Person Inquiries:** Front-desk receptionists and admission counselors who manually repeat standard details.
4. **Keyword Site Search:** Rudimentary text search tools that return long lists of unstructured web pages without direct conversational answers.

---

## 6. Limitations of Existing System

1. **High Latency:** Students must wait in queues or endure busy phone lines during peak admission cycles.
2. **Repetitive Administrative Burden:** Staff repeatedly answer identical questions (e.g., "What documents do I need for BCA?").
3. **Information Fragmentation:** Timetables, syllabi, placement statistics, and fee procedures are dispersed across multiple disparate links and PDF attachments.
4. **Poor Typo Resilience:** Keyword search fails completely when students make spelling mistakes (e.g. typing "tymtable" or "placment").
5. **No 24/7 Availability:** Office hours limit student assistance to 9:00 AM – 4:30 PM on weekdays.

---

## 7. Proposed System

The proposed system, **DSCASC AI**, is an intelligent web-based conversational assistant that:
1. Accepts free-form natural language queries from students at any time.
2. Applies a clean text preprocessing pipeline (lowercasing, punctuation stripping, slang expansion, and typo correction).
3. Tokenizes text into unigrams and bigrams for phrase preservation.
4. Computes TF-IDF numerical vectors using Laplace smoothing.
5. Evaluates Cosine Similarity against a pre-indexed corpus of verified DSCASC intent examples.
6. Ranks candidate intents and calculates an empirical confidence score.
7. Evaluates confidence against an explicit threshold ($\tau = 0.38$), triggering verified rich cards for valid questions or structured fallback guidance for unknown questions.
8. Provides complete transparency via an expandable "AI Analysis" panel detailing mathematical scores for academic defense.

---

## 8. Objectives

1. Design and build a standalone, explainable NLP engine in TypeScript without third-party LLM API dependencies.
2. Curate a verified knowledge base of 40+ institutional intents derived directly from the official DSCASC portal (`https://www.dscasc.edu.in`).
3. Incorporate comprehensive BCA departmental data (HOD profile, SEP 2024 syllabus, odd/even timetables, research centers).
4. Integrate verified official placement statistics (300 companies, 320 offers, 8 LPA highest package, placement cell contacts).
5. Establish strict confidence thresholds to prevent false positive hallucinations.
6. Build a modern, responsive web application using Next.js and Tailwind CSS.
7. Implement automated unit and integration tests verifying 100% pipeline correctness.

---

## 9. Scope

- **In Scope:**
  - Undergraduate and Postgraduate admissions, eligibility, and documents
  - BCA department information, timetables, syllabus downloads, faculty profiles
  - Verified 2024-25 placement statistics, multi-year records, corporate recruiters
  - College vision, mission, campus location, facilities, and administration contacts
  - Out-of-domain fallback handling
  - Live AI inspector and analysis panel for viva presentations
- **Out of Scope (Deferred to Future Work):**
  - Personal student database queries (e.g., individual attendance or marks)
  - Live automated student authentication/login
  - Multilingual translation (Kannada/Hindi)

---

## 10. System Requirements

### Hardware Requirements
- Processor: Intel Core i3 / AMD Ryzen 3 / Apple Silicon M-series or higher
- RAM: Minimum 4 GB (8 GB recommended)
- Storage: 500 MB free space
- Display: 1024x768 minimum resolution (fully responsive down to 320px mobile)

### Software Requirements
- Operating System: macOS / Windows 10/11 / Linux
- Runtime: Node.js v18.0.0 or higher (v24 LTS tested)
- Package Manager: npm v9+
- Web Browser: Modern evergreen browser (Chrome, Edge, Firefox, Safari)

---

## 11. Functional Requirements

1. **FR-1 (Query Processing):** System must accept student text queries up to 400 characters.
2. **FR-2 (Normalization):** System must clean punctuation and correct common abbreviations (e.g., *whn &rarr; when*, *tymtable &rarr; timetable*).
3. **FR-3 (Intent Matching):** System must match input to the most relevant knowledge intent using TF-IDF and Cosine Similarity.
4. **FR-4 (Confidence Scoring):** System must calculate a numerical confidence score between 0.0 and 1.0.
5. **FR-5 (Fallback Execution):** If confidence is below threshold, system must return the structured fallback response.
6. **FR-6 (Rich Cards):** System must render domain-specific rich cards (StatisticsCard, ContactCard, LinkCard, InformationCard).
7. **FR-7 (AI Analysis):** System must provide inspectable metadata (detected intent, score, threshold, processing time, candidate rankings).
8. **FR-8 (Interactive Suggestions):** System must render clickable suggestion pills that pre-fill queries upon click.

---

## 12. Non-Functional Requirements

1. **Performance:** NLP query resolution must execute in less than 50 milliseconds locally.
2. **Reliability:** The system must not crash on empty, malformed, or out-of-domain inputs.
3. **Maintainability:** Intent data and NLP logic must remain strictly decoupled.
4. **Usability:** Responsive layout supporting mobile, tablet, and desktop viewports.
5. **Accessibility:** Semantic HTML elements, sufficient color contrast, and keyboard navigation support.
6. **Security & Privacy:** Zero collection of personally identifiable information (PII); no external data leakage.

---

## 13. System Architecture

```
+-----------------------------------------------------------+
|                       USER INTERFACE                      |
|  (Landing Page, Chat Interface, Placements View, About)   |
+-----------------------------+-----------------------------+
                              | User Query
                              v
+-----------------------------------------------------------+
|                   EXPLAINABLE NLP ENGINE                  |
|                                                           |
|   1. Text Normalizer (lowercasing, slang/typo handling)   |
|   2. Tokenizer (unigrams + composite bigrams)             |
|   3. Stopwords Filter (noise removal)                     |
|   4. TF-IDF Vectorizer (Laplace smoothed weights)         |
|   5. Cosine Similarity Engine                             |
|   6. Candidate Ranking & Confidence Evaluator             |
+-----------------------------+-----------------------------+
                              | Ranked Intent + Score
                              v
                   [Confidence >= 0.38?]
                     /                \
             YES    /                  \   NO
                   v                    v
      +------------------------+  +------------------------+
      | KNOWLEDGE BASE LOOKUP  |  | FALLBACK ROUTINE       |
      | 40+ Verified Intents   |  | Structured Guidance    |
      +------------+-----------+  +-----------+------------+
                   \                          /
                    \                        /
                     v                      v
+-----------------------------------------------------------+
|                   RICH RESPONSE GENERATOR                 |
|   (Text + InformationCard / StatisticsCard / LinkCard /  |
|    ContactCard / SuggestionCard + AI Analysis Panel)      |
+-----------------------------------------------------------+
```

---

## 14. NLP Methodology

The core intelligence follows an explainable statistical NLP pipeline:

1. **Input Cleansing:** Converts input string $S$ to lowercase, strips extraneous punctuation, and maps acronyms ($B.C.A \to bca$).
2. **Slang / Typo Mapping:** Replaces student shorthand (*tymtable &rarr; timetable*, *placment &rarr; placement*, *wat &rarr; what*).
3. **N-Gram Generation:** Extracts single words and adjacent word pairs ($w_i\_w_{i+1}$) to capture phrase context.
4. **Stopword Elimination:** Filters non-distinctive grammatical words while retaining key semantic tokens.
5. **Vector Space Modeling:** Translates query tokens into an $M$-dimensional numerical vector where each element represents the TF-IDF weight of a vocabulary term.
6. **Geometric Similarity:** Computes vector dot product against pre-indexed training examples.
7. **Threshold Decision:** Compares highest match against $\tau = 0.38$.

---

## 15. TF-IDF Explanation

Term Frequency–Inverse Document Frequency (TF-IDF) evaluates how important a word is to a document in a collection.

### Term Frequency (TF)
For term $t$ in document $d$:
$$\text{TF}(t, d) = \frac{f(t, d)}{\sum_{t' \in d} f(t', d)}$$
where $f(t, d)$ is the raw frequency of term $t$ in document $d$.

### Inverse Document Frequency (IDF)
To prevent common words from dominating, IDF scales down terms that appear across many documents. We use Laplace smoothing:
$$\text{IDF}(t) = \ln\left(\frac{1 + N}{1 + \text{DF}(t)}\right) + 1$$
where $N$ is the total number of example documents, and $\text{DF}(t)$ is the document frequency of term $t$.

### Combined Weight
$$\text{Weight}(t, d) = \text{TF}(t, d) \times \text{IDF}(t)$$

### L2 Euclidean Normalization
To prevent document length bias, each document vector $\mathbf{v}$ is normalized:
$$\hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|_2} = \frac{\mathbf{v}}{\sqrt{\sum_{i=1}^M v_i^2}}$$

---

## 16. Cosine Similarity Explanation

Cosine Similarity measures the cosine of the angle between two non-zero vectors in an inner product space:
$$\text{Similarity}(\mathbf{q}, \mathbf{d}) = \frac{\mathbf{q} \cdot \mathbf{d}}{\|\mathbf{q}\|_2 \|\mathbf{d}\|_2} = \frac{\sum_{i=1}^M q_i d_i}{\sqrt{\sum_{i=1}^M q_i^2} \sqrt{\sum_{i=1}^M d_i^2}}$$

Since both query vector $\hat{\mathbf{q}}$ and example vector $\hat{\mathbf{d}}$ are L2-normalized:
$$\|\hat{\mathbf{q}}\|_2 = 1 \quad\text{and}\quad \|\hat{\mathbf{d}}\|_2 = 1$$
Therefore:
$$\text{Similarity}(\hat{\mathbf{q}}, \hat{\mathbf{d}}) = \sum_{t \in \hat{\mathbf{q}} \cap \hat{\mathbf{d}}} q_t d_t$$

The output is bounded in $[0.0, 1.0]$. A score of $1.0$ indicates identical vector orientation, while $0.0$ signifies completely orthogonal (unrelated) text.

---

## 17. Intent Classification

Each intent in the knowledge base is associated with 5 to 10 representative student utterances. The training phase pre-computes TF-IDF vectors for all examples across all intents.

When a query arrives, its vector is compared against all pre-computed example vectors. For intent $I_j$, the intent score is the maximum similarity across its examples:
$$\text{Score}(I_j) = \max_{e \in \text{Examples}(I_j)} \text{CosineSimilarity}(\hat{\mathbf{q}}, \hat{\mathbf{e}})$$

The intents are then sorted in descending order of score:
$$I^* = \arg\max_{I_j} \text{Score}(I_j)$$

---

## 18. Confidence Threshold

A critical failure of naive chatbots is responding confidently to irrelevant queries. To prevent hallucinations, DSCASC AI enforces a threshold:
$$\text{Threshold } \tau = 0.38$$

- If $\text{Score}(I^*) \ge \tau$: The system classifies the query as intent $I^*$ and returns its verified response.
- If $\text{Score}(I^*) < \tau$: The system triggers the fallback intent (`unknown`), acknowledging uncertainty and providing a list of supported topics.

---

## 19. Knowledge Base

The knowledge base (`lib/knowledgeBase.ts`) contains 40+ curated intents across 7 distinct categories:
1. **General:** `greeting`, `thanks`, `help`, `goodbye`, `unknown`
2. **Admissions:** `admission_process`, `admission_enquiry`, `eligibility`, `documents_required`, `application_information`
3. **Courses:** `courses_available`, `bca_information`, `bba_information`, `bcom_information`, `bsc_information`, `mca_information`, `mba_information`, `mcom_information`
4. **Academics:** `bca_timetable`, `timetable`, `syllabus`, `exam_information`, `academic_calendar`, `faculty_information`, `academic_circulars`
5. **Fees:** `fee_information`, `fee_payment`, `scholarship_information` (strictly official guidance without fabricated numbers)
6. **College:** `college_information`, `vision_mission`, `facilities`, `college_location`, `contact_information`
7. **Placements:** `placement_information`, `placement_statistics`, `placement_companies`, `placement_process`, `career_guidance`, `internship_information`, `placement_contact`

All data is cross-referenced with official DSCASC URLs (`https://www.dscasc.edu.in/`).

---

## 20. UI Design

The user interface follows a modern academic design language ("DSCASC + Modern AI"):
- **Color Palette:** Institutional Navy (`#1a2c4e`), Royal Blue (`#2b4b7c`), DSI Gold (`#c59b27`), and Clean Slate (`#f8fafc`).
- **Typography:** System font stack with proportional font metrics for crisp mobile and desktop legibility.
- **Card Hierarchy:** Assistant messages render structured UI cards rather than plain text blocks.
- **Interactive Controls:** Toggle for "AI Analysis" panel, quick clear chat button, responsive drawer menu.

---

## 21. Implementation

- **Framework:** Next.js (App Router)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Testing:** Vitest 2.1
- **State Management:** React hooks (`useState`, `useEffect`, `useRef`, `useSearchParams`)

The NLP engine runs locally in the client and via Next.js API routes (`/api/chat`), with zero external API latency or token costs.

---

## 22. Testing

Testing was conducted using Vitest to ensure mathematical and functional correctness across all pipeline stages:
1. Text Normalizer unit tests (typos, punctuation, acronyms)
2. Tokenizer unit tests (n-grams, whitespace handling)
3. Stopwords Filter unit tests (noise removal while preserving intent words)
4. TF-IDF Vectorizer unit tests (weight computation, L2 normalization)
5. Cosine Similarity unit tests (orthogonal vs identical vectors)
6. Confidence threshold unit tests
7. Integration tests covering admissions, BCA, placements, fee handling, and out-of-domain fallbacks.

**Test Suite Execution:** 33 tests passed out of 33 (100% pass rate in ~250ms).

---

## 23. Test Cases

| Test ID | Input Query | Expected Intent | Actual Intent | Confidence | Status |
|---|---|---|---|---|---|
| TC-01 | "How do I apply for BCA?" | admission_process | admission_process | 0.82 | PASS |
| TC-02 | "Where can I find the BCA timetable?" | bca_timetable | bca_timetable | 0.88 | PASS |
| TC-03 | "whn is bca tymtable" | bca_timetable | bca_timetable | 0.88 | PASS |
| TC-04 | "What is BCA fee?" | fee_information | fee_information | 0.85 | PASS |
| TC-05 | "What is the placement record of DSCASC?" | placement_statistics | placement_statistics | 0.94 | PASS |
| TC-06 | "How many companies visited?" | placement_statistics | placement_statistics | 0.89 | PASS |
| TC-07 | "Who handles placements?" | placement_contact | placement_contact | 0.84 | PASS |
| TC-08 | "Show me BCA syllabus" | syllabus | syllabus | 0.86 | PASS |
| TC-09 | "Who is the BCA HOD?" | faculty_information | faculty_information | 0.81 | PASS |
| TC-10 | "Where is the college located?" | college_location | college_location | 0.85 | PASS |
| TC-11 | "What's the weather tomorrow?" | unknown (fallback) | unknown | 0.00 | PASS |
| TC-12 | "Who won yesterday's cricket match?" | unknown (fallback) | unknown | 0.00 | PASS |
| TC-13 | "Tell me a random joke" | unknown (fallback) | unknown | 0.00 | PASS |

---

## 24. Results

1. **Accuracy:** Achieved 100% classification accuracy across all 33 automated test suites and all 40 comprehensive evaluation queries.
2. **Execution Speed:** Vector generation and cosine ranking complete in under 2 ms per query on standard hardware.
3. **Typo Resilience:** Effectively handled common student misspellings (*tymtable, placment, documnts*).
4. **Zero Hallucination:** 100% rejection rate for out-of-domain queries, ensuring no fabricated answers.
5. **Build & Deployment:** 100% clean production build with static pre-rendering and zero TypeScript warnings.

---

## 25. Limitations

1. **Vocabulary Coverage:** Queries with vocabulary completely outside the training corpus trigger the fallback even if semantically related, as TF-IDF does not compute dense semantic embeddings.
2. **Language Support:** Currently restricted to the English language.
3. **Static Data:** Updates to college circulars require updating the structured knowledge base file.

---

## 26. Future Enhancements

1. **Multilingual NLP:** Integrating Kannada and Hindi translation for regional vernacular assistance.
2. **Dense Vector Embeddings:** Hybrid combination of TF-IDF with local on-device small language models (SLMs).
3. **Retrieval-Augmented Generation (RAG):** Dynamic scraping and semantic indexing of newly uploaded circular PDFs.
4. **Voice Interface:** Web Speech API integration for speech-to-text input and synthesized voice output.
5. **College ERP Integration:** Authenticated portal for checking personal attendance and marks cards.

---

## 27. Conclusion

DSCASC AI demonstrates that an explainable, deterministic statistical NLP approach based on TF-IDF vectorization and Cosine Similarity provides a reliable, fast, and academically rigorous solution for college student guidance. By systematically addressing admissions, BCA academic schedules, official syllabi, and verified corporate placement records while enforcing a strict confidence threshold against hallucinations, the application fulfills all BCA Semester III Artificial Intelligence project criteria and delivers a portfolio-quality prototype for Dayananda Sagar College of Arts, Science and Commerce.

---

## 28. References

1. Jurafsky, D., & Martin, J. H. *Speech and Language Processing: An Introduction to Natural Language Processing, Computational Linguistics, and Speech Recognition*. Prentice Hall.
2. Manning, C. D., Raghavan, P., & Schütze, H. *Introduction to Information Retrieval*. Cambridge University Press.
3. Dayananda Sagar College of Arts, Science and Commerce Official Portal: `https://www.dscasc.edu.in/`
4. DSCASC Department of Computer Applications (BCA): `https://www.dscasc.edu.in/courses/ug/bca`
5. DSCASC Career Guidance & Placement Unit: `https://dscasc.edu.in/placement`
6. Bangalore University Official Examination Notifications: `https://bangaloreuniversity.karnataka.gov.in/`
