'use client';

import { Box, Container, Grid, Paper, Typography, Avatar, Stack, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { Testimonial } from '@/src/types';

interface TestimonialsSectionProps { testimonials: Testimonial[]; }

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' }, textAlign: 'center' }}>What Our Readers Say</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, textAlign: 'center', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>Join thousands of professionals who rely on AI Insights Blogs for expert analysis.</Typography>
        <Grid container spacing={3}>
          {testimonials.map(t => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 3, position: 'relative', transition: 'all 0.25s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 32px rgba(14,165,233,0.1)', transform: 'translateY(-4px)' } }}>
                <FormatQuoteIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.2, position: 'absolute', top: 16, right: 20 }} />
                <Rating value={t.rating} readOnly size="small" sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, fontStyle: 'italic' }}>"{t.content}"</Typography>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                  <Avatar src={t.avatar} alt={t.author} sx={{ width: 44, height: 44 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{t.author}</Typography>
                    <Typography variant="caption" color="text.secondary">{t.role}, {t.company}</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
