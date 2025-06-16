import React from 'react';
import { Order } from '@/models';
import { Tag } from 'antd';
import { formatCurrency } from '@/utils/format';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  // Function to get tag color based on order status
  const getStatusColor = (status: string): string => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING':
        return 'blue';
      case 'CONFIRMED':
        return 'purple';
      case 'SHIPPING':
        return 'orange';
      case 'DELIVERED':
        return 'green';
      case 'CANCELLED':
        return 'red';
      default:
        return 'default';
    }
  };

  // Function to get status text in Vietnamese
  const getStatusText = (status: string): string => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING':
        return 'Đang xử lý';
      case 'CONFIRMED':
        return 'Đã xác nhận';
      case 'SHIPPING':
        return 'Đang giao hàng';
      case 'DELIVERED':
        return 'Đã giao hàng';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status || 'Không xác định';
    }
  };

  // Format date
  const formatDate = (dateString?: string | Date): string => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Mã đơn hàng:</p>
          <p className="font-semibold">#{order.id}</p>
        </div>

        <div>
          <p className="text-gray-600">Ngày đặt hàng:</p>
          <p className="font-semibold">{formatDate(order.createAt)}</p>
        </div>

        <div>
          <p className="text-gray-600">Trạng thái:</p>
          <Tag color={getStatusColor(order.status || '')}>
            {getStatusText(order.status || '')}
          </Tag>
        </div>

        <div>
          <p className="text-gray-600">Phương thức thanh toán:</p>
          <p className="font-semibold">
            {order.isPaid ? 'Đã thanh toán' : 'Thanh toán khi nhận hàng (COD)'}
          </p>
        </div>

        <div>
          <p className="text-gray-600">Tổng tiền:</p>
          <p className="font-semibold text-[#291D4C]">
            {formatCurrency(order.totalAmount || 0)}
          </p>
        </div>

        {order.note && (
          <div className="md:col-span-2">
            <p className="text-gray-600">Ghi chú:</p>
            <p className="italic">{order.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
