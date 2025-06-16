import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { PAYMENT_METHODS } from '@/services/checkout';

interface PaymentMethodsProps {
  selectedPayment: string;
  onChange: (value: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedPayment,
  onChange,
}) => {
  const handleChange = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>

      <Radio.Group
        onChange={handleChange}
        value={selectedPayment}
        className="w-full flex flex-col gap-3"
      >
        {PAYMENT_METHODS.map((method) => (
          <Radio
            key={method.id}
            value={method.id}
            className="w-full block rounded-md p-3 hover:border-[#291D4C] transition-colors"
          >
            <div className="flex items-center gap-3">
              {method.icon ? (
                <img
                  src={method.icon}
                  alt={method.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
              )}
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">
                  {method.description}
                </div>
              </div>
            </div>
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default PaymentMethods;
