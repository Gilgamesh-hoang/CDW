import React from 'react';

const OurStory: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Câu Chuyện Của Chúng Tôi
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Nike History"
              className="h-auto w-full rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center md:w-1/2">
            <p className="mb-4 text-gray-700">
              Được thành lập vào năm 2015, Nike Shoes Việt Nam đã trở thành nhà
              phân phối uy tín các sản phẩm Nike chính hãng tại thị trường Việt
              Nam.
            </p>
            <p className="mb-4 text-gray-700">
              Với hơn 8 năm kinh nghiệm, chúng tôi tự hào mang đến cho khách
              hàng những sản phẩm Nike chính hãng với chất lượng cao nhất, đa
              dạng mẫu mã và phong cách.
            </p>
            <p className="text-gray-700">
              Từ những đôi giày chạy bộ chuyên nghiệp đến các mẫu giày thời
              trang đường phố, chúng tôi cam kết đáp ứng mọi nhu cầu của khách
              hàng với dịch vụ tận tâm và chuyên nghiệp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
