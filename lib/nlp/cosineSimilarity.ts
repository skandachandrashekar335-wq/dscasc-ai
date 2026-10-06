/**
 * DSCASC AI - Cosine Similarity
 * Calculates the cosine of the angle between two multi-dimensional TF-IDF vectors:
 * cos(theta) = (A . B) / (||A|| * ||B||)
 */

import { Vector } from "./tfidf";

export function cosineSimilarity(vecA: Vector, vecB: Vector): number {
  if (!vecA || !vecB) return 0;

  let dotProduct = 0;
  let normASq = 0;
  let normBSq = 0;

  for (const term in vecA) {
    const valA = vecA[term];
    normASq += valA * valA;
    if (term in vecB) {
      dotProduct += valA * vecB[term];
    }
  }

  for (const term in vecB) {
    const valB = vecB[term];
    normBSq += valB * valB;
  }

  if (normASq === 0 || normBSq === 0) {
    return 0;
  }

  const denominator = Math.sqrt(normASq) * Math.sqrt(normBSq);
  const similarity = dotProduct / denominator;

  // Clamp between 0.0 and 1.0 (since TF-IDF weights are non-negative)
  return Math.min(1.0, Math.max(0.0, similarity));
}
