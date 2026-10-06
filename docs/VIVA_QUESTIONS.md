# VIVA VOCE PREPARATION GUIDE (25 QUESTIONS & ANSWERS)

**Project Title:** DSCASC AI — Automated Admission & Student Guidance Chatbot  
**Program:** Bachelor of Computer Applications (BCA) — Semester III  
**Subject:** Artificial Intelligence (AI)  
**Institution:** Dayananda Sagar College of Arts, Science and Commerce (Bangalore University)  

---

### Q1: What is Natural Language Processing (NLP)?
**Answer:**  
Natural Language Processing (NLP) is a subfield of Artificial Intelligence, computer science, and linguistics concerned with the interactions between computers and human language. It enables computers to process, understand, interpret, and generate human language in a meaningful and statistically sound manner. In our project, NLP is used to convert unstructured student queries into structured numerical vectors for intent classification.

---

### Q2: What is Intent Classification?
**Answer:**  
Intent classification is the task of automatically categorizing a user's natural language utterance into one of several predefined classes (intents) that represent the user's communicative purpose. For instance, when a student asks *"Where can I find the BCA timetable?"*, the intent classification engine categorizes the query under the `bca_timetable` intent.

---

### Q3: Why did you use TF-IDF instead of simple keyword matching?
**Answer:**  
Simple keyword matching (`if "fees" in text`) fails whenever a sentence contains complex structures, synonyms, or multiple keywords (e.g., *"Are fees required for taking timetable circulars?"*). TF-IDF (Term Frequency–Inverse Document Frequency) provides statistical weighting:
1. It rewards terms that appear frequently in a specific query (Term Frequency).
2. It penalizes terms that appear ubiquitously across the entire corpus (Inverse Document Frequency).  
This creates a mathematical vector representing the distinct semantic fingerprint of the sentence rather than relying on brittle boolean checks.

---

### Q4: What is Cosine Similarity and how is it calculated?
**Answer:**  
Cosine similarity measures the cosine of the angle between two multi-dimensional vectors in an inner product space:
$$\text{Cosine Similarity}(\mathbf{q}, \mathbf{d}) = \frac{\mathbf{q} \cdot \mathbf{d}}{\|\mathbf{q}\|_2 \|\mathbf{d}\|_2}$$
Because our TF-IDF vectors are pre-normalized using the Euclidean L2 norm ($\|\mathbf{q}\|_2 = 1$), the denominator equals 1, and the cosine similarity simplifies to the vector dot product. The result ranges from $0.0$ (completely orthogonal/unrelated) to $1.0$ (identical direction).

---

### Q5: How does the chatbot process a query from start to finish?
**Answer:**  
The query passes through an 8-stage pipeline:
1. **Normalization:** Lowercases text, cleans punctuation, and maps slang/typos (*tymtable &rarr; timetable*).
2. **Tokenization:** Breaks text into individual tokens and generates composite bigrams (*bca_timetable*).
3. **Stopword Filtering:** Removes non-informative grammatical noise (*a, the, is*).
4. **TF-IDF Vectorization:** Calculates term weights with Laplace smoothing.
5. **Cosine Similarity:** Computes dot products against pre-indexed intent example vectors.
6. **Intent Ranking:** Sorts candidate intents by similarity score.
7. **Threshold Evaluation:** Validates whether the top score satisfies $\tau \ge 0.38$.
8. **Response Delivery:** Returns verified rich cards (or fallback if below threshold).

---

### Q6: What happens if a query is completely unknown or out-of-domain?
**Answer:**  
If a student asks an unrelated question like *"What's the weather tomorrow?"* or *"Who won the cricket match?"*, the query words do not match the institutional vocabulary. Consequently, the cosine similarity score is 0.00 (or well below our threshold of 0.38). The system immediately activates the **Fallback Intent** (`unknown`), politely explaining that it cannot answer out-of-domain questions and suggesting valid DSCASC topics (admissions, BCA, placements, exams).

---

