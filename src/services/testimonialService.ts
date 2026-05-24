import type { Testimonial } from '@/src/types';
import type { ApiEnvelope, RawTestimonialListResponse } from '@/src/types/api';
import apiClient from './apiClient';

export const testimonialService = {
  async getTestimonials(): Promise<Testimonial[]> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawTestimonialListResponse>>('/api/v1/testimonials');
    return envelope.data.data;
  },
};
