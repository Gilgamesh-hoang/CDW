import { ApiResponse, Product } from '../models';
import { httpGet, httpPost, httpDelete } from '../axios.ts';
import { toast } from 'react-toastify';

/**
 * Fetches the user's cart from the server
 * @returns A promise containing the cart data
 */
export const getCart = async (): Promise<Product[]> => {
  try {
    const response = await httpGet<ApiResponse<Product[]>>('cart');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching cart:', error);
    toast.error('Không thể tải giỏ hàng, vui lòng thử lại sau.');
    return [];
  }
};

/**
 * Adds or updates an item in the cart
 * @param productId The ID of the product to add/update
 * @param sizeId The ID of the selected size
 * @param quantity The quantity to add/update (defaults to 1)
 * @returns A promise resolving to the response data
 */
export const addOrUpdateCartItem = async (
  productId: number,
  sizeId: number,
  quantity = 1
): Promise<void> => {
  try {
    await httpPost<ApiResponse<void>>('cart', { productId, sizeId, quantity });
  } catch (error) {
    console.error('Error adding/updating cart item:', error);
    toast.error('Không thể cập nhật giỏ hàng, vui lòng thử lại sau.');
    throw error; // Re-throw to allow the component to handle the error
  }
};

/**
 * Deletes an item from the cart
 * @param productId The ID of the product to delete
 * @param sizeId The ID of the size to delete
 * @returns A promise resolving to the response data
 */
export const deleteCartItem = async (
  productId: number,
  sizeId: number
): Promise<void> => {
  try {
    await httpDelete<ApiResponse<void>>('cart', {
      data: { productId, sizeId },
    });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    toast.error('Không thể xóa sản phẩm khỏi giỏ hàng, vui lòng thử lại sau.');
    throw error; // Re-throw to allow the component to handle the error
  }
};
