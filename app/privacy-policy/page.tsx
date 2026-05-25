'use client';

import { Box, Container, Typography, Stack, Paper, Chip, Divider, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { SITE_NAME } from '@/src/constants';

const ACCENT = '#0ea5e9';
const EFFECTIVE_DATE = 'May 25, 2026';

const sections = [
  {
    num: '1',
    icon: <InfoOutlinedIcon fontSize="small" />,
    title: 'Information We Collect',
    body: 'We may collect basic usage data such as page visits, browser type, and referring URLs through standard analytics tools. We do not collect personal information unless you voluntarily submit it (e.g., via a contact form).',
    cards: [
      { title: 'Usage Analytics', body: 'Page visits, browser type, and referring URLs collected through standard, privacy-respecting analytics tools.' },
      { title: 'Voluntary Submissions', body: 'Personal information you choose to provide, such as your email via a contact or newsletter form.' },
    ],
  },
  {
    num: '2',
    icon: <TuneOutlinedIcon fontSize="small" />,
    title: 'How We Use Information',
    body: 'Any information collected is used solely to improve site performance and content quality. We do not sell, rent, or share your data with third parties for marketing purposes.',
    bullets: [
      'Improve site performance and understand how readers engage with content.',
      'Respond to feedback, questions, or content corrections you submit.',
      'Send newsletter updates — only if you have opted in. Unsubscribe anytime.',
    ],
  },
  {
    num: '3',
    icon: <SmartToyOutlinedIcon fontSize="small" />,
    title: 'AI Content Disclosure',
    body: 'Articles and content on this site may be created with the assistance of AI tools, including large language models. We are transparent about this and encourage users to engage critically with all content.',
  },
  {
    num: '4',
    icon: <MailOutlineIcon fontSize="small" />,
    title: 'Feedback & Contact Submissions',
    body: 'If you submit a question, correction, or content dispute, the information you provide is used only to respond to your inquiry and improve our content. We treat all submissions confidentially.',
  },
  {
    num: '5',
    icon: <CookieOutlinedIcon fontSize="small" />,
    title: 'Cookies',
    body: 'This site may use basic cookies for functionality and analytics. You may disable cookies in your browser settings at any time.',
    cards: [
      { title: 'Functional Cookies', body: 'Required for core site features such as theme preference (light/dark mode).' },
      { title: 'Analytics Cookies', body: 'Help us understand traffic patterns so we can improve content quality and navigation.' },
    ],
  },
  {
    num: '6',
    icon: <OpenInNewIcon fontSize="small" />,
    title: 'Third-Party Links',
    body: 'We may link to external sources. We are not responsible for the privacy practices or content of those sites.',
  },
  {
    num: '7',
    icon: <VerifiedUserOutlinedIcon fontSize="small" />,
    title: 'Your Rights',
    body: 'You have the right to request removal or correction of any content or data associated with you. Contact us and we will respond within a reasonable timeframe.',
    bullets: [
      'Request access to any personal data we hold about you.',
      'Ask for correction of inaccurate information.',
      'Request deletion of your data at any time.',
      'Unsubscribe from communications with a single click.',
    ],
  },
  {
    num: '8',
    icon: <ContactSupportOutlinedIcon fontSize="small" />,
    title: 'Contact',
    body: "For any questions, corrections, or content disputes, please reach out through our site's contact page. We are happy to discuss and take action where needed.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── Hero ── */}
      <Box
        sx={{
          background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 60%, #0c1a2e 100%)',
          py: { xs: 8, md: 11 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(14,165,233,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(16,185,129,0.07) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            label="Legal Document"
            size="small"
            icon={<ShieldOutlinedIcon style={{ fontSize: 14, color: ACCENT }} />}
            sx={{ bgcolor: 'rgba(14,165,233,0.12)', color: ACCENT, border: `1px solid rgba(14,165,233,0.25)`, fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.7rem', mb: 3 }}
          />
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '2.4rem', md: '3.4rem' }, letterSpacing: '-0.03em', mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography sx={{ color: ACCENT, fontSize: '0.9rem', fontWeight: 500, mb: 2 }}>
            Last Updated: {EFFECTIVE_DATE}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 560, mx: 'auto' }}>
            We value your privacy. This policy explains how we handle information in connection with this site.
          </Typography>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={0}>
            {sections.map((section, idx) => (
              <Box key={section.num} id={`section-${section.num}`}>
                {/* Section block */}
                <Box sx={{ py: { xs: 4, md: 5 } }}>
                  {/* Heading row */}
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        bgcolor: `${ACCENT}18`,
                        color: ACCENT,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.3rem' } }}>
                      {section.num}. {section.title}
                    </Typography>
                  </Stack>

                  {/* Body — first section gets the left blue border accent */}
                  <Box
                    sx={
                      idx === 0
                        ? { borderLeft: `3px solid ${ACCENT}`, pl: 2.5, mb: section.cards ? 2.5 : 0 }
                        : { mb: section.cards || section.bullets ? 2.5 : 0 }
                    }
                  >
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                      {section.body}
                    </Typography>
                  </Box>

                  {/* Sub-cards */}
                  {section.cards && (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      {section.cards.map((card) => (
                        <Paper
                          key={card.title}
                          elevation={0}
                          sx={{ flex: 1, p: 2.5, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.75 }}>{card.title}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>{card.body}</Typography>
                        </Paper>
                      ))}
                    </Stack>
                  )}

                  {/* Bullet list */}
                  {section.bullets && (
                    <Stack spacing={1}>
                      {section.bullets.map((item) => (
                        <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                          <CheckCircleOutlineIcon sx={{ fontSize: 18, color: ACCENT, mt: '3px', flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Box>

                {idx < sections.length - 1 && <Divider />}
              </Box>
            ))}
          </Stack>

          
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
