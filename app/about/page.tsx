'use client';

import { Box, Container, Grid, Typography, Paper, Stack, Button, Chip } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import VerifiedIcon from '@mui/icons-material/Verified';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import SectionHeader from '@/src/components/common/SectionHeader';
import { SITE_NAME } from '@/src/constants';

const WHAT_WE_COVER = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 36, color: '#0ea5e9' }} />,
    title: 'AI Agents',
    description: 'From ReAct patterns and LangChain tutorials to multi-agent orchestration and production deployment — we cover the full spectrum of autonomous AI systems.',
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 36, color: '#10b981' }} />,
    title: 'Large Language Models',
    description: 'Transformer architectures, fine-tuning with LoRA, RAG pipelines, prompt engineering, and hands-on comparisons of GPT-4, Claude, Gemini, and open-source alternatives.',
  },
  {
    icon: <ElectricBoltIcon sx={{ fontSize: 36, color: '#f59e0b' }} />,
    title: 'Generative AI',
    description: 'Text-to-image with Stable Diffusion and DALL-E, video generation, multimodal models, enterprise use cases, and the ethics of AI-created content.',
  },
];

const WHY_US = [
  'Every article is written by practitioners — engineers, researchers, and product leaders building real AI systems.',
  'Content ranges from beginner-friendly introductions to production-grade deep dives with working code examples.',
  'We cover the full stack: theory, implementation, deployment, cost optimisation, and responsible AI.',
  'Updated continuously as the AI landscape evolves — no stale articles gathering dust.',
  'All code examples are tested, copy-pasteable, and explained line by line.',
  'We cover both proprietary APIs (OpenAI, Anthropic, Google) and open-source models you can run locally.',
];

const STATS = [
  { value: '30+', label: 'In-Depth Articles' },
  { value: '3', label: 'Core AI Topics' },
  { value: '100%', label: 'Free to Read' },
  { value: '2025', label: 'Launched' },
];

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 60%, #164e63 100%)', py: { xs: 10, md: 16 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(14,165,233,0.12) 0%, transparent 60%)' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Chip label="About Us" sx={{ mb: 3, bgcolor: 'rgba(14,165,233,0.15)', color: '#7dd3fc', border: '1px solid rgba(14,165,233,0.3)', fontWeight: 600 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, color: 'white', mb: 3, fontSize: { xs: '2.2rem', md: '3.5rem' }, lineHeight: 1.15 }}>
            Where Practitioners Come to{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Learn AI
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 680, mx: 'auto' }}>
            {SITE_NAME} is a focused knowledge hub for developers, researchers, and product builders
            who want to go beyond the hype and understand how modern AI systems actually work.
          </Typography>
        </Container>
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>

        {/* What We Are */}
        <Box sx={{ py: 10 }}>
          <Container maxWidth="xl">
            <Grid container spacing={8} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Chip label="Our Purpose" size="small" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                  Deep-Dive AI Content for People Who Build Things
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
                  The AI landscape moves fast. Every week brings new models, frameworks, and techniques — and most coverage stays
                  at the surface level. {SITE_NAME} exists to go deeper.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.9 }}>
                  We focus on three topics that are reshaping how software is built: <strong>AI Agents</strong>, <strong>Large Language
                  Models</strong>, and <strong>Generative AI</strong>. Every article we publish aims to give you something you can apply
                  immediately — whether that's a working code pattern, a mental model, or a decision framework.
                </Typography>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={Link} href="/blogs">
                  Read Our Articles
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  {STATS.map((stat) => (
                    <Grid size={6} key={stat.label + stat.value}>
                      <Paper elevation={0} sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* What We Cover */}
        <Box sx={{ py: 10, bgcolor: 'action.hover' }}>
          <Container maxWidth="xl">
            <SectionHeader label="What We Cover" title="Three Topics. Covered Thoroughly." centered />
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {WHAT_WE_COVER.map((item) => (
                <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                  <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{item.description}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Mission & Vision */}
        <Box sx={{ py: 10 }}>
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper elevation={0} sx={{ p: 5, height: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }}>
                  <RocketLaunchIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontWeight: 700 }}>Our Mission</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 2, mt: 1 }}>Make AI Knowledge Accessible</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                    To bridge the gap between AI research and practical application — making complex concepts understandable
                    and immediately useful for developers and builders worldwide.
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper elevation={0} sx={{ p: 5, height: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  <VisibilityIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontWeight: 700 }}>Our Vision</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 2, mt: 1 }}>A Well-Informed AI Community</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                    A future where every engineer and product builder has the knowledge to build AI-powered systems
                    responsibly, effectively, and with confidence.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Why Read Us */}
        <Box sx={{ py: 10, bgcolor: 'action.hover' }}>
          <Container maxWidth="lg">
            <SectionHeader label="Why AI Insights Blogs" title="What Makes Our Content Different" centered />
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {WHY_US.map((point) => (
                <Grid size={{ xs: 12, sm: 6 }} key={point.slice(0, 40)}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                    <VerifiedIcon sx={{ color: 'primary.main', mt: 0.3, flexShrink: 0 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>{point}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Topics Quick Links */}
        <Box sx={{ py: 10 }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <SectionHeader label="Get Started" title="Find What You're Looking For" centered />
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {[
                { label: 'AI Agents', slug: 'ai-agents', color: '#0ea5e9', desc: 'Autonomous systems, LangChain, LangGraph, multi-agent workflows.' },
                { label: 'LLMs', slug: 'llms', color: '#10b981', desc: 'Transformers, fine-tuning, RAG, prompt engineering, local models.' },
                { label: 'Generative AI', slug: 'generative-ai', color: '#f59e0b', desc: 'Image generation, video AI, multimodal models, enterprise use cases.' },
              ].map((topic) => (
                <Grid size={{ xs: 12, md: 4 }} key={topic.slug}>
                  <Paper
                    elevation={0}
                    component={Link}
                    href={`/blogs?category=${topic.slug}`}
                    sx={{
                      p: 4, display: 'block', textDecoration: 'none',
                      border: '1px solid', borderColor: 'divider', borderRadius: 3,
                      transition: 'all 0.2s', '&:hover': { borderColor: topic.color, boxShadow: 4, transform: 'translateY(-4px)' },
                    }}
                  >
                    <Chip label={topic.label} size="small" sx={{ bgcolor: topic.color, color: 'white', fontWeight: 700, mb: 2 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{topic.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA */}
        <Box sx={{ py: 10, background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)', textAlign: 'center' }}>
          <Container maxWidth="md">
            <CheckCircleIcon sx={{ fontSize: 48, color: '#0ea5e9', mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>
              Ready to Level Up Your AI Knowledge?
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
              Browse our full library of articles — all free, all practical, all written by people who build AI systems.
            </Typography>
            <Button variant="contained" size="large" component={Link} href="/blogs" endIcon={<ArrowForwardIcon />} sx={{ px: 5, bgcolor: '#0ea5e9' }}>
              Start Reading
            </Button>
          </Container>
        </Box>

      </Box>
      <Footer />
    </Box>
  );
}
