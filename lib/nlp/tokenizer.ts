/**
 * DSCASC AI - Tokenizer
 * Breaks normalized text into tokens (unigrams and bigrams).
 */

export interface TokenizerOptions {
  includeBigrams?: boolean;
}

export function tokenize(text: string, options: TokenizerOptions = { includeBigrams: true }): string[] {
  if (!text || typeof text !== "string") {
    return [];
  }

  // Split by whitespace
  const rawTokens = text
    .trim()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (!options.includeBigrams || rawTokens.length < 2) {
    return rawTokens;
  }

  const tokens = [...rawTokens];

  // Add bigrams for enhanced phrase matching (e.g., "highest package", "placement record", "admission process")
  for (let i = 0; i < rawTokens.length - 1; i++) {
    tokens.push(`${rawTokens[i]}_${rawTokens[i + 1]}`);
  }

  return tokens;
}
