'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Box, Container, Grid, Typography, TextField, Button, Stack, Pagination, InputAdornment, IconButton, Skeleton, Divider, Select, MenuItem, FormControl, InputLabel, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import BlogImage from '@/src/components/common/BlogImage';
import { blogService } from '@/src/services/blogService';
import { formatDate } from '@/src/utils/formatters';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleBookmark } from '@/src/redux/slices/blogSlice';
import AdSlot from '@/src/components/common/AdSlot';
import { BLOG_CATEGORIES, ADSENSE_SLOT_SIDEBAR, SORT_OPTIONS } from '@/src/constants';
import type { PaginatedResponse, Blog, SortOption } from '@/src/types';

/**
 * Horizontal article rows beside a sidebar of picks.
 *
 * Category and search live in the URL, not component state. This view previously
 * never read `?category=`, so every category link on the site — the homepage
 * hexagon, hero pills, footer, and article breadcrumbs — landed on an unfiltered
 * list. Keeping filters in the URL fixes those links and makes filtered views
 * shareable and server-renderable.
 */

interface BlogsListViewProps {
  initialData?: PaginatedResponse<Blog>;
  /** The filters the server actually fetched `initialData` for. */
  initialFilters: { search: string; category: string; page: number; sort: SortOption };
}

const href = (b: Blog) => `/blogs/${b.id}-${b.slug}`;

function ArticleRow({ blog }: { blog: Blog }) {
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector((s) => s.blog.bookmarkedBlogs.includes(blog.id));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        // Explicit px: the theme's shape.borderRadius is 12, so the shorthand `4`
        // resolved to a 48px radius.
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)', borderColor: 'primary.main' },
        '&:hover .row-title': { color: 'primary.main' },
        '& img': { transition: 'transform 0.4s ease' },
        '&:hover img': { transform: 'scale(1.04)' },
      }}
    >
      {/* The image fills this box absolutely: as a plain `display: block` box with
          `height: auto`, the img's `height: 100%` had nothing to resolve against and
          never reached the card's full height.

          `contain`, not `cover`: thumbnails are the generated 1200x630 OG cards, and
          the card's 1.32:1 box cropped 31% of the width — slicing the title text
          rendered inside them. The background matches the OG card's own #0f172a, so
          the letterboxing is invisible. */}
      <Box
        component={Link}
        href={href(blog)}
        aria-label={blog.title}
        sx={{
          position: 'relative',
          flexShrink: 0,
          alignSelf: 'stretch',
          width: { xs: '100%', sm: 232, md: 264 },
          height: { xs: 200, sm: 'auto' },
          minHeight: { sm: 200 },
          overflow: 'hidden',
          bgcolor: '#0f172a',
        }}
      >
        <BlogImage
          src={blog.thumbnail}
          alt={blog.title}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: blog.category.color,
            mb: 0.85,
          }}
        >
          {blog.category.name}
        </Typography>

        <Typography
          className="row-title"
          variant="h3"
          component={Link}
          href={href(blog)}
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            lineHeight: 1.35,
            color: 'text.primary',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1.25,
          }}
        >
          {blog.title}
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.94rem',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {blog.excerpt}
        </Typography>

        <Divider sx={{ mt: 'auto' }} />
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 1.25 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.85, color: 'text.secondary' }}>
            <EventAvailableOutlinedIcon sx={{ fontSize: 17 }} />
            {/* Absolute, UTC-pinned date rather than a relative "3y": relative time is
                measured against "now", which differs between the server render and
                hydration and would reintroduce a mismatch. */}
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{formatDate(blog.publishedAt)}</Typography>
            <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled', mx: 0.5 }} />
            <Typography variant="caption">{blog.readTime} min</Typography>
          </Stack>
          <IconButton
            size="small"
            onClick={() => dispatch(toggleBookmark(blog.id))}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            aria-pressed={isBookmarked}
          >
            {isBookmarked
              ? <BookmarkIcon sx={{ fontSize: 19, color: 'primary.main' }} />
              : <BookmarkBorderIcon sx={{ fontSize: 19, color: 'text.secondary' }} />}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

function RowSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
      <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 232, md: 264 }, height: { xs: 200, sm: 200 }, flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Skeleton variant="text" sx={{ fontSize: '1.3rem' }} />
        <Skeleton variant="text" width="65%" sx={{ fontSize: '1.3rem', mb: 1 }} />
        <Skeleton variant="text" /><Skeleton variant="text" width="80%" />
      </Box>
    </Box>
  );
}

