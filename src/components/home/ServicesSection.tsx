'use client';

import { Box, Container, Grid, Typography, Stack, Chip, Button } from '@mui/material';
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
 * Placed after AboutSection so a visitor arriving from search meets the archive and
 * then the people behind it before an offer. Copy stays limited to what is actually
 * on offer — no client counts, pricing or guarantees.
 */

const SERVICES = [
  {
    icon: <CodeOutlinedIcon />,
    title: 'Frontend',
    body: 'Responsive, accessible interfaces built with React and Next.js — server rendered where it matters for speed and search.',
  },
  {
    icon: <DnsOutlinedIcon />,
    title: 'Backend',
    body: 'REST APIs, authentication, integrations and admin tooling, written in Node.js and TypeScript.',
  },
  {
    icon: <StorageOutlinedIcon />,
    title: 'Database',
    body: 'Schema design, migrations, indexing and query tuning on PostgreSQL, built to stay fast as the data grows.',
  },
  {
    icon: <RocketLaunchOutlinedIcon />,
    title: 'Deployment',
    body: 'Cloud hosting, domains, SSL, process management and monitoring, so the site ships and keeps running.',
  },
];

const STACK = ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Nginx'];

export default function ServicesSection() {
  return (
    <Box component="section" id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={<HandshakeOutlinedIcon sx={{ fontSize: '14px !important' }} />}
            label="Work with us"
            size="small"
            sx={{
              mb: 3,
              fontWeight: 700,
              borderRadius: 999,
              bgcolor: 'primary.main',
              color: '#fff',
              '& .MuiChip-icon': { color: '#fff' },
            }}
          />

          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2.5, lineHeight: 1.15, fontSize: { xs: '2rem', md: '2.9rem' }, letterSpacing: '-0.03em' }}
          >
            Need a website{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>built end to end?</Box>
          </Typography>

          <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
            We build and ship complete web projects — frontend, backend, database and deployment —
            so you deal with one team from first sketch to live site. This publication runs on the
            same stack we build with.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {SERVICES.map((s) => (
            <Grid key={s.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 3.5 },
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' },
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    mb: 2.5,
                    borderRadius: 2,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'primary.main',
                    color: '#fff',
                  }}
                >
                  {s.icon}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 1 }}>{s.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {s.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: { xs: 4, md: 5 } }}
        >
          {STACK.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 999, fontWeight: 600, color: 'text.secondary' }}
            />
          ))}
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ gap: 1.5, justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 5 } }}
        >
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: 999, px: 4, py: 1.4, fontWeight: 700, textTransform: 'none', fontSize: '1rem' }}
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
