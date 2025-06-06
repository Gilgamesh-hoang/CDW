import React, { useEffect, useState } from 'react';
import { ROUTES } from '@/utils/constant';
import ProductsSlider from '@/components/ProductsSlider';
import {
  getBestSellerProducts,
  getNewestProducts,
} from '../../../../services/product.ts';
import { Product } from '../../../../models';

const ProductsSliderSection: React.FC = () => {
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    getNewestProducts().then((response) => {
      setNewestProducts(response);
    });

    // Get best sellers
    getBestSellerProducts().then((response) => {
      setBestSellers(response);
    });
  }, []);

  return (
    <div className="py-10">
      <ProductsSlider
        title="Sản Phẩm Mới"
        description="Khám phá những thiết kế mới nhất từ Nike với công nghệ đột phá"
        products={newestProducts}
        viewAllLink={ROUTES.SHOP.url}
        isNew={true}
      />

      <ProductsSlider
        title="Sản Phẩm Bán Chạy"
        description="Những mẫu giày Nike được yêu thích nhất"
        products={bestSellers}
        viewAllLink={ROUTES.SHOP.url}
      />
    </div>
  );
};

export default ProductsSliderSection;
