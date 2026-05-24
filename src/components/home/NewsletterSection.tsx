'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Stack, Paper, Chip } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes('@')) { setSubscribed(true); setEmail(''); }
  };

  return (
    <Box id="newsletter" sx={{ py: 10, background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%)' }} />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Chip icon={<MailOutlineIcon sx={{ color: '#7dd3fc !important' }} />} label="Newsletter" sx={{ mb: 3, bgcolor: 'rgba(14,165,233,0.15)', color: '#7dd3fc', border: '1px solid rgba(14,165,233,0.3)', fontWeight: 600 }} />
        <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>Stay Ahead of AI Trends</Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.65)', mb: 4, lineHeight: 1.7 }}>Join over 50,000 subscribers and get weekly AI insights, research summaries, and industry news delivered to your inbox.</Typography>
        {subscribed ? (
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'rgba(16,185,129,0.15)', borderRadius: 3, border: '1px solid rgba(16,185,129,0.3)', display: 'inline-flex', alignItems: 'center', gap: 2 }}><CheckCircleIcon sx={{ color: '#34d399' }} /><Typography sx={{ color: '#34d399', fontWeight: 600 }}>You're subscribed! Welcome to the AI Insights Hub community.</Typography></Paper>
        ) : (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" type="email" sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' }, '&.Mui-focused fieldset': { borderColor: '#0ea5e9' } }, '& input::placeholder': { color: 'rgba(255,255,255,0.4)' } }} />
            <Button variant="contained" size="large" onClick={handleSubscribe} sx={{ whiteSpace: 'nowrap', px: 4, bgcolor: '#0ea5e9', '&:hover': { bgcolor: '#0284c7' } }}>Subscribe Free</Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
