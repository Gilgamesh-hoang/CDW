import React from 'react';
import { Button, Input, Select } from 'antd';
import { Product } from '@/models';
import { DiscountType } from '@/services/adminDiscount';

interface OrderSummaryProps {
  cartItems: Product[];
  note: string;
  onNoteChange: (note: string) => void;
  onSubmit: () => void;
  loading: boolean;
  isFormValid: boolean;
  discountList: DiscountType[];
  selectedDiscount?: DiscountType;
  onDiscountChange: (discount: DiscountType | undefined) => void;
  discountAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  note,
  onNoteChange,
  onSubmit,
  loading,
  isFormValid,
  discountList,
  selectedDiscount,
  onDiscountChange,
  discountAmount,
}) => {
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // In a real application, shipping cost might be calculated based on distance, weight, etc.
  const shippingCost = 30000; // Fixed shipping cost for this example

  // Calculate total
  const total = subtotal + shippingCost - discountAmount;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h3>

      {/* Order items */}
      <div className="mb-6 space-y-4">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.sizeId}`}
            className="flex justify-between border-b pb-3"
          >
            <div className="flex gap-3">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-[#291D4C] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity || 1}
                </div>
              </div>
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.sizeName && `Size: ${item.sizeName}`}
                </p>
              </div>
            </div>
            <div className="font-medium">
              {((item.price || 0) * (item.quantity || 1)).toLocaleString(
                'vi-VN'
              )}
              ₫
            </div>
          </div>
        ))}
      </div>

      {/* Discount select */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Mã giảm giá</label>
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn mã giảm giá"
          value={selectedDiscount?.code}
          onChange={(code) => {
            const found = discountList.find((d) => d.code === code);
            onDiscountChange(found);
          }}
          allowClear
        >
          {discountList.map((discount) => (
            <Select.Option
              key={discount.code}
              value={discount.code}
              disabled={!discount.isActive}
            >
              {discount.code} - {discount.description}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Order note */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Ghi chú đơn hàng</label>
        <Input.TextArea
          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full"
          rows={3}
        />
      </div>

      {/* Order calculations */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính</span>
          <span>{subtotal.toLocaleString('vi-VN')}₫</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span>{shippingCost.toLocaleString('vi-VN')}₫</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá</span>
            <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
          </div>
        )}
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
          <span>Tổng cộng</span>
          <span className="text-xl text-[#291D4C]">
            {total.toLocaleString('vi-VN')}₫
          </span>
        </div>
      </div>

      {/* Submit button */}
      <Button
        type="primary"
        block
        size="large"
        onClick={onSubmit}
        loading={loading}
        disabled={!isFormValid || loading}
        className="bg-[#291D4C] text-white h-12 text-base font-medium hover:bg-[#1a1233]"
      >
        Đặt hàng
      </Button>
    </div>
  );
};

export default OrderSummary;
