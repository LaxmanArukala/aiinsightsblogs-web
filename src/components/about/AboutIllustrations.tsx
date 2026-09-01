'use client';

import { Box, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * Illustration set for the About page — inline SVG rather than photography.
 *
 * Each figure is theme-aware: panels and hairlines follow the palette while the
 * accent gradients stay constant, so the artwork reads on both a cream and a deep
 * slate ground. Motion is transform-only and stops under prefers-reduced-motion.
 */

function useInk() {
  const isDark = useTheme().palette.mode === 'dark';
  return {
    isDark,
    panel: isDark ? '#101b30' : '#ffffff',
    edge: isDark ? 'rgba(148,163,184,0.30)' : 'rgba(15,23,42,0.12)',
    line: isDark ? 'rgba(148,163,184,0.34)' : 'rgba(15,23,42,0.14)',
    lineStrong: isDark ? 'rgba(203,213,225,0.62)' : 'rgba(15,23,42,0.32)',
    ground: isDark ? 'rgba(148,163,184,0.10)' : 'rgba(15,23,42,0.05)',
  };
}

function Svg({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <Box
      component="svg"
      viewBox={viewBox}
      role="presentation"
      sx={{
        width: '100%',
        height: 'auto',
        display: 'block',
        overflow: 'visible',
        '@keyframes figFloat': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <defs>
        <linearGradient id="ab-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" /><stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="ab-emerald" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="ab-amber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="ab-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {children}
    </Box>
  );
}

/** Hero: a article surface with an overlapping card and a signal orb. */
export function FigureHero() {
  const c = useInk();
  return (
    <Svg viewBox="0 0 520 400">
      <circle cx="430" cy="70" r="58" fill="url(#ab-sky)" opacity={c.isDark ? 0.30 : 0.20} />
      <g style={{ animation: 'figFloat 8s ease-in-out infinite' }}>
        <rect x="40" y="52" width="360" height="250" rx="20" fill={c.panel} stroke={c.edge} strokeWidth="2" />
        <rect x="64" y="78" width="150" height="104" rx="12" fill="url(#ab-sky)" />
        <circle cx="96" cy="108" r="10" fill="#fff" opacity="0.9" />
        <path d="M74 166 L104 134 L128 160 L148 144 L204 182 L74 182 Z" fill="#fff" opacity="0.34" />
        <rect x="232" y="80" width="144" height="10" rx="5" fill={c.lineStrong} />
        <rect x="232" y="104" width="112" height="8" rx="4" fill={c.line} />
        <rect x="232" y="124" width="130" height="8" rx="4" fill={c.line} />
        <rect x="232" y="144" width="86" height="8" rx="4" fill={c.line} />
        <rect x="232" y="166" width="66" height="18" rx="9" fill="url(#ab-violet)" />
        <rect x="64" y="204" width="312" height="8" rx="4" fill={c.line} />
        <rect x="64" y="224" width="256" height="8" rx="4" fill={c.line} />
        <rect x="64" y="244" width="184" height="8" rx="4" fill={c.line} />
      </g>
      <g style={{ animation: 'figFloat 6s ease-in-out 1s infinite' }}>
        <rect x="300" y="244" width="190" height="118" rx="18" fill={c.panel} stroke={c.edge} strokeWidth="2" />
        <rect x="322" y="266" width="60" height="60" rx="14" fill="url(#ab-emerald)" />
        <rect x="396" y="270" width="72" height="9" rx="4.5" fill={c.lineStrong} />
        <rect x="396" y="290" width="56" height="7" rx="3.5" fill={c.line} />
        <rect x="396" y="307" width="64" height="7" rx="3.5" fill={c.line} />
      </g>
    </Svg>
  );
}

/** Coverage: topic cards fanned out, one per accent. */
export function FigureCoverage() {
  const c = useInk();
  const cards = [
    { x: 24, y: 96, r: -8, fill: 'url(#ab-amber)' },
    { x: 128, y: 58, r: -2, fill: 'url(#ab-emerald)' },
    { x: 236, y: 84, r: 7, fill: 'url(#ab-sky)' },
  ];
  return (
    <Svg viewBox="0 0 460 380">
      <circle cx="120" cy="300" r="70" fill="url(#ab-violet)" opacity={c.isDark ? 0.24 : 0.16} />
      {cards.map((card, i) => (
        <g
          key={card.x}
          transform={`rotate(${card.r} ${card.x + 92} ${card.y + 110})`}
          style={{ animation: `figFloat ${7 + i}s ease-in-out ${i * 0.6}s infinite` }}
        >
          <rect x={card.x} y={card.y} width="184" height="220" rx="18" fill={c.panel} stroke={c.edge} strokeWidth="2" />
          <rect x={card.x + 18} y={card.y + 18} width="148" height="76" rx="12" fill={card.fill} />
          <rect x={card.x + 18} y={card.y + 110} width="120" height="9" rx="4.5" fill={c.lineStrong} />
          <rect x={card.x + 18} y={card.y + 132} width="148" height="7" rx="3.5" fill={c.line} />
          <rect x={card.x + 18} y={card.y + 150} width="106" height="7" rx="3.5" fill={c.line} />
          <rect x={card.x + 18} y={card.y + 176} width="58" height="16" rx="8" fill={c.ground} />
        </g>
      ))}
    </Svg>
  );
}

/** Pipeline: source -> model -> published article, joined by dashed hops. */
export function FigurePipeline() {
  const c = useInk();
  return (
    <Svg viewBox="0 0 480 340">
      <path d="M96 118 C 150 78, 190 78, 236 118 M244 170 C 292 214, 330 214, 382 176" stroke={c.line} strokeWidth="2.5" strokeDasharray="6 8" fill="none" />
      <g style={{ animation: 'figFloat 7s ease-in-out infinite' }}>
        <rect x="24" y="94" width="112" height="86" rx="16" fill={c.panel} stroke={c.edge} strokeWidth="2" />
        <rect x="42" y="112" width="52" height="7" rx="3.5" fill={c.lineStrong} />
        <rect x="42" y="128" width="76" height="6" rx="3" fill={c.line} />
        <rect x="42" y="142" width="62" height="6" rx="3" fill={c.line} />
        <rect x="42" y="156" width="70" height="6" rx="3" fill={c.line} />
      </g>
      <g style={{ animation: 'figFloat 5.5s ease-in-out 0.8s infinite' }}>
        <circle cx="240" cy="146" r="52" fill="url(#ab-violet)" />
        <path d="M240 118 l7 17 18 3 -13 13 3 18 -15 -9 -15 9 3 -18 -13 -13 18 -3 z" fill="#fff" opacity="0.95" />
      </g>
      <g style={{ animation: 'figFloat 8s ease-in-out 1.4s infinite' }}>
        <rect x="344" y="150" width="126" height="150" rx="16" fill={c.panel} stroke={c.edge} strokeWidth="2" />
        <rect x="364" y="170" width="86" height="42" rx="10" fill="url(#ab-sky)" />
        <rect x="364" y="226" width="76" height="8" rx="4" fill={c.lineStrong} />
        <rect x="364" y="246" width="86" height="6" rx="3" fill={c.line} />
        <rect x="364" y="262" width="62" height="6" rx="3" fill={c.line} />
        <rect x="364" y="278" width="72" height="6" rx="3" fill={c.line} />
      </g>
    </Svg>
  );
}

/** Library: a tile grid with one card lifted out. */
export function FigureLibrary() {
  const c = useInk();
  const tiles = [
    { x: 26, y: 40 }, { x: 168, y: 40 },
    { x: 26, y: 168 }, { x: 168, y: 168 },
  ];
  return (
    <Svg viewBox="0 0 460 340">
      <circle cx="372" cy="252" r="64" fill="url(#ab-emerald)" opacity={c.isDark ? 0.26 : 0.18} />
      {tiles.map((t) => (
        <g key={`${t.x}-${t.y}`}>
          <rect x={t.x} y={t.y} width="124" height="110" rx="14" fill={c.panel} stroke={c.edge} strokeWidth="2" />
          <rect x={t.x + 16} y={t.y + 16} width="92" height="40" rx="9" fill={c.ground} />
          <rect x={t.x + 16} y={t.y + 68} width="74" height="7" rx="3.5" fill={c.lineStrong} />
          <rect x={t.x + 16} y={t.y + 84} width="56" height="6" rx="3" fill={c.line} />
        </g>
      ))}
      <g style={{ animation: 'figFloat 6.5s ease-in-out infinite' }}>
        <rect x="266" y="94" width="164" height="150" rx="18" fill={c.panel} stroke={c.edge} strokeWidth="2.5" />
        <rect x="288" y="116" width="120" height="60" rx="12" fill="url(#ab-amber)" />
        <rect x="288" y="190" width="98" height="9" rx="4.5" fill={c.lineStrong} />
        <rect x="288" y="210" width="120" height="7" rx="3.5" fill={c.line} />
      </g>
    </Svg>
  );
}
