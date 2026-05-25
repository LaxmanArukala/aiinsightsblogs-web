import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/src/constants';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: `Read the Terms and Conditions for ${SITE_NAME}. Understand the rules governing your use of our website and content.`,
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
  openGraph: {
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: `The terms governing your use of ${SITE_NAME} and its content.`,
    url: `${SITE_URL}/terms-and-conditions`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
