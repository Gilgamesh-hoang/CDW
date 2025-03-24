import React from 'react';
import { FaGift, FaTag, FaClock, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';
import InfoCard from '@/components/InfoCard';
import InfoCardGrid from '@/components/InfoCardGrid';

const benefits = [
  {
    icon: <FaGift size={32} />,
    title: 'Quà Tặng Độc Quyền',
    description:
      'Nhận quà tặng đặc biệt và sản phẩm giới hạn dành riêng cho thành viên',
  },
  {
    icon: <FaTag size={32} />,
    title: 'Ưu Đãi Hấp Dẫn',
    description:
      'Được hưởng giảm giá đặc biệt và ưu đãi dành riêng cho thành viên',
  },
  {
    icon: <FaClock size={32} />,
    title: 'Tiếp Cận Sớm',
    description: 'Tiếp cận sớm với các sản phẩm mới và bộ sưu tập giới hạn',
  },
  {
    icon: <FaTrophy size={32} />,
    title: 'Tích Điểm Đổi Quà',
    description:
      'Tích lũy điểm thưởng với mỗi lần mua sắm để đổi lấy phần thưởng hấp dẫn',
  },
];

const MembershipBenefits: React.FC = () => {
  return (
    <div className="bg-[#291D4C] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Đặc Quyền Thành Viên
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-white"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Trở thành thành viên của Nike Shoes để nhận được những đặc quyền và
            ưu đãi độc đáo
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <InfoCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              iconBgColor="bg-transparent"
              className="bg-white/10 backdrop-blur-sm"
              textColor="white"
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={ROUTES.REGISTER}
            className="rounded-full bg-white px-8 py-3 font-medium text-[#291D4C] transition-colors hover:bg-gray-100"
          >
            Đăng Ký Thành Viên Ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefits;
