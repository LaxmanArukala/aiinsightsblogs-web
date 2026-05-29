'use client';

import { Box, Typography, Stack, Divider, Rating, LinearProgress, Button, Paper, CircularProgress, Grid, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '@/src/redux/hooks';
import { showSnackbar } from '@/src/redux/slices/uiSlice';
import { blogService } from '@/src/services/blogService';
import ReviewCard from './ReviewCard';
import type { ReviewFormData } from '@/src/types';

interface ReviewsSectionProps { readonly blogId: string; }

export default function ReviewsSection({ blogId }: Readonly<ReviewsSectionProps>) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', blogId],
    queryFn: () => blogService.getReviews(blogId),
  });

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>({
    defaultValues: { name: '', email: '', rating: 5, content: '' },
  });

  const mutation = useMutation({
    mutationFn: (payload: { name: string; email: string; rating: number; review_text: string }) =>
      blogService.postReview(blogId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', blogId] });
      dispatch(showSnackbar({ message: 'Review submitted successfully!', severity: 'success' }));
      reset();
    },
    onError: () => {
      dispatch(showSnackbar({ message: 'Failed to submit review. Please try again.', severity: 'error' }));
    },
  });

  const onSubmit = (formData: ReviewFormData) => {
    mutation.mutate({ name: formData.name, email: formData.email, rating: formData.rating, review_text: formData.content });
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  const submitIcon = mutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined;
  const submitLabel = mutation.isPending ? 'Submitting…' : 'Submit Review';

  let reviewListContent;
  if (isLoading) {
    reviewListContent = <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={32} /></Box>;
  } else if (reviews.length === 0) {
    reviewListContent = <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}><StarIcon sx={{ fontSize: 48, mb: 1, opacity: 0.4 }} /><Typography>No reviews yet. Be the first to review!</Typography></Box>;
  } else {
    reviewListContent = <Stack divider={<Divider />}>{reviews.map(review => <ReviewCard key={review.id} review={review} />)}</Stack>;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 4 }}>
        <StarIcon sx={{ color: 'warning.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Reviews ({reviews.length})</Typography>
      </Stack>
      {reviews.length > 0 && (
        <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 800, color: 'warning.main' }}>{avgRating.toFixed(1)}</Typography>
              <Rating value={avgRating} readOnly precision={0.1} sx={{ mb: 0.5 }} />
              <Typography variant="body2" color="text.secondary">{reviews.length} reviews</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
              {ratingDist.map(({ star, count, pct }) => (
                <Stack key={star} direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 16 }}>{star}</Typography>
                  <StarIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                  <LinearProgress variant="determinate" value={pct} sx={{ flexGrow: 1, height: 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: 'warning.main', borderRadius: 4 } }} />
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 28 }}>{count}</Typography>
                </Stack>
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom>Write a Review</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth size="small" label="Your Name *" {...register('name', { required: 'Name is required' })} error={!!errors.name} helperText={errors.name?.message} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth size="small" label="Email Address *" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} error={!!errors.email} helperText={errors.email?.message} /></Grid>
            </Grid>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>Rating *</Typography>
              <Controller name="rating" control={control} rules={{ required: true }} render={({ field }) => <Rating value={field.value} onChange={(_, val) => field.onChange(val ?? 1)} size="large" />} />
            </Box>
            <TextField fullWidth multiline rows={4} label="Your Review *" {...register('content', { required: 'Review is required', minLength: { value: 20, message: 'At least 20 characters' } })} error={!!errors.content} helperText={errors.content?.message} placeholder="Share your honest opinion about this article..." />
            <Button type="submit" variant="contained" disabled={mutation.isPending} startIcon={submitIcon} sx={{ alignSelf: 'flex-start' }}>
              {submitLabel}
            </Button>
          </Stack>
        </Box>
      </Paper>
      {reviewListContent}
    </Box>
  );
}
