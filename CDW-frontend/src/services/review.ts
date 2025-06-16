import { httpPost } from '../axios';
import { ApiResponse, Review } from '@/models';

export interface CreateReviewPayload {
  productId: number;
  rating: number;
  content: string;
  title?: string;
}

export const createReview = async (payload: CreateReviewPayload) => {
  return await httpPost<ApiResponse<Review>>('opinions', payload);
};
