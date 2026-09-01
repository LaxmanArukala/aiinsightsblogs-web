'use client';

import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { ADSENSE_ID } from '@/src/constants';

/**
 * A single AdSense placement.
 *
 * Renders nothing in production unless BOTH the publisher id and a slot id are
 * configured — an empty grey "Advertisement" rectangle is worse for readers than no
 * slot at all, and Google's policies discourage shipping placeholder ad furniture.
 * In development an outlined box stands in so the layout is visible while building.
 *
 * Height is reserved up front so the page does not shift when the iframe arrives;
 * layout shift from ads is a common Core Web Vitals regression.
 */

interface AdSlotProps {
  /** Ad unit id from the AdSense dashboard (data-ad-slot). */
  slot?: string;
  /** Reserved height, matching the unit you configured. */
  minHeight?: number;
  format?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ slot, minHeight = 250, format = 'auto', label = 'Advertisement' }: AdSlotProps) {
  const pushed = useRef(false);
  const configured = Boolean(ADSENSE_ID && slot);

  useEffect(() => {
    if (!configured || pushed.current) return;
    // Guarded: pushing twice for the same <ins> throws "All ins elements in the DOM
    // with class=adsbygoogle already have ads in them", which React 19's double
    // invocation in development would otherwise trigger on every mount.
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // A blocked or failed ad must never take the page down.
    }
  }, [configured]);

  if (!configured) {
    if (process.env.NODE_ENV === 'production') return null;
    return (
      <Box
        sx={{
          minHeight,
          borderRadius: '12px',
          border: '1px dashed',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          color: 'text.disabled',
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Ad slot
        </Typography>
        <Typography variant="caption">Set NEXT_PUBLIC_ADSENSE_SLOT_* to enable</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight, overflow: 'hidden' }}>
      <Typography
        component="p"
        variant="caption"
        sx={{ color: 'text.disabled', textAlign: 'center', mb: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem' }}
      >
        {label}
      </Typography>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </Box>
  );
}
