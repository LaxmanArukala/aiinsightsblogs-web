'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Divider, CircularProgress, Paper } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';
import { blogService } from '@/src/services/blogService';
import CommentItem from './CommentItem';

interface CommentsSectionProps { blogId: string; }

export default function CommentsSection({ blogId }: Readonly<CommentsSectionProps>) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => blogService.getComments(blogId),
  });

  const mutation = useMutation({
    mutationFn: (payload: { name: string; comment_text: string }) =>
      blogService.postComment(blogId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
      dispatch(showSnackbar({ message: 'Comment posted successfully!', severity: 'success' }));
      setName('');
      setContent('');
    },
    onError: () => {
      dispatch(showSnackbar({ message: 'Failed to post comment. Please try again.', severity: 'error' }));
    },
  });

  const handleSubmit = () => {
    if (name.trim() && content.trim()) {
      mutation.mutate({ name: name.trim(), comment_text: content.trim() });
    }
  };

  let listContent;
  if (isLoading) {
    listContent = <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={32} /></Box>;
  } else if (comments.length === 0) {
    listContent = <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}><ModeCommentOutlinedIcon sx={{ fontSize: 48, mb: 1, opacity: 0.4 }} /><Typography>Be the first to comment on this article.</Typography></Box>;
  } else {
    listContent = <Stack divider={<Divider sx={{ my: 1 }} />}>{comments.map(comment => <CommentItem key={comment.id} comment={comment} blogId={blogId} />)}</Stack>;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 4 }}>
        <ModeCommentOutlinedIcon color="primary" />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</Typography>
      </Stack>
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom>Leave a Comment</Typography>
        <Stack spacing={2}>
          <TextField fullWidth size="small" label="Your Name" value={name} onChange={e => setName(e.target.value)} />
          <TextField fullWidth multiline rows={4} label="Your Comment" value={content} onChange={e => setContent(e.target.value)} placeholder="Share your thoughts on this article..." />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={mutation.isPending || !name.trim() || !content.trim()}
            startIcon={mutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined}
            sx={{ alignSelf: 'flex-start' }}
          >
            {mutation.isPending ? 'Posting…' : 'Post Comment'}
          </Button>
        </Stack>
      </Paper>
      {listContent}
    </Box>
  );
}
