'use client';

import { Box, Container, Grid, Typography, Stack, Button, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { FigureHero, FigureCoverage, FigurePipeline, FigureLibrary } from '@/src/components/about/AboutIllustrations';
import { SITE_NAME, BLOG_CATEGORIES, AI_TOPICS } from '@/src/constants';

/**
 * Editorial collage layout: each section pairs copy with an illustration that sits
 * on an offset colour block, alternating side to side against alternating bands.
 *
 * Illustrations rather than photography — the site has no photo library, and inline
 * SVG themes correctly, costs a few KB, and stays sharp at any size.
 */

interface AboutViewProps {
  articleCount: number;
}

const DIFFERENTIATORS = [
  'Every article is researched and drafted by advanced AI models, which is how the archive keeps pace with a field that changes weekly.',
  'Coverage ranges from beginner-friendly introductions to production-grade deep dives with worked code examples.',
  'We follow the full stack: theory, implementation, deployment, cost, and responsible use.',
  'Topics span proprietary APIs — OpenAI, Anthropic, Google — and open-source models you can run locally.',
  'Code examples are written out and explained step by step rather than dropped in without context.',
  'Everything is free to read, with no account, no paywall, and no newsletter gate.',
];

const PRINCIPLES = [
  {
    label: 'Our mission',
    title: 'Make AI knowledge accessible',
    body: 'To close the gap between AI research and practical application — turning complex ideas into something a builder can use the same day.',
  },
  {
    label: 'Our approach',
    title: 'Depth over announcements',
    body: 'Anyone can relay a launch. We would rather explain the mechanism, name the limitations, and show where a technique stops working.',
  },
];

/** An illustration lifted off a solid block, as in the reference collage. */
function Figure({
  children,
  block,
  corner = 'bottom-left',
}: {
  children: ReactNode;
  block: string;
  corner?: 'bottom-left' | 'top-right' | 'bottom-right';
}) {
  const offset: Record<string, object> = {
    'bottom-left': { left: { xs: -14, md: -34 }, bottom: { xs: -14, md: -34 } },
    'top-right': { right: { xs: -14, md: -34 }, top: { xs: -14, md: -34 } },
    'bottom-right': { right: { xs: -14, md: -34 }, bottom: { xs: -14, md: -34 } },
  };
  return (
    <Box sx={{ position: 'relative', px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          width: { xs: 120, md: 190 },
          height: { xs: 120, md: 190 },
          borderRadius: '10px',
          bgcolor: block,
          ...offset[corner],
        }}
      />
      <Box sx={{ position: 'relative' }}>{children}</Box>
    </Box>
  );
}

function Section({
  children,
  tinted = false,
}: {
  children: ReactNode;
  tinted?: boolean;
}) {
  const isDark = useTheme().palette.mode === 'dark';
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: tinted ? (isDark ? 'rgba(148,163,184,0.05)' : '#faf8f5') : 'transparent',
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

export default function AboutView({ articleCount }: AboutViewProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Reference-style collage blocks, damped for the dark ground.
  const block = {
    peach: isDark ? 'rgba(245,158,11,0.26)' : '#fbdcc8',
    blue: isDark ? 'rgba(14,165,233,0.26)' : '#cfdcec',
    navy: isDark ? 'rgba(148,163,184,0.16)' : '#1e3a5f',
    amber: isDark ? 'rgba(139,92,246,0.26)' : '#f7d08a',
  };

  const stats = [
    { value: articleCount.toLocaleString('en-US'), label: 'Articles published' },
    { value: `${BLOG_CATEGORIES.length}`, label: 'Topics covered' },
    { value: '100%', label: 'Free to read' },
  ];

  const headingSx = {
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.14,
    fontSize: { xs: '1.9rem', md: '2.7rem' },
    mb: 2.5,
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero */}
        <Box component="section" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 4, md: 6 }, position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h1"
                  sx={{ fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, fontSize: { xs: '2.3rem', md: '3.4rem' }, mb: 3 }}
                >
                  A deeper way to{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>learn AI</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.85, maxWidth: 480, mb: 4 }}>
                  {SITE_NAME} is an open archive of practical writing on artificial intelligence —
                  agents, language models, generative systems, and the machine learning beneath
                  them. Free to read, with nothing behind a signup.
                </Typography>
                <Stack direction="row" sx={{ gap: { xs: 3, md: 5 }, flexWrap: 'wrap' }}>
                  {stats.map((s) => (
                    <Box key={s.label}>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.9rem' }, lineHeight: 1.1, color: 'primary.main' }}>
                        {s.value}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.06em', textTransform: 'uppercase', mt: 0.5 }}>
                        {s.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Figure block={block.peach} corner="top-right"><FigureHero /></Figure>
              </Grid>
            </Grid>
          </Container>

          {/* Connector, echoing the reference's flowing line. Decorative only. */}
          <Box
            aria-hidden
            component="svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            sx={{ display: { xs: 'none', md: 'block' }, width: '100%', height: 120, mt: 2 }}
          >
            <path
              d="M980 0 C 940 70, 700 40, 520 78 S 200 130, 120 92"
              fill="none"
              stroke={isDark ? 'rgba(56,189,248,0.45)' : '#f0a58c'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </Box>
        </Box>

        {/* Illustration left / copy right */}
        <Section tinted>
          <Grid container spacing={{ xs: 5, md: 10 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Figure block={block.blue} corner="bottom-left"><FigureCoverage /></Figure>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={headingSx}>
                Making the hard parts{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>clear</Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 2.5 }}>
                Most AI coverage stops at the announcement. The interesting part is what a
                technique actually does, where it breaks, and what it costs to run.
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                Articles here aim to be specific enough to act on — a working pattern, a mental
                model, or a decision you can defend — across {BLOG_CATEGORIES.length} topics from
                agents and language models to computer vision and robotics.
              </Typography>
            </Grid>
          </Grid>
        </Section>


        {/* Topic grid — deliberately not a collage row, to break the rhythm */}
        <Section>
          <Typography variant="h2" sx={{ ...headingSx, textAlign: 'center', mb: 1.5 }}>
            What we{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>cover</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 560, mx: 'auto', lineHeight: 1.8, mb: { xs: 5, md: 7 } }}>
            Six threads run through the archive. Each links straight into its articles.
          </Typography>
          <Grid container spacing={3}>
            {AI_TOPICS.map((topic) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={topic.id}>
                <Box
                  component={Link}
                  href={`/blogs?category=${topic.slug}`}
                  sx={{
                    display: 'block', height: '100%', p: 3.5, textDecoration: 'none',
                    borderRadius: '14px', border: '1px solid', borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: topic.color, boxShadow: 4 },
                  }}
                >
                  <Box sx={{ width: 46, height: 46, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', bgcolor: `${topic.color}1f`, mb: 2 }}>
                    {topic.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: 'text.primary', mb: 1 }}>
                    {topic.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {topic.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Copy left / illustration right */}
        <Section>
          <Grid container spacing={{ xs: 5, md: 10 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Typography variant="h2" sx={headingSx}>
                Written by AI models,{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>openly</Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 2.5 }}>
                We do not pretend otherwise. Articles on this site are researched and drafted by
                advanced AI models, which is how a small operation can cover a field that changes
                weekly.
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                That comes with a trade: breadth and speed, in exchange for the lived experience a
                human practitioner brings. We would rather state that plainly than imply a newsroom
                that does not exist.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Figure block={block.navy} corner="bottom-right"><FigurePipeline /></Figure>
            </Grid>
          </Grid>
        </Section>


        {/* Mission / approach — offset panels, echoing the collage without an illustration */}
        <Section tinted>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            {PRINCIPLES.map((p, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={p.label}>
                <Box sx={{ position: 'relative', height: '100%' }}>
                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute', width: 108, height: 108, borderRadius: '10px',
                      bgcolor: i === 0 ? block.peach : block.blue,
                      top: -16, left: -16,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'relative', height: '100%', p: { xs: 3.5, md: 5 },
                      borderRadius: '14px', border: '1px solid', borderColor: 'divider',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'primary.main', mb: 1.5 }}>
                      {p.label}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' }, letterSpacing: '-0.02em', mb: 1.75 }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>{p.body}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>


        {/* Numbered list — a third distinct treatment */}
        <Section>
          <Typography variant="h2" sx={{ ...headingSx, textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            What makes it{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>different</Box>
          </Typography>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            {DIFFERENTIATORS.map((point, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={point.slice(0, 32)}>
                <Stack direction="row" sx={{ gap: 2.5, alignItems: 'flex-start' }}>
                  <Typography
                    aria-hidden
                    sx={{ flexShrink: 0, fontWeight: 800, fontSize: '1.05rem', color: 'primary.main', fontVariantNumeric: 'tabular-nums', pt: 0.2 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>{point}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Illustration left / copy right + CTA */}
        <Section tinted>
          <Grid container spacing={{ xs: 5, md: 10 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Figure block={block.amber} corner="bottom-left"><FigureLibrary /></Figure>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={headingSx}>
                The whole archive,{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>open</Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 4 }}>
                Every one of the {articleCount.toLocaleString('en-US')} articles is free, with no
                account, no paywall and no newsletter gate. Start anywhere.
              </Typography>

              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {BLOG_CATEGORIES.map((c) => (
                  <Box
                    key={c.slug}
                    component={Link}
                    href={`/blogs?category=${c.slug}`}
                    sx={{
                      px: 1.75, py: 0.7, borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
                      textDecoration: 'none', color: 'text.secondary',
                      border: '1px solid', borderColor: 'divider',
                      transition: 'all 0.2s ease',
                      '&:hover': { color: c.color, borderColor: c.color },
                    }}
                  >
                    {c.name}
                  </Box>
                ))}
              </Stack>

              <Button
                component={Link}
                href="/blogs"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 3.5, py: 1.35, borderRadius: 999, fontWeight: 700, textTransform: 'none',
                  fontSize: '0.98rem', bgcolor: 'primary.main', color: '#fff',
                  '&:hover': { bgcolor: 'primary.dark', transform: 'translateY(-2px)' },
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                }}
              >
                Browse all articles
              </Button>
            </Grid>
          </Grid>
        </Section>
      </Box>

      <Footer />
    </Box>
  );
}
