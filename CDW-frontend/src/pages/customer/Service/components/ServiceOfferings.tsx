import React from 'react';
import {
  FaShippingFast,
  FaExchangeAlt,
  FaStore,
  FaHeadset,
} from 'react-icons/fa';
import InfoCard from '@/components/InfoCard';

const services = [
  {
    icon: <FaShippingFast size={48} />,
    title: 'Giao Hàng Nhanh Chóng',
    description:
      'Dịch vụ giao hàng toàn quốc trong vòng 24h đối với khu vực nội thành và 48-72h đối với các tỉnh thành khác.',
  },
  {
    icon: <FaExchangeAlt size={48} />,
    title: 'Đổi Trả Dễ Dàng',
    description:
      'Chính sách đổi trả linh hoạt trong vòng 30 ngày, đảm bảo sự hài lòng tuyệt đối của khách hàng.',
  },
  {
    icon: <FaStore size={48} />,
    title: 'Mua Hàng Tại Cửa Hàng',
    description:
      'Trải nghiệm mua sắm trực tiếp tại các cửa hàng với đội ngũ tư vấn viên chuyên nghiệp.',
  },
  {
    icon: <FaHeadset size={48} />,
    title: 'Hỗ Trợ 24/7',
    description:
      'Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giải đáp mọi thắc mắc qua hotline, email hoặc chat trực tuyến.',
  },
];

const ServiceOfferings: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Dịch Vụ Chính
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Chúng tôi cung cấp đa dạng dịch vụ nhằm đáp ứng mọi nhu cầu của
            khách hàng, đảm bảo trải nghiệm mua sắm trọn vẹn
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <InfoCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className="p-8"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceOfferings;
