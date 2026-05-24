'use client';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Container, Box, Button, IconButton, Typography, Drawer, List, ListItemButton, Stack, useScrollTrigger, Slide, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleTheme } from '@/src/redux/slices/uiSlice';
import { NAV_LINKS, SITE_NAME } from '@/src/constants';

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(s => s.ui.themeMode);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLight = themeMode === 'light';

  return (
    <>
      <HideOnScroll>
        <AppBar elevation={scrolled ? 2 : 0} sx={{ bgcolor: scrolled ? (isLight ? 'rgba(255,255,255,0.95)' : 'rgba(15,23,42,0.95)') : 'transparent', backdropFilter: 'blur(12px)', borderBottom: scrolled ? 1 : 0, borderColor: 'divider', transition: 'all 0.3s ease' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 0.5 }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 4 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AutoAwesomeIcon sx={{ color: 'white', fontSize: 20 }} /></Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{SITE_NAME}</Typography>
                </Box>
              </Link>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
                {NAV_LINKS.map(link => (
                  <Button key={link.href} component={Link} href={link.href} sx={{ color: pathname === link.href ? 'primary.main' : 'text.primary', fontWeight: pathname === link.href ? 700 : 500, px: 2, '&:hover': { bgcolor: 'action.hover' } }}>{link.label}</Button>
                ))}
              </Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Tooltip title={isLight ? 'Dark mode' : 'Light mode'}><IconButton onClick={() => dispatch(toggleTheme())} size="small">{isLight ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}</IconButton></Tooltip>
                <Button variant="contained" size="small" component={Link} href="/blogs" sx={{ display: { xs: 'none', md: 'flex' } }}>Explore Blogs</Button>
                <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2, px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <List>
            {NAV_LINKS.map(link => (
              <ListItemButton key={link.href} component={Link} href={link.href} selected={pathname === link.href} onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 2, mb: 0.5 }}>{link.label}</ListItemButton>
            ))}
          </List>
          <Button variant="contained" fullWidth component={Link} href="/blogs" sx={{ mt: 2 }} onClick={() => setDrawerOpen(false)}>Explore Blogs</Button>
        </Box>
      </Drawer>
      <Toolbar />
    </>
  );
}
