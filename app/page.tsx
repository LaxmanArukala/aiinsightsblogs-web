'use client';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import HeroSection from '@/src/components/home/HeroSection';
import TrendingTopics from '@/src/components/home/TrendingTopics';
import FeaturedBlogs from '@/src/components/home/FeaturedBlogs';
import LatestArticles from '@/src/components/home/LatestArticles';
import StatsSection from '@/src/components/home/StatsSection';
import TestimonialsSection from '@/src/components/home/TestimonialsSection';
import NewsletterSection from '@/src/components/home/NewsletterSection';
import { blogService } from '@/src/services/blogService';
import { testimonialService } from '@/src/services/testimonialService';

export default function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useQuery({ queryKey: ['featuredBlogs'], queryFn: () => blogService.getFeaturedBlogs() });
  const { data: all, isLoading: allLoading } = useQuery({ queryKey: ['allBlogs'], queryFn: () => blogService.getBlogs({ sort: 'latest' }) });
  const { data: testimonials = [] } = useQuery({ queryKey: ['testimonials'], queryFn: () => testimonialService.getTestimonials() });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection featuredBlog={featured?.[0]} />
        <TrendingTopics />
        <FeaturedBlogs blogs={featured ?? []} isLoading={featuredLoading} />
        <StatsSection />
        <LatestArticles blogs={all?.data ?? []} isLoading={allLoading} />
        <TestimonialsSection testimonials={testimonials} />
        <NewsletterSection />
      </Box>
      <Footer />
    </Box>
  );
}
