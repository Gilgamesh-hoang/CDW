import FAQItem, { FAQItemProps } from '@/components/FAQItem';
import React, { useState } from 'react';

const faqItems: FAQItemProps[] = [
  {
    question: 'Làm thế nào để đặt hàng online?',
    answer:
      'Để đặt hàng online, bạn có thể truy cập website của chúng tôi, chọn sản phẩm mong muốn, thêm vào giỏ hàng và tiến hành thanh toán. Bạn cũng có thể đặt hàng qua điện thoại hoặc ứng dụng di động của chúng tôi.',
  },
  {
    question: 'Chính sách đổi trả như thế nào?',
    answer:
      'Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua, với điều kiện sản phẩm còn nguyên vẹn, chưa qua sử dụng và có đầy đủ hóa đơn, tem mác. Vui lòng liên hệ với chúng tôi trước khi thực hiện đổi trả.',
  },
  {
    question: 'Thời gian giao hàng mất bao lâu?',
    answer:
      'Thời gian giao hàng thường từ 1-3 ngày làm việc đối với khu vực nội thành và 3-7 ngày đối với các tỉnh thành khác, tùy thuộc vào địa điểm và tình trạng sản phẩm. Bạn có thể theo dõi đơn hàng thông qua mã vận đơn được cung cấp sau khi đặt hàng.',
  },
  {
    question: 'Làm thế nào để kiểm tra tính xác thực của sản phẩm Nike?',
    answer:
      'Tất cả sản phẩm Nike tại cửa hàng chúng tôi đều là hàng chính hãng, có đầy đủ tem mác, mã sản phẩm và mã vạch. Bạn có thể kiểm tra mã sản phẩm trên website chính thức của Nike hoặc mang sản phẩm đến cửa hàng để được kiểm tra xác thực.',
  },
  {
    question: 'Có thể đặt lịch tư vấn trực tiếp tại cửa hàng không?',
    answer:
      'Có, bạn có thể đặt lịch tư vấn trực tiếp tại cửa hàng thông qua website, điện thoại hoặc email của chúng tôi. Đội ngũ tư vấn viên chuyên nghiệp sẽ hỗ trợ bạn chọn lựa sản phẩm phù hợp nhất với nhu cầu và sở thích.',
  },
];

const FAQ: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Những thắc mắc phổ biến về dịch vụ của chúng tôi
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
