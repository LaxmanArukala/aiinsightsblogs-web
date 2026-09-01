import { ImageResponse } from 'next/og';
import { API_BASE_URL } from '@/src/constants';

export const revalidate = 86400;

const WIDTH = 1200;
const HEIGHT = 630;
const UUID_LENGTH = 36;

/** Seeded from the post id so a given post always renders the same accent. */
const ACCENTS = [
  { from: '#0ea5e9', to: '#22d3ee' },
  { from: '#10b981', to: '#4ade80' },
  { from: '#f59e0b', to: '#fbbf24' },
  { from: '#ef4444', to: '#fb7185' },
  { from: '#8b5cf6', to: '#c084fc' },
  { from: '#ec4899', to: '#f472b6' },
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

/** Last-resort title when the API is unreachable: `some-post-title-1786939292733` → `Some Post Title`. */
function titleFromSlug(slug: string): string {
  return slug
    .replace(/-\d{10,}$/, '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

interface OgBlog {
  title: string;
  category?: { name?: string };
  read_time?: number;
}

async function fetchBlog(uuid: string): Promise<OgBlog | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/blogs/${uuid}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as OgBlog | null;
  } catch {
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: param } = await params;
  const uuid = param.substring(0, UUID_LENGTH);
  const slug = param.substring(UUID_LENGTH + 1);

  const blog = await fetchBlog(uuid);
  const title = blog?.title || titleFromSlug(slug) || 'AI Insights Blogs';
  const category = blog?.category?.name || 'AI Insights';
  const readTime = blog?.read_time;

  const accent = ACCENTS[hash(param) % ACCENTS.length];
  // Long headlines need to step down a size or two to stay inside three lines.
  const fontSize = title.length > 95 ? 52 : title.length > 60 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#0f172a',
          backgroundImage: `radial-gradient(900px 600px at 82% 6%, ${accent.from}44 0%, transparent 62%), radial-gradient(700px 500px at 4% 100%, ${accent.to}2e 0%, transparent 60%)`,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 40,
              borderRadius: 999,
              backgroundImage: `linear-gradient(180deg, ${accent.from}, ${accent.to})`,
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: accent.to,
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize,
            fontWeight: 800,
            lineHeight: 1.14,
            letterSpacing: '-0.03em',
            color: '#f8fafc',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148,163,184,0.28)',
            paddingTop: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                fontSize: 22,
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              AI
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#e2e8f0',
              }}
            >
              AI Insights Blogs
            </div>
          </div>
          {readTime ? (
            <div style={{ fontSize: 24, fontWeight: 600, color: '#94a3b8' }}>{`${readTime} min read`}</div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      },
    },
  );
}
