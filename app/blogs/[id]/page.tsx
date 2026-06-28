'use client';

import { useParams } from 'next/navigation';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink, Chip, Stack, Paper, Button, Divider, Skeleton, IconButton, Tooltip, Card, CardContent, CardActionArea } from '@mui/material';
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
import { useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/src/components/layout/Navbar';
import BlogImage from '@/src/components/common/BlogImage';
import Footer from '@/src/components/layout/Footer';
import BlogContentRenderer from '@/src/components/blog/BlogContentRenderer';
import CommentsSection from '@/src/components/comments/CommentsSection';
import ReviewsSection from '@/src/components/reviews/ReviewsSection';
import { blogService } from '@/src/services/blogService';
import { formatDate, formatNumber, slugify } from '@/src/utils/formatters';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';

const UUID_LENGTH = 36;

export default function BlogDetailPage() {
  const { id: param } = useParams<{ id: string }>();
  const id = param.substring(0, UUID_LENGTH);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const viewTracked = useRef(false);

  const { data, isLoading } = useQuery({ queryKey: ['blog', id], queryFn: () => blogService.getBlogById(id) });
  const blog = data?.blog;

  const { data: otherData } = useQuery({
    queryKey: ['blogs-sidebar', id],
    queryFn: () => blogService.getBlogs({ sort: 'latest', page: 1 }),
    enabled: !!blog,
  });
  const otherArticles = (otherData?.data ?? []).filter(b => b.id !== id).slice(0, 5);

  const { data: relatedBlogs } = useQuery({
    queryKey: ['related-blogs', blog?.category?.id, id],
    queryFn: () => blogService.getRelatedBlogs(blog!.category.id, id),
    enabled: !!blog?.category?.id,
  });

  const { data: likesData } = useQuery({
    queryKey: ['blog-likes', id],
    queryFn: () => blogService.getLikes(id),
    enabled: !!blog,
  });
  const { data: bookmarksData } = useQuery({
    queryKey: ['blog-bookmarks', id],
    queryFn: () => blogService.getBookmarks(id),
    enabled: !!blog,
  });
  const { data: sharesData } = useQuery({
    queryKey: ['blog-shares', id],
    queryFn: () => blogService.getShares(id),
    enabled: !!blog,
  });

  const likeMutation = useMutation({
    mutationFn: () => blogService.toggleLike(id),
    onSuccess: (data) => queryClient.setQueryData(['blog-likes', id], data),
  });
  const bookmarkMutation = useMutation({
    mutationFn: () => blogService.toggleBookmark(id),
    onSuccess: (data) => queryClient.setQueryData(['blog-bookmarks', id], data),
  });
  const shareMutation = useMutation({
    mutationFn: () => blogService.trackShare(id),
    onSuccess: (data) => queryClient.setQueryData(['blog-shares', id], data),
  });

  useEffect(() => {
    if (blog && !viewTracked.current) {
      viewTracked.current = true;
      blogService.trackView(blog.id).catch(() => {});
    }
  }, [blog]);

  const isLiked = likesData?.liked ?? false;
  const isBookmarked = bookmarksData?.bookmarked ?? false;

  const handleShare = () => {
    navigator.clipboard.writeText(globalThis.location.href);
    shareMutation.mutate();
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
            <Stack direction="row" sx={{ alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" color="text.secondary">{blog.readTime} min read</Typography></Stack>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}><VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" color="text.secondary">{formatNumber(blog.views)} views</Typography></Stack>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
                <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25 }}>
                    <IconButton size="small" onClick={() => likeMutation.mutate()} disabled={likeMutation.isPending}>
                      {isLiked ? <FavoriteIcon sx={{ fontSize: 18, color: 'error.main' }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">{formatNumber(likesData?.likes ?? blog.likes)}</Typography>
                  </Stack>
                </Tooltip>
                <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25 }}>
                    <IconButton size="small" onClick={() => bookmarkMutation.mutate()} disabled={bookmarkMutation.isPending}>
                      {isBookmarked ? <BookmarkIcon sx={{ fontSize: 18, color: 'primary.main' }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">{formatNumber(bookmarksData?.bookmarks ?? blog.bookmarks)}</Typography>
                  </Stack>
                </Tooltip>
                <Tooltip title="Share">
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25 }}>
                    <IconButton size="small" onClick={handleShare}>
                      <ShareIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">{formatNumber(sharesData?.shares ?? 0)}</Typography>
                  </Stack>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 9 }}>
              {blog.featuredImage && (
                <Box sx={{ width: '100%', borderRadius: 3, mb: 5, height: 480, overflow: 'hidden', boxShadow: 4 }}>
                  <BlogImage src={blog.featuredImage} alt={blog.title} priority />
                </Box>
              )}
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
              {relatedBlogs && relatedBlogs.length > 0 && (
                <>
                  <Divider sx={{ my: 5 }} />
                  <Box>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>Related Articles</Typography>
                      <MuiLink component={Link} href={`/blogs?category=${blog.category.name}`} underline="hover" sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 600 }}>
                        View all →
                      </MuiLink>
                    </Stack>
                    <Grid container spacing={3}>
                      {relatedBlogs.map(article => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                          <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 3, transition: 'all 0.2s', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' } }}>
                            <CardActionArea component={Link} href={`/blogs/${article.id}-${slugify(article.title)}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                              <Box sx={{ height: 160, overflow: 'hidden', flexShrink: 0 }}>
                                <BlogImage src={article.thumbnail} alt={article.title} />
                              </Box>
                              <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                <Chip label={article.category.name} size="small" sx={{ mb: 1.5, bgcolor: article.category.color, color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
                                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.5, mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {article.title}
                                </Typography>
                                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                                  <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary">{article.readTime} min read</Typography>
                                </Stack>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
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
