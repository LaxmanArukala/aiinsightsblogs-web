'use client';

import { Box } from '@mui/material';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import HeroSection from '@/src/components/home/HeroSection';
import TrendingTopics from '@/src/components/home/TrendingTopics';
import FeaturedBlogs from '@/src/components/home/FeaturedBlogs';
import LatestArticles from '@/src/components/home/LatestArticles';
import TestimonialsSection from '@/src/components/home/TestimonialsSection';
import NewsletterSection from '@/src/components/home/NewsletterSection';
import AboutSection from '@/src/components/home/AboutSection';
import type { Blog, Testimonial } from '@/src/types';

interface HomeViewProps {
  featured: Blog[];
  latest: Blog[];
  testimonials: Testimonial[];
  articleCount: number;
}

export default function HomeView({ featured, latest, testimonials, articleCount }: HomeViewProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection articleCount={articleCount} />
        {/* Articles lead: a reader arriving from search should hit real content
            before an About essay, so AboutSection now sits below the archive. */}
        <TrendingTopics />
        <FeaturedBlogs blogs={featured} />
        <LatestArticles blogs={latest} articleCount={articleCount} />
        <AboutSection articleCount={articleCount} />
        {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
        <NewsletterSection />
      </Box>
      <Footer />
    </Box>
  );
}
