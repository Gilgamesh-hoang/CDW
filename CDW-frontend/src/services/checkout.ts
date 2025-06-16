import { ApiResponse } from '../models';
import { httpPost } from '../axios';
import { toast } from 'react-toastify';

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  provinceId: number;
  provinceName: string;
  districtId: number;
  districtName: string;
  wardCode: string;
  wardName: string;
  address: string;
}

export interface CheckoutData {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  note?: string;
}

export const submitOrder = async (
  checkoutData: CheckoutData
): Promise<{ success: boolean; orderId?: number }> => {
  try {
    const response = await httpPost<ApiResponse<{ orderId: number }>>(
      'orders',
      checkoutData
    );
    if (response.status === 200 || response.status === 201) {
      toast.success('Đặt hàng thành công!');
      return { success: true, orderId: response.data.orderId };
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
