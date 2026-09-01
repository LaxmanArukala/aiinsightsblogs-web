'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { AI_TOPICS } from '@/src/constants';

/**
 * Topics arranged around a hexagon — one vertex per topic.
 *
 * The geometry is computed rather than hardcoded so the layout stays correct if a
 * topic is added or removed. Labels and SVG share one coordinate space: labels are
 * positioned as percentages of the same viewBox the polygon is drawn in.
 *
 * The diagram is decorative, so below `md` the labels drop out of absolute
 * positioning and stack. They are the same DOM nodes in both layouts — rendering a
 * separate mobile list would duplicate every topic link in the markup.
 */

const VIEW_W = 1200;
const VIEW_H = 760;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const VERTEX_R = 200;
// 320 with a 248px label keeps every label inside the 1000px container; at 332
// the four side labels overflow it.
const LABEL_R = 320;

/**
 * Results are rounded before they reach markup. Math.sin/Math.cos are not required
 * to be correctly rounded, so V8 (SSR) and JavaScriptCore (Safari) can disagree in
 * the final ULP; emitting full precision into CSS percentages and SVG coordinates
 * made the server and client style strings differ and broke hydration. Three
 * decimals in a 1200-unit viewBox is far below one device pixel.
 */
function pointAt(index: number, radius: number, total: number) {
  const angle = (index / total) * 2 * Math.PI; // 0 = top, clockwise
  return {
    x: Number((CX + radius * Math.sin(angle)).toFixed(3)),
    y: Number((CY - radius * Math.cos(angle)).toFixed(3)),
  };
}

const TOTAL = AI_TOPICS.length;

const NODES = AI_TOPICS.map((topic, i) => {
  const vertex = pointAt(i, VERTEX_R, TOTAL);
  const label = pointAt(i, LABEL_R, TOTAL);
  const dx = label.x - CX;
  // Anchor each label away from the centre so it never overlaps the polygon.
  const side = Math.abs(dx) < 1 ? 'center' : dx > 0 ? 'left' : 'right';
  return {
    topic,
    vertex,
    left: `${((label.x / VIEW_W) * 100).toFixed(3)}%`,
    top: `${((label.y / VIEW_H) * 100).toFixed(3)}%`,
    align: side === 'center' ? 'center' : side === 'left' ? 'left' : 'right',
    transform:
      side === 'center' ? 'translate(-50%, -50%)' : side === 'left' ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
  };
});

const POLYGON_POINTS = NODES.map((n) => `${n.vertex.x},${n.vertex.y}`).join(' ');

export default function TrendingTopics() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const accent = theme.palette.primary.main;
  const dashed = isDark ? 'rgba(56,189,248,0.45)' : 'rgba(14,165,233,0.5)';
  const fill = isDark ? 'rgba(148,163,184,0.07)' : 'rgba(15,23,42,0.045)';
  const nodeFill = isDark ? '#0f172a' : '#ffffff';

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.9rem' },
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            mb: 2,
          }}
        >
          <Box component="span" sx={{ color: accent }}>Trending</Box>{' '}
          topics in AI
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: 560,
            mx: 'auto',
            lineHeight: 1.7,
            mb: { xs: 5, md: 2 },
          }}
        >
          Six threads run through everything published here. Pick one to start reading.
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            aspectRatio: { md: `${VIEW_W} / ${VIEW_H}` },
            display: { xs: 'grid', md: 'block' },
            gap: { xs: 2.5, md: 0 },
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'none' },
          }}
        >
          {/* Hexagon — decorative, and hidden entirely on small screens. */}
          <Box
            component="svg"
            aria-hidden
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: { xs: 'none', md: 'block' } }}
          >
            <polygon points={POLYGON_POINTS} fill={fill} />
            <polygon
              points={POLYGON_POINTS}
              fill="none"
              stroke={dashed}
              strokeWidth={2}
              strokeDasharray="7 9"
              strokeLinejoin="round"
            />
            {NODES.map((n) => (
              <circle
                key={`node-${n.topic.id}`}
                cx={n.vertex.x}
                cy={n.vertex.y}
                r={11}
                fill={nodeFill}
                stroke={n.topic.color}
                strokeWidth={3}
              />
            ))}
          </Box>

          {/* Centre mark */}
          <Box
            aria-hidden
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 168,
              height: 168,
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark
                ? 'radial-gradient(circle at 50% 40%, rgba(14,165,233,0.22), rgba(15,23,42,0.9))'
                : 'radial-gradient(circle at 50% 40%, rgba(14,165,233,0.14), rgba(255,255,255,0.95))',
              border: `1px solid ${isDark ? 'rgba(148,163,184,0.22)' : 'rgba(15,23,42,0.08)'}`,
            }}
          >
            <Box
              sx={{
                width: 76,
                height: 76,
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                color: '#fff',
                fontWeight: 900,
                fontSize: '1.4rem',
                letterSpacing: '-0.02em',
                boxShadow: '0 18px 40px rgba(14,165,233,0.35)',
              }}
            >
              AI
            </Box>
          </Box>

          {/* Topic labels — absolutely placed on md+, stacked below it. */}
          {NODES.map((n) => (
            <Box
              key={n.topic.id}
              component={Link}
              href={`/blogs?category=${n.topic.slug}`}
              sx={{
                textDecoration: 'none',
                display: 'block',
                position: { xs: 'static', md: 'absolute' },
                left: { md: n.left },
                top: { md: n.top },
                transform: { md: n.transform },
                width: { xs: '100%', md: 248 },
                textAlign: { xs: 'left', md: n.align as 'left' | 'right' | 'center' },
                p: { xs: 2.5, md: 0 },
                borderRadius: { xs: 3, md: 0 },
                border: { xs: '1px solid', md: 'none' },
                borderColor: { xs: 'divider', md: 'transparent' },
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                '&:hover': {
                  borderColor: { xs: n.topic.color, md: 'transparent' },
                  transform: { md: `${n.transform} translateY(-3px)` },
                },
                '&:hover .topic-pill': {
                  filter: 'brightness(1.08)',
                  boxShadow: `0 8px 24px ${n.topic.color}44`,
                },
              }}
            >
              <Box
                className="topic-pill"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.85,
                  mb: 1.25,
                  borderRadius: 999,
                  bgcolor: n.topic.color,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  lineHeight: 1.2,
                  transition: 'filter 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <Box component="span" aria-hidden sx={{ fontSize: '0.95rem' }}>{n.topic.icon}</Box>
                {n.topic.name}
              </Box>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                }}
              >
                {n.topic.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
