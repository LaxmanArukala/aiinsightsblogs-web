'use client';

import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Stack, Paper, Chip, MenuItem, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';
import { SITE_NAME } from '@/src/constants';
import apiClient from '@/src/services/apiClient';

const SUBJECTS = [
  'General Enquiry',
  'Content Correction',
  'Content Dispute',
  'Feedback / Suggestion',
  'Partnership / Collaboration',
  'Other',
];

const CONTACT_CARDS = [
  {
    icon: <EditNoteOutlinedIcon />,
    color: '#0ea5e9',
    title: 'Content Corrections',
    body: 'Spotted a factual error or outdated information? Let us know and we\'ll review and fix it promptly.',
  },
  {
    icon: <BugReportOutlinedIcon />,
    color: '#ef4444',
    title: 'Content Disputes',
    body: 'If content on this site is misleading or objectionable, raise a dispute. We take all reports seriously.',
  },
  {
    icon: <LightbulbOutlinedIcon />,
    color: '#f59e0b',
    title: 'Suggestions',
    body: 'Have a topic you\'d like us to cover? We\'re always looking for new article ideas from our readers.',
  },
  {
    icon: <MailOutlinedIcon />,
    color: '#10b981',
    title: 'General Contact',
    body: 'Partnerships, collaborations, or anything else — drop us a message and we\'ll get back to you.',
  },
];

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.subject) e.subject = 'Please select a subject.';
    if (!form.message.trim()) e.message = 'Message is required.';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    return e;
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setLoading(true);
    try {
      await apiClient.post('/api/v1/contacts', {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      setSubmitted(true);
      dispatch(showSnackbar({ message: 'Message sent! We\'ll get back to you soon.', severity: 'success' }));
    } catch {
      dispatch(showSnackbar({ message: 'Failed to send message. Please try again.', severity: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── Hero ── */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 60%, #0c2340 100%)',
          py: { xs: 8, md: 11 },
          textAlign: 'center',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 25% 60%, rgba(14,165,233,0.15) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            label="Get In Touch"
            size="small"
            icon={<MailOutlinedIcon style={{ fontSize: 14, color: '#0ea5e9' }} />}
            sx={{ bgcolor: 'rgba(14,165,233,0.12)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.25)', fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.7rem', mb: 3 }}
          />
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '2.4rem', md: '3.4rem' }, letterSpacing: '-0.03em', mb: 2 }}>
            Contact Us
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 520, mx: 'auto' }}>
            Have a correction, feedback, or just want to say hello? We read every message and respond promptly.
          </Typography>
        </Container>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: (t) => t.palette.mode === 'dark' ? '#0a0f1e' : '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">

          {/* ── Reason cards ── */}
          <Grid container spacing={2.5} sx={{ mb: 8 }}>
            {CONTACT_CARDS.map((card) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 3, borderTop: `3px solid ${card.color}`, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: 4 } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: `${card.color}18`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, '& svg': { fontSize: 22 } }}>
                    {card.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>{card.body}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* ── Form + Info ── */}
          <Grid container spacing={5} sx={{ alignItems: 'flex-start' }}>

            {/* Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                {submitted ? (
                  <Stack spacing={2} sx={{ alignItems: 'center', py: 6, textAlign: 'center' }}>
                    <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircleOutlinedIcon sx={{ fontSize: 40, color: '#10b981' }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Message Sent!</Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 380 }}>
                      Thanks for reaching out. We'll review your message and get back to you as soon as possible.
                    </Typography>
                    <Button variant="outlined" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                      Send Another Message
                    </Button>
                  </Stack>
                ) : (
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Send a Message</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                      Fill in the form below and we'll get back to you within 1–2 business days.
                    </Typography>
                    <Stack spacing={2.5}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="Your Name"
                            fullWidth
                            required
                            value={form.name}
                            onChange={handleChange('name')}
                            error={!!errors.name}
                            helperText={errors.name}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={form.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                          />
                        </Grid>
                      </Grid>
                      <TextField
                        label="Subject"
                        select
                        fullWidth
                        required
                        value={form.subject}
                        onChange={handleChange('subject')}
                        error={!!errors.subject}
                        helperText={errors.subject}
                      >
                        {SUBJECTS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </TextField>
                      <TextField
                        label="Message"
                        multiline
                        rows={6}
                        fullWidth
                        required
                        value={form.message}
                        onChange={handleChange('message')}
                        error={!!errors.message}
                        helperText={errors.message || `${form.message.length} characters`}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        endIcon={<SendOutlinedIcon />}
                        sx={{ alignSelf: 'flex-start', px: 4, fontWeight: 700, borderRadius: 2 }}
                      >
                        {loading ? 'Sending…' : 'Send Message'}
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Info sidebar */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
                <Paper elevation={0} sx={{ p: 3.5, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Contact Info</Typography>
                  <Stack spacing={2.5}>
                    {[
                      { label: 'General Enquiries', value: 'aiinsightsblogs@gmail.com' },
                      { label: 'Content Corrections', value: 'aiinsightsblogs@gmail.com' },
                      { label: 'Response Time', value: '1–2 business days' },
                    ].map(({ label, value }) => (
                      <Box key={label}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.25 }}>{value}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper elevation={0} sx={{ p: 3.5, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Follow Us</Typography>
                  <Stack direction="row" spacing={1.5}>
                    {[
                      { icon: <TwitterIcon />, label: 'Twitter', color: '#1da1f2' },
                      { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0077b5' },
                      { icon: <GitHubIcon />, label: 'GitHub', color: '#6e40c9' },
                    ].map(({ icon, label, color }) => (
                      <Box key={label} sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: `${color}18`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: `${color}30`, transform: 'translateY(-2px)' }, '& svg': { fontSize: 22 } }}>
                        {icon}
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper elevation={0} sx={{ p: 3.5, border: '1px solid', borderColor: 'divider', borderRadius: 3, background: 'linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(16,185,129,0.06) 100%)' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Quick Links</Typography>
                  <Stack spacing={1}>
                    {[
                      { label: 'Browse All Articles', href: '/blogs' },
                      { label: 'About AI Insights Blogs', href: '/about' },
                      { label: 'Privacy Policy', href: '/privacy-policy' },
                      { label: 'Terms and Conditions', href: '/terms-and-conditions' },
                    ].map(({ label, href }) => (
                      <MuiLink key={href} component={Link} href={href} underline="hover" sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 500 }}>
                        → {label}
                      </MuiLink>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
