'use client';

import { Box, useTheme } from '@mui/material';

/**
 * Flat-vector illustration for the About section.
 *
 * Drawn inline rather than loaded as an asset: the section previously pulled a
 * ~200KB Unsplash photograph that had nothing to do with the site, cost a
 * cross-origin round trip, and could not adapt to the dark theme. This is a few KB
 * of markup, themes correctly, and stays sharp at any size.
 *
 * Motion is transform-only and disabled under prefers-reduced-motion.
 */
export default function AboutIllustration() {
  const isDark = useTheme().palette.mode === 'dark';

  const panel = isDark ? '#111c33' : '#ffffff';
  const panelEdge = isDark ? 'rgba(148,163,184,0.28)' : 'rgba(15,23,42,0.10)';
  const line = isDark ? 'rgba(148,163,184,0.34)' : 'rgba(15,23,42,0.14)';
  const lineStrong = isDark ? 'rgba(203,213,225,0.6)' : 'rgba(15,23,42,0.30)';

  return (
    <Box
      sx={{
        width: '100%',
        '@keyframes floatSlow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        '@keyframes floatFast': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <Box component="svg" viewBox="0 0 560 470" role="img" aria-label="Illustration of layered article panels connected to a network of AI topics" sx={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="ab-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="ab-violet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="ab-amber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="ab-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
          <filter id="ab-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
        </defs>

        {/* Ambient wash */}
        <g filter="url(#ab-soft)" opacity={isDark ? 0.55 : 0.34}>
          <circle cx="410" cy="120" r="105" fill="#0ea5e9" />
          <circle cx="140" cy="330" r="95" fill="#8b5cf6" />
        </g>

        {/* Primary article panel */}
        <g style={{ animation: 'floatSlow 7s ease-in-out infinite' }}>
          <rect x="196" y="52" width="330" height="214" rx="20" fill={panel} stroke={panelEdge} strokeWidth="2" />
          <rect x="216" y="74" width="140" height="96" rx="12" fill="url(#ab-brand)" />
          <circle cx="248" cy="104" r="9" fill="#ffffff" opacity="0.9" />
          <path d="M226 154 L256 122 L280 148 L300 132 L346 168 L226 168 Z" fill="#ffffff" opacity="0.32" />
          <rect x="374" y="76" width="130" height="9" rx="4.5" fill={lineStrong} />
          <rect x="374" y="98" width="104" height="8" rx="4" fill={line} />
          <rect x="374" y="117" width="118" height="8" rx="4" fill={line} />
          <rect x="374" y="136" width="80" height="8" rx="4" fill={line} />
          <rect x="374" y="158" width="62" height="18" rx="9" fill="url(#ab-violet)" />
          <rect x="216" y="192" width="290" height="8" rx="4" fill={line} />
          <rect x="216" y="212" width="238" height="8" rx="4" fill={line} />
          <rect x="216" y="232" width="176" height="8" rx="4" fill={line} />
        </g>

        {/* Secondary card */}
        <g style={{ animation: 'floatFast 9s ease-in-out infinite' }}>
          <rect x="42" y="150" width="172" height="126" rx="18" fill={panel} stroke={panelEdge} strokeWidth="2" />
          <rect x="62" y="170" width="132" height="52" rx="10" fill="url(#ab-amber)" opacity="0.92" />
          <rect x="62" y="234" width="104" height="8" rx="4" fill={line} />
          <rect x="62" y="252" width="72" height="8" rx="4" fill={line} />
        </g>

        {/* Floating tag */}
        <g style={{ animation: 'floatFast 6s ease-in-out 1s infinite' }}>
          <rect x="96" y="66" width="86" height="52" rx="14" fill="url(#ab-violet)" />
          <circle cx="139" cy="92" r="17" fill="none" stroke="#ffffff" strokeWidth="2.4" opacity="0.95" />
          <path d="M122 92 H156 M139 75 C147 84 147 100 139 109 C131 100 131 84 139 75" stroke="#ffffff" strokeWidth="2.4" fill="none" opacity="0.95" />
        </g>

        {/* Topic node graph */}
        <g style={{ animation: 'floatSlow 8s ease-in-out 0.6s infinite' }}>
          <path d="M150 372 L232 336 M232 336 L318 368 M318 368 L404 330 M232 336 L262 404 M318 368 L342 414" stroke={line} strokeWidth="2" strokeDasharray="5 6" fill="none" />
          <circle cx="150" cy="372" r="13" fill={panel} stroke="#0ea5e9" strokeWidth="3.5" />
          <circle cx="232" cy="336" r="16" fill="url(#ab-brand)" />
          <circle cx="318" cy="368" r="13" fill={panel} stroke="#8b5cf6" strokeWidth="3.5" />
          <circle cx="404" cy="330" r="11" fill={panel} stroke="#f59e0b" strokeWidth="3.5" />
          <circle cx="262" cy="404" r="9" fill={panel} stroke="#10b981" strokeWidth="3" />
          <circle cx="342" cy="414" r="9" fill={panel} stroke="#ec4899" strokeWidth="3" />
        </g>

        {/* Ground wave */}
        <path d="M0 438 C 96 410, 168 462, 268 442 S 448 404, 560 434 L560 470 L0 470 Z" fill="url(#ab-wave)" />
      </Box>
    </Box>
  );
}
