'use client';

import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Stack, Chip, CircularProgress, useTheme } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';
import apiClient from '@/src/services/apiClient';

/**
 * A contained, gradient-bordered card rather than a full-bleed dark band.
 *
 * The previous treatment was a centred dark panel, which read as a second hero and
 * repeated that section's composition. Boxing it keeps the page's closing beat
 * distinct, and splitting pitch from form means the input is left-aligned and
 * stacked instead of squeezed into an inline row.
 */

const TRUST_POINTS = ['No spam, ever', 'Unsubscribe in one click', 'Free forever'];

export default function NewsletterSection() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/api/v1/subscribers', { email: email.trim() });
      setSubscribed(true);
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
    <Box component="section" id="newsletter" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Gradient border: a gradient-filled wrapper with an inset opaque panel. */}
        <Box
          sx={{
            p: '1.5px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 52%, #ec4899 100%)',
          }}
        >
          <Box
            sx={{
              borderRadius: '24.5px',
              bgcolor: 'background.paper',
              px: { xs: 3.5, md: 7 },
              py: { xs: 5, md: 7 },
              backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(148,163,184,0.16)' : 'rgba(15,23,42,0.09)'} 1px, transparent 1px)`,
              backgroundSize: '22px 22px',
            }}
          >
            <Grid container spacing={{ xs: 4, md: 8 }} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Chip
                  icon={<MailOutlineIcon sx={{ fontSize: '15px !important' }} />}
                  label="Newsletter"
                  size="small"
                  sx={{ mb: 2.5, fontWeight: 700, borderRadius: 999, bgcolor: 'primary.main', color: '#fff', '& .MuiChip-icon': { color: '#fff' } }}
                />
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.15, letterSpacing: '-0.03em', mb: 2 }}
                >
                  Never miss a{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>deep dive</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 3, maxWidth: 460 }}>
                  New writing on AI agents, LLMs and generative AI, sent straight to your inbox
                  as it is published.
                </Typography>

                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 1.5, sm: 3 } }}>
                  {TRUST_POINTS.map((point) => (
                    <Stack key={point} direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                      <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {point}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                {subscribed ? (
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      gap: 1.5,
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'success.main',
                      bgcolor: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)',
                    }}
                  >
                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      You&apos;re subscribed. Welcome aboard.
                    </Typography>
                  </Stack>
                ) : (
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      value={email ?? ''}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      placeholder="you@example.com"
                      type="email"
                      label="Email address"
                      error={!!error}
                      helperText={error || ' '}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
                    />
                    <Button
                      fullWidth
                      onClick={handleSubscribe}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
                      sx={{
                        py: 1.5,
                        borderRadius: 999,
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1rem',
                        bgcolor: 'primary.main',
                        color: '#fff',
                        '&:hover': { bgcolor: 'primary.dark' },
                        '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'text.disabled' },
                      }}
                    >
                      {loading ? 'Subscribing…' : 'Subscribe free'}
                    </Button>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                      We only email about new articles.
                    </Typography>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
