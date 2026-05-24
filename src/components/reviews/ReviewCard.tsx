'use client';

import { Box, Avatar, Typography, Rating, Stack, Chip, Button } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import type { Review } from '@/src/types';
import { timeAgo, formatNumber } from '@/src/utils/formatters';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { toggleHelpful } from '@/src/redux/slices/reviewSlice';

interface ReviewCardProps { review: Review; }

const RATING_LABELS: Record<number, string> = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };

export default function ReviewCard({ review }: ReviewCardProps) {
  const dispatch = useAppDispatch();
  const isHelpful = useAppSelector(s => s.review.helpfulReviews.includes(review.id));

  return (
    <Box sx={{ py: 3 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Avatar src={review.author.avatar} alt={review.author.name} sx={{ width: 44, height: 44 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{review.author.name}</Typography>
            <Rating value={review.rating} readOnly size="small" />
            <Chip label={RATING_LABELS[review.rating]} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: review.rating >= 4 ? 'success.light' : review.rating >= 3 ? 'warning.light' : 'error.light' }} />
            <Typography variant="caption" color="text.secondary">{timeAgo(review.createdAt)}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 1.5 }}>{review.content}</Typography>
          <Button size="small" startIcon={isHelpful ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />} onClick={() => dispatch(toggleHelpful(review.id))} sx={{ fontSize: '0.75rem', color: isHelpful ? 'primary.main' : 'text.secondary', px: 1 }}>Helpful ({formatNumber(review.helpful + (isHelpful ? 1 : 0))})</Button>
        </Box>
      </Stack>
    </Box>
  );
}
