'use client';

import { Box, Typography, Chip } from '@mui/material';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 5, textAlign: centered ? 'center' : 'left' }}>
      {label && <Chip label={label} size="small" sx={{ mb: 2, bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />}
      <Typography variant="h3" component="h2" sx={{ mb: subtitle ? 2 : 0, fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800 }}>{title}</Typography>
      {subtitle && <Typography variant="body1" color="text.secondary" sx={{ maxWidth: centered ? 600 : '100%', mx: centered ? 'auto' : 0, lineHeight: 1.7 }}>{subtitle}</Typography>}
    </Box>
  );
}