export default function BlogsListView({ initialData, initialFilters }: BlogsListViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDark = useTheme().palette.mode === 'dark';

  const category = searchParams.get('category') ?? '';
  const urlSearch = searchParams.get('search') ?? '';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const sortParam = searchParams.get('sort');
  const sort: SortOption = (SORT_OPTIONS.find((o) => o.value === sortParam)?.value ?? 'latest') as SortOption;

  const [search, setSearch] = useState(urlSearch);
  useEffect(() => { setSearch(urlSearch); }, [urlSearch]);

  const setParams = useCallback(
    (next: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(next)) {
        if (value === undefined || value === '' || value === 1) params.delete(key);
        else params.set(key, String(value));
      }
      const qs = params.toString();
      router.replace(qs ? `/blogs?${qs}` : '/blogs', { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (search === urlSearch) return;
    const t = setTimeout(() => setParams({ search, page: undefined }), 400);
    return () => clearTimeout(t);
  }, [search, urlSearch, setParams]);

  // Reuse the server payload only when the client wants exactly what it fetched.
  const matchesServerFetch =
    urlSearch === initialFilters.search &&
    category === initialFilters.category &&
    page === initialFilters.page &&
    sort === initialFilters.sort;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs', urlSearch, category, sort, page],
    queryFn: () => blogService.getBlogs({ search: urlSearch, category, sort, page }),
    initialData: matchesServerFetch ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  const activeCategory = BLOG_CATEGORIES.find((c) => c.slug === category);
  const hasFilters = Boolean(category || urlSearch);
  const clearAll = () => { setSearch(''); setParams({ search: undefined, category: undefined, page: undefined, sort: undefined }); };

  let list;
  if (isLoading) {
    list = Array.from({ length: 6 }, (_, i) => <RowSkeleton key={`s-${i}`} />);
  } else if (isError) {
    list = (
      <Box sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Couldn&apos;t load articles</Typography>
        <Typography color="text.secondary">Please try again in a moment.</Typography>
      </Box>
    );
  } else if (data?.data.length) {
    list = data.data.map((blog) => <ArticleRow key={blog.id} blog={blog} />);
  } else {
    list = (
      <Box sx={{ p: { xs: 5, md: 8 }, textAlign: 'center', border: '1px dashed', borderColor: 'divider', borderRadius: '12px' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>No articles found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {urlSearch ? `Nothing matched “${urlSearch}”.` : 'Nothing here yet.'}
        </Typography>
        <Button onClick={clearAll} sx={{ px: 3, py: 1.15, borderRadius: 999, fontWeight: 700, textTransform: 'none', bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}>
          Clear filters
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box component="header" sx={{ pt: { xs: 5, md: 7 }, pb: 3 }}>
        <Container maxWidth="xl">
          {/* Title and search share a row on desktop and stack on mobile. Baselines
              are aligned to the bottom so the field sits level with the subtitle
              rather than floating against the oversized heading. */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              alignItems: { xs: 'stretch', md: 'flex-end' },
              justifyContent: 'space-between',
              gap: { xs: 2.5, md: 4 },
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.1, letterSpacing: '-0.035em', mb: 1.25 }}>
                {activeCategory
                  ? <Box component="span" sx={{ color: activeCategory.color }}>{activeCategory.name}</Box>
                  : <><Box component="span" sx={{ color: 'primary.main' }}>All</Box> articles</>}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {typeof data?.total === 'number'
                  ? `${data.total.toLocaleString('en-US')} article${data.total === 1 ? '' : 's'} on AI agents, LLMs and generative AI.`
                  : 'Deep dives on AI agents, LLMs and generative AI.'}
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1.5, flexShrink: 0, width: { xs: '100%', md: 'auto' } }}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              size="small"
              sx={{
                width: { xs: '100%', sm: 300, md: 340 },
                '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: 'background.paper' },
              }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>,
                  endAdornment: search ? (
                    <InputAdornment position="end">
                      <IconButton size="small" aria-label="Clear search" onClick={() => setSearch('')}><CloseIcon fontSize="small" /></IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />

            <FormControl sx={{ minWidth: { xs: '100%', sm: 168 } }}>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                label="Sort"
                size="small"
                value={sort}
                onChange={(e) => setParams({ sort: e.target.value === 'latest' ? undefined : e.target.value, page: undefined })}
                sx={{ borderRadius: 999, bgcolor: 'background.paper' }}
              >
                {SORT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Pill tab bar */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            p: 0.75,
            borderRadius: 999,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {[{ slug: '', name: 'All' }, ...BLOG_CATEGORIES].map((c) => {
            const active = c.slug === category;
            return (
              <Box
                key={c.slug || 'all'}
                component="button"
                type="button"
                onClick={() => setParams({ category: c.slug || undefined, page: undefined })}
                aria-pressed={active}
                sx={{
                  flexShrink: 0,
                  px: 2.5,
                  py: 1,
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  bgcolor: active ? (isDark ? '#e2e8f0' : '#1e293b') : 'transparent',
                  color: active ? (isDark ? '#0f172a' : '#ffffff') : 'text.secondary',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: active ? undefined : 'action.hover', color: active ? undefined : 'text.primary' },
                }}
              >
                {c.name}
              </Box>
            );
          })}
        </Box>
      </Container>

      <Box component="main" sx={{ flexGrow: 1, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 5 }}>
            <Grid size={{ xs: 12, md: 9 }}>
              {hasFilters && (
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {data ? <>Showing <strong>{data.data.length}</strong> of <strong>{data.total.toLocaleString('en-US')}</strong></> : 'Loading…'}
                  </Typography>
                  <Button onClick={clearAll} size="small" sx={{ textTransform: 'none', fontWeight: 600 }}>Clear filters</Button>
                </Stack>
              )}

              <Stack spacing={2.5}>{list}</Stack>

              {data && data.totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <Pagination
                    count={data.totalPages}
                    page={page}
                    onChange={(_, p) => { setParams({ page: p }); globalThis.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    color="primary"
                    size="large"
                    shape="rounded"
                  />
                </Box>
              )}
            </Grid>

            {/* Sidebar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Box component="aside" sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
                <Box sx={{ mt: 4 }}>
                  <AdSlot slot={ADSENSE_SLOT_SIDEBAR} minHeight={300} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
