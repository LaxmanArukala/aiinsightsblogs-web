'use client';

import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

const stats = [
  { icon: <ArticleIcon />, value: '2,400+', label: 'Total Articles', color: '#0ea5e9' },
  { icon: <PeopleIcon />, value: '1.2M+', label: 'Monthly Readers', color: '#10b981' },
  { icon: <PersonIcon />, value: '150+', label: 'Expert Authors', color: '#f59e0b' },
  { icon: <CategoryIcon />, value: '24', label: 'Categories', color: '#ec4899' },
];

export default function StatsSection() {
  return (
    <Box sx={{ py: 8, background: (theme) => theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)' }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {stats.map((stat, i) => (
            <Grid size={{ xs: 6, md: 3 }} key={i}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: `${stat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: stat.color, '& svg': { fontSize: 32 } }}>{stat.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, mb: 0.5 }}>{stat.value}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
