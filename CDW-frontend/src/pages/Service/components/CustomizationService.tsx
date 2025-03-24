import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';

const CustomizationService: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
              Dịch Vụ Tùy Chỉnh Giày
            </h2>
            <div className="mt-2 h-1 w-20 bg-[#291D4C]"></div>
            <p className="my-6 text-gray-700">
              Tạo nên đôi giày độc đáo của riêng bạn với dịch vụ tùy chỉnh Nike
              By You. Chúng tôi cung cấp dịch vụ thiết kế theo yêu cầu, cho phép
              bạn lựa chọn màu sắc, chất liệu và thậm chí thêm tên hoặc biểu
              tượng cá nhân.
            </p>
            <p className="mb-6 text-gray-700">
              Đội ngũ thiết kế chuyên nghiệp của chúng tôi sẽ hỗ trợ bạn trong
              suốt quá trình, đảm bảo đôi giày cuối cùng không chỉ đẹp mắt mà
              còn phản ánh đúng phong cách và cá tính của bạn.
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="inline-block rounded-full bg-[#291D4C] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a2a6b]"
            >
              Đặt Lịch Tư Vấn
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://static.nike.com/a/images/w_1920,c_limit/375093de-5b0a-4f0c-9313-301772517318/how-to-personalize-nike-by-you-shoes.jpg"
              alt="Nike Customization Service"
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationService;
