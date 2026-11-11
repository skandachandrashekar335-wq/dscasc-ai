/**
 * DSCASC AI - Named Entity Recognition (NER) & Conversational Context
 * Lightweight, deterministic entity registry and pronoun/predicate resolver
 * for institutional leadership, faculty, and multi-turn student guidance.
 */

import { IntentResponse } from "../knowledgeBase";
import { normalizeText } from "./normalizer";

export interface EntityProfile {
  id: string;
  name: string;
  salutation: string;
  role: string;
  department: string;
  qualifications: string;
  phone: string;
  email: string;
  office: string;
  gender: "female" | "male";
  intentId: string;
  nameAliases: string[];
  roleAliases: string[];
  specialization?: string;
  directoryUrl?: string;
  links?: Array<{ title: string; url: string; description?: string }>;
}

export interface ChatContext {
  lastIntentId?: string;
  lastEntityId?: string;
  lastEntityName?: string;
  lastTopic?: string;
  lastTopicLabel?: string;
  timestamp?: number;
}

export type EntityPredicate = "overview" | "qualifications" | "contact" | "role" | "office";

export interface EntityMatch {
  entity: EntityProfile;
  predicate: EntityPredicate;
  confidence: number;
  isFollowUp: boolean;
}

/**
 * Unambiguous Institutional Entity Registry
 * Derived strictly from verified official DSCASC website records (https://www.dscasc.edu.in)
 */
