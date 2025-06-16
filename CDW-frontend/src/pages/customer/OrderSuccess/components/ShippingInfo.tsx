import React from 'react';
import { Address } from '@/models';

interface ShippingInfoProps {
  address?: Address;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({ address }) => {
  if (!address) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
        <p className="text-gray-500 italic">Không có thông tin giao hàng</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Người nhận:</p>
            <p className="font-semibold">{address.fullName}</p>
          </div>

          <div>
            <p className="text-gray-600">Số điện thoại:</p>
            <p className="font-semibold">{address.phoneNumber}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-600">Địa chỉ:</p>
            <p className="font-semibold">
              {[
                address.hamlet,
                address.commune,
                address.district,
                address.province,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
