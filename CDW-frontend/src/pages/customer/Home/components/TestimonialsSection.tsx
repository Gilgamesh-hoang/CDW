import React from 'react';

const testimonials = [
  {
    content:
      'Tôi đã mua đôi Nike Air Max 90 và cực kỳ hài lòng với chất lượng. Đệm air đem lại cảm giác thoải mái cả ngày dài.',
    author: 'Nguyễn Minh Tuấn',
    role: 'Runner',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    content:
      'Giày Nike Pegasus 40 là lựa chọn hoàn hảo cho cả chạy bộ và tập gym. Thiết kế đẹp mắt và hỗ trợ chân tuyệt vời.',
    author: 'Trần Thị Mai',
    role: 'Fitness Trainer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    content:
      'Dịch vụ khách hàng xuất sắc và giao hàng nhanh chóng. Tôi sẽ tiếp tục mua sắm tại đây và giới thiệu cho bạn bè.',
    author: 'Lê Văn Đức',
    role: 'Basketball Player',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Những đánh giá chân thực từ những khách hàng đã trải nghiệm sản phẩm
            Nike
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="mb-4 text-lg italic text-gray-600">
                "{testimonial.content}"
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-[#291D4C]">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
