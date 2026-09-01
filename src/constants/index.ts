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

export const AI_TOPICS = [
  { id: '1', name: 'AI Agents', slug: 'ai-agents', icon: '🤖', color: '#0ea5e9', description: 'Planning, tool use, and multi-agent systems that act on their own.' },
  { id: '2', name: 'LLMs', slug: 'llms', icon: '🧠', color: '#10b981', description: 'Transformers, fine-tuning, RAG pipelines, and prompt engineering.' },
  { id: '3', name: 'Generative AI', slug: 'generative-ai', icon: '✨', color: '#f59e0b', description: 'Diffusion models, image and video generation, creative tooling.' },
  { id: '4', name: 'Robotics', slug: 'robotics', icon: '⚙️', color: '#ef4444', description: 'Embodied AI, control systems, and humanoid platforms.' },
  { id: '5', name: 'Machine Learning', slug: 'machine-learning', icon: '📊', color: '#8b5cf6', description: 'Training, evaluation, and the maths that sits underneath it all.' },
  { id: '6', name: 'Computer Vision', slug: 'computer-vision', icon: '👁️', color: '#ec4899', description: 'Detection, segmentation, and multimodal visual understanding.' },
];

/**
 * Categories that can actually be filtered, derived from the archive itself.
 *
 * The /api/v1/categories endpoint is not usable for this: it returns no `slug`
 * field and `blog_count: 0` on every row. Filtering works by slug only — passing a
 * display name returns zero results.
 *
 * "Jobs & Resumes" and "General" are deliberately absent: their category objects
 * carry no slug, so the API cannot filter them. They need a slug set server-side
 * before they can appear here.
 */
export const BLOG_CATEGORIES = [
  { slug: 'llms',             name: 'Large Language Models', color: '#10b981' },
  { slug: 'ai-agents',        name: 'AI Agents',             color: '#0ea5e9' },
  { slug: 'machine-learning', name: 'Machine Learning',      color: '#8b5cf6' },
  { slug: 'computer-vision',  name: 'Computer Vision',       color: '#ec4899' },
  { slug: 'generative-ai',    name: 'Generative AI',         color: '#f59e0b' },
  { slug: 'robotics',         name: 'Robotics',              color: '#ef4444' },
  { slug: 'ai-prompts',       name: 'AI Prompts',            color: '#f97316' },
  { slug: 'data-science',     name: 'Data Science',          color: '#14b8a6' },
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
