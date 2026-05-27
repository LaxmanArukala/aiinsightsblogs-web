'use client';

import { useState } from 'react';
import { Box, Container, Grid, Typography, Stack, IconButton, Divider, TextField, Button, Link as MuiLink, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import { SITE_NAME, SITE_DESCRIPTION } from '@/src/constants';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';
import apiClient from '@/src/services/apiClient';

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Platform: [{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }],
  Categories: [{ label: 'AI Agents', href: '/blogs?category=ai-agents' }, { label: 'LLMs', href: '/blogs?category=llms' }, { label: 'Generative AI', href: '/blogs?category=generative-ai' }],
  Legal: [{ label: 'About', href: '/about' }, { label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms & Conditions', href: '/terms-and-conditions' }],
};

export default function Footer() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch(showSnackbar({ message: 'Please enter a valid email address.', severity: 'error' }));
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/api/v1/subscribers', { email: email.trim() });
      setDone(true);
      setEmail('');
      dispatch(showSnackbar({ message: 'Subscribed! Welcome to the AI Insights Blogs community.', severity: 'success' }));
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      if (msg?.toLowerCase().includes('already')) {
        dispatch(showSnackbar({ message: 'This email is already subscribed.', severity: 'info' }));
      } else {
        dispatch(showSnackbar({ message: 'Subscription failed. Please try again.', severity: 'error' }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AutoAwesomeIcon sx={{ color: 'white', fontSize: 20 }} /></Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{SITE_NAME}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{SITE_DESCRIPTION}</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><TwitterIcon fontSize="small" /></IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><LinkedInIcon fontSize="small" /></IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><GitHubIcon fontSize="small" /></IconButton>
              </Stack>
            </Stack>
          </Grid>
          {Object.entries(footerLinks).map(([section, links]) => (
            <Grid size={{ xs: 6, sm: 3, md: 2, lg: 2 }} key={section}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem', color: 'text.secondary' }}>{section}</Typography>
              <Stack spacing={1.5}>
                {links.map(link => <MuiLink key={link.href} component={Link} href={link.href} underline="none" sx={{ color: 'text.secondary', fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}>{link.label}</MuiLink>)}
              </Stack>
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem', color: 'text.secondary' }}>Newsletter</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Stay updated with the latest AI news and insights.</Typography>
            {done ? (
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>✓ You're subscribed!</Typography>
            ) : (
              <Stack direction="row" spacing={1}>
                <TextField size="small" placeholder="Your email" fullWidth value={email ?? ''} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubscribe()} type="email" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                <Button variant="contained" size="small" disabled={loading} onClick={handleSubscribe} sx={{ whiteSpace: 'nowrap', px: 2, minWidth: 90 }}>
                  {loading ? <CircularProgress size={14} color="inherit" /> : 'Subscribe'}
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">© 2025 {SITE_NAME}. All rights reserved.</Typography>
          <Stack direction="row" spacing={3}>
            <MuiLink component={Link} href="/privacy-policy" underline="hover" sx={{ color: 'text.secondary', fontSize: '0.8rem', '&:hover': { color: 'primary.main' } }}>Privacy Policy</MuiLink>
            <MuiLink component={Link} href="/terms-and-conditions" underline="hover" sx={{ color: 'text.secondary', fontSize: '0.8rem', '&:hover': { color: 'primary.main' } }}>Terms & Conditions</MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
