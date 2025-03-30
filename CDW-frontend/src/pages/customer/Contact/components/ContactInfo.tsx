import React from 'react';
import {
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import InfoCard from '@/components/InfoCard';

const contactDetails = [
  {
    icon: <FaMapMarkerAlt size={24} />,
    title: 'Địa Chỉ',
    content: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
  },
  {
    icon: <FaPhoneAlt size={24} />,
    title: 'Điện Thoại',
    content: '(028) 3822 9999 - 0824 760000',
  },
  {
    icon: <FaEnvelope size={24} />,
    title: 'Email',
    content: 'contact@nikeshoes.vn',
  },
  {
    icon: <FaClock size={24} />,
    title: 'Giờ Làm Việc',
    content: 'Thứ 2 - Chủ nhật: 9:00 - 21:00',
  },
];

const socialMedia = [
  {
    icon: <FaFacebookF size={18} />,
    link: "https://www.instagram.com/nike/",
  },
  {
    icon: <FaInstagram size={18} />,
    link: 'https://www.instagram.com/nike/',
  },
  {
    icon: <FaTwitter size={18} />,
    link: 'https://twitter.com/Nike',
  },
  {
    icon: <FaYoutube size={18} />,
    link: 'https://www.youtube.com/user/nike',
  },
];

const ContactInfo: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Thông Tin Liên Hệ
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Có bất kỳ câu hỏi nào? Đừng ngần ngại liên hệ với chúng tôi qua các
            kênh dưới đây
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((detail, index) => (
            <InfoCard
              key={index}
              icon={detail.icon}
              title={detail.title}
              description={detail.content}
              hoverEffect="translate"
              className="hover:shadow-lg"
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Theo dõi chúng tôi:</span>
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#291D4C] text-white transition-colors hover:bg-[#3a2a6b]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
