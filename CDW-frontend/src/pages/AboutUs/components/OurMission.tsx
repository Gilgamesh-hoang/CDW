import React from 'react';
import { FaRunning, FaStar, FaHandshake } from 'react-icons/fa';
import InfoCard from '@/components/InfoCard';

const missions = [
  {
    icon: <FaRunning size={48} />,
    title: 'Truyền Cảm Hứng',
    description:
      'Mang đến cảm hứng và đổi mới cho mọi vận động viên trên thế giới',
  },
  {
    icon: <FaStar size={48} />,
    title: 'Chất Lượng',
    description:
      'Cam kết cung cấp sản phẩm Nike chính hãng với chất lượng tốt nhất',
  },
  {
    icon: <FaHandshake size={48} />,
    title: 'Dịch Vụ',
    description:
      'Luôn đặt trải nghiệm khách hàng lên hàng đầu với dịch vụ chuyên nghiệp',
  },
];

const OurMission: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Sứ Mệnh & Giá Trị Cốt Lõi
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {missions.map((mission, index) => (
            <InfoCard
              key={index}
              icon={mission.icon}
              title={mission.title}
              description={mission.description}
              className="p-8"
            />
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-white p-8 shadow-md">
          <h3 className="mb-6 text-center text-2xl font-bold text-[#291D4C]">
            Tầm Nhìn Của Chúng Tôi
          </h3>
          <p className="mb-4 text-center text-lg text-gray-700">
            "Chúng tôi hướng đến mục tiêu trở thành đơn vị phân phối giày Nike
            hàng đầu tại Việt Nam, không chỉ cung cấp những sản phẩm chính hãng,
            chất lượng cao, mà còn mang đến một trải nghiệm mua sắm hiện đại,
            tiện lợi. Với niềm đam mê dành cho thời trang thể thao, chúng tôi
            không ngừng cập nhật những xu hướng mới nhất, cam kết mang đến cho
            khách hàng sự lựa chọn tốt nhất để thể hiện phong cách và cá tính
            riêng."
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
