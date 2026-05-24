'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Grid, Typography, TextField, Button, Chip, Stack, MenuItem, Select, FormControl, InputLabel, Pagination, Paper, Drawer, IconButton, InputAdornment, CircularProgress, Tooltip, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import BlogCard from '@/src/components/common/BlogCard';
import BlogCardSkeleton from '@/src/components/common/BlogCardSkeleton';
import { blogService } from '@/src/services/blogService';
import { categories, tags } from '@/src/utils/mockData';
import { SORT_OPTIONS, BLOGS_PER_PAGE } from '@/src/constants';
import type { SortOption } from '@/src/types';

const CategoryChip = ({ cat, selected, onClick }: { cat: typeof categories[0]; selected: boolean; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: 3,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '2px solid',
        borderColor: selected ? 'transparent' : hovered ? cat.color : 'divider',
        background: selected
          ? `linear-gradient(135deg, ${cat.color}ee 0%, ${cat.color}cc 100%)`
          : hovered
            ? `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}08 100%)`
            : 'transparent',
        transform: selected ? 'scale(1.02)' : hovered ? 'scale(1.01)' : 'scale(1)',
        boxShadow: selected ? `0 4px 20px ${cat.color}40` : 'none',
        '&:hover': { boxShadow: `0 2px 12px ${cat.color}20` },
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: selected ? 'white' : cat.color,
          transition: 'all 0.3s ease',
          boxShadow: selected ? '0 0 8px rgba(255,255,255,0.5)' : `0 0 6px ${cat.color}60`,
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: selected ? 'white' : 'text.primary',
            transition: 'color 0.3s ease',
          }}
        >
          {cat.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: selected ? 'rgba(255,255,255,0.8)' : 'text.secondary',
            fontWeight: 500,
          }}
        >
          {cat.count} articles
        </Typography>
      </Box>
      {selected && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.25)',
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
        </Box>
      )}
    </Paper>
  );
};

const TagChip = ({ tag, selected, onClick }: { tag: typeof tags[0]; selected: boolean; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  const getTagGradient = (index: number) => {
    const gradients = [
      { from: '#0ea5e9', to: '#0284c7' },
      { from: '#10b981', to: '#059669' },
      { from: '#f59e0b', to: '#d97706' },
      { from: '#ef4444', to: '#dc2626' },
      { from: '#8b5cf6', to: '#7c3aed' },
      { from: '#ec4899', to: '#db2777' },
      { from: '#06b6d4', to: '#0891b2' },
      { from: '#84cc16', to: '#65a30d' },
    ];
    return gradients[index % gradients.length];
  };

  const gradient = getTagGradient(parseInt(tag.id) - 1);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.75,
        py: 0.75,
        borderRadius: 2.5,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        border: '1.5px solid',
        borderColor: selected ? 'transparent' : hovered ? gradient.from : 'divider',
        background: selected
          ? `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`
          : hovered
            ? `${gradient.from}12`
            : 'transparent',
        transform: selected ? 'scale(1.05)' : hovered ? 'scale(1.03)' : 'scale(1)',
        boxShadow: selected ? `0 3px 12px ${gradient.from}35` : hovered ? `0 1px 6px ${gradient.from}15` : 'none',
      }}
    >
      {hovered && !selected && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, transparent, ${gradient.from}08, transparent)`,
            animation: 'shimmer 1.5s ease-in-out infinite',
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' },
            },
          }}
        />
      )}
      <LabelImportantIcon
        sx={{
          fontSize: 12,
          color: selected ? 'white' : gradient.from,
          transition: 'all 0.25s ease',
          transform: hovered ? 'rotate(15deg)' : 'rotate(0deg)',
        }}
      />
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: selected ? 'white' : 'text.primary',
          transition: 'color 0.25s ease',
          letterSpacing: '0.02em',
        }}
      >
        {tag.name}
      </Typography>
    </Box>
  );
};

export default function BlogsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('latest');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => { const t = setTimeout(() => setDebouncedSearch(search), 400); return () => clearTimeout(t); }, [search]);
  useEffect(() => { setPage(1); }, [debouncedSearch, category, selectedTags, sort]);

  const { data, isLoading } = useQuery({ queryKey: ['blogs', debouncedSearch, category, selectedTags, sort, page], queryFn: () => blogService.getBlogs({ search: debouncedSearch, category, tags: selectedTags, sort, page }) });

  const toggleTag = (slug: string) => setSelectedTags(prev => prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]);
  const clearFilters = () => { setSearch(''); setCategory(''); setSelectedTags([]); setSort('latest'); setPage(1); };

  const FiltersContent = () => (
    <Stack spacing={4}>
      <Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2 }}>
          <AutoAwesomeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Categories</Typography>
        </Stack>
        <Stack spacing={1}>
          <Paper
            elevation={0}
            onClick={() => setCategory('')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: 3,
              cursor: 'pointer',
              border: '2px solid',
              borderColor: category === '' ? 'primary.main' : 'divider',
              background: category === '' ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'transparent',
              transition: 'all 0.3s ease',
              transform: category === '' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: category === '' ? '0 4px 20px rgba(14, 165, 233, 0.25)' : 'none',
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: category === '' ? 'white' : 'primary.main' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: category === '' ? 'white' : 'text.primary' }}>All Categories</Typography>
            </Box>
            {category === '' && (
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
            )}
          </Paper>
          {categories.map(cat => (
            <CategoryChip key={cat.id} cat={cat} selected={category === cat.slug} onClick={() => setCategory(cat.slug)} />
          ))}
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2 }}>
          <LabelImportantIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Popular Tags</Typography>
        </Stack>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map(tag => (
            <TagChip key={tag.id} tag={tag} selected={selectedTags.includes(tag.slug)} onClick={() => toggleTag(tag.slug)} />
          ))}
        </Box>
      </Box>
    </Stack>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)', py: { xs: 8, md: 10 }, textAlign: 'center', position: 'relative' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>AI Insights Blog</Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>Explore {data?.total ?? '2,400+'} articles on AI and machine learning</Typography>
          <TextField fullWidth value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> } }} sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: 3, '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
        </Container>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3, position: 'sticky', top: 88 }}><FiltersContent /></Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">Showing <strong>{data?.data.length ?? 0}</strong> of <strong>{data?.total ?? 0}</strong> articles</Typography>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 160 }}><InputLabel>Sort By</InputLabel><Select value={sort} label="Sort By" onChange={e => setSort(e.target.value as SortOption)}>{SORT_OPTIONS.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}</Select></FormControl>
                  <Button variant="outlined" startIcon={<TuneIcon />} onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'flex', md: 'none' } }}>Filters</Button>
                </Stack>
              </Stack>
              <Grid container spacing={3}>
                {isLoading ? Array.from({ length: 9 }).map((_, i) => <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i}><BlogCardSkeleton /></Grid>) : data?.data.length === 0 ? <Grid size={12}><Paper elevation={0} sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}><Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>No articles found</Typography><Button variant="contained" onClick={clearFilters}>Clear Filters</Button></Paper></Grid> : data?.data.map(blog => <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={blog.id}><BlogCard blog={blog} /></Grid>)}
              </Grid>
              {data && data.totalPages > 1 && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}><Pagination count={data.totalPages} page={page} onChange={(_, p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} color="primary" size="large" shape="rounded" /></Box>}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              borderRadius: '0 24px 24px 0',
            },
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Filters</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <FiltersContent />
        </Box>
      </Drawer>
      <Footer />
    </Box>
  );
}
