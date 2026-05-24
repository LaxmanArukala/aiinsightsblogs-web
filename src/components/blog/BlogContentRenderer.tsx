'use client';

import { Box, useTheme } from '@mui/material';

interface BlogContentRendererProps { content: string; }

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: content }}
      sx={{
        '& h2': { fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 800, mt: 4, mb: 2, color: 'text.primary' },
        '& h3': { fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mt: 3, mb: 1.5, color: 'text.primary' },
        '& p': { mb: 2.5, lineHeight: 1.9, color: isDark ? 'rgba(241,245,249,0.85)' : 'rgba(15,23,42,0.8)', fontSize: '1.05rem' },
        '& ul, & ol': { mb: 2.5, pl: 3, '& li': { mb: 1, lineHeight: 1.8, color: isDark ? 'rgba(241,245,249,0.85)' : 'rgba(15,23,42,0.8)' } },
        '& blockquote': { borderLeft: `4px solid ${theme.palette.primary.main}`, pl: 3, py: 1, my: 3, bgcolor: isDark ? 'rgba(14,165,233,0.08)' : 'rgba(14,165,233,0.05)', borderRadius: '0 8px 8px 0', '& p': { mb: 0, fontStyle: 'italic', color: 'text.secondary' } },
        '& pre': { bgcolor: isDark ? '#1e293b' : '#0f172a', color: '#e2e8f0', p: 3, borderRadius: 2, overflow: 'auto', mb: 3, fontSize: '0.875rem', lineHeight: 1.7 },
        '& code': { fontFamily: '"Fira Code", monospace', bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', px: 0.75, py: 0.25, borderRadius: 1, fontSize: '0.875em' },
        '& pre code': { bgcolor: 'transparent', p: 0 },
        '& table': { width: '100%', mb: 3, borderCollapse: 'collapse', '& th, & td': { border: `1px solid ${theme.palette.divider}`, p: 1.5, textAlign: 'left', fontSize: '0.9rem' }, '& th': { bgcolor: isDark ? 'rgba(14,165,233,0.1)' : 'rgba(14,165,233,0.05)', fontWeight: 700 } },
        '& img': { width: '100%', borderRadius: 2, my: 2 },
      }}
    />
  );
}
