'use client';

import { Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function BlogCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={28} />
        <Skeleton variant="text" width="70%" sx={{ mb: 2 }} />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={120} />
        </Stack>
      </CardContent>
    </Card>
  );
}
