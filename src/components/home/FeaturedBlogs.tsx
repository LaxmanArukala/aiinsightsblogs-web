'use client';

import { Box, Container, Grid, Typography, Button, Stack, Skeleton, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import type { Blog } from '@/src/types';
import BlogImage from '@/src/components/common/BlogImage';
import { formatDate } from '@/src/utils/formatters';

/**
 * Editorial layout: one lead story beside a ranked shortlist.
 *
 * This section previously used the same card grid as LatestArticles directly below
 * it, so the two read as one repetitive block and nothing looked "featured". The
 * lead/list split gives the top pick actual visual weight and distinguishes the
 * two sections.
 */

interface FeaturedBlogsProps {
  blogs: Blog[];
  isLoading?: boolean;
}

const LIST_COUNT = 4;

function blogHref(blog: Blog) {
  return `/blogs/${blog.id}-${blog.slug}`;
}

export default function FeaturedBlogs({ blogs, isLoading }: FeaturedBlogsProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!isLoading && blogs.length === 0) return null;

  const [lead, ...rest] = blogs;
  const shortlist = rest.slice(0, LIST_COUNT);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: isDark
          ? 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(2,6,23,0.9) 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ alignItems: { sm: 'flex-end' }, justifyContent: 'space-between', gap: 2, mb: { xs: 4, md: 6 } }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.9rem' }, lineHeight: 1.15, letterSpacing: '-0.03em', mb: 1.5 }}
            >
              <Box component="span" sx={{ color: 'primary.main' }}>Featured</Box>{' '}
              reading
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: 460 }}>
              Hand-picked deep dives worth your time, starting with the one we would read first.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/blogs"
            endIcon={<ArrowForwardIcon />}
            sx={{
              flexShrink: 0,
              px: 3,
              py: 1.25,
              borderRadius: 999,
              fontWeight: 700,
              textTransform: 'none',
              border: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
            }}
          >
            View all articles
          </Button>
        </Stack>

        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Lead story */}
          <Grid size={{ xs: 12, md: 7 }}>
            {isLoading || !lead ? (
              <Box>
                <Skeleton variant="rounded" sx={{ width: '100%', height: { xs: 220, md: 380 }, borderRadius: 4 }} />
                <Skeleton variant="text" sx={{ mt: 3, fontSize: '2rem' }} />
                <Skeleton variant="text" width="70%" />
              </Box>
            ) : (
              <Box
                component={Link}
                href={blogHref(lead)}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  // BlogImage renders a plain <img>, or a Box fallback when the
                  // source is missing; targeting `img` covers the first and
                  // harmlessly no-ops on the second.
                  '& img': { transition: 'transform 0.45s ease' },
                  '&:hover img': { transform: 'scale(1.04)' },
                  '&:hover .lead-title': { color: 'primary.main' },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 220, sm: 300, md: 380 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <BlogImage src={lead.featuredImage || lead.thumbnail} alt={lead.title} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      px: 1.75,
                      py: 0.6,
                      borderRadius: 999,
                      bgcolor: lead.category.color,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.76rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {lead.category.name}
                  </Box>
                </Box>

                <Typography
                  className="lead-title"
                  variant="h3"
                  sx={{
                    mt: 3,
                    mb: 1.5,
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    color: 'text.primary',
                    transition: 'color 0.2s ease',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {lead.title}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {lead.excerpt}
                </Typography>

                <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
                  <Typography variant="caption">{formatDate(lead.publishedAt)}</Typography>
                  <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">{lead.readTime} min read</Typography>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Grid>

          {/* Ranked shortlist */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack divider={<Box sx={{ height: '1px', bgcolor: 'divider' }} />} spacing={0}>
              {(isLoading ? Array.from({ length: LIST_COUNT }) : shortlist).map((item, i) => {
                const blog = item as Blog | undefined;
                return (
                  <Box
                    key={blog?.id ?? `featured-skeleton-${i}`}
                    {...(blog ? { component: Link, href: blogHref(blog) } : {})}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      py: 2.5,
                      textDecoration: 'none',
                      alignItems: 'flex-start',
                      '&:hover .rank': { color: 'primary.main' },
                      '&:hover .item-title': { color: 'primary.main' },
                    }}
                  >
                    <Typography
                      className="rank"
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        lineHeight: 1.5,
                        width: 28,
                        color: 'text.disabled',
                        transition: 'color 0.2s ease',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {String(i + 2).padStart(2, '0')}
                    </Typography>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      {blog ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: blog.category.color,
                              mb: 0.75,
                            }}
                          >
                            {blog.category.name}
                          </Typography>
                          <Typography
                            className="item-title"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.98rem',
                              lineHeight: 1.45,
                              color: 'text.primary',
                              transition: 'color 0.2s ease',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              mb: 0.75,
                            }}
                          >
                            {blog.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {blog.readTime} min read
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Skeleton variant="text" width={90} />
                          <Skeleton variant="text" />
                          <Skeleton variant="text" width="55%" />
                        </>
                      )}
                    </Box>

                    {blog && (
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: 78,
                          height: 62,
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <BlogImage src={blog.thumbnail} alt={blog.title} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
