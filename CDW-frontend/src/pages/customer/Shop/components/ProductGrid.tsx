import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/type';
import { Pagination } from '../../../../components/Pagination.tsx';
import { ROUTES } from '../../../../utils/constant.ts';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, totalPage, currentPage, setPage }) => {

  if (products.length === 0) {
    return (
      <div className="my-16 text-center">
        <h3 className="text-xl font-medium text-gray-700">
          Không tìm thấy sản phẩm nào
        </h3>
        <p className="mt-2 text-gray-500">
          Vui lòng thử lại với từ khóa hoặc bộ lọc khác
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Pagination pathname={ROUTES.SHOP} totalPage={totalPage} currentPage={currentPage} setCurrentPage={setPage}/>

      </div>
    </div>
  );
};

export default ProductGrid;
