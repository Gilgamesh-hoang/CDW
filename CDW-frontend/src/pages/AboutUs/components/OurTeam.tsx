import React from 'react';

const team = [
  {
    name: 'Phi Hoàng',
    position: 'Nhà sáng lập & CEO',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Trần Võ Hoàng Huy',
    position: 'Giám đốc Sản phẩm',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

const OurTeam: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Đội Ngũ Của Chúng Tôi
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Gặp gỡ những người đứng sau thành công của Nike Shoes Việt Nam,
            những người luôn nỗ lực không ngừng để mang đến cho bạn những sản
            phẩm tốt nhất.
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          {team.map((member, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white text-center shadow-md transition-transform hover:-translate-y-2 w-full md:w-2/5 lg:w-1/4"
            >
              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-64 w-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#291D4C]">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
