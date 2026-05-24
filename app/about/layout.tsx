import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/src/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${SITE_NAME} — a focused knowledge hub covering AI Agents, Large Language Models, and Generative AI for developers and builders.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description: `${SITE_NAME} publishes in-depth, practitioner-written articles on AI Agents, LLMs, and Generative AI — bridging research and real-world application.`,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630, alt: `About ${SITE_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About | ${SITE_NAME}`,
    description: `${SITE_NAME} — practitioner-written deep dives on AI Agents, LLMs, and Generative AI.`,
    images: ['https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
