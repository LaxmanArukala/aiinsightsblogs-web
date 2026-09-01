'use client';

import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Stack, MenuItem, Link as MuiLink, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import Link from 'next/link';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';
import { SITE_NAME, SITE_URL } from '@/src/constants';
import apiClient from '@/src/services/apiClient';

const CONTACT_EMAIL = 'aiinsightsblogs@gmail.com';

const SUBJECTS = [
  'General Enquiry',
  'Content Correction',
  'Content Dispute',
  'Feedback / Suggestion',
  'Partnership / Collaboration',
  'Other',
];

const REASONS = [
  { icon: <EditNoteOutlinedIcon />, color: '#0ea5e9', title: 'Corrections', body: 'Spotted a factual error or something out of date? Tell us which article and we will review it.' },
  { icon: <BugReportOutlinedIcon />, color: '#ef4444', title: 'Disputes', body: 'If something here is misleading or objectionable, raise it. Every report is read.' },
  { icon: <LightbulbOutlinedIcon />, color: '#f59e0b', title: 'Suggestions', body: 'A topic you want covered, or a gap you have noticed in the archive.' },
  { icon: <HandshakeOutlinedIcon />, color: '#10b981', title: 'Anything else', body: 'Partnerships, collaborations, or a question that does not fit the boxes above.' },
];

/**
 * FAQ answers double as FAQPage structured data below, so the two must stay in
 * step — Google treats markup that disagrees with the visible page as a violation.
 */
