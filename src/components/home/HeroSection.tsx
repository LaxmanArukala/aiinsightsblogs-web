'use client';

import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import AuroraBackground from '@/src/components/home/AuroraBackground';
import { AI_TOPICS } from '@/src/constants';

interface HeroSectionProps {
  /** Live total from the API — never hardcode it, the archive grows daily. */
  articleCount: number;
}

export default function HeroSection({ articleCount }: HeroSectionProps) {
  const isDark = useTheme().palette.mode === 'dark';

  const ink = isDark ? '#ffffff' : '#0b1220';
  const muted = isDark ? 'rgba(255,255,255,0.62)' : 'rgba(15,23,42,0.62)';
  const hairline = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(15,23,42,0.14)';

  const stats = [
    { value: articleCount > 0 ? `${articleCount.toLocaleString('en-US')}` : '—', label: 'Articles' },
    { value: `${AI_TOPICS.length}`, label: 'Topics' },
    { value: 'Free', label: 'Always' },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '86vh', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        isolation: 'isolate',
        // Each element rises in sequence so the composition assembles rather than
        // appearing all at once.
        '@keyframes heroRise': {
          from: { opacity: 0, transform: 'translate3d(0, 22px, 0)' },
          to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        '@keyframes badgePulse': {
          '0%, 100%': { boxShadow: `0 0 0 1px ${hairline}, 0 0 42px 0 rgba(56,189,248,0.28), 0 0 90px 0 rgba(168,85,247,0.18)` },
          '50%':      { boxShadow: `0 0 0 1px ${hairline}, 0 0 62px 6px rgba(56,189,248,0.42), 0 0 120px 10px rgba(168,85,247,0.26)` },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& *': { animation: 'none !important', opacity: '1 !important', transform: 'none !important' },
        },
      }}
    >
      <AuroraBackground />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: { xs: 10, md: 12 } }}>
        {/* Glowing brand mark */}
        <Box
          sx={{
            width: { xs: 76, md: 92 },
            height: { xs: 76, md: 92 },
            mx: 'auto',
            mb: { xs: 4, md: 5 },
            borderRadius: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isDark ? 'rgba(15,23,42,0.72)' : 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(12px)',
            animation: 'heroRise 0.7s cubic-bezier(0.22,1,0.36,1) both, badgePulse 4.5s ease-in-out 0.7s infinite',
          }}
        >
          <Box
            sx={{
              width: '58%',
              height: '58%',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: { xs: '1.05rem', md: '1.25rem' },
              letterSpacing: '-0.02em',
            }}
          >
            AI
          </Box>
        </Box>

        <Typography
          variant="h1"
          sx={{
            color: ink,
            fontSize: { xs: '2.5rem', sm: '3.4rem', md: '4.4rem' },
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.035em',
            mb: 3,
            animation: 'heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.08s both',
          }}
        >
          Make sense of AI,{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(110deg, #38bdf8 0%, #a855f7 45%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            one deep dive at a time
          </Box>
        </Typography>

        <Typography
          component="p"
          sx={{
            color: muted,
            fontSize: { xs: '1.02rem', md: '1.18rem' },
            lineHeight: 1.75,
            maxWidth: 620,
            mx: 'auto',
            mb: 5,
            animation: 'heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.16s both',
          }}
        >
          Practical guides and honest analysis on AI agents, large language models,
          and generative AI — written for the people who actually build with them.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'center', mb: 6, animation: 'heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.24s both' }}
        >
          <Button
            component={Link}
            href="/blogs"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 999,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: isDark ? '#ffffff' : '#0b1220',
              color: isDark ? '#0b1220' : '#ffffff',
              '&:hover': {
                bgcolor: isDark ? 'rgba(255,255,255,0.88)' : 'rgba(11,18,32,0.86)',
                transform: 'translateY(-2px)',
              },
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
          >
            Browse all articles
          </Button>
          <Button
            component={Link}
            href="/blogs?category=ai-agents"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 999,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              color: ink,
              border: `1px solid ${hairline}`,
              bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
                borderColor: isDark ? 'rgba(255,255,255,0.32)' : 'rgba(15,23,42,0.28)',
                transform: 'translateY(-2px)',
              },
              transition: 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
            }}
          >
            Start with AI agents
          </Button>
        </Stack>

        {/* Topic pills double as internal links into the category listings. */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 6, animation: 'heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.32s both' }}
        >
          {AI_TOPICS.map((topic) => (
            <Box
              key={topic.id}
              component={Link}
              href={`/blogs?category=${topic.slug}`}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: 999,
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                color: muted,
                border: `1px solid ${hairline}`,
                transition: 'all 0.2s ease',
                '&:hover': { color: topic.color, borderColor: topic.color },
              }}
            >
              {topic.name}
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            gap: { xs: 4, md: 7 },
            animation: 'heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both',
          }}
        >
          {stats.map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.9rem' }, color: ink, lineHeight: 1.1 }}>
                {s.value}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', mt: 0.5 }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
