import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPrice,
  image,
  category,
  isNew = false,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
      {isNew && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-[#291D4C] px-3 py-1 text-xs text-white">
          Mới
        </div>
      )}
      {discountPrice && (
        <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-3 py-1 text-xs text-white">
          {Math.round((1 - discountPrice / price) * 100)}% Giảm
        </div>
      )}
      <Link to={`${ROUTES.SHOP}/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500">{category}</p>
          <h3 className="mt-1 text-lg font-medium text-[#291D4C] line-clamp-2">
            {name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {discountPrice ? (
              <>
                <span className="text-lg font-bold text-[#291D4C]">
                  {discountPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {price.toLocaleString('vi-VN')}₫
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#291D4C]">
                {price.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