export const ENTITY_REGISTRY: Record<string, EntityProfile> = {
  aruna_devi: {
    id: "aruna_devi",
    name: "Dr. Aruna Devi C",
    salutation: "Dr.",
    role: "Associate Professor & Head of Department (HOD)",
    department: "Department of Computer Applications (BCA)",
    qualifications: "MCA, M.Phil, Ph.D.",
    phone: "080-42161737",
    email: "hod-bca@dayanandasagar.edu",
    office: "Building No. 17, DSCASC Campus",
    gender: "female",
    intentId: "faculty_information",
    specialization: "Machine Learning, Cloud Architectures, Data Analytics, Cyber Security, Web Technologies",
    directoryUrl: "https://www.dscasc.edu.in/bca/bca-faculty",
    links: [
      {
        title: "BCA Faculty Directory",
        url: "https://www.dscasc.edu.in/bca/bca-faculty",
        description: "Official teaching faculty list and academic profiles",
      },
    ],
    nameAliases: [
      "aruna devi",
      "aruna devi c",
      "dr aruna devi",
      "dr aruna devi c",
      "dr aruna",
      "prof aruna devi",
      "professor aruna devi",
      "aruna",
    ],
    roleAliases: [
      "bca hod",
      "hod of bca",
      "hod bca",
      "bca department head",
      "head of bca",
      "head of the bca department",
      "who heads bca",
      "who heads the bca department",
      "who is the head of computer applications",
      "who is the head of bca",
    ],
  },
  murugesha_b_n: {
    id: "murugesha_b_n",
    name: "Prof. Murugesha B N",
    salutation: "Prof.",
    role: "Assistant Professor & Head of Department (HOD)",
    department: "Department of Commerce (B.Com)",
    qualifications: "MBA, K-Set",
    phone: "(080) 42161767",
    email: "hodbcom-dscasc@dayanandasagar.edu",
    office: "Department of Commerce, DSCASC Campus",
    gender: "male",
    intentId: "bcom_faculty",
    directoryUrl: "https://www.dscasc.edu.in/bcom/bcom-faculty",
    links: [
      {
        title: "B.Com Faculty Directory",
        url: "https://www.dscasc.edu.in/bcom/bcom-faculty",
        description: "Official roster of 34 Commerce teaching faculty members",
      },
      {
        title: "Department of Commerce Overview",
        url: "https://www.dscasc.edu.in/courses/ug/bcom",
        description: "Official Bachelor of Commerce department portal",
      },
    ],
    nameAliases: [
      "murugesha b n",
      "murugesha",
      "prof murugesha",
      "prof murugesha b n",
      "mr murugesha",
      "prof murugesh",
    ],
    roleAliases: [
      "bcom hod",
      "hod of bcom",
      "hod bcom",
      "bcom department head",
      "head of bcom",
      "head of commerce",
      "who heads bcom",
      "who heads the bcom department",
      "who heads the commerce department",
      "commerce hod",
      "hod of commerce",
      "who is the head of commerce",
      "who is the head of bcom",
    ],
  },
  rekha_m_p: {
    id: "rekha_m_p",
    name: "Prof. Rekha M P",
    salutation: "Prof.",
    role: "Assistant Professor & Head of Department (HOD)",
    department: "Department of Management (BBA)",
    qualifications: "MBA, M.Phil, (Ph.D)",
    phone: "080-42161709",
    email: "hodbba-dscasc@dayanandasagar.edu",
    office: "Building No. 14, DSCASC Campus",
    gender: "female",
    intentId: "bba_faculty",
    directoryUrl: "https://www.dscasc.edu.in/bba/bba-faculty",
    links: [
      {
        title: "BBA Faculty Directory",
        url: "https://www.dscasc.edu.in/bba/bba-faculty",
        description: "Official roster of 22 Management teaching faculty",
      },
      {
        title: "Department of Management Overview",
        url: "https://www.dscasc.edu.in/courses/ug/bba",
        description: "Official Bachelor of Business Administration department portal",
      },
    ],
    nameAliases: [
      "rekha m p",
      "rekha",
      "prof rekha",
      "prof rekha m p",
    ],
    roleAliases: [
      "bba hod",
      "hod of bba",
      "hod bba",
      "bba department head",
      "head of bba",
      "who heads bba",
      "who heads the bba department",
      "management hod",
      "hod of management",
      "who is the head of management",
      "who is the head of bba",
    ],
  },
  guruprasad_m_s: {
    id: "guruprasad_m_s",
    name: "Dr. Guruprasad M S",
    salutation: "Dr.",
    role: "Assistant Professor & Head of Department (HOD)",
    department: "Department of Bachelor of Science (B.Sc PCM)",
    qualifications: "M.Sc, CSIR-JRF/NET, Ph.D",
    phone: "080-42161709",
    email: "admissions@dayanandasagar.edu",
    office: "Building No. 17, DSCASC Campus",
    gender: "male",
    intentId: "bsc_faculty",
    directoryUrl: "https://www.dscasc.edu.in/bsc/bsc-faculty",
    links: [
      {
        title: "B.Sc Faculty Directory",
        url: "https://www.dscasc.edu.in/bsc/bsc-faculty",
        description: "Official Science faculty profiles across Physics and Mathematics",
      },
      {
        title: "Department of Science Overview",
        url: "https://www.dscasc.edu.in/courses/ug/bsc",
        description: "Official Bachelor of Science department portal",
      },
    ],
    nameAliases: [
      "guruprasad m s",
      "guruprasad",
      "dr guruprasad",
      "dr guruprasad m s",
    ],
    roleAliases: [
      "bsc hod",
      "hod of bsc",
      "hod bsc",
      "bsc department head",
      "head of bsc",
      "who heads bsc",
      "who heads the bsc department",
      "who heads the science department",
      "who is the head of science",
      "who is the head of bsc",
      "science hod",
      "hod of science",
    ],
  },
  gokula_krishnan: {
    id: "gokula_krishnan",
    name: "Dr. S. Gokula Krishnan",
    salutation: "Dr.",
    role: "Professor of Analytics & HOD",
    department: "Department of Management Studies (MBA)",
    qualifications: "Ph.D in Management & Analytics",
    phone: "9489766214",
    email: "gkrishna-mbabu@dscasc.edu.in",
    office: "Management Studies Block, DSCASC Campus",
    gender: "male",
    intentId: "mba_faculty",
    directoryUrl: "https://www.dscasc.edu.in/courses/pg/mba",
    links: [
      {
        title: "MBA Department Portal",
        url: "https://www.dscasc.edu.in/courses/pg/mba",
        description: "Official Master of Business Administration department overview",
      },
    ],
    nameAliases: [
      "gokula krishnan",
      "dr s gokula krishnan",
      "dr gokula krishnan",
    ],
    roleAliases: [
      "mba hod",
      "hod of mba",
      "hod mba",
      "head of mba",
      "who heads mba",
      "mba director",
    ],
  },
  kumudavalli_m_v: {
    id: "kumudavalli_m_v",
    name: "Dr. Kumudavalli M V",
    salutation: "Dr.",
    role: "Deputy Director & Department Head",
    department: "Department of Computer Applications (MCA - Post Graduate)",
    qualifications: "Ph.D in Computer Applications",
    phone: "(080) 42161737",
    email: "dd-cabu@dayanandasagar.edu",
    office: "Department of Computer Applications, DSCASC Campus",
    gender: "female",
    intentId: "mca_faculty",
    directoryUrl: "https://www.dscasc.edu.in/courses/pg/mca",
    links: [
      {
        title: "MCA Department Portal",
        url: "https://www.dscasc.edu.in/courses/pg/mca",
        description: "Official Master of Computer Applications department overview",
      },
    ],
    nameAliases: [
      "kumudavalli m v",
      "dr kumudavalli",
      "dr kumudavalli m v",
    ],
    roleAliases: [
      "mca hod",
      "hod of mca",
      "hod mca",
      "head of mca",
      "who heads mca",
      "mca deputy director",
    ],
  },
  mahalakshmi_v: {
    id: "mahalakshmi_v",
    name: "Dr. Mahalakshmi V",
    salutation: "Dr.",
    role: "Associate Professor & Head of Department (HOD)",
    department: "Department of Master of Commerce (M.Com)",
    qualifications: "M.Com, MBA, M.Phil, Ph.D",
    phone: "(080) 42161771",
    email: "hod-mcom@dayanandasagar.edu",
    office: "Department of Master of Commerce, DSCASC Campus",
    gender: "female",
    intentId: "mcom_faculty",
    directoryUrl: "https://www.dscasc.edu.in/courses/pg/mcom",
    links: [
      {
        title: "M.Com Department Portal",
        url: "https://www.dscasc.edu.in/courses/pg/mcom",
        description: "Official Master of Commerce department overview",
      },
    ],
    nameAliases: [
      "mahalakshmi v",
      "dr mahalakshmi",
      "dr mahalakshmi v",
    ],
    roleAliases: [
      "mcom hod",
      "hod of mcom",
      "hod mcom",
      "head of mcom",
      "who heads mcom",
      "mcom department head",
    ],
  },
  balu_l: {
    id: "balu_l",
    name: "Dr. Balu L",
    salutation: "Dr.",
    role: "Principal, DSCASC",
    department: "Institutional Administration",
    qualifications: "MBA, PGDIM, M.Phil, Ph.D.",
    phone: "080-43704728",
    email: "principal-dscasc@dayanandasagar.edu",
    office: "Principal's Office, DSCASC, Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore - 560111",
    gender: "male",
    intentId: "principal_information",
    directoryUrl: "https://www.dscasc.edu.in/about-us/principals-desk",
    links: [
      {
        title: "DSCASC Principal's Desk",
        url: "https://www.dscasc.edu.in/about-us/principals-desk",
        description: "Official welcome message and leadership vision",
      },
    ],
    nameAliases: [
      "balu",
      "balu l",
      "dr balu",
      "dr balu l",
      "principal balu",
      "principal dr balu",
    ],
    roleAliases: [
      "principal",
      "college principal",
      "principal of dscasc",
      "who is the principal",
      "head of the college",
      "head of college",
      "who heads the college",
    ],
  },
  geetha_raheja: {
    id: "geetha_raheja",
    name: "Ms. Geetha H Raheja",
    salutation: "Ms.",
    role: "Head - Placements & Corporate Relations",
    department: "Career Guidance & Placement Cell",
    qualifications: "Corporate Relations & Campus Recruitment Leadership",
    phone: "+91 9036968288",
    email: "placements-dscasc@dayanandasagar.edu",
    office: "Placement Cell, Administrative Block, DSCASC Campus",
    gender: "female",
    intentId: "placement_contact",
    directoryUrl: "https://dscasc.edu.in/placement",
    links: [
      {
        title: "Official Placement Portal",
        url: "https://dscasc.edu.in/placement",
        description: "Placement statistics, recruitment drives, and contact",
      },
    ],
    nameAliases: [
      "geetha raheja",
      "geetha h raheja",
      "ms geetha raheja",
      "ms geetha h raheja",
      "geetha",
    ],
    roleAliases: [
      "placement head",
      "placement officer",
      "placement coordinator",
      "who heads placements",
      "placement incharge",
      "head of placement",
    ],
  },
  dayananda_sagar: {
    id: "dayananda_sagar",
    name: "Late Sri R. Dayananda Sagar",
    salutation: "Late Sri",
    role: "Founder, Dayananda Sagar Institutions (DSI)",
    department: "Dayananda Sagar Institutions",
    qualifications: "Visionary Founder & Educational Pioneer",
    phone: "+91-80-42161709",
    email: "admissions@dayanandasagar.edu",
    office: "DSI Campus, Shavige Malleshwara Hills, Bangalore - 560111",
    gender: "male",
    intentId: "college_information",
    directoryUrl: "https://www.dscasc.edu.in/about-us/about-dscasc",
    links: [
      {
        title: "About DSCASC & Heritage",
        url: "https://www.dscasc.edu.in/about-us/about-dscasc",
        description: "History and founding vision of Late Sri R. Dayananda Sagar",
      },
    ],
    nameAliases: [
      "dayananda sagar",
      "r dayananda sagar",
      "sri r dayananda sagar",
      "sri dayananda sagar",
    ],
    roleAliases: [
      "founder",
      "founder of dscasc",
      "founder of dsi",
      "who founded the college",
      "who founded dscasc",
    ],
  },
};

