'use client';

import { Box, Container, Grid, Typography, Avatar, Chip, Stack, Button, Paper } from '@mui/material';
import BlogImage from '@/src/components/common/BlogImage';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import type { Blog } from '@/src/types';
import BlogCardSkeleton from '@/src/components/common/BlogCardSkeleton';
import SectionHeader from '@/src/components/common/SectionHeader';

interface LatestArticlesProps { readonly blogs: Blog[]; readonly isLoading?: boolean; }

export default function LatestArticles({ blogs, isLoading }: LatestArticlesProps) {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <SectionHeader label="Latest" title="Fresh from the Press" subtitle="Stay up-to-date with the most recent AI developments and research." />
        <Grid container spacing={3}>
          {isLoading ? Array.from({ length: 6 }, (_, i) => <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${i}`}><BlogCardSkeleton /></Grid>) : blogs.slice(0, 6).map(blog => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', transition: 'all 0.25s', '&:hover': { borderColor: 'primary.main', boxShadow: 3, transform: 'translateY(-2px)' } }}>
                <Box sx={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <BlogImage src={blog.thumbnail} alt={blog.title} />
                  <Chip label={blog.category.name} size="small" sx={{ position: 'absolute', top: 12, left: 12, bgcolor: blog.category.color, color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" component={Link} href={`/blogs/${blog.id}-${blog.slug}`} sx={{ fontWeight: 700, textDecoration: 'none', color: 'text.primary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 1.5, '&:hover': { color: 'primary.main' } }}>{blog.title}</Typography>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}><Avatar src={blog.author.avatar} sx={{ width: 24, height: 24 }} /><Typography variant="caption" sx={{ fontWeight: 600 }}>{blog.author.name}</Typography></Stack>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} /><Typography variant="caption" color="text.secondary">{blog.readTime} min</Typography></Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 5 }}><Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={Link} href="/blogs" sx={{ px: 5 }}>Browse All Articles</Button></Box>
      </Container>
    </Box>
  );
}
