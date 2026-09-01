'use client';

import { Box, useTheme } from '@mui/material';

/**
 * Animated aurora backdrop: light ribbons sweeping across the field with a sparse
 * drifting particle layer.
 *
 * Both themes are supported, but they need opposite compositing to read well:
 * on dark the ribbons glow additively against black, while on light the same
 * shapes are multiplied into the page as tinted washes — screen-blended colour
 * on white would simply disappear.
 *
 * Two performance constraints shaped this:
 * - Only `transform` and `opacity` animate, so the work stays on the compositor.
 *   Animating `filter` or an SVG path's `d` would repaint every frame, and this
 *   sits directly behind the LCP element.
 * - Particle positions come from a seeded hash rather than Math.random, because
 *   server and client markup must match or React fails hydration.
 */

interface Ribbon {
  d: string;
  from: string;
  to: string;
  width: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
}

const RIBBONS: Ribbon[] = [
  { d: 'M -200 540 C 180 500, 420 250, 760 210 S 1200 140, 1500 60',  from: '#7c3aed', to: '#38bdf8', width: 2.5, blur: 22, opacity: 0.85, duration: 26, delay: 0 },
  { d: 'M -200 250 C 160 320, 430 560, 780 590 S 1220 610, 1500 690', from: '#f97316', to: '#ec4899', width: 2,   blur: 26, opacity: 0.7,  duration: 32, delay: -6 },
  { d: 'M -200 400 C 260 360, 520 470, 820 420 S 1240 330, 1500 380', from: '#22d3ee', to: '#a855f7', width: 1.5, blur: 18, opacity: 0.55, duration: 38, delay: -14 },
  { d: 'M -200 120 C 220 200, 480 120, 800 300 S 1180 500, 1500 460', from: '#f59e0b', to: '#ef4444', width: 1.5, blur: 30, opacity: 0.45, duration: 44, delay: -22 },
];

const PARTICLE_COUNT = 36;

/**
 * Deterministic pseudo-random in [0,1), using integer-only arithmetic.
 *
 * A Math.sin-based hash was used here originally and broke hydration: ECMA-262
 * does not require Math.sin to be correctly rounded, so V8 (Node, during SSR) and
 * JavaScriptCore (Safari) disagree in the final ULP. Those values were emitted
 * into CSS at full precision, so a single differing bit changed the style string
 * and therefore the emotion class hash.
 *
 * Math.imul and the bitwise operators are exactly specified, so every engine
 * produces identical results.
 */
function seeded(n: number): number {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296; // exact: divisor is a power of two
}

/** Trim emitted values so the CSS text stays short and stable. */
const q = (value: number, dp = 3): number => Number(value.toFixed(dp));

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: q(seeded(i + 1) * 100),
  top: q(seeded(i + 51) * 100),
  size: q(1 + seeded(i + 101) * 2.4),
  opacity: q(0.15 + seeded(i + 151) * 0.5),
  duration: q(14 + seeded(i + 201) * 22, 2),
  delay: q(-seeded(i + 251) * 30, 2),
}));

export default function AuroraBackground() {
  const isDark = useTheme().palette.mode === 'dark';

  // Light mode needs thicker, softer, less opaque ribbons: multiply blending over
  // a pale ground reads much harder than the same stroke glowing on black.
  const strokeScale = isDark ? 1 : 1.6;
  const opacityScale = isDark ? 1 : 0.42;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        bgcolor: isDark ? '#000000' : '#f6f8fc',
        '@media (prefers-reduced-motion: reduce)': {
          '& *': { animation: 'none !important' },
        },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1300 760"
        preserveAspectRatio="xMidYMid slice"
        sx={{
          position: 'absolute',
          inset: '-10%',
          width: '120%',
          height: '120%',
          mixBlendMode: isDark ? 'screen' : 'multiply',
          '@keyframes ribbonDrift': {
            '0%':   { transform: 'translate3d(-2%, 1%, 0) scale(1.02)' },
            '50%':  { transform: 'translate3d(2%, -2%, 0) scale(1.06)' },
            '100%': { transform: 'translate3d(-2%, 1%, 0) scale(1.02)' },
          },
        }}
      >
        <defs>
          {RIBBONS.map((r, i) => (
            <linearGradient key={`grad-${r.from}-${r.to}`} id={`ribbon-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={r.from} stopOpacity="0" />
              <stop offset="28%" stopColor={r.from} stopOpacity="1" />
              <stop offset="62%" stopColor={r.to} stopOpacity="1" />
              <stop offset="100%" stopColor={r.to} stopOpacity="0" />
            </linearGradient>
          ))}
          {RIBBONS.map((r, i) => (
            <filter key={`filt-${r.from}-${r.to}`} id={`ribbon-blur-${i}`} x="-25%" y="-200%" width="150%" height="500%">
              <feGaussianBlur stdDeviation={r.blur * strokeScale} />
            </filter>
          ))}
        </defs>

        {RIBBONS.map((r, i) => (
          <g
            key={r.d}
            style={{
              animation: `ribbonDrift ${r.duration}s ease-in-out ${r.delay}s infinite`,
              transformOrigin: 'center',
            }}
          >
            {/* Wide, heavily blurred pass supplies the glow. */}
            <path
              d={r.d}
              stroke={`url(#ribbon-grad-${i})`}
              strokeWidth={r.width * 9 * strokeScale}
              fill="none"
              filter={`url(#ribbon-blur-${i})`}
              opacity={r.opacity * 0.75 * opacityScale}
              strokeLinecap="round"
            />
            {/* Narrow, crisp pass gives it a defined core. */}
            <path
              d={r.d}
              stroke={`url(#ribbon-grad-${i})`}
              strokeWidth={r.width * strokeScale}
              fill="none"
              opacity={r.opacity * opacityScale}
              strokeLinecap="round"
            />
          </g>
        ))}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          '@keyframes particleFloat': {
            '0%':   { transform: 'translate3d(0, 0, 0)',        opacity: 0 },
            '12%':  { opacity: 1 },
            '88%':  { opacity: 1 },
            '100%': { transform: 'translate3d(14px, -70px, 0)', opacity: 0 },
          },
        }}
      >
        {PARTICLES.map((p, i) => (
          <Box
            key={`particle-${p.left}-${p.top}`}
            sx={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              bgcolor: isDark ? '#ffffff' : '#334155',
              opacity: isDark ? p.opacity : p.opacity * 0.4,
              animation: `particleFloat ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </Box>

      {/* Vignette: fades the edges toward the page ground so text keeps contrast. */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)'
            : 'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 0%, rgba(246,248,252,0.6) 68%, rgba(246,248,252,0.96) 100%)',
        }}
      />
    </Box>
  );
}
