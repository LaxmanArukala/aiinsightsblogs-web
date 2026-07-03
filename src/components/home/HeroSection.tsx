'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Grid, Typography, Button, Stack, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const SLIDES = [
  {
    chip: 'AI Agents',
    chipColor: '#0ea5e9',
    heading: 'Master the Era of',
    highlight: 'Autonomous AI Agents',
    body: 'Explore how AI agents plan, reason, and act — from the ReAct pattern and LangChain to multi-agent systems, production deployment, and beyond. Practical deep-dives for builders.',
    cta: { label: 'Explore AI Agents', href: '/blogs?category=ai-agents' },
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'AI Agents — autonomous systems visualization',
  },
  {
    chip: 'Large Language Models',
    chipColor: '#10b981',
    heading: 'Unlock the Power of',
    highlight: 'Large Language Models',
    body: 'From transformer architecture and fine-tuning with LoRA, to RAG pipelines, prompt engineering, and running open-source models locally — everything you need to build with LLMs.',
    cta: { label: 'Explore LLMs', href: '/blogs?category=llms' },
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'Large Language Models — neural network visualization',
  },
  {
    chip: 'Generative AI',
    chipColor: '#f59e0b',
    heading: 'Create Anything with',
    highlight: 'Generative AI',
    body: 'Stable Diffusion, DALL-E, Sora, multimodal models, and enterprise use cases — discover how generative AI is transforming art, design, video, music, and every creative discipline.',
    cta: { label: 'Explore Generative AI', href: '/blogs?category=generative-ai' },
    image: 'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'Generative AI — creative AI visualization',
  },
  {
    chip: 'Stay Ahead',
    chipColor: '#8b5cf6',
    heading: 'Your Go-To Source for',
    highlight: 'AI Knowledge',
    body: 'Practitioner-written tutorials, honest comparisons, and hands-on code examples — all free, all in one place. Join thousands of engineers and researchers keeping pace with AI.',
    cta: { label: 'Browse All Articles', href: '/blogs' },
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'AI Insights Blogs — knowledge and learning',
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const count = SLIDES.length;

  const goTo = useCallback(
    (index: number, direction: 'next' | 'prev' = 'next') => {
      if (transitioning) return;
      setDir(direction);
      setTransitioning(true);
      setTimeout(() => {
        setActive((index + count) % count);
        setTransitioning(false);
      }, 400);
    },
    [transitioning, count],
  );

  const next = useCallback(() => goTo(active + 1, 'next'), [active, goTo]);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[active];

  const textAnim = {
    opacity: transitioning ? 0 : 1,
    transform: transitioning
      ? dir === 'next' ? 'translateY(16px)' : 'translateY(-16px)'
      : 'translateY(0)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  const imgAnim = {
    opacity: transitioning ? 0 : 1,
    transform: transitioning
      ? dir === 'next' ? 'translateX(24px) scale(0.97)' : 'translateX(-24px) scale(0.97)'
      : 'translateX(0) scale(1)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '92vh', md: '88vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #164e63 100%)',
      }}
    >
      {/* Ambient glow */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.08) 0%, transparent 50%)' }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>

          {/* ── Left: animated text ── */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3.5} sx={textAnim}>
              <Chip
                label={slide.chip}
                sx={{
                  bgcolor: `${slide.chipColor}22`,
                  color: slide.chipColor,
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  border: `1px solid ${slide.chipColor}55`,
                  width: 'fit-content',
                  letterSpacing: 0.5,
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2.4rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {slide.heading}{' '}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${slide.chipColor}, #10b981)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {slide.highlight}
                </Box>
              </Typography>

              <Typography
                variant="h6"
                component="p"
                sx={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, fontWeight: 400, maxWidth: 520 }}
              >
                {slide.body}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', pt: 0.5 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  component={Link}
                  href={slide.cta.href}
                  sx={{
                    bgcolor: slide.chipColor,
                    '&:hover': { bgcolor: slide.chipColor, filter: 'brightness(0.88)' },
                    px: 4,
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                >
                  {slide.cta.label}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/blogs"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.28)',
                    color: 'rgba(255,255,255,0.85)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.06)' },
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  All Articles
                </Button>
              </Stack>

              {/* Stats */}
              <Stack direction="row" spacing={5} sx={{ pt: 1 }}>
                {[
                  { value: '30+', label: 'Articles' },
                  { value: '3', label: 'AI Topics' },
                  { value: '100%', label: 'Free' },
                ].map((s) => (
                  <Box key={s.label}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>{s.value}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* ── Right: animated image ── */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>

              {/* Image card */}
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  ...imgAnim,
                }}
              >
                <Box
                  component="img"
                  src={slide.image}
                  alt={slide.imageAlt}
                  sx={{
                    width: '100%',
                    height: { xs: 260, sm: 340, md: 420 },
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Gradient overlay at bottom */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(12,74,110,0.7) 0%, transparent 100%)',
                    borderRadius: '0 0 16px 16px',
                  }}
                />
              </Box>

            </Box>
          </Grid>

        </Grid>

        {/* Dot indicators — centred below full section */}
        <Stack direction="row" spacing={0.75} sx={{ justifyContent: 'center', mt: 4 }}>
          {SLIDES.map((s, i) => (
            <Box
              key={s.chip}
              onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              sx={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === active ? slide.chipColor : 'rgba(255,255,255,0.28)',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                '&:hover': { bgcolor: i === active ? slide.chipColor : 'rgba(255,255,255,0.55)' },
              }}
            />
          ))}
        </Stack>

      </Container>
    </Box>
  );
}
