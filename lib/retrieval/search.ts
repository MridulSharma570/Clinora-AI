import { getKnowledgeEntries, isKnowledgeEntrySafe } from "@/lib/retrieval/knowledge";
import type { KnowledgeEntry } from "@/lib/retrieval/knowledge";

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "can", "for", "from", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "the", "to", "what", "when", "with",
]);

function tokenize(input: string): string[] {
  return input
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !stopWords.has(token))
    .slice(0, 48);
}

function countTerm(text: string, term: string): number {
  const tokens = tokenize(text);
  return tokens.reduce((count, token) => count + (token === term ? 1 : 0), 0);
}

function scoreEntry(entry: KnowledgeEntry, terms: string[]): number {
  return terms.reduce((score, term) => {
    const title = countTerm(entry.title, term);
    const category = countTerm(entry.category, term);
    const summary = countTerm(entry.originalSummary, term);
    return score + title * 4 + category * 2 + summary;
  }, 0);
}

/** Lightweight local weighted-keyword retrieval. No remote index or vector service. */
export function retrieveKnowledge(query: string, limit = 3): KnowledgeEntry[] {
  const safeLimit = Math.max(0, Math.min(3, Math.floor(limit)));
  if (safeLimit === 0) return [];
  const terms = [...new Set(tokenize(query))];
  if (terms.length === 0) return [];

  return getKnowledgeEntries()
    .filter(isKnowledgeEntrySafe)
    .map((entry, index) => ({ entry, index, score: scoreEntry(entry, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, safeLimit)
    .map(({ entry }) => entry);
}
