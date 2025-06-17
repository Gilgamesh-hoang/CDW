import { httpGet, httpPost } from '../axios';
import { DiscountType } from './adminDiscount';

export const getAvailableDiscounts = async (): Promise<DiscountType[]> => {
  const response = await httpGet<DiscountType[]>('/discounts/available');
  return response;
};

export interface ValidateDiscountRequest {
  code: string;
  productIds: number[];
  totalAmount: number;
}

export interface ValidateDiscountResponse {
  valid: boolean;
  message: string;
  discount?: DiscountType;
  discountAmount?: number;
}

export const validateDiscount = async (
  code: string,
  productIds: number[],
  totalAmount: number
): Promise<ValidateDiscountResponse> => {
  return await httpPost<ValidateDiscountResponse>('/discounts/validate', {
    code,
    productIds,
    totalAmount,
  });
};
