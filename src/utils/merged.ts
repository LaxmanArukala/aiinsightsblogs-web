import MERGED from '@/src/data/merged-articles.json';

/**
 * Articles merged into a canonical copy during the duplicate consolidation.
 *
 * Half the archive was near-duplicate — 166 topics written 2 to 14 times each —
 * which is why Google crawls without indexing and AdSense flagged the site as
 * low-value content. Each duplicate permanently redirects to the copy that was
 * kept, so no URL 404s and the ranking signals consolidate onto one page.
 *
 * Keyed by article id, so a redirect survives a slug change.
 */
const MAP = MERGED as Record<string, string>;

export function mergedTarget(id: string): string | null {
  return MAP[id] ?? null;
}

export const MERGED_IDS: ReadonlySet<string> = new Set(Object.keys(MAP));
