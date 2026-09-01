'use client';

import { Box, Container, Grid, Typography, Stack, Chip, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import AboutIllustration from '@/src/components/home/AboutIllustration';
import { AI_TOPICS } from '@/src/constants';

interface AboutSectionProps {
  articleCount: number;
}

export default function AboutSection({ articleCount }: AboutSectionProps) {
  // Counts come from the API rather than being written into the copy: the previous
  // hardcoded figures had drifted far from reality and contradicted each other.
  const highlights = [
    { icon: <ArticleOutlinedIcon fontSize="small" />, label: `${articleCount.toLocaleString('en-US')} articles` },
    { icon: <CategoryOutlinedIcon fontSize="small" />, label: `${AI_TOPICS.length} AI topics` },
    { icon: <LockOpenOutlinedIcon fontSize="small" />, label: 'Free to read' },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
          {/* Text first, illustration second — on mobile the copy should lead. */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: '14px !important' }} />}
              label="About us"
              size="small"
              sx={{ mb: 3, fontWeight: 700, borderRadius: 999, bgcolor: 'primary.main', color: '#fff', '& .MuiChip-icon': { color: '#fff' } }}
            />

            <Typography
              variant="h2"
              sx={{ fontWeight: 800, mb: 3, lineHeight: 1.15, fontSize: { xs: '2rem', md: '2.9rem' }, letterSpacing: '-0.03em' }}
            >
              <Box component="span" sx={{ color: 'primary.main' }}>Why</Box>{' '}
              this site exists
            </Typography>

            <Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 2.5 }}>
              AI Insights Blogs is an independent archive of practical writing on artificial
              intelligence — AI agents, large language models, generative AI, computer vision,
              robotics, and the machine learning underneath all of it.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 4 }}>
              Every piece aims to be specific enough to act on: what a technique actually does,
              where it breaks down, and how to try it yourself. No signup wall, no paywall.
            </Typography>

            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.25, mb: 4 }}>
              {highlights.map((h) => (
                <Stack
                  key={h.label}
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 999,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>{h.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{h.label}</Typography>
                </Stack>
              ))}
            </Stack>

            <Button
              component={Link}
              href="/about"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 3.5,
                py: 1.35,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.98rem',
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'primary.dark', transform: 'translateY(-2px)' },
                transition: 'transform 0.2s ease, background-color 0.2s ease',
              }}
            >
              Learn more
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AboutIllustration />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
