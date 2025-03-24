import HeroSectionSimple from '@/components/HeroSectionSimple';
import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <HeroSectionSimple
      imageUrl="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      title="VỀ CHÚNG TÔI"
      description="Câu chuyện về hành trình mang đến những đôi giày Nike chính hãng tốt
          nhất đến khách hàng Việt Nam"
    />
  );
};

export default AboutHero;
