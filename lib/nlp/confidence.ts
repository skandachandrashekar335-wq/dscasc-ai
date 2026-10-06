/**
 * DSCASC AI - Confidence Scoring and Threshold Management
 */

export const DEFAULT_CONFIDENCE_THRESHOLD = 0.38;

export interface ConfidenceEvaluation {
  score: number;
  isConfident: boolean;
  threshold: number;
  percentage: number;
}

/**
 * Evaluates whether a raw similarity score meets the confidence threshold
 */
export function evaluateConfidence(
  rawScore: number,
  threshold: number = DEFAULT_CONFIDENCE_THRESHOLD
): ConfidenceEvaluation {
  const score = Math.max(0, Math.min(1, rawScore));
  const isConfident = score >= threshold;
  const percentage = Math.round(score * 100);

  return {
    score,
    isConfident,
    threshold,
    percentage,
  };
}
