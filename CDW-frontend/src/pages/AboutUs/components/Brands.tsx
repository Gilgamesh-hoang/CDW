import React from 'react';

const Brands: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Đối Tác Của Chúng Tôi
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Chúng tôi tự hào là đối tác chính thức của Nike và nhiều thương hiệu
            thể thao hàng đầu thế giới
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png"
            alt="Nike"
            className="h-12 w-auto grayscale transition-all hover:grayscale-0"
            loading="lazy"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/330px-Jumpman_logo.svg.png"
            alt="Jordan"
            className="h-12 w-auto grayscale transition-all hover:grayscale-0"
            loading="lazy"
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png"
            alt="Adidas"
            className="h-12 w-auto grayscale transition-all hover:grayscale-0"
            loading="lazy"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Puma-logo-%28text%29.svg/330px-Puma-logo-%28text%29.svg.png"
            alt="Puma"
            className="h-12 w-auto grayscale transition-all hover:grayscale-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Brands;
