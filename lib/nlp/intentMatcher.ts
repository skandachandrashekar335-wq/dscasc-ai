/**
 * DSCASC AI - Intent Matcher
 * End-to-end NLP Classification Pipeline:
 * USER QUERY -> NORMALIZATION -> TOKENIZATION -> STOPWORDS -> TF-IDF -> COSINE SIMILARITY -> RANKING -> CONFIDENCE -> KNOWLEDGE BASE LOOKUP
 */

import { normalizeText } from "./normalizer";
import { tokenize } from "./tokenizer";
import { removeStopwords } from "./stopwords";
import { TfidfVectorizer, Vector } from "./tfidf";
import { cosineSimilarity } from "./cosineSimilarity";
import { evaluateConfidence, DEFAULT_CONFIDENCE_THRESHOLD } from "./confidence";
import { Intent, KNOWLEDGE_BASE, FALLBACK_INTENT } from "../knowledgeBase";

export interface IntentAlternative {
  id: string;
  title: string;
  score: number;
}

export interface MatchResult {
  matchedIntent: Intent;
  detectedIntentId: string;
  confidence: number;
  isConfident: boolean;
  threshold: number;
  method: string;
  alternatives: IntentAlternative[];
  normalizedQuery: string;
  tokens: string[];
  executionTimeMs: number;
}

interface IndexedExample {
  intentId: string;
  rawText: string;
  tokens: string[];
  vector: Vector;
}

export class IntentMatcher {
  private vectorizer: TfidfVectorizer;
  private intents: Map<string, Intent> = new Map();
  private indexedExamples: IndexedExample[] = [];
  private threshold: number;

  constructor(intents: Intent[] = KNOWLEDGE_BASE, threshold: number = DEFAULT_CONFIDENCE_THRESHOLD) {
    this.vectorizer = new TfidfVectorizer();
    this.threshold = threshold;
    this.train(intents);
  }

  /**
   * Train and index all intent examples
   */
  public train(intents: Intent[]): void {
    this.intents.clear();
    this.indexedExamples = [];

    const allCorpusTokens: string[][] = [];
    const tempExamples: Array<{ intentId: string; rawText: string; tokens: string[] }> = [];

    for (const intent of intents) {
      this.intents.set(intent.id, intent);

      for (const example of intent.examples) {
        const normalized = normalizeText(example);
        const rawTokens = tokenize(normalized);
        const cleanTokens = removeStopwords(rawTokens);

        allCorpusTokens.push(cleanTokens);
        tempExamples.push({
          intentId: intent.id,
          rawText: example,
          tokens: cleanTokens,
        });
      }
    }

    // Fit TF-IDF on corpus
    this.vectorizer.fit(allCorpusTokens);

    // Compute vectors for each example
    this.indexedExamples = tempExamples.map((ex) => ({
      intentId: ex.intentId,
      rawText: ex.rawText,
      tokens: ex.tokens,
      vector: this.vectorizer.transform(ex.tokens),
    }));
  }

  /**
   * Match a user query through the NLP pipeline
   */
  public match(query: string, customThreshold?: number): MatchResult {
    const startTime = performance.now();
    const activeThreshold = customThreshold !== undefined ? customThreshold : this.threshold;

    // 1. Text Normalization
    const normalizedQuery = normalizeText(query);

    // Empty or nonsense query check
    if (!normalizedQuery || normalizedQuery.trim().length === 0) {
      const execTime = Math.round((performance.now() - startTime) * 100) / 100;
      return {
        matchedIntent: FALLBACK_INTENT,
        detectedIntentId: "unknown",
        confidence: 0,
        isConfident: false,
        threshold: activeThreshold,
        method: "NLP Pipeline (Empty Input)",
        alternatives: [],
        normalizedQuery: "",
        tokens: [],
        executionTimeMs: execTime,
      };
    }

    // 2. Tokenization
    const rawTokens = tokenize(normalizedQuery);

    // 3. Stopwords Removal
    const tokens = removeStopwords(rawTokens);

    // 4. TF-IDF Vectorization
    const queryVector = this.vectorizer.transform(tokens);

    // 5. Cosine Similarity Calculation against all examples
    const intentScores = new Map<string, number>();

    for (const example of this.indexedExamples) {
      const similarity = cosineSimilarity(queryVector, example.vector);
      const currentBest = intentScores.get(example.intentId) || 0;

      if (similarity > currentBest) {
        intentScores.set(example.intentId, similarity);
      }
    }

    // 6. Rank Candidates
    const ranked: Array<{ id: string; score: number }> = [];
    for (const [intentId, score] of intentScores.entries()) {
      ranked.push({ id: intentId, score });
    }

    ranked.sort((a, b) => b.score - a.score);

    // 7. Confidence Evaluation
    const topMatch = ranked[0];
    const topScore = topMatch ? topMatch.score : 0;
    const confidenceEval = evaluateConfidence(topScore, activeThreshold);

    // 8. Alternatives Preparation (top 3 below best match)
    const alternatives: IntentAlternative[] = ranked
      .slice(1, 4)
      .filter((item) => item.score > 0.15)
      .map((item) => {
        const intent = this.intents.get(item.id);
        return {
          id: item.id,
          title: intent ? intent.title : item.id,
          score: Math.round(item.score * 1000) / 1000,
        };
      });

    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    // 9. Return Matched Intent or Fallback
    if (confidenceEval.isConfident && topMatch && this.intents.has(topMatch.id)) {
      const matched = this.intents.get(topMatch.id)!;
      return {
        matchedIntent: matched,
        detectedIntentId: matched.id,
        confidence: Math.round(topScore * 1000) / 1000,
        isConfident: true,
        threshold: activeThreshold,
        method: "TF-IDF + Cosine Similarity",
        alternatives,
        normalizedQuery,
        tokens,
        executionTimeMs,
      };
    } else {
      return {
        matchedIntent: FALLBACK_INTENT,
        detectedIntentId: topMatch ? topMatch.id : "unknown",
        confidence: Math.round(topScore * 1000) / 1000,
        isConfident: false,
        threshold: activeThreshold,
        method: "TF-IDF + Cosine Similarity (Fallback Triggered)",
        alternatives,
        normalizedQuery,
        tokens,
        executionTimeMs,
      };
    }
  }

  public getThreshold(): number {
    return this.threshold;
  }

  public setThreshold(val: number): void {
    this.threshold = val;
  }
}

// Global Singleton Instance
let defaultMatcherInstance: IntentMatcher | null = null;

export function getIntentMatcher(): IntentMatcher {
  if (!defaultMatcherInstance) {
    defaultMatcherInstance = new IntentMatcher(KNOWLEDGE_BASE);
  }
  return defaultMatcherInstance;
}

export function matchUserQuery(query: string, customThreshold?: number): MatchResult {
  return getIntentMatcher().match(query, customThreshold);
}
