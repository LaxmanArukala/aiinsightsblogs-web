'use client';

import { Box, Container, Grid, Typography, Stack, Chip, Button, useTheme } from '@mui/material';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

/**
 * Commercial section: web development enquiries from readers.
 *
 * Drawn as a connected four-stage pipeline rather than four separate cards, so
 * "end to end" is something the layout shows instead of only asserting: the stages
 * are numbered, joined by a line on desktop, and their colours walk the same
 * sky → purple → pink → orange ramp the hero and aurora backdrop use.
 *
 * Placed after AboutSection so a visitor arriving from search meets the archive and
 * the people behind it before an offer. Copy stays limited to what is actually on
 * offer — no client counts, pricing or guarantees.
 */

const STAGES = [
  {
    step: '01',
    icon: <CodeOutlinedIcon />,
    title: 'Frontend',
    body: 'Responsive, accessible interfaces that load fast and read well on any screen.',
    from: '#38bdf8',
    to: '#0ea5e9',
  },
  {
    step: '02',
    icon: <DnsOutlinedIcon />,
    title: 'Backend',
    body: 'APIs, authentication, integrations and the admin tooling to run it all.',
    from: '#a855f7',
    to: '#7c3aed',
  },
  {
    step: '03',
    icon: <StorageOutlinedIcon />,
    title: 'Database',
    body: 'Data modelled to stay quick and correct as it grows, not just on day one.',
    from: '#ec4899',
    to: '#d946ef',
  },
  {
    step: '04',
    icon: <RocketLaunchOutlinedIcon />,
    title: 'Deployment',
    body: 'Hosting, domains, SSL and monitoring, so it ships and keeps running.',
    from: '#f97316',
    to: '#f59e0b',
  },
];

export default function ServicesSection() {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="services"
      sx={{
        position: 'relative',
        py: { xs: 9, md: 14 },
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Soft colour wash behind the pipeline; purely decorative. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: isDark
            ? 'radial-gradient(60% 45% at 50% 30%, rgba(168,85,247,0.16), transparent 70%)'
            : 'radial-gradient(60% 45% at 50% 30%, rgba(168,85,247,0.09), transparent 70%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 780, mx: 'auto', mb: { xs: 7, md: 10 } }}>
          <Chip
            icon={<HandshakeOutlinedIcon sx={{ fontSize: '14px !important' }} />}
            label="Work with us"
            size="small"
            sx={{
              mb: 3,
              fontWeight: 700,
              borderRadius: 999,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
              color: '#fff',
              '& .MuiChip-icon': { color: '#fff' },
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2.5,
              lineHeight: 1.12,
              fontSize: { xs: '2.1rem', md: '3.1rem' },
              letterSpacing: '-0.03em',
            }}
          >
            One team,{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(110deg, #38bdf8 0%, #a855f7 45%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              from blank page to live site
            </Box>
          </Typography>

          <Typography color="text.secondary" sx={{ lineHeight: 1.9, fontSize: { md: '1.05rem' } }}>
            Need a website built end to end? We handle every stage — so there is no handover gap,
            no finger pointing, and one person to ask. This publication runs on what we build.
          </Typography>
        </Box>

        {/* Pipeline */}
        <Box sx={{ position: 'relative' }}>
          {/* Connector: horizontal across the stage numbers on desktop only. */}
          <Box
            aria-hidden
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 46,
              left: '12%',
              right: '12%',
              height: 2,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #38bdf8, #a855f7, #ec4899, #f97316)',
              opacity: isDark ? 0.45 : 0.3,
            }}
          />

          <Grid container spacing={{ xs: 3, md: 3.5 }}>
            {STAGES.map((s) => (
              <Grid key={s.step} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    pt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    textAlign: { xs: 'left', md: 'center' },
                    '&:hover .stage-badge': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 16px 34px -12px ${s.from}`,
                    },
                  }}
                >
                  <Box
                    className="stage-badge"
                    sx={{
                      width: 72,
                      height: 72,
                      mb: 2.5,
                      borderRadius: '22px',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#fff',
                      background: `linear-gradient(140deg, ${s.from} 0%, ${s.to} 100%)`,
                      boxShadow: `0 10px 24px -14px ${s.from}`,
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      // Sits above the connector line so the line appears to thread through.
                      position: 'relative',
                      zIndex: 1,
                      '& svg': { fontSize: 30 },
                      // Ring separating the badge from the connector behind it.
                      outline: '6px solid',
                      outlineColor: 'background.default',
                    }}
                  >
                    {s.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      mb: 0.75,
                      background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {s.step}
                  </Typography>

                  <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 1 }}>
                    {s.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, maxWidth: 260 }}
                  >
                    {s.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ gap: 2, justifyContent: 'center', alignItems: 'center', mt: { xs: 7, md: 10 } }}
        >
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 999,
              px: 4.5,
              py: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
              boxShadow: '0 14px 30px -14px #a855f7',
              '&:hover': {
                background: 'linear-gradient(135deg, #0284c7 0%, #9333ea 100%)',
                boxShadow: '0 18px 36px -14px #a855f7',
              },
            }}
          >
            Start a project
          </Button>
          <Typography variant="body2" color="text.secondary">
            Tell us what you need and we will reply with a plan.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
