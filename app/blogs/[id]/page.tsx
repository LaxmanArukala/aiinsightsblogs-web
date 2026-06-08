'use client';

import { useParams } from 'next/navigation';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink, Chip, Stack, Paper, Button, Divider, Skeleton, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/src/components/layout/Navbar';
import BlogImage from '@/src/components/common/BlogImage';
import Footer from '@/src/components/layout/Footer';
import BlogContentRenderer from '@/src/components/blog/BlogContentRenderer';
import CommentsSection from '@/src/components/comments/CommentsSection';
import ReviewsSection from '@/src/components/reviews/ReviewsSection';
import { blogService } from '@/src/services/blogService';
import { formatDate, formatNumber, slugify } from '@/src/utils/formatters';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleLike, toggleBookmark } from '@/src/redux/slices/blogSlice';
import { showSnackbar } from '@/src/redux/slices/uiSlice';

const UUID_LENGTH = 36;

export default function BlogDetailPage() {
  const { id: param } = useParams<{ id: string }>();
  const id = param.substring(0, UUID_LENGTH);
  const dispatch = useAppDispatch();
  const likedBlogs = useAppSelector(s => s.blog.likedBlogs);
  const bookmarkedBlogs = useAppSelector(s => s.blog.bookmarkedBlogs);

  const { data, isLoading } = useQuery({ queryKey: ['blog', id], queryFn: () => blogService.getBlogById(id) });
  const blog = data?.blog;

  const { data: otherData } = useQuery({
    queryKey: ['blogs-sidebar', id],
    queryFn: () => blogService.getBlogs({ sort: 'latest', page: 1 }),
    enabled: !!blog,
  });
  const otherArticles = (otherData?.data ?? []).filter(b => b.id !== id).slice(0, 5);

  const isLiked = blog ? likedBlogs.includes(blog.id) : false;
  const isBookmarked = blog ? bookmarkedBlogs.includes(blog.id) : false;

  const handleShare = () => {
    navigator.clipboard.writeText(globalThis.location.href);
    dispatch(showSnackbar({ message: 'Link copied to clipboard!', severity: 'success' }));
  };

  if (isLoading) return <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><Navbar /><Container maxWidth="lg" sx={{ py: 6 }}><Skeleton width={300} height={24} sx={{ mb: 4 }} /><Skeleton width="80%" height={60} sx={{ mb: 4 }} /><Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} /></Container><Footer /></Box>;
  if (!blog) return <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><Navbar /><Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}><Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>Article Not Found</Typography><Button variant="contained" component={Link} href="/blogs">Browse All Articles</Button></Container><Footer /></Box>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    datePublished: blog.publishedAt,
    publisher: { '@type': 'Organization', name: 'AI Insights Blogs', url: 'https://aiinsightsblogs.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://aiinsightsblogs.com/blogs/${blog.id}-${blog.slug}` },
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}><MuiLink component={Link} href="/" underline="hover" color="text.secondary">Home</MuiLink><MuiLink component={Link} href="/blogs" underline="hover" color="text.secondary">Blogs</MuiLink><Typography color="text.primary">{blog.title.slice(0, 30)}...</Typography></Breadcrumbs>
          <Chip label={blog.category.name} size="small" component={Link} href={`/blogs?category=${blog.category.slug}`} clickable sx={{ bgcolor: blog.category.color, color: 'white', fontWeight: 700, mb: 2 }} />
          <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.15, letterSpacing: '-0.03em', mb: 3 }}>{blog.title}</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>{blog.excerpt}</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="caption" color="text.secondary">{formatDate(blog.publishedAt)}</Typography>
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
            <Grid size={{ xs: 12, lg: 9 }}>
              <Box sx={{ width: '100%', borderRadius: 3, mb: 5, height: 480, overflow: 'hidden', boxShadow: 4 }}>
                <BlogImage src={blog.featuredImage} alt={blog.title} priority />
              </Box>
              <BlogContentRenderer content={blog.content} />
              {blog.tags && blog.tags.length > 0 && (
                <Box sx={{ mt: 5 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocalOfferIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.75rem' }}>Tags</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {blog.tags.map(tag => (
                      <Link key={tag.id} href={`/blogs?tag=${tag.slug}`} style={{ textDecoration: 'none' }}>
                        <Chip
                          label={tag.name}
                          clickable
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            px: 0.5,
                            borderColor: 'divider',
                            color: 'text.secondary',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        />
                      </Link>
                    ))}
                  </Stack>
                </Box>
              )}
              <Divider sx={{ my: 5 }} />
              <ReviewsSection blogId={blog.id} />
              <Divider sx={{ my: 5 }} />
              <CommentsSection blogId={blog.id} />
            </Grid>
            <Grid size={{ xs: 12, lg: 3 }}>
              <Stack spacing={3} sx={{ position: { lg: 'sticky' }, top: { lg: 88 } }}>
                {otherArticles.length > 0 && (
                  <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Other Articles</Typography>
                    <Stack spacing={2.5} divider={<Divider />}>
                      {otherArticles.map(article => (
                        <Stack key={article.id} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                          <Box sx={{ width: 72, height: 56, borderRadius: 0.5, overflow: 'hidden', flexShrink: 0 }}>
                            <BlogImage src={article.thumbnail} alt={article.title} />
                          </Box>
                          <Box>
                            <Typography variant="body2" component={Link} href={`/blogs/${article.id}-${slugify(article.title)}`} sx={{ fontWeight: 600, textDecoration: 'none', color: 'text.primary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, mb: 0.5, '&:hover': { color: 'primary.main' } }}>{article.title}</Typography>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                              <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">{article.readTime} min</Typography>
                            </Stack>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Paper>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
