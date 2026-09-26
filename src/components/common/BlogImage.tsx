'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface BlogImageProps {
  src?: string | null;
  alt: string;
  sx?: SxProps<Theme>;
  priority?: boolean;
  /**
   * The rendered width at each breakpoint, so the browser can pick a variant
   * instead of downloading the 1200x630 original. Without it every thumbnail
   * pulls the full-size card.
   */
  sizes?: string;
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

export default function BlogImage({
  src,
  alt,
  sx,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 400px',
}: Readonly<BlogImageProps>) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <Box sx={{ width: '100%', height: '100%', ...sx }}><Fallback /></Box>;
  }

  // `fill` needs a positioned ancestor; every caller already clips this in a
  // sized, overflow-hidden box, so the wrapper only has to establish position.
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', ...sx }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setErrored(true)}
        style={{ objectFit: 'cover', display: 'block' }}
      />
    </Box>
  );
}
