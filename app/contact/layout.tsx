import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/src/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. Submit corrections, feedback, content disputes, or general enquiries — we respond to every message.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Reach out to the ${SITE_NAME} team for corrections, feedback, or general enquiries.`,
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
