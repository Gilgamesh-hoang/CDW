import React from 'react';
import { FaTruck, FaCreditCard, FaUndo, FaHeadset } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaTruck size={36} />,
    title: 'Giao Hàng Miễn Phí',
    description: 'Miễn phí giao hàng cho đơn hàng từ 1.000.000đ trên toàn quốc',
  },
  {
    icon: <FaCreditCard size={36} />,
    title: 'Thanh Toán An Toàn',
    description: 'Nhiều phương thức thanh toán an toàn và bảo mật',
  },
  {
    icon: <FaUndo size={36} />,
    title: 'Đổi Trả Dễ Dàng',
    description: 'Chính sách đổi trả trong vòng 30 ngày kể từ ngày mua',
  },
  {
    icon: <FaHeadset size={36} />,
    title: 'Hỗ Trợ 24/7',
    description: 'Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ mọi lúc',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="mb-4 text-[#291D4C]">{benefit.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-[#291D4C]">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
