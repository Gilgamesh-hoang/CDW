import React from 'react';
import { FaCheck } from 'react-icons/fa';

const afterSalesServices = [
  'Bảo hành chính hãng tất cả sản phẩm Nike',
  'Vệ sinh giày miễn phí trong 6 tháng đầu tiên',
  'Tư vấn chăm sóc và bảo quản giày',
  'Sửa chữa nhỏ miễn phí trong thời gian bảo hành',
  'Thay dây giày miễn phí trọn đời',
  'Giảm giá 20% cho lần mua tiếp theo trong vòng 3 tháng',
];

const AfterSalesService: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 md:flex-row-reverse md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
              Dịch Vụ Hậu Mãi
            </h2>
            <div className="mt-2 h-1 w-20 bg-[#291D4C]"></div>
            <p className="my-6 text-gray-700">
              Tại Nike Shoes, chúng tôi tin rằng dịch vụ không kết thúc khi
              khách hàng rời khỏi cửa hàng. Chúng tôi cam kết mang đến trải
              nghiệm hậu mãi tuyệt vời để đảm bảo sự hài lòng lâu dài của khách
              hàng.
            </p>
            <div className="mt-8">
              {afterSalesServices.map((service, index) => (
                <div key={index} className="mb-3 flex items-center">
                  <FaCheck className="mr-3 text-green-600" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/fab2e701-52a9-46e3-a1dc-84d1b15546d4/nike-by-you-custom-shoes.jpg"
              alt="Nike After Sales Service"
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterSalesService;