/**
 * Detect the question predicate (what specific attribute is being asked about)
 */
export function detectPredicate(query: string): EntityPredicate {
  const q = query.toLowerCase();

  if (
    q.includes("qualification") ||
    q.includes("qualifications") ||
    q.includes("degree") ||
    q.includes("degrees") ||
    q.includes("phd") ||
    q.includes("mca") ||
    q.includes("mba") ||
    q.includes("educational background") ||
    q.includes("studied")
  ) {
    return "qualifications";
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("number") ||
    q.includes("call") ||
    q.includes("reach") ||
    q.includes("mobile")
  ) {
    return "contact";
  }

  if (
    q.includes("designation") ||
    q.includes("role") ||
    q.includes("post") ||
    q.includes("position") ||
    q.includes("title") ||
    q.includes("heads") ||
    q.includes("head")
  ) {
    return "role";
  }

  if (
    q.includes("office") ||
    q.includes("cabin") ||
    q.includes("room") ||
    q.includes("where is his") ||
    q.includes("where is her")
  ) {
    return "office";
  }

  return "overview";
}

/**
 * Check if the query matches an explicit known entity or role alias
 */
export function matchEntity(query: string): EntityProfile | null {
  const q = normalizeText(query);

  // Check longer aliases first to avoid substring prefix collisions
  for (const entity of Object.values(ENTITY_REGISTRY)) {
    const allAliases = [...entity.nameAliases, ...entity.roleAliases].sort(
      (a, b) => b.length - a.length
    );
    for (const alias of allAliases) {
      const normalizedAlias = normalizeText(alias);
      if (!normalizedAlias) continue;
      const escaped = normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, "i");
      if (regex.test(q)) {
        return entity;
      }
    }
  }

  return null;
}

