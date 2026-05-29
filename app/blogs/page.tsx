'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Grid, Typography, TextField, Button, Stack, MenuItem, Select, FormControl, InputLabel, Pagination, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import BlogCard from '@/src/components/common/BlogCard';
import BlogCardSkeleton from '@/src/components/common/BlogCardSkeleton';
import { blogService } from '@/src/services/blogService';
import { SORT_OPTIONS } from '@/src/constants';
import type { SortOption } from '@/src/types';

export default function BlogsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('latest');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => { const t = setTimeout(() => setDebouncedSearch(search), 400); return () => clearTimeout(t); }, [search]);
  useEffect(() => { setPage(1); }, [debouncedSearch, sort]);

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', debouncedSearch, sort, page],
    queryFn: () => blogService.getBlogs({ search: debouncedSearch, sort, page }),
  });

  const skeletons = Array.from({ length: 9 }, (_, i) => (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={`skeleton-${i}`}><BlogCardSkeleton /></Grid>
  ));

  const emptyState = (
    <Grid size={12}>
      <Paper elevation={0} sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>No articles found</Typography>
        <Button variant="contained" onClick={() => setSearch('')}>Clear Search</Button>
      </Paper>
    </Grid>
  );

  let blogGridContent;
  if (isLoading) { blogGridContent = skeletons; }
  else if (data?.data.length) { blogGridContent = data.data.map(blog => <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={blog.id}><BlogCard blog={blog} /></Grid>); }
  else { blogGridContent = emptyState; }

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
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Showing <strong>{data?.data.length ?? 0}</strong> of <strong>{data?.total ?? 0}</strong> articles
            </Typography>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sort} label="Sort By" onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
          <Grid container spacing={3}>
            {blogGridContent}
          </Grid>
          {data && data.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination count={data.totalPages} page={page} onChange={(_, p) => { setPage(p); globalThis.scrollTo({ top: 0, behavior: 'smooth' }); }} color="primary" size="large" shape="rounded" />
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