### Q7: How is the confidence score calculated?
**Answer:**  
The confidence score is derived directly from the maximum cosine similarity achieved between the query's TF-IDF vector and all training examples associated with the top-ranked intent:
$$\text{Confidence} = \max_{e \in \text{Examples}(I^*)} \text{CosineSimilarity}(\hat{\mathbf{q}}, \hat{\mathbf{e}})$$
This score is bounded between $0.00$ and $1.00$ (displayed as $0\%$ to $100\%$). It is an empirical mathematical result, never a hardcoded number.

---

### Q8: Why did you not use an external LLM API like ChatGPT or Gemini?
**Answer:**  
We deliberately avoided third-party LLM APIs for four crucial academic and engineering reasons:
1. **Academic Explainability:** In an AI viva, every step must be mathematically demonstrable (TF-IDF, matrices, dot products), whereas LLMs operate as opaque black boxes.
2. **Zero Hallucination Guarantee:** LLMs frequently invent fake dates, fees, and placement numbers. Our system strictly retrieves verified DSCASC data.
3. **Zero Dependency & Latency:** External APIs require internet tokens, API keys, and incur latency ($1000\text{ ms}+$ vs $< 2\text{ ms}$ for our local engine).
4. **Data Privacy:** Student queries are processed locally and never transmitted to external third-party servers.

---

### Q9: What is the difference between statistical NLP and an LLM?
**Answer:**  
- **Statistical NLP:** Employs formal mathematical algorithms (tokenization, frequency distributions, vector space models, cosine metrics) to analyze and categorize text. It is transparent, deterministic, and lightweight.
- **Large Language Models (LLMs):** Massive multi-billion-parameter neural networks trained on broad internet corpora that predict next tokens probabilistically. They generate creative text but are prone to hallucination, high computational requirements, and lack deterministic explainability.

---

### Q10: What is the Knowledge Base and how is it structured?
**Answer:**  
The knowledge base (`lib/knowledgeBase.ts`) is a modular TypeScript repository of 40+ curated intents. Each intent contains:
- `id` (unique identifier, e.g. `placement_statistics`)
- `category` (`admissions`, `courses`, `academics`, `fees`, `college`, `placements`, `general`)
- `examples` (5–10 representative student utterances)
- `response` (structured text, verified source URLs, and rich card payloads like stats or contacts)

---

### Q11: What are the primary limitations of your project?
**Answer:**  
1. **Vocabulary Limitation:** If a student asks a valid question using vocabulary completely absent from our examples, TF-IDF cannot compute semantic proximity without dense embeddings.
2. **Language:** Currently restricted to the English language.
3. **Static Corpus:** When college dates change, the knowledge base must be updated manually.

---

### Q12: How can this project be improved in the future?
**Answer:**  
1. **Multilingual Support:** Integrating Kannada and Hindi translation for regional students.
2. **Hybrid Embeddings:** Combining TF-IDF with lightweight on-device Small Language Model (SLM) embeddings.
3. **Automated RAG:** Automatically scraping and vectorizing newly posted notification PDFs from `dscasc.edu.in`.
4. **Voice Interaction:** Adding speech-to-text input via the Web Speech API.

---

### Q13: Where is AI used in your project?
**Answer:**  
AI is used in:
1. **Natural Language Preprocessing:** Normalizing noisy text and modeling composite bigrams.
2. **Vector Space Representation:** Projecting discrete text into an $M$-dimensional vector space via TF-IDF.
3. **Similarity Classification:** Pattern classification in high-dimensional vector space using the Cosine angle metric.
4. **Confidence Decision Logic:** Autonomous thresholding that differentiates valid knowledge queries from noise.

---

### Q14: How does placement query handling work?
**Answer:**  
Placements are a flagship feature. The system differentiates between:
- `placement_statistics`: Returns verified 2024-25 figures (300 companies, 320 offers, 8 LPA highest, 5.08 LPA average).
- `placement_companies`: Lists recruiters (Infosys, Deloitte, TCS, EY, KPMG).
- `placement_process`: Outlines training, aptitude, coding tests, and interviews.
- `placement_contact`: Provides Placement Head details (Geetha H Raheja, +91 9036968288).
- `career_guidance` & `internship_information`: Curriculums and project policies.

---

