/**
 * DSCASC AI - Topic-Aware Conversational Context Engine
 * Lightweight, deterministic session topic tracker and follow-up resolver.
 * Maintains domain context (BCA, admissions, placements, fees, academics) across turns
 * while strictly isolating unrelated queries from cross-contamination.
 */

import { IntentResponse } from "../knowledgeBase";
import { ChatContext } from "./entities";

export interface TopicInfo {
  topic: string;
  label: string;
}

export const TOPIC_REGISTRY: Record<string, TopicInfo> = {
  bca: { topic: "bca", label: "BCA Program" },
  bba: { topic: "bba", label: "BBA Program" },
  bcom: { topic: "bcom", label: "B.Com Program" },
  bsc: { topic: "bsc", label: "B.Sc Program" },
  mca: { topic: "mca", label: "MCA Program" },
  mba: { topic: "mba", label: "MBA Program" },
  mcom: { topic: "mcom", label: "M.Com Program" },
  courses: { topic: "courses", label: "Courses & Programs" },
  admissions: { topic: "admissions", label: "Admissions" },
  placements: { topic: "placements", label: "Placements" },
  fees: { topic: "fees", label: "Fee Structure" },
  exams: { topic: "exams", label: "Examinations" },
  academics: { topic: "academics", label: "Academics & Syllabus" },
  college: { topic: "college", label: "College & Leadership" },
};

/**
 * Infer the domain topic from a matched intent ID
 */
export function inferTopicFromIntent(intentId: string): TopicInfo | undefined {
  if (intentId.startsWith("bca_") || intentId === "faculty_information") {
    return TOPIC_REGISTRY.bca;
  }
  if (intentId.startsWith("bba_")) return TOPIC_REGISTRY.bba;
  if (intentId.startsWith("bcom_")) return TOPIC_REGISTRY.bcom;
  if (intentId.startsWith("bsc_")) return TOPIC_REGISTRY.bsc;
  if (intentId.startsWith("mca_")) return TOPIC_REGISTRY.mca;
  if (intentId.startsWith("mba_")) return TOPIC_REGISTRY.mba;
  if (intentId.startsWith("mcom_")) return TOPIC_REGISTRY.mcom;
  if (intentId === "courses_available" || intentId === "courses_offered") {
    return TOPIC_REGISTRY.courses;
  }
  if (
    intentId === "admission_process" ||
    intentId === "admission_enquiry" ||
    intentId === "eligibility" ||
    intentId === "documents_required" ||
    intentId === "scholarship_information"
  ) {
    return TOPIC_REGISTRY.admissions;
  }
  if (intentId.startsWith("placement_") || intentId === "placements_overview") {
    return TOPIC_REGISTRY.placements;
  }
  if (intentId === "fee_structure") {
    return TOPIC_REGISTRY.fees;
  }
  if (intentId === "exams" || intentId === "timetable" || intentId === "syllabus" || intentId === "academic_calendar") {
    return TOPIC_REGISTRY.academics;
  }
  if (intentId.startsWith("college_") || intentId === "principal_information") {
    return TOPIC_REGISTRY.college;
  }
  return undefined;
}

/**
 * Detect explicit topic shifts from natural user queries
 */
export function detectTopicFromQuery(normalizedQuery: string): TopicInfo | undefined {
  const q = normalizedQuery.toLowerCase();
  const words = new Set(q.split(/\s+/));

  // Course subjects
  if (words.has("bca") || q.includes("computer application")) return TOPIC_REGISTRY.bca;
  if (words.has("bba") || q.includes("business administration")) return TOPIC_REGISTRY.bba;
  if (words.has("bcom") || words.has("commerce")) return TOPIC_REGISTRY.bcom;
  if (words.has("bsc") || words.has("science")) return TOPIC_REGISTRY.bsc;
  if (words.has("mca")) return TOPIC_REGISTRY.mca;
  if (words.has("mba") || q.includes("master of business")) return TOPIC_REGISTRY.mba;
  if (words.has("mcom")) return TOPIC_REGISTRY.mcom;

  // Institutional domains
  if (
    words.has("placement") ||
    words.has("placements") ||
    words.has("recruitment") ||
    words.has("recruiter") ||
    words.has("recruiters") ||
    q.includes("campus drive") ||
    q.includes("salary package") ||
    q.includes("highest package")
  ) {
    return TOPIC_REGISTRY.placements;
  }

  if (
    words.has("admission") ||
    words.has("admissions") ||
    words.has("enrollment") ||
    q.includes("how to apply") ||
    q.includes("apply for")
  ) {
    return TOPIC_REGISTRY.admissions;
  }

  if (words.has("fee") || words.has("fees") || words.has("tuition")) {
    return TOPIC_REGISTRY.fees;
  }

  if (words.has("exam") || words.has("exams") || words.has("examination") || words.has("examinations")) {
    return TOPIC_REGISTRY.exams;
  }

  return undefined;
}

