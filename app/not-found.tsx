'use client';

import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import Link from 'next/link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { SITE_NAME, BLOG_CATEGORIES } from '@/src/constants';

/**
 * Derived from BLOG_CATEGORIES so the slugs stay valid.
 *
 * These were previously hardcoded display names ('?category=AI Agents'). The API
 * filters by slug only and returns zero results for a name, so all four recovery
 * links on this 404 page led to an empty list.
 */
const QUICK_LINKS = BLOG_CATEGORIES.slice(0, 4).map((c) => ({
  label: c.name,
  href: `/blogs?category=${c.slug}`,
}));

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 60%, #164e63 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 10, md: 14 },
        }}
      >
        {/* background glow blobs */}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Box sx={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)' }} />
          <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* 404 large display */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Typography
              sx={{
                fontSize: { xs: '7rem', sm: '10rem', md: '14rem' },
                fontWeight: 900,
                lineHeight: 1,
                background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(16,185,129,0.1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                userSelect: 'none',
                letterSpacing: '-0.05em',
              }}
            >
              404
            </Typography>
            {/* glowing icon overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 88 },
                  height: { xs: 64, md: 88 },
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 60px rgba(14,165,233,0.5)',
                }}
              >
                <AutoAwesomeIcon sx={{ color: 'white', fontSize: { xs: 32, md: 44 } }} />
              </Box>
            </Box>
          </Box>

          <Chip
            label="Page Not Found"
            sx={{ mb: 3, bgcolor: 'rgba(14,165,233,0.15)', color: '#7dd3fc', border: '1px solid rgba(14,165,233,0.3)', fontWeight: 600 }}
          />

          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: 'white', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' }, lineHeight: 1.2 }}
          >
            Looks like this page got lost in the{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI universe
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.6)', mb: 6, fontWeight: 400, lineHeight: 1.7, maxWidth: 520, mx: 'auto' }}
          >
            The article or page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Explore our library of {SITE_NAME} articles instead.
          </Typography>

          {/* CTA buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 8 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/"
              startIcon={<HomeIcon />}
              sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 3, bgcolor: '#0ea5e9', '&:hover': { bgcolor: '#0284c7' } }}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/blogs"
              startIcon={<ArticleIcon />}
              sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 3, borderColor: 'rgba(255,255,255,0.3)', color: 'white', '&:hover': { borderColor: '#0ea5e9', bgcolor: 'rgba(14,165,233,0.1)' } }}
            >
              Browse Articles
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/blogs"
              startIcon={<SearchIcon />}
              sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 3, borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16,185,129,0.1)', color: 'white' } }}
            >
              Search
            </Button>
          </Stack>

          {/* quick topic links */}
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 2, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
              Popular topics
            </Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              {QUICK_LINKS.map(link => (
                <Chip
                  key={link.label}
                  label={link.label}
                  component={Link}
                  href={link.href}
                  clickable
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'rgba(14,165,233,0.15)', borderColor: '#0ea5e9', color: '#7dd3fc' },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
