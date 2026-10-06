/**
 * DSCASC AI - TF-IDF Vectorizer
 * Computes Term Frequency (TF) and Inverse Document Frequency (IDF)
 * with standard Laplace smoothing for explainable NLP representation.
 */

export interface Vector {
  [term: string]: number;
}

export class TfidfVectorizer {
  private vocabulary: Set<string> = new Set();
  private idfMap: Map<string, number> = new Map();
  private documentCount: number = 0;

  /**
   * Train the vectorizer on a corpus of tokenized documents
   */
  public fit(tokenizedDocuments: string[][]): void {
    this.documentCount = tokenizedDocuments.length;
    this.vocabulary.clear();
    this.idfMap.clear();

    if (this.documentCount === 0) return;

    // Calculate Document Frequency (DF) for each term
    const docFrequency = new Map<string, number>();

    for (const doc of tokenizedDocuments) {
      const uniqueTerms = new Set(doc);
      for (const term of uniqueTerms) {
        this.vocabulary.add(term);
        docFrequency.set(term, (docFrequency.get(term) || 0) + 1);
      }
    }

    // Calculate Smoothed Inverse Document Frequency (IDF):
    // IDF(t) = ln((1 + N) / (1 + DF(t))) + 1
    for (const term of this.vocabulary) {
      const df = docFrequency.get(term) || 0;
      const idf = Math.log((1 + this.documentCount) / (1 + df)) + 1;
      this.idfMap.set(term, idf);
    }
  }

  /**
   * Transform tokenized text into a normalized TF-IDF vector
   */
  public transform(tokens: string[]): Vector {
    const vector: Vector = {};
    if (!tokens || tokens.length === 0) return vector;

    // 1. Calculate Term Frequency (TF)
    const termCounts = new Map<string, number>();
    for (const token of tokens) {
      termCounts.set(token, (termCounts.get(token) || 0) + 1);
    }

    const totalTerms = tokens.length;
    let normSq = 0;

    // 2. Compute TF-IDF weights: TF(t) * IDF(t)
    for (const [term, count] of termCounts.entries()) {
      if (this.idfMap.has(term)) {
        const tf = count / totalTerms;
        const idf = this.idfMap.get(term) || 1.0;
        const weight = tf * idf;
        vector[term] = weight;
        normSq += weight * weight;
      }
    }

    // 3. L2 Normalization (Euclidean norm)
    const norm = Math.sqrt(normSq);
    if (norm > 0) {
      for (const term in vector) {
        vector[term] = vector[term] / norm;
      }
    }

    return vector;
  }

  /**
   * Fit corpus and transform all documents
   */
  public fitTransform(tokenizedDocuments: string[][]): Vector[] {
    this.fit(tokenizedDocuments);
    return tokenizedDocuments.map((doc) => this.transform(doc));
  }

  /**
   * Return vocabulary size
   */
  public getVocabSize(): number {
    return this.vocabulary.size;
  }

  /**
   * Get IDF for a specific term
   */
  public getIdf(term: string): number {
    return this.idfMap.get(term) || 0;
  }
}
