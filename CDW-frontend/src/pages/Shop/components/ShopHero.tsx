import React from 'react';
import HeroSectionSimple from '@/components/HeroSectionSimple';

const ShopHero: React.FC = () => {
  return (
    <HeroSectionSimple
      imageUrl="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
      title="CỬA HÀNG NIKE"
      description="Khám phá bộ sưu tập giày Nike mới nhất với công nghệ tiên tiến và thiết kế đột phá"
    />
  );
};

export default ShopHero;
