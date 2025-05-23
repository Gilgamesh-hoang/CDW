import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import { motion } from 'framer-motion';

interface ProductImagesProps {
  thumbnail: string;
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  thumbnail,
  images,
  productName,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const carouselRef = useRef<any>(null);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 overflow-hidden rounded-lg shadow-lg"
      >
        <Carousel
          autoplay={false}
          className="rounded-lg bg-gray-100"
          ref={carouselRef}
          afterChange={setSelectedImageIndex}
        >
          {[thumbnail, ...images].map((image, index) => (
            <div key={index} className="h-[500px] w-full">
              <img
                src={image}
                alt={`${productName} - Hình ${index + 1}`}
                className="h-full w-full object-contain p-4"
              />
            </div>
          ))}
        </Carousel>
      </motion.div>

      {/* Thumbnail gallery */}
      <div className="flex flex-wrap justify-center gap-3">
        {[thumbnail, ...images].map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`cursor-pointer overflow-hidden rounded-md border-2 transition-all hover:opacity-80 ${
              selectedImageIndex === index
                ? 'border-[#291D4C]'
                : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`Hình thu nhỏ ${index + 1}`}
              className="h-16 w-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
