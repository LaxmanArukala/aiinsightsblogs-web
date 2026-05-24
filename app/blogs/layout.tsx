import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/src/constants';

export const metadata: Metadata = {
  title: 'All Articles',
  description: `Browse all articles on AI Agents, Large Language Models, and Generative AI. ${SITE_DESCRIPTION}`,
  alternates: { canonical: `${SITE_URL}/blogs` },
  openGraph: {
    title: `All Articles | ${SITE_NAME}`,
    description: 'In-depth tutorials and analysis covering AI Agents, LLMs, Generative AI, Stable Diffusion, RAG pipelines, and more.',
    url: `${SITE_URL}/blogs`,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630, alt: 'AI Insights Blogs — Article Library' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `All Articles | ${SITE_NAME}`,
    description: 'In-depth tutorials and analysis on AI Agents, LLMs, and Generative AI.',
    images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80'],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
