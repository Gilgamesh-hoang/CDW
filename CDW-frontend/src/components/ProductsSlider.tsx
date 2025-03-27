import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Product } from '@/type';

interface ProductsSliderProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllLink?: string;
  isNew?: boolean;
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({
                                                         title,
                                                         description,
                                                         products,
                                                         viewAllLink,
                                                         isNew = false,
                                                       }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#291D4C] md:text-3xl">
              {title}
            </h2>
            {description && <p className="mt-2 text-gray-600">{description}</p>}
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <button
              onClick={scrollLeft}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#291D4C] text-[#291D4C] transition-colors hover:bg-[#291D4C] hover:text-white"
              aria-label="Trượt sang trái"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={scrollRight}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#291D4C] text-[#291D4C] transition-colors hover:bg-[#291D4C] hover:text-white"
              aria-label="Trượt sang phải"
            >
              <FaArrowRight />
            </button>
            {viewAllLink && (
              <a
                href={viewAllLink}
                className="ml-2 flex items-center rounded-full border border-[#291D4C] px-5 text-[#291D4C] transition-colors hover:bg-[#291D4C] hover:text-white"
              >
                Xem tất cả
              </a>
            )}
          </div>
        </div>
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[250px]">
              <ProductCard isNew={isNew} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