/**
 * Check if query contains personal referent pronouns (e.g. she, her, his, he)
 * and resolve against session-local context
 */
export function resolvePronounEntity(
  query: string,
  context?: ChatContext
): EntityProfile | null {
  if (!context || !context.lastEntityId) return null;
  const lastEntity = ENTITY_REGISTRY[context.lastEntityId];
  if (!lastEntity) return null;

  const q = normalizeText(query);
  const words = new Set(q.split(/\s+/));

  const hasFemalePronoun = words.has("she") || words.has("her") || words.has("hers");
  const hasMalePronoun = words.has("he") || words.has("his") || words.has("him");

  // Strict gender consistency: if an explicit pronoun is used that conflicts with the active entity, do not resolve
  if (hasFemalePronoun) {
    return lastEntity.gender === "female" ? lastEntity : null;
  }

  if (hasMalePronoun) {
    return lastEntity.gender === "male" ? lastEntity : null;
  }

  // Neutral referents: they, their
  if (words.has("they") || words.has("their")) {
    return lastEntity;
  }

  // Elliptic follow-ups without explicit pronouns (e.g. "qualifications?", "contact info?")
  if (
    words.has("qualifications") ||
    words.has("qualification") ||
    words.has("designation") ||
    (words.has("email") && words.size <= 4) ||
    (words.has("contact") && words.size <= 4) ||
    (words.has("phone") && words.size <= 4)
  ) {
    return lastEntity;
  }

  return null;
}

