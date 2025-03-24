import React from 'react';
import { ROUTES } from '@/utils/constant';
import ProductsSlider from '@/components/ProductsSlider';
import { newArrivals, bestSellers, saleProducts } from '@/data/products';

const ProductsSliderSection: React.FC = () => {
  return (
    <div className="py-10">
      <ProductsSlider
        title="Sản Phẩm Mới"
        description="Khám phá những thiết kế mới nhất từ Nike với công nghệ đột phá"
        products={newArrivals}
        viewAllLink={ROUTES.SHOP}
      />

      <ProductsSlider
        title="Sản Phẩm Bán Chạy"
        description="Những mẫu giày Nike được yêu thích nhất"
        products={bestSellers}
        viewAllLink={ROUTES.SHOP}
      />

      <ProductsSlider
        title="Khuyến Mãi Đặc Biệt"
        description="Cơ hội sở hữu giày Nike với giá tốt nhất"
        products={saleProducts}
        viewAllLink={ROUTES.SHOP}
      />
    </div>
  );
};

export default ProductsSliderSection;
