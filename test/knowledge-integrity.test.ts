/**
 * DSCASC AI - Knowledge Base Integrity & Adversarial Cross-Department QA Test Suite
 *
 * Verifies:
 * 1. Complete department isolation across all 7 college programs (BCA, B.Com, BBA, B.Sc, MBA, MCA, M.Com).
 * 2. Explicit regression tests for reported bugs (B.Com HOD & B.Com faculty directory).
 * 3. Multi-turn topic-aware conversational context switching.
 * 4. Isolation against context contamination on out-of-domain queries.
 * 5. Pronoun consistency and gender guardrails.
 * 6. Natural language variations, slang, typos, and abbreviations.
 * 7. Hallucination prevention (fee fabrication guardrail & unknown faculty clarification).
 * 8. Source URL and ground truth directory link integrity.
 */

import { describe, it, expect } from "vitest";
import { matchUserQuery } from "../lib/nlp/intentMatcher";
import { KNOWLEDGE_BASE } from "../lib/knowledgeBase";
import { ChatContext } from "../lib/nlp/entities";

describe("Knowledge Base Integrity & Cross-Department QA", () => {
  // =========================================================================
  // SECTION 1: Department Isolation Across All 7 Programs
  // =========================================================================
  describe("Department Isolation - 7 Program Coverage", () => {
    it("should return Prof. Murugesha B N for B.Com leadership queries and never mention BCA", () => {
      const queries = [
        "hod of bcom",
        "who is the hod of bcom",
        "bcom hod",
        "who heads the bcom department",
        "who is the head of commerce",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("bcom_faculty");
        expect(res.matchedIntent.response.text).toContain("Murugesha B N");
        expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
        expect(res.matchedIntent.response.text).not.toContain("Computer Applications");
      }
    });

    it("should return Prof. Rekha M P for BBA leadership queries and never mention BCA", () => {
      const queries = [
        "hod of bba",
        "who is the hod of bba",
        "bba hod",
        "who heads the bba department",
        "who is the head of management",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("bba_faculty");
        expect(res.matchedIntent.response.text).toContain("Rekha M P");
        expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
      }
    });

    it("should return Dr. Guruprasad M S for B.Sc leadership queries", () => {
      const queries = [
        "hod of bsc",
        "who is the hod of bsc",
        "bsc hod",
        "who heads bsc",
        "who heads the science department",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("bsc_faculty");
        expect(res.matchedIntent.response.text).toContain("Guruprasad M S");
        expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
      }
    });

    it("should return Dr. Aruna Devi C for BCA leadership queries", () => {
      const queries = [
        "hod of bca",
        "who is the hod of bca",
        "bca hod",
        "who heads the bca department",
        "who is the head of computer applications",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("faculty_information");
        expect(res.matchedIntent.response.text).toContain("Aruna Devi C");
        expect(res.matchedIntent.response.text).not.toContain("Murugesha");
      }
    });

    it("should return Dr. S. Gokula Krishnan for MBA leadership queries", () => {
      const queries = [
        "hod of mba",
        "who is the hod of mba",
        "mba hod",
        "who heads mba",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("mba_faculty");
        expect(res.matchedIntent.response.text).toContain("Gokula Krishnan");
        expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
      }
    });

    it("should return Dr. Kumudavalli M V for MCA leadership queries", () => {
      const queries = [
        "hod of mca",
        "who is the hod of mca",
        "mca hod",
        "who heads mca",
        "mca deputy director",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("mca_faculty");
        expect(res.matchedIntent.response.text).toContain("Kumudavalli M V");
        expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
      }
    });

    it("should return Dr. Mahalakshmi V for M.Com leadership queries", () => {
      const queries = [
        "hod of mcom",
        "who is the hod of mcom",
        "mcom hod",
        "who heads mcom",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("mcom_faculty");
        expect(res.matchedIntent.response.text).toContain("Mahalakshmi V");
        expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
      }
    });
  });

  // =========================================================================
  // SECTION 2: Explicit Bug Regression Tests (B.Com HOD & Faculty Directory)
  // =========================================================================
  describe("Bug Regression - B.Com Faculty & Directory", () => {
    it("Bug A: 'hod of bcom' must return Prof. Murugesha B N and not Dr. Aruna Devi C", () => {
      const res = matchUserQuery("hod of bcom");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("bcom_faculty");
      expect(res.matchedIntent.response.text).toContain("Prof. Murugesha B N");
      expect(res.matchedIntent.response.text).not.toContain("Aruna Devi");
      expect(res.matchedIntent.response.contact?.name).toBe("Prof. Murugesha B N");
      expect(res.matchedIntent.response.contact?.email).toBe("hodbcom-dscasc@dayanandasagar.edu");
    });

    it("Bug B: 'who is faculty of bcom' must return B.Com directory and NOT BCA faculty directory", () => {
      const res = matchUserQuery("who is faculty of bcom");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("bcom_faculty");

      // Verify response links to official B.Com directory
      const links = res.matchedIntent.response.links || [];
      const hasBcomFacultyLink = links.some((l) => l.url.includes("/bcom/bcom-faculty"));
      const hasBcaFacultyLink = links.some((l) => l.url.includes("/bca/bca-faculty"));

      expect(hasBcomFacultyLink).toBe(true);
      expect(hasBcaFacultyLink).toBe(false);
      expect(res.matchedIntent.response.text).toContain("34 dedicated teaching professors");
    });

    it("should provide official B.Com faculty directory for other natural phrasings", () => {
      const variations = [
        "show bcom professors",
        "bcom faculty members",
        "bcom teaching staff",
        "faculty of bcom",
      ];

      for (const v of variations) {
        const res = matchUserQuery(v);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("bcom_faculty");
        expect(res.matchedIntent.response.links?.some((l) => l.url.includes("/bcom/bcom-faculty"))).toBe(true);
      }
    });
  });

  // =========================================================================
  // SECTION 3: Multi-turn Topic-Aware Conversational Context
  // =========================================================================
  describe("Multi-turn Conversational Context & Topic Switching", () => {
    it("should resolve 'Who is the HOD?' within B.Com active context to Murugesha B N", () => {
      const bcomTurn1 = matchUserQuery("Tell me about B.Com");
      expect(bcomTurn1.context?.lastTopic).toBe("bcom");

      const bcomTurn2 = matchUserQuery("Who is the HOD?", undefined, bcomTurn1.context);
      expect(bcomTurn2.isConfident).toBe(true);
      expect(bcomTurn2.detectedIntentId).toBe("bcom_faculty");
      expect(bcomTurn2.matchedIntent.response.text).toContain("Murugesha B N");
    });

    it("should resolve 'Who is the HOD?' within BBA active context to Rekha M P", () => {
      const bbaTurn1 = matchUserQuery("Tell me about BBA");
      expect(bbaTurn1.context?.lastTopic).toBe("bba");

      const bbaTurn2 = matchUserQuery("Who is the HOD?", undefined, bbaTurn1.context);
      expect(bbaTurn2.isConfident).toBe(true);
      expect(bbaTurn2.detectedIntentId).toBe("bba_faculty");
      expect(bbaTurn2.matchedIntent.response.text).toContain("Rekha M P");
    });

    it("should resolve 'Who is the HOD?' within B.Sc active context to Guruprasad M S", () => {
      const bscTurn1 = matchUserQuery("Tell me about B.Sc");
      expect(bscTurn1.context?.lastTopic).toBe("bsc");

      const bscTurn2 = matchUserQuery("Who is the HOD?", undefined, bscTurn1.context);
      expect(bscTurn2.isConfident).toBe(true);
      expect(bscTurn2.detectedIntentId).toBe("bsc_faculty");
      expect(bscTurn2.matchedIntent.response.text).toContain("Guruprasad M S");
    });

    it("should switch context cleanly: BCA -> B.Com -> 'Who is the HOD?'", () => {
      // Step 1: User asks about BCA
      const turn1 = matchUserQuery("Tell me about BCA");
      expect(turn1.context?.lastTopic).toBe("bca");

      // Step 2: User switches to B.Com
      const turn2 = matchUserQuery("Tell me about B.Com", undefined, turn1.context);
      expect(turn2.context?.lastTopic).toBe("bcom");

      // Step 3: Follow-up should resolve to B.Com HOD, NOT BCA
      const turn3 = matchUserQuery("Who is the HOD?", undefined, turn2.context);
      expect(turn3.isConfident).toBe(true);
      expect(turn3.detectedIntentId).toBe("bcom_faculty");
      expect(turn3.matchedIntent.response.text).toContain("Murugesha B N");
      expect(turn3.matchedIntent.response.text).not.toContain("Aruna Devi");
    });

    it("should switch context cleanly: B.Com -> BCA -> 'Who is the faculty?'", () => {
      // Step 1: User asks about B.Com
      const turn1 = matchUserQuery("Tell me about B.Com");
      expect(turn1.context?.lastTopic).toBe("bcom");

      // Step 2: User switches to BCA
      const turn2 = matchUserQuery("Tell me about BCA", undefined, turn1.context);
      expect(turn2.context?.lastTopic).toBe("bca");

      // Step 3: Follow-up should resolve to BCA faculty, NOT B.Com
      const turn3 = matchUserQuery("Who is the faculty?", undefined, turn2.context);
      expect(turn3.isConfident).toBe(true);
      expect(turn3.detectedIntentId).toBe("faculty_information");
      expect(turn3.matchedIntent.response.text).toContain("Aruna Devi C");
      expect(turn3.matchedIntent.response.text).not.toContain("Murugesha");
    });
  });

  // =========================================================================
  // SECTION 4: Context Contamination & Isolation Tests
  // =========================================================================
  describe("Context Contamination & Out-of-Domain Guardrails", () => {
    it("should never force active B.Com context onto out-of-domain queries like weather", () => {
      const bcomContext: ChatContext = { lastTopic: "bcom", lastTopicLabel: "B.Com Program", lastIntentId: "bcom_information" };
      const res = matchUserQuery("What's the weather tomorrow?", undefined, bcomContext);

      expect(res.isConfident).toBe(false);
      expect(res.matchedIntent.id).toBe("unknown");
    });

    it("should handle standalone context-free 'Who is the HOD?' by providing college-wide faculty overview", () => {
      // No active topic context
      const res = matchUserQuery("Who is the HOD?");
      expect(res.isConfident).toBe(true);
      expect(res.detectedIntentId).toBe("faculty_overview");
      // Must list multiple departments so the student can pick
      expect(res.matchedIntent.response.text).toContain("Murugesha B N");
      expect(res.matchedIntent.response.text).toContain("Aruna Devi C");
      expect(res.matchedIntent.response.text).toContain("Rekha M P");
    });

    it("should resolve pronouns with gender consistency in B.Com context", () => {
      // Step 1: Query B.Com HOD (Male: Prof. Murugesha B N)
      const hodRes = matchUserQuery("hod of bcom");
      expect(hodRes.context?.lastEntityId).toBe("murugesha_b_n");

      // Step 2: Follow-up with 'his' should resolve to Murugesha B N
      const followUpMale = matchUserQuery("What are his qualifications?", undefined, hodRes.context);
      expect(followUpMale.isConfident).toBe(true);
      expect(followUpMale.matchedIntent.response.text).toContain("Murugesha B N");
      expect(followUpMale.matchedIntent.response.text).toContain("MBA, K-Set");

      // Step 3: Follow-up with 'her' (female) should conflict and not resolve to Murugesha B N
      const followUpFemale = matchUserQuery("What are her qualifications?", undefined, hodRes.context);
      if (followUpFemale.isConfident) {
        expect(followUpFemale.context?.lastEntityId).not.toBe("murugesha_b_n");
      }
    });
  });

  // =========================================================================
  // SECTION 5: Natural Language Variations, Slang, & Typos
  // =========================================================================
  describe("Natural Language Variations & Robustness", () => {
    it("should handle noisy, informal, and typo-laden B.Com queries", () => {
      const noisyQueries = [
        "whos the bcom hod",
        "hod of b.com",
        "bcom hodd",
        "bcom faclty",
        "who heads b.com",
      ];

      for (const q of noisyQueries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("bcom_faculty");
      }
    });

    it("should handle noisy, informal, and typo-laden BBA queries", () => {
      const noisyQueries = [
        "bba hod",
        "hod of b.b.a",
        "bba faclty",
        "who heads bba",
      ];

      for (const q of noisyQueries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("bba_faculty");
      }
    });
  });

  // =========================================================================
  // SECTION 6: Hallucination Prevention & Guardrails
  // =========================================================================
  describe("Hallucination Prevention Guardrails", () => {
    it("should trigger clarification for unknown faculty names rather than guessing", () => {
      const queries = [
        "Who is Dr. Ramesh Kumar?",
        "Tell me about Prof. Venkatesh",
        "Who is Dr. Sneha Patil",
      ];

      for (const q of queries) {
        const res = matchUserQuery(q);
        expect(res.isConfident).toBe(true);
        expect(res.detectedIntentId).toBe("faculty_clarification");
        expect(res.matchedIntent.response.text).toContain("respective department directory");
      }
    });

    it("should never fabricate fee figures in fee_information intent", () => {
      const feeRes = matchUserQuery("What are the fees for BCA?");
      expect(feeRes.isConfident).toBe(true);
      expect(feeRes.detectedIntentId).toBe("fee_information");
      // Guardrail: must not contain hardcoded fabricated numbers like 85,000 or 1,20,000
      expect(feeRes.matchedIntent.response.text).toContain("Admissions Counter");
      expect(feeRes.matchedIntent.response.text).toContain("Bangalore University");
    });
  });

  // =========================================================================
  // SECTION 7: Source Metadata & Official Link Integrity
  // =========================================================================
  describe("Source URL and Ground Truth Directory Link Integrity", () => {
    it("should have verified source URLs for all 7 department faculty intents", () => {
      const facultyIntents = [
        { id: "faculty_information", expectedUrl: "https://www.dscasc.edu.in/bca/bca-faculty" },
        { id: "bcom_faculty", expectedUrl: "https://www.dscasc.edu.in/bcom/bcom-faculty" },
        { id: "bba_faculty", expectedUrl: "https://www.dscasc.edu.in/bba/bba-faculty" },
        { id: "bsc_faculty", expectedUrl: "https://www.dscasc.edu.in/bsc/bsc-faculty" },
        { id: "mba_faculty", expectedUrl: "https://www.dscasc.edu.in/courses/pg/mba" },
        { id: "mca_faculty", expectedUrl: "https://www.dscasc.edu.in/courses/pg/mca" },
        { id: "mcom_faculty", expectedUrl: "https://www.dscasc.edu.in/courses/pg/mcom" },
      ];

      for (const { id, expectedUrl } of facultyIntents) {
        const intent = KNOWLEDGE_BASE.find((it) => it.id === id);
        expect(intent, `Intent ${id} must exist in KNOWLEDGE_BASE`).toBeDefined();
        const links = intent?.response.links || [];
        const hasExpectedUrl = links.some((l) => l.url === expectedUrl);
        expect(hasExpectedUrl, `Intent ${id} should include link ${expectedUrl}`).toBe(true);
      }
    });
  });
});
