'use client';

import { Box, Container, Grid, Typography, Skeleton } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/src/services/blogService';
import { formatNumber } from '@/src/utils/formatters';

const STAT_CONFIG = [
  { key: 'totalArticles', icon: <ArticleIcon />, label: 'Articles Published', color: '#0ea5e9' },
  { key: 'totalViews',    icon: <VisibilityIcon />, label: 'Total Views',       color: '#10b981' },
  { key: 'totalLikes',    icon: <FavoriteIcon />,  label: 'Total Likes',        color: '#f59e0b' },
  { key: 'categories',   icon: <CategoryIcon />,  label: 'AI Topics',           color: '#ec4899' },
] as const;

export default function StatsSection() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['blogStats'],
    queryFn: () => blogService.getStats(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Box sx={{ py: 8, background: (theme) => theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)' }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {STAT_CONFIG.map((stat) => {
            const raw = stats?.[stat.key] ?? 0;
            const value = formatNumber(raw);
            return (
              <Grid size={{ xs: 6, md: 3 }} key={stat.key}>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: `${stat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: stat.color, '& svg': { fontSize: 32 } }}>
                    {stat.icon}
                  </Box>
                  {isLoading ? (
                    <Skeleton variant="text" width={80} height={52} sx={{ mx: 'auto', mb: 0.5 }} />
                  ) : (
                    <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, mb: 0.5 }}>{value}</Typography>
                  )}
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.label}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
