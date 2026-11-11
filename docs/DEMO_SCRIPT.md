# LIVE DEMONSTRATION SCRIPT (3–5 MINUTES)

**Project Title:** DSCASC AI — Automated Admission & Student Guidance Chatbot  
**Audience:** Faculty Examiner / Viva Committee / Academic Evaluation Panel  
**Target Duration:** 3 to 5 Minutes  

---

### Phase 1: Opening & Problem Context (0:00 – 0:45)

**Presenter Actions:**
- Open browser to the landing page (`http://localhost:3000` or deployed URL).
- Present cleanly with confidence.

**Spoken Script:**
> *"Respected external examiner and faculty members, good morning.*
>
> *Today I present **DSCASC AI**, an NLP-based automated student guidance chatbot developed specifically for our institution, Dayananda Sagar College of Arts, Science and Commerce.*
>
> *Administrative and departmental offices receive hundreds of repetitive questions every week regarding admissions, BCA timetables, syllabi, fee structures, examinations, and placements. Our objective was to build an intelligent, transparent web chatbot that understands natural student language and answers instantly using verified official DSCASC data, completely grounded in explainable statistical NLP without relying on non-deterministic external LLMs."*

---

### Phase 2: Landing Page Walkthrough (0:45 – 1:15)

**Presenter Actions:**
- Scroll smoothly through the Landing Page.
- Point to the institutional badge and the 7 curated topic cards.

**Spoken Script:**
> *"Here on our landing page, students are greeted with our 7 core knowledge domains: Admissions, Courses, Academics, BCA Department, Fees, Placements, and Contact details.*
>
> *At the bottom, we provide a transparent overview of our 4-stage mathematical pipeline: Normalization, TF-IDF Vectorization, Cosine Similarity, and Thresholded Fallback.*
>
> *Let us now click **Start Chatting** to test the conversational interface."*

---

### Phase 3: Admission & Course Guidance (1:15 – 2:00)

**Presenter Actions:**
- Click "Start Chatting" (or navigate to `/chat`).
- Show the welcome card and initial suggested questions.
- Type: `How do I apply for BCA?` and press Enter.

**Spoken Script:**
> *"Notice the assistant immediately loads with an online status indicator.*
>
> *When we ask: **'How do I apply for BCA?'**, our NLP engine tokenizes the query and matches the `admission_process` intent in under 2 milliseconds.*
>
> *The response delivers step-by-step admission guidelines, official links to the online application form on `apply.dayanandasagar.edu`, and a verified link to download the college prospectus."*

---

### Phase 4: Typo Handling & BCA Timetable (2:00 – 2:40)

**Presenter Actions:**
- Type deliberately informal/misspelled query: `whn is bca tymtable` and send.

**Spoken Script:**
> *"Students rarely type formal English. They often use abbreviations and typos like 'whn is bca tymtable'.*
>
> *Watch how our text normalizer automatically resolves 'whn' to 'when' and 'tymtable' to 'timetable'.*
>
> *The cosine similarity engine identifies the `bca_timetable` intent with 88% confidence and returns clickable download links to the official 2026 Odd and Even semester timetable PDFs hosted on the college portal."*

---

### Phase 5: Verified Placement Statistics (2:40 – 3:30)

**Presenter Actions:**
- Type: `What is the placement record of DSCASC?` and send.
- Highlight the `StatisticsCard` rendered on screen.

**Spoken Script:**
> *"Placements are a major concern for graduating students. When we ask about the placement record, the chatbot renders a dedicated **Placement Snapshot Card**.*
>
> *Every single figure here is strictly verified from the official DSCASC placement portal for the 2024-25 academic year:*
> - *300 Companies Visited*
> - *320 Offers Made*
> - *300 Offers Accepted*
> - *8 LPA Highest Salary*
> - *5.08 LPA Average Salary*
>
> *Crucially, our system does not invent figures or make unverified placement guarantees. It also provides the official contact of our Placement Head, Ms. Geetha H Raheja."*

---

### Phase 6: Demonstrating Academic AI Transparency (3:30 – 4:10)

**Presenter Actions:**
- Click the **"AI Analysis"** toggle button in the top navigation bar.
- Expand the AI Analysis card under the latest response.

**Spoken Script:**
> *"For academic evaluation and viva defense, we built an integrated **AI Analysis Inspector**.*
>
> *By toggling this panel, examiners can inspect the exact mathematical operation:*
> - *Detected Intent: `placement_statistics`*
> - *Calculated Confidence: 87.4%*
> - *Configured Threshold: 38%*
> - *Execution Latency: 0.2 milliseconds*
> - *Alternative Candidate Scores: `placement_process` at 27.7%, `placement_contact` at 26.4%*
> - *Exact tokenized n-grams used in vector dot product calculation.*
>
> *This guarantees complete transparency for academic viva verification."*

---

### Phase 7: Out-of-Domain Question & Fallback (4:10 – 4:45)

**Presenter Actions:**
- Type an out-of-domain question: `What is the weather tomorrow?` and send.

**Spoken Script:**
> *"A frequent flaw in naive chatbots is answering irrelevant questions with hallucinations.*
>
> *When a student asks an out-of-domain question like **'What is the weather tomorrow?'**, the extracted terms have zero overlap with our institutional vocabulary.*
>
> *The similarity evaluates to 0.00, which falls below our 38% threshold.*
>
> *Instead of hallucinating, the chatbot executes the structured Fallback Routine, politely explaining its scope and presenting suggested questions about admissions, BCA, timetables, and placements."*

---

### Phase 8: Conclusion & Viva Handover (4:45 – 5:00)

**Presenter Actions:**
- Click "How It Works" in the top bar to show the interactive mathematical inspector and test suite status (33/33 tests passed).

**Spoken Script:**
> *"In conclusion, DSCASC AI demonstrates that explainable, deterministic statistical NLP provides a reliable, fast, zero-cost, and hallucination-free solution for collegiate student guidance.*
>
> *All 33 automated unit and integration tests pass, and the application is production-ready.*
>
> *Thank you, and I am now ready for your viva questions."*
