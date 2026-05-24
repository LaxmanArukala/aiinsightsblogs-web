'use client';

import { Box, Container, Grid, Typography, Paper, Avatar, Stack, Button, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import SectionHeader from '@/src/components/common/SectionHeader';
import { teamMembers, testimonials } from '@/src/utils/mockData';
import { SITE_NAME } from '@/src/constants';
import { Testimonial } from '@/src/types';

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 60%, #164e63 100%)', py: { xs: 10, md: 16 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(14,165,233,0.12) 0%, transparent 60%)' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Chip label="About Us" sx={{ mb: 3, bgcolor: 'rgba(14,165,233,0.15)', color: '#7dd3fc', border: '1px solid rgba(14,165,233,0.3)', fontWeight: 600 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, color: 'white', mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>The Home of <Box component="span" sx={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Intelligence</Box></Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>A team of AI researchers, engineers, and journalists passionate about making AI accessible for everyone.</Typography>
        </Container>
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ py: 10 }}>
          <Container maxWidth="xl">
            <Grid container spacing={8} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Chip label="Our Story" size="small" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>Building the World's Best AI Media Platform</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>Founded in 2019, {SITE_NAME} was born from a simple observation: as AI was transforming every industry, there was no single, trusted destination for high-quality AI news and analysis.</Typography>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={Link} href="/blogs">Explore Our Content</Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  {[
                    { value: '2019', label: 'Founded' },
                    { value: '2,400+', label: 'Articles' },
                    { value: '150+', label: 'Authors' },
                    { value: '1.2M+', label: 'Readers' },
                  ].map((stat, i) => (
                    <Grid size={6} key={i}>
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
        <Box sx={{ py: 10, bgcolor: 'action.hover' }}>
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper elevation={0} sx={{ p: 5, height: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }}>
                  <RocketLaunchIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontWeight: 700 }}>Our Mission</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 2, mt: 1 }}>Democratize AI Knowledge</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>To be the world's most trusted source of AI news, analysis, and education.</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper elevation={0} sx={{ p: 5, height: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  <VisibilityIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontWeight: 700 }}>Our Vision</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 2, mt: 1 }}>A Humanity-Centered AI Future</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>We envision a future where AI enhances human potential.</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box id="team" sx={{ py: 10 }}>
          <Container maxWidth="xl">
            <SectionHeader label="Our Team" title="Meet the Minds Behind AI Insights Hub" centered />
            <Grid container spacing={3}>
              {teamMembers.map(member => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
                  <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Avatar src={member.avatar} alt={member.name} sx={{ width: 96, height: 96, mx: 'auto', mb: 2, border: '3px solid', borderColor: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{member.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{member.role}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>{member.bio}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box sx={{ py: 10, background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)', textAlign: 'center' }}>
          <Container maxWidth="md">
            <FavoriteIcon sx={{ fontSize: 48, color: '#0ea5e9', mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>Join Our Growing Community</Typography>
            <Button variant="contained" size="large" component={Link} href="/blogs" sx={{ px: 4, bgcolor: '#0ea5e9' }}>Start Reading</Button>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
