import type { Category } from '@/src/types';

/**
 * Turns API categories into the shape the marketing surfaces need.
 *
 * Every topic list on the site used to be a hardcoded constant, and the three of
 * them disagreed: the homepage claimed 6 topics, the About page 8, and the API
 * actually serves 9. The API is now the single source of truth for which topics
 * exist and how many there are.
 *
 * The API carries no icon or blurb, so presentation is kept here and joined on
 * slug. A category added in the admin still renders — it just gets the fallback
 * icon and a generic line until someone adds an entry below.
 */

export interface Topic {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
}

const META: Record<string, { icon: string; description: string }> = {
  'ai-agents':        { icon: '🤖', description: 'Planning, tool use, and multi-agent systems that act on their own.' },
  'agentic-ai':       { icon: '🕸️', description: 'RAG, LangChain, and agentic workflows wired into real automation.' },
  'llms':             { icon: '🧠', description: 'Transformers, fine-tuning, RAG pipelines, and prompt engineering.' },
  'generative-ai':    { icon: '✨', description: 'Diffusion models, image and video generation, creative tooling.' },
  'robotics':         { icon: '⚙️', description: 'Embodied AI, control systems, and humanoid platforms.' },
  'machine-learning': { icon: '📊', description: 'Training, evaluation, and the maths that sits underneath it all.' },
  'computer-vision':  { icon: '👁️', description: 'Detection, segmentation, and multimodal visual understanding.' },
  'ai-prompts':       { icon: '💬', description: 'Ready-to-use prompts and the patterns that make them work.' },
  'jobs-resumes':     { icon: '💼', description: 'Using AI to find work, sharpen a CV, and prepare for interviews.' },
  'data-science':     { icon: '📈', description: 'Analysis, feature work, and turning raw data into decisions.' },
  'general':          { icon: '🗞️', description: 'Everything else worth knowing about where AI is heading.' },
};

const FALLBACK_ICON = '✨';
const FALLBACK_DESCRIPTION = 'Articles and practical guides in this area.';

/** Used only when a category has no colour of its own. */
const PALETTE = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

/**
 * Slug for a category, matching how the API resolves a filter.
 *
 * Collapsing every run of non-alphanumerics to one hyphen matters: the previous
 * rule replaced spaces then stripped the rest, so "Jobs & Resumes" became
 * "jobs--resumes" and matched nothing.
 */
export function slugifyCategory(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function toTopics(categories: Category[]): Topic[] {
  return categories.map((c, i) => {
    const slug = c.slug || slugifyCategory(c.name);
    const meta = META[slug];
    return {
      id: c.id,
      name: c.name,
      slug,
      icon: meta?.icon ?? FALLBACK_ICON,
      color: c.color || PALETTE[i % PALETTE.length],
      description: meta?.description ?? FALLBACK_DESCRIPTION,
    };
  });
}
