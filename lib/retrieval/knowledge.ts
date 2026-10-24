import rawEntries from "@/data/knowledge/entries.json";
import rawSources from "@/data/knowledge/sources.json";
import { z } from "zod";

const entrySchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(160),
  originalSummary: z.string().min(1).max(1_200),
  category: z.string().min(1).max(100),
  sourceOrganization: z.string().min(1).max(160),
  sourceUrl: z.url().startsWith("https://"),
  lastReviewed: z.iso.date(),
  licenseOrUsageNote: z.string().min(1).max(400),
});

const sourceSchema = z.strictObject({
  organization: z.string().min(1),
  url: z.url().startsWith("https://"),
  usageNote: z.string().min(1),
});

export const knowledgeEntrySchema = entrySchema;
export type KnowledgeEntry = z.infer<typeof entrySchema>;
export type KnowledgeSource = z.infer<typeof sourceSchema>;

const entries = z.array(entrySchema).parse(rawEntries);
const sources = z.array(sourceSchema).parse(rawSources);

const injectionPattern = /(?:ignore\s+(?:all\s+|previous\s+|prior\s+)?instructions|system\s+prompt|you\s+are\s+now\s+an\s+unrestricted|reveal\s+(?:the\s+)?(?:prompt|instructions)|https?:\/\/|www\.)/i;

export function isKnowledgeEntrySafe(entry: KnowledgeEntry): boolean {
  const source = sources.find(
    (candidate) => candidate.organization === entry.sourceOrganization && candidate.url === entry.sourceUrl,
  );
  return Boolean(
    source &&
      entry.originalSummary.length <= 1_200 &&
      !injectionPattern.test(entry.originalSummary) &&
      !injectionPattern.test(entry.title),
  );
}

export function getKnowledgeEntries(): KnowledgeEntry[] {
  return entries.filter(isKnowledgeEntrySafe);
}

export function getKnowledgeEntry(id: string): KnowledgeEntry | null {
  return getKnowledgeEntries().find((entry) => entry.id === id) ?? null;
}

export interface KnowledgeResource {
  id: string;
  title: string;
  sourceOrganization: string;
  sourceUrl: string;
}

export function toKnowledgeResource(entry: KnowledgeEntry): KnowledgeResource | null {
  if (!isKnowledgeEntrySafe(entry)) return null;
  return {
    id: entry.id,
    title: entry.title,
    sourceOrganization: entry.sourceOrganization,
    sourceUrl: entry.sourceUrl,
  };
}

/** Allows only resources that exactly match current local entry/source metadata. */
export function validateKnowledgeResources(candidateIds: string[]): KnowledgeResource[] {
  const uniqueIds = [...new Set(candidateIds)].slice(0, 3);
  return uniqueIds.flatMap((id) => {
    const entry = getKnowledgeEntry(id);
    const resource = entry ? toKnowledgeResource(entry) : null;
    return resource ? [resource] : [];
  });
}
