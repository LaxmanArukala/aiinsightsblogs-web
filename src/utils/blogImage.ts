import { SITE_URL } from '@/src/constants';

/**
 * The API stores featured images as site-relative `/assets/blog-images/*.svg`
 * paths that were never deployed (they 404), and leaves the field empty for
 * most posts. Until real artwork exists, every post gets its own generated
 * card from `/og/[id]`, keyed on its title and category so no two match.
 *
 * An absolute http(s) value from the API always wins, so swapping in real
 * images later is purely an API change — no code change here.
 */
export function resolveBlogImage(raw: string | null | undefined, id: string, slug: string): string {
  if (raw && /^https?:\/\//.test(raw)) return raw;
  return `/og/${id}-${slug}`;
}

/** Absolute form, for `og:image`, `twitter:image` and JSON-LD — all of which reject relative URLs. */
export function absoluteBlogImage(raw: string | null | undefined, id: string, slug: string): string {
  const resolved = resolveBlogImage(raw, id, slug);
  return resolved.startsWith('http') ? resolved : `${SITE_URL}${resolved}`;
}
