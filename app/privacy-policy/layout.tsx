import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/src/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read the Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information when you visit our website.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} collects, uses, and protects your personal data.`,
    url: `${SITE_URL}/privacy-policy`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
