'use client';

import { Box, Container, Typography, Stack, Paper, Chip, Divider, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { SITE_NAME } from '@/src/constants';

const ACCENT = '#8b5cf6';
const EFFECTIVE_DATE = 'May 25, 2026';

const sections = [
  {
    num: '1',
    icon: <FactCheckOutlinedIcon fontSize="small" />,
    title: 'Content Accuracy',
    body: 'Articles published on this site draw on AI knowledge bases, publicly available information, and internet sources. While we strive for accuracy, AI-generated content may contain errors, outdated information, or gaps in knowledge. We do not guarantee the completeness or accuracy of any content.',
    cards: [
      { id: '1a', title: 'AI-Assisted Writing', body: 'Some content is created or enhanced with AI tools including large language models. We review and publish in good faith.' },
      { id: '1b', title: 'No Guarantees', body: 'We do not warrant the completeness, reliability, or suitability of any content for any particular purpose.' },
    ],
  },
  {
    num: '2',
    icon: <PsychologyOutlinedIcon fontSize="small" />,
    title: 'AI Knowledge Limitations',
    body: 'Content related to artificial intelligence, machine learning models, and related technologies reflects the training knowledge of AI systems used in its creation. This knowledge has a cutoff date and may not reflect the most current developments.',
    bullets: [
      { id: '2a', text: 'AI training data has a knowledge cutoff and may miss recent research or model releases.' },
      { id: '2b', text: 'Rapidly evolving fields like LLMs and Generative AI change faster than any static knowledge base.' },
      { id: '2c', text: 'Always verify critical technical details against official documentation or primary sources.' },
    ],
  },
  {
    num: '3',
    icon: <EditNoteOutlinedIcon fontSize="small" />,
    title: 'Corrections & Removals',
    body: 'We welcome corrections, disputes, and feedback. If any content on this site is factually incorrect, misleading, or objectionable, please contact us directly. We commit to reviewing all flagged content promptly and removing or correcting it where necessary.',
  },
  {
    num: '4',
    icon: <BlockOutlinedIcon fontSize="small" />,
    title: 'No Professional Advice',
    body: 'Nothing on this site constitutes professional, technical, legal, or financial advice. Use all content at your own discretion.',
  },
  {
    num: '5',
    icon: <LockOutlinedIcon fontSize="small" />,
    title: 'Intellectual Property',
    body: 'All original content on this site remains the property of the site owner. AI-assisted content is published in good faith and is not intended to infringe on any third-party rights.',
    cards: [
      { id: '5a', title: 'Original Content', body: 'Site-owned articles, design, and branding are protected. Reproduction requires prior written permission.' },
      { id: '5b', title: 'Fair Use & Attribution', body: 'Brief quotes with clear attribution are welcome. Full reproduction without consent is not permitted.' },
    ],
  },
  {
    num: '6',
    icon: <AutorenewOutlinedIcon fontSize="small" />,
    title: 'Changes',
    body: 'We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of any revised terms.',
  },
];

export default function TermsAndConditionsPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── Hero ── */}
      <Box
        sx={{
          background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 60%, #1e1b4b 100%)',
          py: { xs: 8, md: 11 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(139,92,246,0.14) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(167,139,250,0.07) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            label="Legal Document"
            size="small"
            icon={<GavelOutlinedIcon style={{ fontSize: 14, color: ACCENT }} />}
            sx={{ bgcolor: 'rgba(139,92,246,0.12)', color: ACCENT, border: `1px solid rgba(139,92,246,0.25)`, fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.7rem', mb: 3 }}
          />
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '2.4rem', md: '3.4rem' }, letterSpacing: '-0.03em', mb: 2 }}>
            Terms and Conditions
          </Typography>
          <Typography sx={{ color: ACCENT, fontSize: '0.9rem', fontWeight: 500, mb: 2 }}>
            Last Updated: {EFFECTIVE_DATE}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 600, mx: 'auto' }}>
            This website provides AI-generated and AI-assisted content for informational and educational
            purposes only. By accessing or using this site, you agree to the following terms.
          </Typography>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={0}>
            {sections.map((section, idx) => (
              <Box key={section.num} id={`section-${section.num}`}>
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

                  {/* Body — first section gets left accent border */}
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
                          key={card.id}
                          elevation={0}
                          sx={{
                            flex: 1,
                            p: 2.5,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                          }}
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
                      {section.bullets.map((bullet) => (
                        <Stack key={bullet.id} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                          <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: ACCENT, mt: '3px', flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{bullet.text}</Typography>
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
