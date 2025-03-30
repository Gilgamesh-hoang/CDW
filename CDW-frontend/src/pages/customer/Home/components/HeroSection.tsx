import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden bg-gradient-to-r from-[#1e1a3a] to-[#291D4C]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
          alt="Nike Hero"
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
      </div>
      <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          LÀM CHỦ ĐƯỜNG ĐUA <br /> VỚI NIKE
        </h1>
        <p className="mt-4 max-w-lg text-lg md:text-xl">
          Khám phá bộ sưu tập giày Nike mới nhất với công nghệ tiên tiến và
          thiết kế đột phá
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to={ROUTES.SHOP}
            className="rounded-full bg-white px-8 py-3 font-medium text-[#291D4C] transition-colors hover:bg-gray-100"
          >
            Mua ngay
          </Link>
          <Link
            to={ROUTES.ABOUT_US}
            className="rounded-full border border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
