export const SITE_NAME = 'AI Insights Blogs';
export const SITE_DESCRIPTION = 'Your premier destination for deep-dive articles on AI Agents, Large Language Models, and Generative AI. Stay ahead with expert insights, tutorials, and analysis.';
export const SITE_URL = 'https://aiinsightsblogs.com';
export const BLOGS_PER_PAGE = 9;

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'most-viewed', label: 'Most Viewed' },
  { value: 'most-popular', label: 'Most Popular' },
  { value: 'highest-rated', label: 'Highest Rated' },
] as const;

export const AI_TOPICS = [
  { id: '1', name: 'AI Agents', slug: 'ai-agents', icon: '🤖', color: '#0ea5e9' },
  { id: '2', name: 'LLMs', slug: 'llms', icon: '🧠', color: '#10b981' },
  { id: '3', name: 'Generative AI', slug: 'generative-ai', icon: '✨', color: '#f59e0b' },
  { id: '4', name: 'Robotics', slug: 'robotics', icon: '⚙️', color: '#ef4444' },
  { id: '5', name: 'Machine Learning', slug: 'machine-learning', icon: '📊', color: '#8b5cf6' },
  { id: '6', name: 'Computer Vision', slug: 'computer-vision', icon: '👁️', color: '#ec4899' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
];
