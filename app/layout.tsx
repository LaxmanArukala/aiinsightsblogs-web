import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import AppProviders from '@/src/components/providers/AppProviders';
import GlobalSnackbar from '@/src/components/common/GlobalSnackbar';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, GA_MEASUREMENT_ID, GTM_CONTAINER_ID, ADSENSE_ID, BING_SITE_VERIFICATION } from '@/src/constants';

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
  other: {
    ...(BING_SITE_VERIFICATION && { 'msvalidate.01': BING_SITE_VERIFICATION }),
    ...(ADSENSE_ID && { 'google-adsense-account': ADSENSE_ID }),
  },
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
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Google Tag Manager */}
        {GTM_CONTAINER_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
          `}</Script>
        )}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}</Script>
          </>
        )}
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {GTM_CONTAINER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <AppProviders>
          {children}
          <GlobalSnackbar />
        </AppProviders>
      </body>
    </html>
  );
}
