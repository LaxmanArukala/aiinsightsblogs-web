'use client';

import { Card, CardMedia, CardContent, CardActions, Box, Typography, Chip, Avatar, Stack, Button, IconButton, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import type { Blog } from '@/src/types';
import { formatDate, formatNumber } from '@/src/utils/formatters';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleLike, toggleBookmark } from '@/src/redux/slices/blogSlice';

interface BlogCardProps { blog: Blog; compact?: boolean; }

export default function BlogCard({ blog, compact = false }: BlogCardProps) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector(s => s.blog.likedBlogs.includes(blog.id));
  const isBookmarked = useAppSelector(s => s.blog.bookmarkedBlogs.includes(blog.id));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia component="img" height={compact ? 160 : 200} image={blog.thumbnail} alt={blog.title} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
        <Chip label={blog.category.name} size="small" sx={{ position: 'absolute', top: 12, left: 12, bgcolor: blog.category.color, color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant={compact ? 'subtitle1' : 'h6'} component={Link} href={`/blogs/${blog.slug}`} sx={{ fontWeight: 700, textDecoration: 'none', color: 'text.primary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, '&:hover': { color: 'primary.main' }, mb: 1 }}>{blog.title}</Typography>
        {!compact && <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2 }}>{blog.excerpt}</Typography>}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}><AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} /><Typography variant="caption" color="text.secondary">{blog.readTime} min</Typography></Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}><VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} /><Typography variant="caption" color="text.secondary">{formatNumber(blog.views)}</Typography></Stack>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Avatar src={blog.author.avatar} sx={{ width: 28, height: 28 }} />
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', lineHeight: 1.2 }}>{blog.author.name}</Typography>
            <Typography variant="caption" color="text.secondary">{formatDate(blog.publishedAt)}</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
        <Button size="small" endIcon={<ArrowForwardIcon />} component={Link} href={`/blogs/${blog.slug}`}>Read More</Button>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title={isLiked ? 'Unlike' : 'Like'}><IconButton size="small" onClick={() => dispatch(toggleLike(blog.id))}>{isLiked ? <FavoriteIcon sx={{ fontSize: 18, color: 'error.main' }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}</IconButton></Tooltip>
          <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}><IconButton size="small" onClick={() => dispatch(toggleBookmark(blog.id))}>{isBookmarked ? <BookmarkIcon sx={{ fontSize: 18, color: 'primary.main' }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}</IconButton></Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
}