/**
 * Detect queries asking "Who is <unrecognized name>" to clarify rather than hallucinate
 */
export function checkAmbiguousPersonQuery(query: string): string | null {
  const q = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Pattern 1: Explicit person title (e.g. "tell me about dr kumar", "profile of prof sharma")
  const titleMatch = q.match(
    /^(?:who\s+is|who\s+was|tell\s+me\s+about|details\s+of|profile\s+of)\s+(?:dr\s+|prof\s+|professor\s+|mr\s+|mrs\s+|ms\s+)([a-z\s]+)$/i
  );
  if (titleMatch) {
    const candidate = titleMatch[1].trim();
    if (candidate.length >= 2) {
      return candidate;
    }
  }

  // Pattern 2: "Who is <name>"
  const whoIsMatch = q.match(/^(?:who\s+is|who\s+was)\s+([a-z\s]+)$/i);
  if (whoIsMatch) {
    const candidate = whoIsMatch[1].trim();
    const candidateWords = candidate.split(/\s+/);

    // Tokens indicating institutional roles or departments rather than a person's name
    const nonPersonTokens = new Set([
      "faculty",
      "professors",
      "professor",
      "teacher",
      "teachers",
      "staff",
      "lecturer",
      "lecturers",
      "hod",
      "head",
      "director",
      "dean",
      "course",
      "courses",
      "department",
      "syllabus",
      "timetable",
      "fee",
      "fees",
      "admission",
      "admissions",
      "placement",
      "placements",
      "bca",
      "bba",
      "bcom",
      "bsc",
      "mca",
      "mba",
      "mcom",
      "commerce",
      "management",
      "science",
      "dscasc",
      "college",
      "founder",
    ]);

    const hasNonPersonToken = candidateWords.some((w) => nonPersonTokens.has(w));
    if (hasNonPersonToken) {
      return null;
    }

    if (candidate.length >= 3) {
      return candidate;
    }
  }

  return null;
}

/**
 * Generate structured IntentResponse for an entity match
 */
