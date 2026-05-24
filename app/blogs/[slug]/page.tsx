'use client';

import { use, useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink, Chip, Avatar, Stack, Paper, Button, Divider, Skeleton, IconButton, Tooltip, CircularProgress } from '@mui/material';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import BlogContentRenderer from '@/src/components/blog/BlogContentRenderer';
import CommentsSection from '@/src/components/comments/CommentsSection';
import ReviewsSection from '@/src/components/reviews/ReviewsSection';
import { blogService } from '@/src/services/blogService';
import { formatDate, formatNumber } from '@/src/utils/formatters';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleLike, toggleBookmark } from '@/src/redux/slices/blogSlice';
import { showSnackbar } from '@/src/redux/slices/uiSlice';

interface BlogDetailPageProps { params: Promise<{ slug: string }>; }

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const dispatch = useAppDispatch();
  const likedBlogs = useAppSelector(s => s.blog.likedBlogs);
  const bookmarkedBlogs = useAppSelector(s => s.blog.bookmarkedBlogs);

  const { data: blog, isLoading } = useQuery({ queryKey: ['blog', slug], queryFn: () => blogService.getBlogBySlug(slug) });
  const { data: related } = useQuery({ queryKey: ['related', blog?.id, blog?.category.slug], queryFn: () => blogService.getRelatedBlogs(blog!.id, blog!.category.slug), enabled: !!blog });

  const isLiked = blog ? likedBlogs.includes(blog.id) : false;
  const isBookmarked = blog ? bookmarkedBlogs.includes(blog.id) : false;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(showSnackbar({ message: 'Link copied to clipboard!', severity: 'success' }));
  };

  if (isLoading) return <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><Navbar /><Container maxWidth="lg" sx={{ py: 6 }}><Skeleton width={300} height={24} sx={{ mb: 4 }} /><Skeleton width="80%" height={60} sx={{ mb: 4 }} /><Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} /></Container><Footer /></Box>;
  if (!blog) return <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><Navbar /><Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}><Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>Article Not Found</Typography><Button variant="contained" component={Link} href="/blogs">Browse All Articles</Button></Container><Footer /></Box>;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}><MuiLink component={Link} href="/" underline="hover" color="text.secondary">Home</MuiLink><MuiLink component={Link} href="/blogs" underline="hover" color="text.secondary">Blogs</MuiLink><Typography color="text.primary">{blog.title.slice(0, 30)}...</Typography></Breadcrumbs>
          <Chip label={blog.category.name} size="small" sx={{ bgcolor: blog.category.color, color: 'white', fontWeight: 700, mb: 2 }} />
          <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.15, letterSpacing: '-0.03em', mb: 3 }}>{blog.title}</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>{blog.excerpt}</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
              <Avatar src={blog.author.avatar} sx={{ width: 48, height: 48 }} />
              <Box><Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{blog.author.name}</Typography><Typography variant="caption" color="text.secondary">{formatDate(blog.publishedAt)}</Typography></Box>
            </Stack>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" color="text.secondary">{blog.readTime} min read</Typography></Stack>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" color="text.secondary">{formatNumber(blog.views)} views</Typography></Stack>
              <Stack direction="row" spacing={0.5}>
                <Tooltip title={isLiked ? 'Unlike' : 'Like'}><IconButton size="small" onClick={() => dispatch(toggleLike(blog.id))}>{isLiked ? <FavoriteIcon sx={{ color: 'error.main' }} /> : <FavoriteBorderIcon />}</IconButton></Tooltip>
                <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}><IconButton size="small" onClick={() => dispatch(toggleBookmark(blog.id))}>{isBookmarked ? <BookmarkIcon sx={{ color: 'primary.main' }} /> : <BookmarkBorderIcon />}</IconButton></Tooltip>
                <Tooltip title="Share"><IconButton size="small" onClick={handleShare}><ShareIcon /></IconButton></Tooltip>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box component="img" src={blog.featuredImage} alt={blog.title} sx={{ width: '100%', borderRadius: 3, mb: 5, maxHeight: 480, objectFit: 'cover', boxShadow: 4 }} />
              <BlogContentRenderer content={blog.content} />
              <Divider sx={{ my: 5 }} />
              <ReviewsSection blogId={blog.id} />
              <Divider sx={{ my: 5 }} />
              <CommentsSection blogId={blog.id} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3} sx={{ position: { lg: 'sticky' }, top: { lg: 88 } }}>
                {related && related.length > 0 && (
                  <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>Related Articles</Typography>
                    <Stack spacing={2.5} divider={<Divider />}>
                      {related.map(rel => (
                        <Stack key={rel.id} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                          <Box component="img" src={rel.thumbnail} alt={rel.title} sx={{ width: 72, height: 56, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                          <Box>
                            <Typography variant="body2" component={Link} href={`/blogs/${rel.slug}`} sx={{ fontWeight: 700, textDecoration: 'none', color: 'text.primary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, mb: 0.5, '&:hover': { color: 'primary.main' } }}>{rel.title}</Typography>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} /><Typography variant="caption" color="text.secondary">{rel.readTime} min</Typography></Stack>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Paper>
                )}
                <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>Article Stats</Typography>
                  <Stack spacing={2}>
                    {[
                      { label: 'Views', value: formatNumber(blog.views) },
                      { label: 'Likes', value: formatNumber(blog.likes) },
                      { label: 'Bookmarks', value: formatNumber(blog.bookmarks) },
                      { label: 'Avg Rating', value: `${blog.rating}/5` },
                    ].map(({ label, value }) => (
                      <Stack key={label} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">{label}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{value}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
