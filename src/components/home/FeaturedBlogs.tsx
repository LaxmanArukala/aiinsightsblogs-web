'use client';

import { Box, Container, Grid, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import type { Blog } from '@/src/types';
import BlogCard from '@/src/components/common/BlogCard';
import BlogCardSkeleton from '@/src/components/common/BlogCardSkeleton';
import SectionHeader from '@/src/components/common/SectionHeader';

interface FeaturedBlogsProps { blogs: Blog[]; isLoading?: boolean; }

export default function FeaturedBlogs({ blogs, isLoading }: FeaturedBlogsProps) {
  return (
    <Box sx={{ py: 8, bgcolor: 'action.hover' }}>
      <Container maxWidth="xl">
        <SectionHeader label="Editor's Pick" title="Featured Articles" subtitle="Hand-picked articles from our editorial team covering the most impactful AI developments." />
        <Grid container spacing={3}>
          {isLoading ? Array.from({ length: 4 }).map((_, i) => <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}><BlogCardSkeleton /></Grid>) : blogs.map(blog => <Grid size={{ xs: 12, sm: 6, md: 3 }} key={blog.id}><BlogCard blog={blog} /></Grid>)}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}><Button variant="outlined" endIcon={<ArrowForwardIcon />} component={Link} href="/blogs">View All Articles</Button></Box>
      </Container>
    </Box>
  );
}
