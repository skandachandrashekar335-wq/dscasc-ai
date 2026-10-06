/**
 * DSCASC AI - Text Normalizer
 * Normalizes user queries by lowercasing, handling contractions, common slang/typos,
 * removing excessive punctuation, and trimming whitespace.
 */

const COMMON_SLANG_MAP: Record<string, string> = {
  "r": "are",
  "u": "you",
  "ur": "your",
  "wat": "what",
  "wht": "what",
  "whn": "when",
  "wen": "when",
  "wer": "where",
  "whr": "where",
  "hw": "how",
  "plz": "please",
  "pls": "please",
  "info": "information",
  "tymtable": "timetable",
  "timetbl": "timetable",
  "sylabus": "syllabus",
  "syllbus": "syllabus",
  "placment": "placement",
  "placements": "placement",
  "plcmnt": "placement",
  "addmission": "admission",
  "admisn": "admission",
  "admissions": "admission",
  "eligiblity": "eligibility",
  "documnts": "documents",
  "docmnts": "documents",
  "certifcates": "certificates",
  "exm": "exam",
  "exms": "exams",
  "faclty": "faculty",
  "clg": "college",
  "collge": "college",
  "collg": "college",
};

/**
 * Normalizes input text into a standardized clean format
 */
export function normalizeText(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  // 1. Lowercase
  let normalized = text.toLowerCase();

  // 2. Normalize acronyms with dots like b.c.a -> bca, b.com -> bcom, b.sc -> bsc
  normalized = normalized.replace(/\bb\.c\.a\.?\b/g, "bca");
  normalized = normalized.replace(/\bb\.b\.a\.?\b/g, "bba");
  normalized = normalized.replace(/\bb\.com\.?\b/g, "bcom");
  normalized = normalized.replace(/\bb\.sc\.?\b/g, "bsc");
  normalized = normalized.replace(/\bm\.c\.a\.?\b/g, "mca");
  normalized = normalized.replace(/\bm\.b\.a\.?\b/g, "mba");
  normalized = normalized.replace(/\bm\.com\.?\b/g, "mcom");
  normalized = normalized.replace(/\b([a-z])\.([a-z])\.([a-z])\b/g, "$1$2$3");
  normalized = normalized.replace(/\b([a-z])\.([a-z])\b/g, "$1$2");

  // 3. Remove punctuation except alphanumeric, spaces, and hyphens
  normalized = normalized.replace(/[^\w\s-]/g, " ");

  // 4. Split into words and map common typos / abbreviations
  const words = normalized.split(/\s+/).filter(Boolean);
  const correctedWords = words.map((w) => {
    // Collapse repeating letters (e.g. feeees -> fees, helllo -> hello)
    const collapsed = w.replace(/(.)\1{2,}/g, "$1$1");
    return COMMON_SLANG_MAP[collapsed] || COMMON_SLANG_MAP[w] || collapsed;
  });

  return correctedWords.join(" ").trim();
}
