import HeroSectionSimple from '@/components/HeroSectionSimple';
import React from 'react';

const ContactHero: React.FC = () => {
  return (
    <HeroSectionSimple
      imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      title="LIÊN HỆ VỚI CHÚNG TÔI"
      description="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc, mọi nơi"
    />
  );
};

export default ContactHero;
