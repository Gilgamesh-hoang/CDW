import { ApiResponse } from '../models';
import { httpPost } from '../axios';
import { toast } from 'react-toastify';

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  province: string;
  district: string;
  commune: string;
  hamlet: string;
}

export interface OrderItem {
  productId: number;
  sizeId: number;
  quantity: number;
}

export interface CheckoutData {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  orderItems: OrderItem[];
  note?: string;
}

export interface OrderResponse {
  id: number;
  status: string;
  totalAmount: number;
  createAt: string;
}

export const submitOrder = async (
  checkoutData: CheckoutData
): Promise<{ success: boolean; orderId?: number }> => {
  try {
    const response = await httpPost<ApiResponse<OrderResponse>>(
      'orders',
      checkoutData
    );
    if (response.status === 200 || response.status === 201) {
      toast.success('Đặt hàng thành công!');
      return { success: true, orderId: response.data.id };
    } else {
      toast.error(response.message || 'Đặt hàng thất bại');
      return { success: false };
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    toast.error('Đặt hàng thất bại. Vui lòng thử lại sau.');
    return { success: false };
  }
};

// Payment methods available in the system
export const PAYMENT_METHODS = [
  {
    id: 'COD',
    name: 'Thanh toán khi nhận hàng',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
    icon: null,
  },
  {
    id: 'ZALOPAY',
    name: 'ZaloPay',
    description: 'Thanh toán qua ví ZaloPay',
    icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png',
  },
  {
    id: 'MOMO',
    name: 'MoMo',
    description: 'Thanh toán qua ví MoMo',
    icon: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
  },
  {
    id: 'VNPAY',
    name: 'VNPay',
    description: 'Thanh toán qua VNPay',
    icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png',
  },
];
