'use client';

import { Box, Container, Grid, Typography, Button, Stack, Chip, Paper, Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Link from 'next/link';
import type { Blog } from '@/src/types';
import { formatNumber, formatDate } from '@/src/utils/formatters';

interface HeroSectionProps { featuredBlog?: Blog; }

export default function HeroSection({ featuredBlog }: HeroSectionProps) {
  return (
    <Box sx={{ position: 'relative', minHeight: { xs: '90vh', md: '85vh' }, display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #164e63 100%)' }}>
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 60%)' }} />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Chip label="The Future of AI is Here" sx={{ bgcolor: 'rgba(14,165,233,0.15)', color: '#7dd3fc', fontWeight: 600, fontSize: '0.8rem', border: '1px solid rgba(14,165,233,0.3)', width: 'fit-content' }} />
              <Typography variant="h1" sx={{ color: 'white', fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }, fontWeight: 800, lineHeight: 1.1 }}>Explore the <Box component="span" sx={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Revolution</Box> With Us</Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Deep dives, expert analysis, and breaking news on artificial intelligence, machine learning, and the technologies shaping our future.</Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={Link} href="/blogs" sx={{ bgcolor: '#0ea5e9', '&:hover': { bgcolor: '#0284c7' }, px: 4 }}>Start Reading</Button>
                <Button variant="outlined" size="large" startIcon={<PlayCircleOutlineIcon />} sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', '&:hover': { borderColor: 'white' }, px: 4 }}>Watch Intro</Button>
              </Stack>
              <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                {[
                  { value: '2.4K+', label: 'Articles' },
                  { value: '1.2M', label: 'Readers' },
                  { value: '150+', label: 'Authors' },
                ].map(stat => (
                  <Box key={stat.label}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>{stat.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
          {featuredBlog && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper component={Link} href={`/blogs/${featuredBlog.slug}`} elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', textDecoration: 'none', display: 'block', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-6px)' } }}>
                <Box sx={{ position: 'relative' }}>
                  <Box component="img" src={featuredBlog.featuredImage} alt={featuredBlog.title} sx={{ width: '100%', height: { xs: 220, md: 260 }, objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                  <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 16, left: 16 }}>
                    <Chip label={featuredBlog.category.name} size="small" sx={{ bgcolor: featuredBlog.category.color, color: 'white', fontWeight: 700 }} />
                    <Chip icon={<TrendingUpIcon sx={{ fontSize: '14px !important', color: 'white !important' }} />} label="Featured" size="small" sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white', fontWeight: 700 }} />
                  </Stack>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 1, lineHeight: 1.35 }}>{featuredBlog.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mb: 2 }}>{featuredBlog.excerpt.slice(0, 100)}...</Typography>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={featuredBlog.author.avatar} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'white', display: 'block' }}>{featuredBlog.author.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{formatDate(featuredBlog.publishedAt)}</Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><AccessTimeIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }} /><Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{featuredBlog.readTime} min</Typography></Stack>
                      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><VisibilityIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }} /><Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{formatNumber(featuredBlog.views)}</Typography></Stack>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
