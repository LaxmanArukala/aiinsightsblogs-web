import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppProviders from '@/src/components/providers/AppProviders';
import GlobalSnackbar from '@/src/components/common/GlobalSnackbar';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/src/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} — AI News & Insights`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: { title: `${SITE_NAME} — AI News & Insights`, description: SITE_DESCRIPTION, url: SITE_URL, siteName: SITE_NAME, type: 'website', images: [{ url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: `${SITE_NAME} — AI News & Insights`, description: SITE_DESCRIPTION, images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ margin: 0 }}>
        <AppProviders>
          {children}
          <GlobalSnackbar />
        </AppProviders>
      </body>
    </html>
  );
}
