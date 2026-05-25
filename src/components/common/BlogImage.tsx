'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface BlogImageProps {
  src?: string | null;
  alt: string;
  sx?: SxProps<Theme>;
}

function Fallback() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 55%, #164e63 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1 }}>
          AI
        </Typography>
      </Box>
      <Typography
        sx={{
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 800,
          fontSize: '0.8rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        AI Insights
      </Typography>
      <Typography
        sx={{
          color: '#0ea5e9',
          fontWeight: 700,
          fontSize: '0.68rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
        }}
      >
        Blogs
      </Typography>
    </Box>
  );
}

export default function BlogImage({ src, alt, sx }: BlogImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <Box sx={{ width: '100%', height: '100%', ...sx }}><Fallback /></Box>;
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...sx }}
    />
  );
}