### Q15: What happens when official college information changes?
**Answer:**  
Because content is strictly decoupled from the NLP logic, updating official information simply requires editing `lib/knowledgeBase.ts`. The NLP vectorizer automatically recalculates vocabulary frequencies and rebuilds vectors on initialization without modifying any application code.

---

### Q16: What is Laplace Smoothing in TF-IDF?
**Answer:**  
Laplace smoothing is a technique used in Inverse Document Frequency to prevent division by zero and extreme values:
$$\text{IDF}(t) = \ln\left(\frac{1 + N}{1 + \text{DF}(t)}\right) + 1$$
Adding $1$ to the numerator and denominator guarantees that terms appearing in all documents do not evaluate to zero and unseen terms do not crash the logarithm.

---

### Q17: Why did you include bigrams in the tokenizer?
**Answer:**  
Single words (unigrams) lose contextual order. For example, *"highest"* and *"package"* individually could refer to anything, but the bigram *"highest_package"* explicitly indicates recruitment compensation. Bigrams preserve crucial phrase semantics in statistical NLP.

---

### Q18: What is the purpose of L2 Euclidean Normalization?
**Answer:**  
In unnormalized vectors, long documents have larger magnitude simply because they contain more words. L2 normalization divides each term weight by the square root of the sum of squared weights:
$$\hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|_2}$$
This projects every vector onto the surface of a unit sphere, ensuring that query length does not distort similarity scoring.

---

### Q19: How did you handle fees without inventing false numbers?
**Answer:**  
Dayananda Sagar College does not publish flat fee figures online because fees depend on University vs. Management quota, category, and state domicile. To maintain academic honesty and prevent student misinformation, our `fee_information` intent delivers official verification guidelines, quota descriptions, and the direct contact numbers of the DSCASC Admissions and Accounts desk (+91 8792909121).

---

### Q20: How did you test your system?
**Answer:**  
We implemented automated unit and integration tests using **Vitest**. The test suite covers:
- Text normalization (punctuation, lowercasing, slang)
- Tokenization (unigrams, bigrams, empty inputs)
- Stopwords filtering
- TF-IDF mathematical properties and L2 norm validity
- Cosine similarity edge cases (identical vs orthogonal vectors)
- Confidence threshold evaluation
- Real-world integration queries (admissions, timetable, placements, fees, out-of-domain fallbacks).  
All 23 automated tests pass with a 100% success rate.

---

### Q21: What is the purpose of the "AI Analysis" toggle in your UI?
**Answer:**  
The AI Analysis panel was built specifically for academic defense and transparent evaluation. When toggled, it exposes the internal mathematical mechanics for every response:
- Exact Detected Intent ID
- Calculated Confidence Score (0% – 100%)
- Active Threshold ($0.38$)
- Execution Time (in milliseconds)
- Next Best Alternative Candidate Intents and their respective scores
- Extracted query tokens and classification method

---

### Q22: What frontend and backend technologies were used?
**Answer:**  
- **Framework:** Next.js (React 18 / App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Institutional palette)
- **Icons:** Lucide React
- **Test Runner:** Vitest
- **Execution Architecture:** Serverless and client-side deterministic execution.

---

### Q23: How does the system handle misspelled inputs like "whn is bca tymtable"?
**Answer:**  
The `normalizeText` module maintains an associative slang and typo dictionary that maps colloquial abbreviations and phonetic spellings (*whn &rarr; when*, *tymtable &rarr; timetable*, *placment &rarr; placement*). Once normalized, the tokens match the pre-trained vocabulary vectors with high cosine similarity.

---

### Q24: What are the hardware and resource requirements to run this chatbot?
**Answer:**  
The application is extremely lightweight. Because it relies on statistical vectors rather than GPU-intensive transformer inference, it runs on any standard CPU (e.g. Intel Core i3 / Raspberry Pi / mobile browser) using less than 100 MB of RAM, executing queries in under 2 milliseconds.

---

### Q25: Why is this project significant for a BCA student?
**Answer:**  
This project bridges theoretical computer science concepts (discrete mathematics, linear algebra, vector spaces, set theory, NLP algorithms) with modern full-stack web engineering. It solves a genuine administrative problem for our own college while demonstrating production-quality software development practices.
