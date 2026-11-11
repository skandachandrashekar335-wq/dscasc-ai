import { describe, it, expect } from "vitest";
import {
  normalizeText,
  tokenize,
  removeStopwords,
  TfidfVectorizer,
  cosineSimilarity,
  evaluateConfidence,
  matchUserQuery,
  getIntentMatcher,
  ChatContext,
} from "../lib/nlp";
import { KNOWLEDGE_BASE } from "../lib/knowledgeBase";

describe("DSCASC AI - NLP Pipeline Unit Tests", () => {
  describe("Text Normalizer", () => {
    it("should lowercase and strip special characters", () => {
      const input = "What is BCA Fee???";
      const normalized = normalizeText(input);
      expect(normalized).toBe("what is bca fee");
    });

    it("should resolve common student slang and typos", () => {
      expect(normalizeText("whn is bca tymtable")).toBe("when is bca timetable");
      expect(normalizeText("wat documents needed")).toBe("what documents needed");
      expect(normalizeText("placment details")).toBe("placement details");
      expect(normalizeText("when r exams")).toBe("when are exams");
    });

    it("should normalize acronyms with dots", () => {
      expect(normalizeText("B.C.A syllabus")).toBe("bca syllabus");
      expect(normalizeText("B.Com fees")).toBe("bcom fees");
    });
  });

  describe("Tokenizer", () => {
    it("should tokenize normalized text into unigrams and bigrams", () => {
      const text = "bca admission process";
      const tokens = tokenize(text, { includeBigrams: true });
      expect(tokens).toContain("bca");
      expect(tokens).toContain("admission");
      expect(tokens).toContain("process");
      expect(tokens).toContain("bca_admission");
      expect(tokens).toContain("admission_process");
    });

    it("should return empty array for empty strings", () => {
      expect(tokenize("")).toEqual([]);
    });
  });

  describe("Stopwords Filter", () => {
    it("should remove non-essential grammatical words", () => {
      const tokens = ["how", "do", "i", "apply", "for", "bca"];
      const filtered = removeStopwords(tokens);
      expect(filtered).toContain("apply");
      expect(filtered).toContain("bca");
      expect(filtered).not.toContain("do");
      expect(filtered).not.toContain("for");
    });
  });

  describe("TF-IDF Vectorizer", () => {
    it("should compute valid L2-normalized vectors", () => {
      const vectorizer = new TfidfVectorizer();
      const corpus = [
        ["bca", "timetable", "schedule"],
        ["bca", "syllabus", "subjects"],
        ["placement", "statistics", "salary"],
      ];
      vectorizer.fit(corpus);

      const vec = vectorizer.transform(["bca", "timetable"]);
      expect(vec["bca"]).toBeGreaterThan(0);
      expect(vec["timetable"]).toBeGreaterThan(0);

      // L2 norm check
      let normSq = 0;
      for (const t in vec) {
        normSq += vec[t] * vec[t];
      }
      expect(Math.sqrt(normSq)).toBeCloseTo(1.0, 4);
    });
  });

  describe("Cosine Similarity", () => {
    it("should return 1 for identical vectors", () => {
      const vecA = { bca: 0.7071, timetable: 0.7071 };
      const sim = cosineSimilarity(vecA, vecA);
      expect(sim).toBeCloseTo(1.0, 4);
    });

    it("should return 0 for orthogonal vectors", () => {
      const vecA = { bca: 1 };
      const vecB = { placements: 1 };
      const sim = cosineSimilarity(vecA, vecB);
      expect(sim).toBe(0);
    });
  });

  describe("Confidence Evaluation", () => {
    it("should accept confident scores and reject below threshold", () => {
      expect(evaluateConfidence(0.85, 0.4).isConfident).toBe(true);
      expect(evaluateConfidence(0.25, 0.4).isConfident).toBe(false);
    });
  });

  describe("End-to-End Query Matching", () => {
    it("should match admissions queries", () => {
      const res = matchUserQuery("How do I apply for BCA?");
      expect(res.isConfident).toBe(true);
      expect(["admission_process", "bca_information"]).toContain(res.detectedIntentId);
    });

    it("should match BCA timetable queries", () => {
      const res = matchUserQuery("Where can I find the BCA timetable?");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("bca_timetable");
    });

    it("should match noisy/misspelled timetable query", () => {
      const res = matchUserQuery("whn is bca tymtable");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("bca_timetable");
    });

    it("should match fee queries without fabricated data", () => {
      const res1 = matchUserQuery("What is BCA fee?");
      const res2 = matchUserQuery("How much does BCA cost?");
      const res3 = matchUserQuery("bca fees??");

      expect(res1.isConfident).toBe(true);
      expect(res1.detectedIntentId).toBe("fee_information");
      expect(res2.detectedIntentId).toBe("fee_information");
      expect(res3.detectedIntentId).toBe("fee_information");
    });

    it("should match placement statistics queries", () => {
      const res1 = matchUserQuery("What is the placement record?");
      const res2 = matchUserQuery("How many companies visited?");
      const res3 = matchUserQuery("What is the highest package?");
      const res4 = matchUserQuery("What is average salary?");

      expect(res1.isConfident).toBe(true);
      expect(res1.detectedIntentId).toBe("placement_statistics");
      expect(res2.detectedIntentId).toBe("placement_statistics");
      expect(res3.detectedIntentId).toBe("placement_statistics");
      expect(res4.detectedIntentId).toBe("placement_statistics");
    });

    it("should distinguish placement contact from placement statistics", () => {
      const res = matchUserQuery("Who handles placements?");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("placement_contact");
    });

    it("should match placement process and career guidance", () => {
      const resProcess = matchUserQuery("How does the placement process work?");
      expect(resProcess.isConfident).toBe(true);
      expect(resProcess.detectedIntentId).toBe("placement_process");

      const resCareer = matchUserQuery("Is there career guidance?");
      expect(resCareer.isConfident).toBe(true);
      expect(resCareer.detectedIntentId).toBe("career_guidance");
    });

    it("should match syllabus and exams queries", () => {
      const resSyllabus = matchUserQuery("Show me BCA syllabus");
      expect(resSyllabus.isConfident).toBe(true);
      expect(resSyllabus.detectedIntentId).toBe("syllabus");

      const resExams = matchUserQuery("When are semester exams?");
      expect(resExams.isConfident).toBe(true);
      expect(resExams.detectedIntentId).toBe("exam_information");
    });

    it("should match faculty and leadership queries", () => {
      const resFaculty = matchUserQuery("Who is the BCA HOD?");
      expect(resFaculty.isConfident).toBe(true);
      expect(resFaculty.detectedIntentId).toBe("faculty_information");
    });

    it("should match college location and contact queries", () => {
      const resLocation = matchUserQuery("Where is the college located?");
      expect(resLocation.isConfident).toBe(true);
      expect(resLocation.detectedIntentId).toBe("college_location");

      const resContact = matchUserQuery("How do I contact DSCASC?");
      expect(resContact.isConfident).toBe(true);
      expect(resContact.detectedIntentId).toBe("contact_information");
    });

    it("should handle empty or whitespace-only queries gracefully", () => {
      const resEmpty = matchUserQuery("");
      expect(resEmpty.isConfident).toBe(false);
      expect(resEmpty.detectedIntentId).toBe("unknown");

      const resSpaces = matchUserQuery("   ???   ");
      expect(resSpaces.isConfident).toBe(false);
      expect(resSpaces.detectedIntentId).toBe("unknown");
    });

    it("should trigger fallback for out-of-domain / unknown queries", () => {
      const res1 = matchUserQuery("What's the weather tomorrow?");
      const res2 = matchUserQuery("Who won yesterday's cricket match?");
      const res3 = matchUserQuery("Tell me a random joke");

      expect(res1.isConfident).toBe(false);
      expect(res1.matchedIntent.id).toBe("unknown");

      expect(res2.isConfident).toBe(false);
      expect(res2.matchedIntent.id).toBe("unknown");

      expect(res3.isConfident).toBe(false);
      expect(res3.matchedIntent.id).toBe("unknown");
    });

    it("should have at least 20 intents in the knowledge base", () => {
      expect(KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(20);
    });
  });

  describe("College-wide course coverage", () => {
    it("should map the flagship programs query to courses_available", () => {
      const res = matchUserQuery("What courses does DSCASC offer?");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("courses_available");
    });

    it("should map every officially listed program to its own course intent", () => {
      const expectations: Array<[string, string]> = [
        ["Tell me about BCA", "bca_information"],
        ["Tell me about BBA", "bba_information"],
        ["Tell me about B.Com", "bcom_information"],
        ["Tell me about B.Sc", "bsc_information"],
        ["Does DSCASC offer MCA?", "mca_information"],
        ["Does DSCASC have MCA?", "mca_information"],
        ["Tell me about MBA", "mba_information"],
        ["Tell me about M.Com", "mcom_information"],
      ];
      for (const [query, intentId] of expectations) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident`).toBe(true);
        expect(res.detectedIntentId, query).toBe(intentId);
      }
    });

    it("should answer \"what is <program>\" for every program", () => {
      const expectations: Array<[string, string]> = [
        ["What is BCA?", "bca_information"],
        ["What is BBA?", "bba_information"],
        ["What is B.Com?", "bcom_information"],
        ["What is B.Sc?", "bsc_information"],
        ["What is MCA?", "mca_information"],
        ["What is MBA?", "mba_information"],
        ["What is M.Com?", "mcom_information"],
      ];
      for (const [query, intentId] of expectations) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident`).toBe(true);
        expect(res.detectedIntentId, query).toBe(intentId);
      }
    });

    it("should distinguish UG and PG listing queries from single-course queries", () => {
      const pg = matchUserQuery("What postgraduate courses are available?");
      expect(pg.isConfident).toBe(true);
      expect(pg.detectedIntentId).toBe("courses_available");

      const ug = matchUserQuery("What undergraduate courses are available?");
      expect(ug.isConfident).toBe(true);
      expect(ug.detectedIntentId).toBe("courses_available");
    });

    it("should handle misspelled course and eligibility queries", () => {
      expect(matchUserQuery("bba eligibilty").detectedIntentId).toBe("eligibility");
      expect(matchUserQuery("does dscasc have bsc").detectedIntentId).toBe("bsc_information");
      expect(matchUserQuery("tell me about mcom").detectedIntentId).toBe("mcom_information");
      expect(matchUserQuery("bba timtable").detectedIntentId).toBe("timetable");
      expect(matchUserQuery("whn is bca tymtable").detectedIntentId).toBe("bca_timetable");
    });

    it("should map college-wide queries to their correct intents", () => {
      const expectations: Array<[string, string]> = [
        ["What are the admission requirements?", "admission_process"],
        ["What is DSCASC?", "college_information"],
        ["Where is DSCASC?", "college_location"],
        ["How do I get admission?", "admission_process"],
        ["How can I contact the college?", "contact_information"],
        ["What documents are required?", "documents_required"],
        ["How do I apply?", "admission_process"],
        ["What are the fees?", "fee_information"],
        ["What is the eligibility for MBA?", "eligibility"],
        ["Where is DSCASC?", "college_location"],
        ["What facilities does the college have?", "facilities"],
        ["How can I contact DSCASC?", "contact_information"],
        ["What is the placement process?", "placement_process"],
        ["Which companies recruit?", "placement_companies"],
        ["Does DSCASC provide internships?", "internship_information"],
        ["What clubs are there?", "clubs_activities"],
        ["Are scholarships available?", "scholarship_information"],
      ];
      for (const [query, intentId] of expectations) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident`).toBe(true);
        expect(res.detectedIntentId, query).toBe(intentId);
      }
    });

    it("should still trigger fallback for unrelated queries", () => {
      const res = matchUserQuery("zzzz qqqq nonsense about pizza");
      expect(res.isConfident).toBe(false);
      expect(res.detectedIntentId).toBe("unknown");
    });

    it("should contain all seven course intents with official source metadata", () => {
      const courseIntentIds = [
        "bca_information",
        "bba_information",
        "bcom_information",
        "bsc_information",
        "mca_information",
        "mba_information",
        "mcom_information",
      ];
      for (const id of courseIntentIds) {
        const intent = KNOWLEDGE_BASE.find((i) => i.id === id);
        expect(intent, `${id} should exist`).toBeTruthy();
        expect(intent!.response.source?.url, `${id} source url`).toContain("dscasc.edu.in");
        expect(intent!.response.source?.lastVerified, `${id} lastVerified`).toBeTruthy();
        expect(intent!.response.links?.length ?? 0, `${id} official links`).toBeGreaterThan(0);
      }
    });

    it("should list all verified programs and the official skill courses", () => {
      const intent = KNOWLEDGE_BASE.find((i) => i.id === "courses_available");
      expect(intent).toBeTruthy();
      const text = intent!.response.text;
      for (const program of ["BCA", "BBA", "B.Com", "B.Sc", "MCA", "MBA", "M.Com"]) {
        expect(text, `programs list should mention ${program}`).toContain(program);
      }
      expect(text).toContain("Tally");
      expect(text).toContain("AWS Cloud Practitioner");
      // Unverified claims must not appear
      expect(text).not.toContain("Data Analytics");
      expect(text).not.toContain("accredited");
    });

    it("should keep every factual intent sourced", () => {
      const conversational = new Set(["greeting", "thanks", "help", "goodbye", "unknown"]);
      for (const intent of KNOWLEDGE_BASE) {
        if (conversational.has(intent.id)) continue;
        expect(intent.response.source?.url, `${intent.id} source`).toBeTruthy();
        expect(intent.response.source?.lastVerified, `${intent.id} lastVerified`).toBeTruthy();
      }
    });
  });

  describe("Phase 2 & 4 - Entity Recognition, Context, and Disambiguation", () => {
    it("should recognise Dr. Aruna Devi across natural phrasing variations", () => {
      const queries = [
        "Who is Aruna Devi?",
        "Tell me about Aruna Devi",
        "Who is Dr. Aruna Devi?",
        "Who is the HOD of BCA?",
        "Who heads the BCA department?",
        "What is the designation of Aruna Devi?",
        "bca hod details",
        "who is dr aruna devi c",
      ];

      for (const query of queries) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident`).toBe(true);
        expect(res.detectedIntentId, `${query} should match faculty_information`).toBe("faculty_information");
        expect(res.matchedIntent.response.text).toContain("Dr. Aruna Devi C");
        expect(res.context?.lastEntityId).toBe("aruna_devi");
      }
    });

    it("should recognise Principal Dr. Balu L across variations", () => {
      const queries = [
        "Who is Dr. Balu?",
        "Who is Dr Balu L?",
        "Who is the Principal?",
        "Who is the Principal of DSCASC?",
        "who heads the college",
      ];

      for (const query of queries) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident`).toBe(true);
        expect(res.detectedIntentId, `${query} should match principal_information`).toBe("principal_information");
        expect(res.matchedIntent.response.text).toContain("Dr. Balu L");
        expect(res.context?.lastEntityId).toBe("balu_l");
      }
    });

    it("should recognise Placement Head Ms. Geetha Raheja across variations", () => {
      const queries = [
        "Who is Geetha Raheja?",
        "Who is the placement head?",
        "Who is the placement officer?",
        "Who heads placements?",
      ];

      for (const query of queries) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident`).toBe(true);
        expect(res.detectedIntentId, `${query} should match placement_contact`).toBe("placement_contact");
        expect(res.matchedIntent.response.text).toContain("Ms. Geetha H Raheja");
        expect(res.context?.lastEntityId).toBe("geetha_raheja");
      }
    });

    it("should resolve conversational pronouns using session-local context", () => {
      // Step 1: User asks about BCA HOD
      const step1 = matchUserQuery("Who is the HOD of BCA?");
      expect(step1.context?.lastEntityId).toBe("aruna_devi");

      const sessionContext: ChatContext = step1.context || {};

      // Step 2: User asks follow-up with pronoun "her"
      const step2 = matchUserQuery("What are her qualifications?", undefined, sessionContext);
      expect(step2.isConfident).toBe(true);
      expect(step2.detectedIntentId).toBe("faculty_information");
      expect(step2.matchedIntent.response.text).toContain("MCA, M.Phil, Ph.D.");
      expect(step2.matchedIntent.response.text).toContain("Dr. Aruna Devi C");

      // Step 3: User asks contact follow-up
      const step3 = matchUserQuery("What is her email address?", undefined, step2.context);
      expect(step3.isConfident).toBe(true);
      expect(step3.detectedIntentId).toBe("faculty_information");
      expect(step3.matchedIntent.response.text).toContain("hod-bca@dayanandasagar.edu");

      // Step 4: User asks about Principal Dr. Balu
      const step4 = matchUserQuery("Who is Dr. Balu?", undefined, step3.context);
      expect(step4.context?.lastEntityId).toBe("balu_l");

      // Step 5: User asks follow-up with pronoun "his"
      const step5 = matchUserQuery("What are his qualifications?", undefined, step4.context);
      expect(step5.isConfident).toBe(true);
      expect(step5.detectedIntentId).toBe("principal_information");
      expect(step5.matchedIntent.response.text).toContain("MBA, PGDIM, M.Phil, Ph.D.");
    });

    it("should not confuse pronouns when gender does not match active context", () => {
      // If current context is female (Aruna Devi) and user asks "What are his qualifications?"
      const femaleContext: ChatContext = { lastEntityId: "aruna_devi", lastIntentId: "faculty_information" };
      const mismatch = matchUserQuery("What are his qualifications?", undefined, femaleContext);
      // Should not map to Aruna Devi
      if (mismatch.isConfident) {
        expect(mismatch.context?.lastEntityId).not.toBe("aruna_devi");
      }
    });

    it("should ask for clarification on unrecognized faculty names instead of hallucinating", () => {
      const ambiguousQueries = [
        "Who is Dr. Kumar?",
        "Who is Sharma?",
        "Tell me about Dr. Ramesh",
        "Who is prof mukherjee",
      ];

      for (const query of ambiguousQueries) {
        const res = matchUserQuery(query);
        expect(res.isConfident, `${query} should be confident clarification`).toBe(true);
        expect(res.detectedIntentId, `${query} should trigger faculty_clarification`).toBe("faculty_clarification");
        expect(res.matchedIntent.response.text).toContain("could not locate an individual faculty profile");
        expect(res.matchedIntent.response.text).toContain("Dr. Balu L");
        expect(res.matchedIntent.response.text).toContain("Dr. Aruna Devi C");
        // Must provide official directory link
        expect(res.matchedIntent.response.links?.some((l) => l.url.includes("bca-faculty"))).toBe(true);
      }
    });
  });

  describe("Topic-Aware Conversational Context", () => {
    it("should resolve 'Who is the HOD?' in BCA context to Dr. Aruna Devi C", () => {
      // Step 1: Tell me about BCA
      const step1 = matchUserQuery("Tell me about BCA");
      expect(step1.isConfident).toBe(true);
      expect(step1.context?.lastTopic).toBe("bca");

      // Step 2: Follow-up "Who is the HOD?"
      const step2 = matchUserQuery("Who is the HOD?", undefined, step1.context);
      expect(step2.isConfident).toBe(true);
      expect(step2.detectedIntentId).toBe("faculty_information");
      expect(step2.matchedIntent.response.text).toContain("Dr. Aruna Devi C");
      expect(step2.context?.lastTopic).toBe("bca");
    });

    it("should resolve 'What is the syllabus?' in BCA context to BCA syllabus", () => {
      // Step 1: Tell me about BCA
      const step1 = matchUserQuery("Tell me about BCA");
      expect(step1.context?.lastTopic).toBe("bca");

      // Step 2: What is the syllabus?
      const step2 = matchUserQuery("What is the syllabus?", undefined, step1.context);
      expect(step2.isConfident).toBe(true);
      expect(step2.detectedIntentId).toBe("syllabus");
      expect(step2.context?.lastTopic).toBe("bca");
    });

    it("should resolve 'What documents are required?' in Admissions context to documents_required", () => {
      // Step 1: Tell me about admissions
      const step1 = matchUserQuery("Tell me about admissions");
      expect(step1.isConfident).toBe(true);
      expect(step1.context?.lastTopic).toBe("admissions");

      // Step 2: What documents are required?
      const step2 = matchUserQuery("What documents are required?", undefined, step1.context);
      expect(step2.isConfident).toBe(true);
      expect(step2.detectedIntentId).toBe("documents_required");
      expect(step2.context?.lastTopic).toBe("admissions");
    });

    it("should resolve 'Who is the placement officer?' in Placements context to Ms. Geetha H Raheja", () => {
      // Step 1: Tell me about placements
      const step1 = matchUserQuery("Tell me about placements");
      expect(step1.isConfident).toBe(true);
      expect(step1.context?.lastTopic).toBe("placements");

      // Step 2: Who is the placement officer?
      const step2 = matchUserQuery("Who is the placement officer?", undefined, step1.context);
      expect(step2.isConfident).toBe(true);
      expect(step2.detectedIntentId).toBe("placement_contact");
      expect(step2.matchedIntent.response.text).toContain("Ms. Geetha H Raheja");
      expect(step2.context?.lastTopic).toBe("placements");
    });

    it("should update context when user switches subjects (BCA -> Admissions -> Who is the HOD?)", () => {
      // Turn 1: BCA
      const turn1 = matchUserQuery("Tell me about BCA");
      expect(turn1.context?.lastTopic).toBe("bca");

      // Turn 2: User shifts subjects to Admissions
      const turn2 = matchUserQuery("Tell me about admissions", undefined, turn1.context);
      expect(turn2.context?.lastTopic).toBe("admissions");
      // Old BCA entity must not leak into admissions
      expect(turn2.context?.lastEntityId).toBeUndefined();

      // Turn 3: "Who is the HOD?" under Admissions context
      const turn3 = matchUserQuery("Who is the HOD?", undefined, turn2.context);
      expect(turn3.isConfident).toBe(true);
      // Since admissions is an administrative division, it clarifies rather than blindly assuming BCA
      expect(turn3.detectedIntentId).toBe("topic_clarification");
      expect(turn3.matchedIntent.response.text).toContain("Admissions at DSCASC are coordinated by the Admissions Office");
      expect(turn3.matchedIntent.response.text).toContain("Dr. Aruna Devi C");
      expect(turn3.matchedIntent.response.text).toContain("Dr. Balu L");
    });

    it("should never force active context onto unrelated queries like weather", () => {
      // Turn 1: BCA
      const turn1 = matchUserQuery("Tell me about BCA");
      expect(turn1.context?.lastTopic).toBe("bca");

      // Turn 2: Completely unrelated query
      const turn2 = matchUserQuery("What is the weather?", undefined, turn1.context);
      expect(turn2.isConfident).toBe(false);
      expect(turn2.detectedIntentId).toBe("unknown");
      expect(turn2.matchedIntent.response.text).not.toContain("Dr. Aruna Devi C");
      expect(turn2.matchedIntent.response.text).not.toContain("BCA");
    });
  });
});