export function buildEntityResponse(
  entity: EntityProfile,
  predicate: EntityPredicate
): IntentResponse {
  const isFemale = entity.gender === "female";
  const proSubj = isFemale ? "She" : "He";
  const proPoss = isFemale ? "Her" : "His";

  let text = "";

  if (predicate === "qualifications") {
    text = `Academic Qualifications of ${entity.name}:\n\n• Degrees: ${entity.qualifications}\n• Official Role: ${entity.role}\n• Department: ${entity.department}${
      entity.specialization ? `\n• Specialization Areas: ${entity.specialization}` : ""
    }\n\n${proSubj} can be reached at the departmental office in ${entity.office}.`;
  } else if (predicate === "contact") {
    text = `Official Contact Details for ${entity.name} (${entity.role}):\n\n• Office Phone: ${entity.phone}\n• Official Email: ${entity.email}\n• Campus Location: ${entity.office}`;
  } else if (predicate === "role") {
    text = `${entity.name} serves as ${entity.role} at Dayananda Sagar College of Arts, Science and Commerce.\n\n• Department: ${entity.department}\n• Official Email: ${entity.email}\n• Qualifications: ${entity.qualifications}`;
  } else if (predicate === "office") {
    text = `The office of ${entity.name} (${entity.role}) is located at:\n\n• Campus Location: ${entity.office}\n• Official Phone: ${entity.phone}\n• Email: ${entity.email}`;
  } else {
    // "overview"
    text = `${entity.name} — ${entity.role}, ${entity.department}:\n\n• Qualifications: ${entity.qualifications}\n• Official Email: ${entity.email}\n• Office Phone: ${entity.phone}\n• Campus Office: ${entity.office}${
      entity.specialization ? `\n• Specialization Areas: ${entity.specialization}` : ""
    }`;
  }

  const suggestions: string[] = [];
  if (predicate !== "qualifications") {
    suggestions.push(`What are ${proPoss.toLowerCase()} qualifications?`);
  }
  if (predicate !== "contact") {
    suggestions.push(`What is ${proPoss.toLowerCase()} email address?`);
  }

  if (entity.id === "aruna_devi") {
    suggestions.push("Who is the Principal of DSCASC?");
    suggestions.push("Where can I find the BCA timetable?");
  } else if (entity.id === "balu_l") {
    suggestions.push("Who is the BCA HOD?");
    suggestions.push("Where is the college located?");
  } else if (entity.id === "geetha_raheja") {
    suggestions.push("What is the placement record?");
    suggestions.push("Which companies visit for campus placements?");
  }

  return {
    text,
    cardType: "contact",
    contact: {
      name: entity.name,
      role: entity.role,
      phone: entity.phone,
      email: entity.email,
      address: entity.office,
    },
    links: entity.links,
    source: {
      name: `DSCASC ${entity.department}`,
      url: entity.directoryUrl || "https://www.dscasc.edu.in/",
      lastVerified: "2024-25",
    },
    suggestions,
  };
}

/**
 * Clarification response when an unrecognized faculty name is asked
 */
export function buildAmbiguousClarificationResponse(name: string): IntentResponse {
  return {
    text: `I could not locate an individual faculty profile for "${name}" in the currently published DSCASC records.\n\nThe official institutional leadership published by the college includes:\n• Dr. Balu L — Principal, DSCASC (principal-dscasc@dayanandasagar.edu)\n• Dr. Aruna Devi C — Associate Professor & HOD, Computer Applications (BCA)\n• Prof. Murugesha B N — Assistant Professor & HOD, Commerce (B.Com)\n• Prof. Rekha M P — Assistant Professor & HOD, Management (BBA)\n• Ms. Geetha H Raheja — Head, Corporate Relations & Placements\n\nDSCASC publishes individual faculty rosters on respective department portals (B.Com, BCA, BBA, B.Sc). To view official faculty profiles, please consult the respective department directory or the College Directory.`,
    cardType: "links",
    links: [
      {
        title: "B.Com Faculty Directory",
        url: "https://www.dscasc.edu.in/bcom/bcom-faculty",
        description: "Official roster of 34 Commerce teaching faculty members",
      },
      {
        title: "BCA Department Faculty Directory",
        url: "https://www.dscasc.edu.in/bca/bca-faculty",
        description: "Official roster of Computer Applications teaching faculty",
      },
      {
        title: "DSCASC Contact & Department Directory",
        url: "https://www.dscasc.edu.in/contact",
        description: "Official contact directory for all academic departments and administration",
      },
      {
        title: "DSCASC Leadership & Principal's Desk",
        url: "https://www.dscasc.edu.in/about-us/leadership/ppl-msg",
        description: "Principal Dr. Balu L welcome message and administration",
      },
    ],
    source: {
      name: "DSCASC Institutional Directory",
      url: "https://www.dscasc.edu.in/contact",
      lastVerified: "2024-25",
    },
    suggestions: [
      "Who is the HOD of B.Com?",
      "Who is the HOD of BCA?",
      "Who is the Principal of DSCASC?",
      "How do I contact DSCASC?",
    ],
  };
}