const FAQS = [
  {
    q: 'Who writes the articles on this site?',
    a: 'Articles are researched and drafted by advanced AI models. We state that openly rather than implying a newsroom that does not exist.',
  },
  {
    q: 'How do I report a factual error?',
    a: 'Use the form on this page and pick "Content Correction". Include the article title or URL and what you believe is wrong, and we will review it.',
  },
  {
    q: 'Is the content free to read?',
    a: 'Yes. Every article is free, with no account, no paywall and no newsletter gate.',
  },
  {
    q: 'How quickly will I get a reply?',
    a: 'We aim to respond within 1–2 business days.',
  },
  {
    q: 'Can I republish or quote an article?',
    a: 'Short quotes with a link back are welcome. For anything longer, please ask first — see the Terms and Conditions.',
  },
];

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const isDark = useTheme().palette.mode === 'dark';
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

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const panel = {
    p: { xs: 3, md: 4.5 },
    borderRadius: '14px',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Form-first: the point of this page is the form, so it sits above the fold
            beside the heading rather than below a tall banner. */}
        <Box
          component="section"
          sx={{
            pt: { xs: 6, md: 9 },
            pb: { xs: 7, md: 10 },
            background: isDark
              ? 'radial-gradient(ellipse 70% 100% at 20% 0%, rgba(14,165,233,0.13) 0%, transparent 65%)'
              : 'radial-gradient(ellipse 70% 100% at 20% 0%, rgba(14,165,233,0.10) 0%, transparent 65%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'flex-start' }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography
                  variant="h1"
                  sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.1rem' }, lineHeight: 1.1, letterSpacing: '-0.035em', mb: 2.5 }}
                >
                  Get in{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>touch</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.85, mb: 4, maxWidth: 420 }}>
                  A correction, a dispute, an idea for something we should cover — or just
                  hello. Every message to {SITE_NAME} is read.
                </Typography>

                <Stack spacing={2.5}>
                  <Stack direction="row" sx={{ gap: 1.75, alignItems: 'center' }}>
                    <Box sx={{ width: 42, height: 42, borderRadius: '11px', bgcolor: 'rgba(14,165,233,0.14)', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MailOutlinedIcon sx={{ fontSize: 21 }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.secondary' }}>
                        Email
                      </Typography>
                      <MuiLink href={`mailto:${CONTACT_EMAIL}`} underline="hover" sx={{ fontWeight: 600, color: 'text.primary', wordBreak: 'break-all' }}>
                        {CONTACT_EMAIL}
                      </MuiLink>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ gap: 1.75, alignItems: 'center' }}>
                    <Box sx={{ width: 42, height: 42, borderRadius: '11px', bgcolor: 'rgba(16,185,129,0.14)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ScheduleOutlinedIcon sx={{ fontSize: 21 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.secondary' }}>
                        Response time
                      </Typography>
                      <Typography sx={{ fontWeight: 600 }}>1–2 business days</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ ...panel, boxShadow: isDark ? 'none' : '0 18px 50px rgba(15,23,42,0.07)' }}>
                  {submitted ? (
                    <Stack spacing={2} sx={{ alignItems: 'center', py: 6, textAlign: 'center' }}>
                      <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircleOutlinedIcon sx={{ fontSize: 40, color: '#10b981' }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>Message sent</Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 380 }}>
                        Thanks for reaching out. We&apos;ll review your message and reply as soon as we can.
                      </Typography>
                      <Button
                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                        sx={{ borderRadius: 999, px: 3, textTransform: 'none', fontWeight: 700, border: '1px solid', borderColor: 'divider' }}
                      >
                        Send another message
                      </Button>
                    </Stack>
                  ) : (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                      <Stack spacing={2.5}>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="Your name" fullWidth required value={form.name} onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="Email address" type="email" fullWidth required value={form.email} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} />
                          </Grid>
                        </Grid>
                        <TextField label="Subject" select fullWidth required value={form.subject} onChange={handleChange('subject')} error={!!errors.subject} helperText={errors.subject}>
                          {SUBJECTS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                        <TextField
                          label="Message" multiline rows={6} fullWidth required
                          value={form.message} onChange={handleChange('message')}
                          error={!!errors.message}
                          helperText={errors.message || `${form.message.length} characters — 20 minimum`}
                        />
                        <Button
                          type="submit"
                          disabled={loading}
                          endIcon={<SendOutlinedIcon />}
                          sx={{
                            alignSelf: 'flex-start', px: 4, py: 1.35, borderRadius: 999,
                            fontWeight: 700, textTransform: 'none', fontSize: '0.98rem',
                            bgcolor: 'primary.main', color: '#fff',
                            '&:hover': { bgcolor: 'primary.dark' },
                            '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'text.disabled' },
                          }}
                        >
                          {loading ? 'Sending…' : 'Send message'}
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Reasons — a compact row, not the four cards the About page already uses */}
        <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: isDark ? 'rgba(148,163,184,0.05)' : '#f8fafc' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, letterSpacing: '-0.03em', mb: { xs: 4, md: 6 } }}>
              What to write{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>about</Box>
            </Typography>
            <Grid container spacing={{ xs: 3, md: 5 }}>
              {REASONS.map((r) => (
                <Grid size={{ xs: 12, sm: 6 }} key={r.title}>
                  <Stack direction="row" sx={{ gap: 2.25, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: `${r.color}1f`, color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, '& svg': { fontSize: 22 } }}>
                      {r.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.02rem', mb: 0.75 }}>{r.title}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.93rem', lineHeight: 1.7 }}>{r.body}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* FAQ — accordion, and the source of the FAQPage markup above */}
        <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, letterSpacing: '-0.03em', textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              Common{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>questions</Box>
            </Typography>
            {FAQS.map((f) => (
              <Accordion
                key={f.q}
                disableGutters
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, py: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.02rem' }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3, pt: 0 }}>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}

            <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 5 }}>
              {[
                { label: 'Browse all articles', href: '/blogs' },
                { label: 'About us', href: '/about' },
                { label: 'Privacy policy', href: '/privacy-policy' },
                { label: 'Terms and conditions', href: '/terms-and-conditions' },
              ].map(({ label, href }) => (
                <Box
                  key={href}
                  component={Link}
                  href={href}
                  sx={{
                    px: 2, py: 0.8, borderRadius: 999, fontSize: '0.85rem', fontWeight: 600,
                    textDecoration: 'none', color: 'text.secondary',
                    border: '1px solid', borderColor: 'divider',
                    transition: 'all 0.2s ease',
                    '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                  }}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
