import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/type';

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

  const handlePageChange = (page: number) => {
    if (page < 1) {
      return;
    }

    if (page > totalPage) {
      return;
    }

    if (page === currentPage) {
      return;
    }
    setPage(page);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    const selectedStyle = 'relative z-10 inline-flex items-center bg-[#291D4C] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#291D4C]';
    const unSelectedStyle = 'relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
    return (
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={currentPage === page ? selectedStyle : unSelectedStyle}
          >
            {page}
          </button>
        ))}
      </nav>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        {renderPagination()}
      </div>
    </div>
  );
};

export default ProductGrid;
