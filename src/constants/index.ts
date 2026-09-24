/**
 * Environment-provided configuration.
 *
 * Every NEXT_PUBLIC_* value is inlined into the client bundle at build time and is
 * publicly readable — these are environment config, not secrets. Each must be read
 * as a full literal member access for Next.js to substitute it.
 *
 * The analytics IDs intentionally have no hardcoded fallback: an unset value
 * disables the tag rather than silently reporting into the production property from
 * the wrong environment. They are set per environment in `.env.*`; the deploy rsync
 * copies `.env.production` to the EC2 box, where the build reads it.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.aiinsightsblogs.com';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? '';
export const BING_SITE_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? '';

/** AdSense ad-unit ids. Empty means the placement renders nothing in production. */
export const ADSENSE_SLOT_SIDEBAR = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? '';

export const SITE_NAME = 'AI Insights Blogs';
export const SITE_DESCRIPTION = 'Your premier destination for deep-dive articles on AI Agents, Large Language Models, and Generative AI. Stay ahead with expert insights, tutorials, and analysis.';
export const SITE_URL = 'https://aiinsightsblogs.com';
export const BLOGS_PER_PAGE = 12;

/**
 * The API expects UNDERSCORED sort values. The app previously sent hyphenated ones
 * ('most-viewed'), which the backend could not map to a column — it answered
 *   {"status":false,"errors":["column \"undefined\" does not exist"]}
 * and the listing rendered "No articles found". Every value below is verified
 * against the live API.
 *
 * Note `top_rated` is thin: only a handful of posts carry a non-zero rating.
 */
export const SORT_OPTIONS = [
  { value: 'latest',      label: 'Latest' },
  { value: 'oldest',      label: 'Oldest' },
  { value: 'most_viewed', label: 'Most viewed' },
  { value: 'most_liked',  label: 'Most liked' },
  { value: 'top_rated',   label: 'Top rated' },
] as const;

/*
 * AI_TOPICS and BLOG_CATEGORIES lived here and disagreed with each other and with
 * the API (6 vs 8 vs 9 categories). Every surface now reads the categories API via
 * src/utils/categories.ts, which also holds the per-slug icon and blurb.
 */

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
