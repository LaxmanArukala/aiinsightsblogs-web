'use client';

import { Box, Container, Grid, Typography, Stack, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const highlights = [
  { icon: <ArticleOutlinedIcon fontSize="small" />, label: '2,400+ Articles' },
  { icon: <GroupsOutlinedIcon fontSize="small" />, label: 'Expert Authors' },
  { icon: <TrendingUpIcon fontSize="small" />, label: 'Weekly Updates' },
];

export default function AboutSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 6,
                aspectRatio: '4 / 3',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80"
                alt="AI progress and innovation"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </Grid>

          {/* Text */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: '14px !important' }} />}
              label="About Us"
              color="primary"
              size="small"
              sx={{ mb: 3, fontWeight: 600, borderRadius: 2 }}
            />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Your Gateway to the Future of Artificial Intelligence
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 2.5 }}>
              AI Insights Blogs is your go-to destination for in-depth coverage of artificial intelligence, machine learning, and the technologies shaping tomorrow. From practical guides on AI Agents and Large Language Models to deep dives into Generative AI and Computer Vision, our content is crafted for developers, researchers, and enthusiasts who want to stay ahead of the curve.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 4 }}>
              Whether you're a seasoned ML engineer or just beginning your AI journey, we deliver articles that are accurate, accessible, and always aligned with the latest breakthroughs in the field.
            </Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3 }}>
              {highlights.map(h => (
                <Stack key={h.label} direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>{h.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{h.label}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
