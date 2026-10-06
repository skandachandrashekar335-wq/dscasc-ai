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
});
