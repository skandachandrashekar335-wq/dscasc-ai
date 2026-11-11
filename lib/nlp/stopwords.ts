/**
 * DSCASC AI - Stopwords Filter
 * Filters generic grammatical particles and interrogatives to prioritize domain terms
 * during TF-IDF vectorization.
 */

export const STOPWORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "for",
  "from",
  "get",
  "give",
  "got",
  "have",
  "has",
  "had",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "i",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "me",
  "my",
  "myself",
  "of",
  "off",
  "on",
  "or",
  "our",
  "ours",
  "please",
  "re",
  "s",
  "shall",
  "she",
  "should",
  "so",
  "some",
  "t",
  "tell",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "to",
  "too",
  "us",
  "ve",
  "was",
  "we",
  "were",
  "what",
  "when",
  "which",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
  "yours",
]);

/**
 * Filter stopwords out of token array.
 * If all tokens happen to be stopwords (e.g. "hi", "help", "hello"), keep original tokens so query vector is not empty.
 */
export function removeStopwords(tokens: string[]): string[] {
  if (!tokens || tokens.length === 0) return [];

  // Filter single tokens, allow bigrams unless both parts are stopwords
  const filtered = tokens.filter((token) => {
    if (token.includes("_")) {
      const [w1, w2] = token.split("_");
      return !STOPWORDS.has(w1) || !STOPWORDS.has(w2);
    }
    return !STOPWORDS.has(token);
  });

  return filtered.length > 0 ? filtered : tokens;
}
