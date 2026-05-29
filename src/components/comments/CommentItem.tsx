'use client';

import { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Button, TextField, Stack, Collapse, Chip, Tooltip } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import type { Comment } from '@/src/types';
import { timeAgo, formatDateTime, formatNumber } from '@/src/utils/formatters';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleCommentLike, addComment, deleteComment } from '@/src/redux/slices/commentSlice';

interface CommentItemProps { comment: Comment; blogId: string; depth?: number; }

const MAX_DEPTH = 4;

export default function CommentItem({ comment, blogId, depth = 0 }: Readonly<CommentItemProps>) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector(s => s.comment.likedComments.includes(comment.id));
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const handleReply = () => {
    if (!replyText.trim() || !replyName.trim()) return;
    dispatch(addComment({ blogId, comment: { id: `c-${Date.now()}`, blogId, parentId: comment.id, author: { name: replyName, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100' }, content: replyText, likes: 0, createdAt: new Date().toISOString(), replies: [] } }));
    setReplyText(''); setReplyName(''); setReplyOpen(false);
  };

  const handleDelete = () => dispatch(deleteComment({ blogId, commentId: comment.id }));

  return (
    <Box sx={{ ml: depth > 0 ? { xs: 2, md: 4 } : 0, pl: depth > 0 ? 2 : 0, borderLeft: depth > 0 ? '2px solid' : 'none', borderColor: 'divider', mt: 2 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        <Avatar src={comment.author.avatar} alt={comment.author.name} sx={{ width: depth > 0 ? 32 : 40, height: depth > 0 ? 32 : 40, flexShrink: 0 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{comment.author.name}</Typography>
            <Typography variant="caption" color="text.secondary">{timeAgo(comment.createdAt)}</Typography>
            <Typography variant="caption" color="text.disabled">·</Typography>
            <Typography variant="caption" color="text.disabled">{formatDateTime(comment.createdAt)}</Typography>
            {comment.updatedAt && <Chip label="edited" size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem' }} />}
          </Stack>
          {editing ? (
            <Box>
              <TextField fullWidth multiline rows={2} value={editText} onChange={e => setEditText(e.target.value)} size="small" sx={{ mb: 1 }} />
              <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => setEditing(false)} color="primary"><CheckIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => { setEditing(false); setEditText(comment.content); }}><CloseIcon fontSize="small" /></IconButton>
              </Stack>
            </Box>
          ) : <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 1 }}>{comment.content}</Typography>}
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Button size="small" startIcon={isLiked ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpAltOutlinedIcon fontSize="small" />} onClick={() => dispatch(toggleCommentLike(comment.id))} sx={{ fontSize: '0.75rem', color: isLiked ? 'primary.main' : 'text.secondary', minWidth: 0, px: 1 }}>{formatNumber(comment.likes + (isLiked ? 1 : 0))}</Button>
            {depth < MAX_DEPTH && <Button size="small" startIcon={<ReplyIcon fontSize="small" />} onClick={() => setReplyOpen(!replyOpen)} sx={{ fontSize: '0.75rem', color: 'text.secondary', minWidth: 0, px: 1 }}>Reply</Button>}
            <Tooltip title="Edit"><IconButton size="small" onClick={() => setEditing(true)} sx={{ ml: 'auto' }}><EditIcon sx={{ fontSize: 14, color: 'text.secondary' }} /></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton size="small" onClick={handleDelete}><DeleteIcon sx={{ fontSize: 14, color: 'error.light' }} /></IconButton></Tooltip>
          </Stack>
          <Collapse in={replyOpen}>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
              <TextField fullWidth size="small" placeholder="Your name" value={replyName} onChange={e => setReplyName(e.target.value)} sx={{ mb: 1 }} />
              <TextField fullWidth multiline rows={2} size="small" placeholder={`Replying to ${comment.author.name}...`} value={replyText} onChange={e => setReplyText(e.target.value)} sx={{ mb: 1 }} />
              <Stack direction="row" spacing={1}>
                <Button variant="contained" size="small" onClick={handleReply}>Post Reply</Button>
                <Button size="small" onClick={() => setReplyOpen(false)}>Cancel</Button>
              </Stack>
            </Box>
          </Collapse>
        </Box>
      </Stack>
      {comment.replies?.map(reply => <CommentItem key={reply.id} comment={reply} blogId={blogId} depth={depth + 1} />)}
    </Box>
  );
}
