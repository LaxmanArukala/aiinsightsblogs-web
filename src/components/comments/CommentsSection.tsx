'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Divider, CircularProgress, Paper } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setComments, addComment } from '@/src/redux/slices/commentSlice';
import { blogService } from '@/src/services/blogService';
import CommentItem from './CommentItem';

interface CommentsSectionProps { blogId: string; }

export default function CommentsSection({ blogId }: CommentsSectionProps) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(s => s.comment.commentsByBlog[blogId] ?? []);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const { data, isLoading } = useQuery({ queryKey: ['comments', blogId], queryFn: () => blogService.getComments(blogId) });

  useEffect(() => { if (data) dispatch(setComments({ blogId, comments: data })); }, [data, blogId, dispatch]);

  const handleSubmit = () => {
    if (!name.trim() || !content.trim()) return;
    dispatch(addComment({ blogId, comment: { id: `c-${Date.now()}`, blogId, parentId: null, author: { name, avatar: `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100` }, content, likes: 0, createdAt: new Date().toISOString(), replies: [] } }));
    setName(''); setContent('');
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 4 }}><ModeCommentOutlinedIcon color="primary" /><Typography variant="h5" sx={{ fontWeight: 700 }}>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</Typography></Stack>
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom>Leave a Comment</Typography>
        <Stack spacing={2}>
          <TextField fullWidth size="small" label="Your Name" value={name} onChange={e => setName(e.target.value)} />
          <TextField fullWidth multiline rows={4} label="Your Comment" value={content} onChange={e => setContent(e.target.value)} placeholder="Share your thoughts on this article..." />
          <Button variant="contained" onClick={handleSubmit} disabled={!name.trim() || !content.trim()} sx={{ alignSelf: 'flex-start' }}>Post Comment</Button>
        </Stack>
      </Paper>
      {isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={32} /></Box> : comments.length === 0 ? <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}><ModeCommentOutlinedIcon sx={{ fontSize: 48, mb: 1, opacity: 0.4 }} /><Typography>Be the first to comment on this article.</Typography></Box> : <Stack divider={<Divider sx={{ my: 1 }} />}>{comments.map(comment => <CommentItem key={comment.id} comment={comment} blogId={blogId} />)}</Stack>}
    </Box>
  );
}