export interface TopicFollowUpResolution {
  intentId?: string;
  clarification?: IntentResponse;
  confidence: number;
  method: string;
}

/**
 * Resolves short, topic-dependent follow-up questions using session context
 */
export function resolveTopicFollowUp(
  normalizedQuery: string,
  context?: ChatContext
): TopicFollowUpResolution | null {
  if (!context || !context.lastTopic) return null;

  const q = normalizedQuery.toLowerCase().trim();
  const words = new Set(q.split(/\s+/));
  const activeTopic = context.lastTopic;

  // 1. "Who is the HOD?" / "Who heads the department?" / "Faculty details?"
  const isHodQuery =
    q === "who is the hod" ||
    q === "who is hod" ||
    q === "hod" ||
    q === "hod name" ||
    q === "who heads the department" ||
    q === "who is the head of the department" ||
    q === "who is the department head" ||
    q === "who is the faculty" ||
    q === "who is faculty" ||
    q === "who are the faculty" ||
    q === "faculty" ||
    q === "faculty members" ||
    q === "faculty details" ||
    q === "show faculty" ||
    q === "who are the professors" ||
    q === "professors" ||
    q === "teachers" ||
    q === "who are the teachers";

  if (isHodQuery) {
    if (activeTopic === "bca") {
      return {
        intentId: "faculty_information",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (BCA HOD)",
      };
    }
    if (activeTopic === "bcom") {
      return {
        intentId: "bcom_faculty",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (B.Com HOD)",
      };
    }
    if (activeTopic === "bba") {
      return {
        intentId: "bba_faculty",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (BBA HOD)",
      };
    }
    if (activeTopic === "bsc") {
      return {
        intentId: "bsc_faculty",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (B.Sc HOD)",
      };
    }
    if (activeTopic === "mba") {
      return {
        intentId: "mba_faculty",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (MBA HOD)",
      };
    }
    if (activeTopic === "mca") {
      return {
        intentId: "mca_faculty",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (MCA HOD)",
      };
    }
    if (activeTopic === "mcom") {
      return {
        intentId: "mcom_faculty",
        confidence: 0.98,
        method: "Topic-Aware Context Resolution (M.Com HOD)",
      };
    }

    if (activeTopic === "admissions") {
      // Admissions is an administrative division led by Admissions Officer & Principal, not an academic department HOD
      return {
        clarification: {
          text: `Admissions at DSCASC are coordinated by the Admissions Office and College Administration under the Principal, Dr. Balu L.\n\nIf you are inquiring about an academic department Head of Department (HOD):\n• Computer Applications (BCA): Dr. Aruna Devi C (hod-bca@dayanandasagar.edu)\n• Admissions & Counseling Desk: +91 8792909121 / admissions@dayanandasagar.edu\n• Principal's Office: Dr. Balu L (principal-dscasc@dayanandasagar.edu)\n\nWhich department or office would you like details for?`,
          cardType: "contact",
          contact: {
            name: "DSCASC Admissions & Administration",
            role: "Admissions Desk & Principal's Office",
            phone: "+91 8792909121 / 080-42161709",
            email: "admissions@dayanandasagar.edu",
            address: "DSCASC Campus, Kumaraswamy Layout, Bangalore - 560111",
          },
          links: [
            {
              title: "BCA Faculty & HOD Directory",
              url: "https://www.dscasc.edu.in/bca/bca-faculty",
            },
            {
              title: "DSCASC Admissions Portal",
              url: "https://apply.dayanandasagar.edu/dscasc",
            },
          ],
          source: {
            name: "DSCASC Institutional Information",
            url: "https://www.dscasc.edu.in/contact",
            lastVerified: "2024-25",
          },
          suggestions: [
            "Who is the BCA HOD?",
            "Who is the Principal of DSCASC?",
            "How do I contact admissions?",
          ],
        },
        confidence: 0.95,
        method: "Topic-Aware Clarification (Admissions vs HOD)",
      };
    }

    if (activeTopic === "placements") {
      return {
        clarification: {
          text: `The Career Guidance & Placement Cell is headed by Ms. Geetha H Raheja (Head - Placements & Corporate Relations).\n\nIf you are looking for an academic department Head of Department, Dr. Aruna Devi C serves as the HOD of Computer Applications (BCA).`,
          cardType: "contact",
          contact: {
            name: "Ms. Geetha H Raheja",
            role: "Head - Placements & Corporate Relations",
            phone: "+91 9036968288",
            email: "placements-dscasc@dayanandasagar.edu",
            address: "Placement Cell, Administrative Block, DSCASC Campus",
          },
          source: {
            name: "DSCASC Placement Cell",
            url: "https://dscasc.edu.in/placement",
            lastVerified: "2024-25",
          },
          suggestions: [
            "Who is the BCA HOD?",
            "What is the placement record?",
            "How do I contact placements?",
          ],
        },
        confidence: 0.95,
        method: "Topic-Aware Clarification (Placements vs HOD)",
      };
    }
  }

  // 2. Syllabus follow-ups: "What is the syllabus?", "syllabus?", "subjects?", "curriculum?"
  const isSyllabusQuery =
    q === "what is the syllabus" ||
    q === "syllabus" ||
    q === "what is syllabus" ||
    q === "show syllabus" ||
    q === "course syllabus" ||
    q === "what are the subjects" ||
    q === "subjects";

  if (isSyllabusQuery && (activeTopic === "bca" || activeTopic === "academics")) {
    return {
      intentId: "syllabus",
      confidence: 0.98,
      method: "Topic-Aware Context Resolution (BCA Syllabus)",
    };
  }

  // 3. Timetable follow-ups: "What is the timetable?", "timetable?", "schedule?", "class timetable?"
  const isTimetableQuery =
    q === "what is the timetable" ||
    q === "timetable" ||
    q === "what is timetable" ||
    q === "class timetable" ||
    q === "schedule" ||
    q === "when are classes";

  if (isTimetableQuery && (activeTopic === "bca" || activeTopic === "academics")) {
    return {
      intentId: "bca_timetable",
      confidence: 0.98,
      method: "Topic-Aware Context Resolution (BCA Timetable)",
    };
  }

  // 4. Documents follow-ups: "What documents are required?", "documents needed?", "certificates?"
  const isDocumentsQuery =
    q === "what documents are required" ||
    q === "documents required" ||
    q === "documents needed" ||
    q === "what documents needed" ||
    q === "certificates needed" ||
    q === "what documents are needed" ||
    q === "admission documents";

  if (isDocumentsQuery && (activeTopic === "admissions" || activeTopic === "bca" || activeTopic === "courses")) {
    return {
      intentId: "documents_required",
      confidence: 0.98,
      method: "Topic-Aware Context Resolution (Admissions Documents)",
    };
  }

  // 5. Placement leadership follow-ups: "Who is the placement officer?", "who heads placements?"
  const isPlacementOfficerQuery =
    q === "who is the placement officer" ||
    q === "who is placement officer" ||
    q === "who is the placement head" ||
    q === "placement officer" ||
    q === "placement head" ||
    q === "who handles placements" ||
    q === "who heads placements" ||
    q === "who is in charge of placements";

  if (isPlacementOfficerQuery) {
    return {
      intentId: "placement_contact",
      confidence: 0.98,
      method: "Topic-Aware Context Resolution (Placement Officer)",
    };
  }

  // 6. Generic "Who is in charge?" / "Who heads it?" / "Who leads?"
  const isHeadQuery =
    q === "who is in charge" ||
    q === "who heads it" ||
    q === "who is the head" ||
    q === "who is the leader" ||
    q === "who is leading";

  if (isHeadQuery) {
    if (activeTopic === "bca") {
      return {
        intentId: "faculty_information",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (Department Leadership)",
      };
    }
    if (activeTopic === "bcom") {
      return {
        intentId: "bcom_faculty",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (B.Com Leadership)",
      };
    }
    if (activeTopic === "bba") {
      return {
        intentId: "bba_faculty",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (BBA Leadership)",
      };
    }
    if (activeTopic === "bsc") {
      return {
        intentId: "bsc_faculty",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (B.Sc Leadership)",
      };
    }
    if (activeTopic === "mba") {
      return {
        intentId: "mba_faculty",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (MBA Leadership)",
      };
    }
    if (activeTopic === "mca") {
      return {
        intentId: "mca_faculty",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (MCA Leadership)",
      };
    }
    if (activeTopic === "mcom") {
      return {
        intentId: "mcom_faculty",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (M.Com Leadership)",
      };
    }
    if (activeTopic === "placements") {
      return {
        intentId: "placement_contact",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (Placement Leadership)",
      };
    }
    if (activeTopic === "admissions") {
      return {
        intentId: "admission_enquiry",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (Admissions Leadership)",
      };
    }
    if (activeTopic === "college") {
      return {
        intentId: "principal_information",
        confidence: 0.95,
        method: "Topic-Aware Context Resolution (College Leadership)",
      };
    }
  }

  return null;
}
