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
import {
  ChatContext,
  ENTITY_REGISTRY,
  matchEntity,
  resolvePronounEntity,
  detectPredicate,
  buildEntityResponse,
  checkAmbiguousPersonQuery,
  buildAmbiguousClarificationResponse,
} from "./entities";
import {
  inferTopicFromIntent,
  detectTopicFromQuery,
  resolveTopicFollowUp,
} from "./topics";

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
  context?: ChatContext;
}

interface IndexedExample {
  intentId: string;
  rawText: string;
  tokens: string[];
  vector: Vector;
}

/**
 * Extract an explicitly mentioned course/department from user query
 */
export function extractCourseFromQuery(query: string): string | null {
  const q = query.toLowerCase();
  const words = new Set(q.split(/\s+/));

  if (words.has("bcom") || q.includes("b com") || words.has("commerce")) return "bcom";
  if (words.has("bba") || q.includes("b b a") || q.includes("business administration")) return "bba";
  if (words.has("bsc") || q.includes("b sc") || (words.has("science") && !words.has("computer"))) return "bsc";
  if (words.has("mca") || q.includes("m c a")) return "mca";
  if (words.has("mba") || q.includes("m b a")) return "mba";
  if (words.has("mcom") || q.includes("m com")) return "mcom";
  if (words.has("bca") || q.includes("b c a") || q.includes("computer application")) return "bca";

  return null;
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
  public match(query: string, customThreshold?: number, context?: ChatContext): MatchResult {
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

    // Helper to map intent to known entity profile for session context
    const inferEntityFromIntent = (
      intentId: string,
      queryWordTokens?: Set<string>
    ): { id: string; name: string } | undefined => {
      let entityId: string | undefined;
      if (intentId === "faculty_information") entityId = "aruna_devi";
      else if (intentId === "bcom_faculty") entityId = "murugesha_b_n";
      else if (intentId === "bba_faculty") entityId = "rekha_m_p";
      else if (intentId === "bsc_faculty") entityId = "guruprasad_m_s";
      else if (intentId === "mba_faculty") entityId = "gokula_krishnan";
      else if (intentId === "mca_faculty") entityId = "kumudavalli_m_v";
      else if (intentId === "mcom_faculty") entityId = "mahalakshmi_v";
      else if (intentId === "principal_information") entityId = "balu_l";
      else if (intentId === "placement_contact") entityId = "geetha_raheja";
      else if (intentId === "college_information") entityId = "dayananda_sagar";

      if (!entityId) return undefined;
      const profile = ENTITY_REGISTRY[entityId];
      if (!profile) return undefined;

      // If query has explicit gender pronouns, check for conflict
      if (queryWordTokens) {
        const hasMalePronoun = queryWordTokens.has("he") || queryWordTokens.has("his") || queryWordTokens.has("him");
        const hasFemalePronoun = queryWordTokens.has("she") || queryWordTokens.has("her") || queryWordTokens.has("hers");
        if (hasMalePronoun && profile.gender === "female") {
          return undefined; // Gender mismatch: cannot bind female entity
        }
        if (hasFemalePronoun && profile.gender === "male") {
          return undefined; // Gender mismatch: cannot bind male entity
        }
      }

      return { id: profile.id, name: profile.name };
    };

    const queryWordTokens = new Set(tokenize(normalizedQuery));

    // 2. Topic-Aware Follow-Up Query Resolution
    if (context && context.lastTopic) {
      const topicResolution = resolveTopicFollowUp(normalizedQuery, context);
      if (topicResolution) {
        const execTime = Math.round((performance.now() - startTime) * 100) / 100;

        if (topicResolution.clarification) {
          const clarificationIntent: Intent = {
            id: "topic_clarification",
            category: "general",
            title: "Topic Clarification",
            examples: [],
            response: topicResolution.clarification,
          };

          return {
            matchedIntent: clarificationIntent,
            detectedIntentId: "topic_clarification",
            confidence: topicResolution.confidence,
            isConfident: true,
            threshold: activeThreshold,
            method: topicResolution.method,
            alternatives: [],
            normalizedQuery,
            tokens: tokenize(normalizedQuery),
            executionTimeMs: execTime,
            context: {
              lastTopic: context.lastTopic,
              lastTopicLabel: context.lastTopicLabel,
              lastIntentId: "topic_clarification",
            },
          };
        }

        if (topicResolution.intentId && this.intents.has(topicResolution.intentId)) {
          const resolvedIntent = this.intents.get(topicResolution.intentId)!;
          const entityInfo = inferEntityFromIntent(resolvedIntent.id, queryWordTokens);
          const topicInfo = inferTopicFromIntent(resolvedIntent.id);

          return {
            matchedIntent: resolvedIntent,
            detectedIntentId: resolvedIntent.id,
            confidence: topicResolution.confidence,
            isConfident: true,
            threshold: activeThreshold,
            method: topicResolution.method,
            alternatives: [],
            normalizedQuery,
            tokens: tokenize(normalizedQuery),
            executionTimeMs: execTime,
            context: {
              lastEntityId: entityInfo?.id || context.lastEntityId,
              lastEntityName: entityInfo?.name || context.lastEntityName,
              lastTopic: context.lastTopic,
              lastTopicLabel: context.lastTopicLabel,
              lastIntentId: resolvedIntent.id,
            },
          };
        }
      }
    }

    // 3. Conversational Context & Pronoun Follow-up Resolution (Phase 4)
    if (context && context.lastEntityId) {
      const resolvedContextEntity = resolvePronounEntity(normalizedQuery, context);
      if (resolvedContextEntity) {
        const predicate = detectPredicate(normalizedQuery);
        const entityResponse = buildEntityResponse(resolvedContextEntity, predicate);
        const execTime = Math.round((performance.now() - startTime) * 100) / 100;

        const syntheticIntent: Intent = {
          id: resolvedContextEntity.intentId,
          category: this.intents.get(resolvedContextEntity.intentId)?.category || "academics",
          title: `${resolvedContextEntity.name} (${predicate})`,
          examples: [],
          response: entityResponse,
        };

        return {
          matchedIntent: syntheticIntent,
          detectedIntentId: resolvedContextEntity.intentId,
          confidence: 0.98,
          isConfident: true,
          threshold: activeThreshold,
          method: "Conversational Context Resolution (Pronoun Follow-up)",
          alternatives: [],
          normalizedQuery,
          tokens: tokenize(normalizedQuery),
          executionTimeMs: execTime,
          context: {
            lastEntityId: resolvedContextEntity.id,
            lastEntityName: resolvedContextEntity.name,
            lastTopic: context.lastTopic,
            lastTopicLabel: context.lastTopicLabel,
            lastIntentId: resolvedContextEntity.intentId,
          },
        };
      }
    }

    // 4. Explicit Named Entity & Role Alias Recognition (Phase 2)
    const matchedEntity = matchEntity(normalizedQuery);
    if (matchedEntity) {
      const predicate = detectPredicate(normalizedQuery);
      const entityResponse = buildEntityResponse(matchedEntity, predicate);
      const execTime = Math.round((performance.now() - startTime) * 100) / 100;
      const entityTopic = inferTopicFromIntent(matchedEntity.intentId);

      const syntheticIntent: Intent = {
        id: matchedEntity.intentId,
        category: this.intents.get(matchedEntity.intentId)?.category || "academics",
        title: `${matchedEntity.name} (${predicate})`,
        examples: [],
        response: entityResponse,
      };

      return {
        matchedIntent: syntheticIntent,
        detectedIntentId: matchedEntity.intentId,
        confidence: 1.0,
        isConfident: true,
        threshold: activeThreshold,
        method: "Lightweight Named Entity Recognition",
        alternatives: [],
        normalizedQuery,
        tokens: tokenize(normalizedQuery),
        executionTimeMs: execTime,
        context: {
          lastEntityId: matchedEntity.id,
          lastEntityName: matchedEntity.name,
          lastTopic: entityTopic?.topic || context?.lastTopic,
          lastTopicLabel: entityTopic?.label || context?.lastTopicLabel,
          lastIntentId: matchedEntity.intentId,
        },
      };
    }

    // 5. Ambiguous / Unknown Person Query Clarification (Phase 2, Requirement 7 & 8)
    const ambiguousName = checkAmbiguousPersonQuery(normalizedQuery);
    if (ambiguousName) {
      const clarificationResponse = buildAmbiguousClarificationResponse(ambiguousName);
      const execTime = Math.round((performance.now() - startTime) * 100) / 100;

      const clarificationIntent: Intent = {
        id: "faculty_clarification",
        category: "academics",
        title: "Faculty Directory Information",
        examples: [],
        response: clarificationResponse,
      };

      return {
        matchedIntent: clarificationIntent,
        detectedIntentId: "faculty_clarification",
        confidence: 0.85,
        isConfident: true,
        threshold: activeThreshold,
        method: "Entity Disambiguation / Clarification",
        alternatives: [],
        normalizedQuery,
        tokens: tokenize(normalizedQuery),
        executionTimeMs: execTime,
      };
    }

    // 5. Explainable TF-IDF Vectorization & Cosine Similarity Matching
    const rawTokens = tokenize(normalizedQuery);
    const tokens = removeStopwords(rawTokens);
    const queryVector = this.vectorizer.transform(tokens);

    // 6. Cosine Similarity Calculation against all examples
    const intentScores = new Map<string, number>();
    const explicitQueryCourse = extractCourseFromQuery(normalizedQuery);

    for (const example of this.indexedExamples) {
      const similarity = cosineSimilarity(queryVector, example.vector);
      const currentBest = intentScores.get(example.intentId) || 0;

      if (similarity > currentBest) {
        intentScores.set(example.intentId, similarity);
      }
    }

    // Strict Department Isolation: if query explicitly mentions a course/department,
    // eliminate intents tagged with a conflicting departmentId or general faculty overview.
    if (explicitQueryCourse) {
      for (const [intentId] of intentScores.entries()) {
        const intent = this.intents.get(intentId);
        if (
          intent &&
          intent.departmentId &&
          (intent.departmentId !== explicitQueryCourse || intentId === "faculty_overview")
        ) {
          intentScores.set(intentId, 0);
        }
      }
    }

    // 7. Rank Candidates
    const ranked: Array<{ id: string; score: number }> = [];
    for (const [intentId, score] of intentScores.entries()) {
      ranked.push({ id: intentId, score });
    }

    ranked.sort((a, b) => b.score - a.score);

    // 8. Confidence Evaluation
    const topMatch = ranked[0];
    const topScore = topMatch ? topMatch.score : 0;
    const confidenceEval = evaluateConfidence(topScore, activeThreshold);

    // 9. Alternatives Preparation (top 3 below best match)
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

    // 10. Return Matched Intent or Fallback
    if (confidenceEval.isConfident && topMatch && this.intents.has(topMatch.id)) {
      const matched = this.intents.get(topMatch.id)!;
      const topicInfo = detectTopicFromQuery(normalizedQuery) || inferTopicFromIntent(matched.id);
      const isTopicShift = Boolean(topicInfo && context?.lastTopic && topicInfo.topic !== context.lastTopic);
      const entityInfo = inferEntityFromIntent(matched.id, queryWordTokens);

      const hasMalePronoun = queryWordTokens.has("he") || queryWordTokens.has("his") || queryWordTokens.has("him");
      const hasFemalePronoun = queryWordTokens.has("she") || queryWordTokens.has("her") || queryWordTokens.has("hers");
      const activeEntityGender = context?.lastEntityId ? ENTITY_REGISTRY[context.lastEntityId]?.gender : undefined;
      const isGenderConflict = Boolean(
        activeEntityGender && (
          (hasMalePronoun && activeEntityGender === "female") ||
          (hasFemalePronoun && activeEntityGender === "male")
        )
      );

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
        context: {
          lastEntityId: entityInfo?.id || (isTopicShift || isGenderConflict ? undefined : context?.lastEntityId),
          lastEntityName: entityInfo?.name || (isTopicShift || isGenderConflict ? undefined : context?.lastEntityName),
          lastTopic: topicInfo?.topic || context?.lastTopic,
          lastTopicLabel: topicInfo?.label || context?.lastTopicLabel,
          lastIntentId: matched.id,
        },
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
        context: context, // retain context across fallback
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

export function matchUserQuery(
  query: string,
  customThreshold?: number,
  context?: ChatContext
): MatchResult {
  return getIntentMatcher().match(query, customThreshold, context);
}
