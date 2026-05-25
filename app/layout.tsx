import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppProviders from '@/src/components/providers/AppProviders';
import GlobalSnackbar from '@/src/components/common/GlobalSnackbar';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/src/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const OG_IMAGE = 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80';

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} — AI Agents, LLMs & Generative AI`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: ['AI Agents', 'Large Language Models', 'LLMs', 'Generative AI', 'Stable Diffusion', 'ChatGPT', 'Claude', 'LangChain', 'RAG', 'Prompt Engineering', 'AI tutorials', 'machine learning'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: SITE_URL },
  ...(process.env.NEXT_PUBLIC_ADSENSE_ID && {
    other: { 'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID },
  }),
  openGraph: {
    title: `${SITE_NAME} — AI Agents, LLMs & Generative AI`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — AI insights and tutorials` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI Agents, LLMs & Generative AI`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <AppProviders>
          {children}
          <GlobalSnackbar />
        </AppProviders>
      </body>
    </html>
  );
}
