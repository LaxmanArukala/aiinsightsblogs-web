'use client';

import { Box, Container, Typography, Stack, Skeleton, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import type { Blog } from '@/src/types';

/**
 * A dated timeline stream rather than another card grid.
 *
 * Every other block on this page is already spoken for — Featured owns the
 * lead-plus-thumbnail-list, Topics owns the radial diagram — so this one leans on
 * the thing that actually distinguishes it: chronology. Entries hang off a spine,
 * the date prints only when it changes, and there are deliberately no thumbnails,
 * since Featured directly above is image-heavy.
 *
 * The final node is the browse-all link, so the CTA reads as the end of the
 * timeline instead of a detached button.
 */

interface LatestArticlesProps {
  readonly blogs: Blog[];
  readonly articleCount: number;
  readonly isLoading?: boolean;
}

const VISIBLE = 6;
const SPINE_X = { xs: 10, md: 132 };

function shortDate(iso: string): string {
  const d = new Date(iso);
  // Pinned to UTC so the server and the visitor's browser agree on the day.
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export default function LatestArticles({ blogs, articleCount, isLoading }: LatestArticlesProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const spine = isDark ? 'rgba(148,163,184,0.22)' : 'rgba(15,23,42,0.12)';

  const items = blogs.slice(0, VISIBLE);
  if (!isLoading && items.length === 0) return null;

  let previousDate = '';

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.9rem' }, lineHeight: 1.15, letterSpacing: '-0.03em', mb: 1.5 }}
        >
          <Box component="span" sx={{ color: 'primary.main' }}>Fresh</Box>{' '}
          from the press
        </Typography>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, mb: { xs: 5, md: 7 }, maxWidth: 520 }}>
          Everything published recently, newest first.
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* The spine. Decorative, so it is hidden from assistive tech. */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: 8,
              bottom: 8,
              left: SPINE_X,
              width: '2px',
              bgcolor: spine,
            }}
          />

          <Stack spacing={0}>
            {(isLoading ? Array.from({ length: VISIBLE }) : items).map((entry, i) => {
              const blog = entry as Blog | undefined;
              const date = blog ? shortDate(blog.publishedAt) : '';
              const showDate = Boolean(date) && date !== previousDate;
              if (date) previousDate = date;

              return (
                <Box
                  key={blog?.id ?? `latest-skeleton-${i}`}
                  {...(blog ? { component: Link, href: `/blogs/${blog.id}-${blog.slug}` } : {})}
                  sx={{
                    position: 'relative',
                    display: 'block',
                    textDecoration: 'none',
                    pl: { xs: 4.5, md: 22 },
                    pr: { xs: 0, md: 6 },
                    py: { xs: 2.5, md: 3 },
                    borderRadius: 2,
                    transition: 'background-color 0.2s ease',
                    '&:hover': { bgcolor: isDark ? 'rgba(148,163,184,0.06)' : 'rgba(15,23,42,0.03)' },
                    '&:hover .entry-title': { color: 'primary.main' },
                    '&:hover .entry-arrow': { opacity: 1, transform: 'translateX(0)' },
                    '&:hover .entry-node': { transform: 'translate(-50%, -50%) scale(1.45)' },
                  }}
                >
                  {/* Date sits left of the spine on desktop, and is suppressed when it
                      repeats so a burst of same-day posts groups under one label. */}
                  {showDate && (
                    <Typography
                      sx={{
                        position: { md: 'absolute' },
                        left: { md: 0 },
                        top: { md: 26 },
                        width: { md: 108 },
                        textAlign: { md: 'right' },
                        mb: { xs: 0.75, md: 0 },
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        letterSpacing: '0.09em',
                        textTransform: 'uppercase',
                        color: 'text.disabled',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {date}
                    </Typography>
                  )}

                  {blog && (
                    <Box
                      className="entry-node"
                      aria-hidden
                      sx={{
                        position: 'absolute',
                        left: SPINE_X,
                        top: { xs: 30, md: 34 },
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        bgcolor: blog.category.color,
                        transform: 'translate(-50%, -50%)',
                        transition: 'transform 0.25s ease',
                        boxShadow: `0 0 0 4px ${isDark ? '#0b1120' : '#ffffff'}`,
                      }}
                    />
                  )}

                  {blog ? (
                    <>
                      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 0.75 }}>
                        <Typography
                          sx={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: blog.category.color,
                          }}
                        >
                          {blog.category.name}
                        </Typography>
                        <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {blog.readTime} min read
                        </Typography>
                      </Stack>

                      <Typography
                        className="entry-title"
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: '1.12rem', md: '1.32rem' },
                          lineHeight: 1.4,
                          color: 'text.primary',
                          transition: 'color 0.2s ease',
                          mb: 0.75,
                        }}
                      >
                        {blog.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.92rem',
                          lineHeight: 1.65,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {blog.excerpt}
                      </Typography>

                      <ArrowForwardIcon
                        className="entry-arrow"
                        sx={{
                          display: { xs: 'none', md: 'block' },
                          position: 'absolute',
                          right: 20,
                          top: 30,
                          fontSize: 20,
                          color: 'primary.main',
                          opacity: 0,
                          transform: 'translateX(-8px)',
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Skeleton variant="text" width={140} />
                      <Skeleton variant="text" sx={{ fontSize: '1.3rem' }} />
                      <Skeleton variant="text" width="80%" />
                    </>
                  )}
                </Box>
              );
            })}

            {/* Closing node doubles as the browse-all link. */}
            <Box
              component={Link}
              href="/blogs"
              sx={{
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                pl: { xs: 4.5, md: 22 },
                py: { xs: 2.5, md: 3 },
                '&:hover .browse-label': { color: 'primary.main' },
                '&:hover .browse-arrow': { transform: 'translateX(4px)' },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  left: SPINE_X,
                  top: { xs: 30, md: 32 },
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  bgcolor: isDark ? '#0b1120' : '#ffffff',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <Typography
                  className="browse-label"
                  sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', transition: 'color 0.2s ease' }}
                >
                  {articleCount > 0
                    ? `Browse all ${articleCount.toLocaleString('en-US')} articles`
                    : 'Browse all articles'}
                </Typography>
                <ArrowForwardIcon
                  className="browse-arrow"
                  sx={{ fontSize: 18, color: 'primary.main', transition: 'transform 0.2s ease' }}
                />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
