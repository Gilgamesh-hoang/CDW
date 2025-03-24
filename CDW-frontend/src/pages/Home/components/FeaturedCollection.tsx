import React from 'react';
import { Link } from 'react-router-dom';
import { featuredCollections } from '@/data/products';

const FeaturedCollection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Bộ Sưu Tập Nổi Bật
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Khám phá những bộ sưu tập giày Nike được thiết kế chuyên biệt cho
            từng nhu cầu
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCollections.map((collection) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group overflow-hidden rounded-lg shadow-lg"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="bg-white p-6">
                <h3 className="text-xl font-bold text-[#291D4C]">
                  {collection.title}
                </h3>
                <p className="mt-2 text-gray-600">{collection.description}</p>
                <div className="mt-4 font-medium text-[#291D4C]">
                  Khám phá ngay
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollection;
