import HeroSectionSimple from '@/components/HeroSectionSimple';
import React from 'react';

const ServiceHero: React.FC = () => {
  return (
    <HeroSectionSimple
      imageUrl="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      title="DỊCH VỤ CỦA CHÚNG TÔI"
      description="Cam kết mang đến trải nghiệm mua sắm tuyệt vời và dịch vụ khách hàng xuất sắc"
    />
  );
};

export default ServiceHero;
