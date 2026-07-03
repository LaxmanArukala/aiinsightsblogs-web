'use client';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { AI_TOPICS } from '@/src/constants';

export default function TrendingTopics() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>Trending AI Topics</Typography>
        <Grid container spacing={2}>
          {AI_TOPICS.map(topic => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={topic.id}>
              <Paper component={Link} href={`/blogs?category=${topic.slug}`} elevation={0} sx={{ p: 3, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center', transition: 'all 0.25s', '&:hover': { borderColor: topic.color, transform: 'translateY(-4px)', boxShadow: `0 12px 32px ${topic.color}22` } }}>
                <Box sx={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', bgcolor: `${topic.color}18` }}>{topic.icon}</Box>
                <Typography variant="subtitle2" component="p" sx={{ fontWeight: 700, color: 'text.primary' }}>{topic.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
