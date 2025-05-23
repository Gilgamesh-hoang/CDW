import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';
import { Product } from '../models';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isNew = false,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
      {isNew && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-[#291D4C] px-3 py-1 text-xs text-white">
          Mới
        </div>
      )}
      <Link to={`${ROUTES.PRODUCT.url}/${product.id}`}>
        <div className="overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500">{product.categoryName}</p>
          <h3 className="mt-1 text-lg font-medium text-[#291D4C] line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-[#291D4C]">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
