import FAQItem, { FAQItemProps } from '@/components/FAQItem';
import { ROUTES } from '@/utils/constant';
import { Link } from 'react-router-dom';

const faqItems: FAQItemProps[] = [
  {
    question: 'Tôi có thể liên hệ với bộ phận CSKH qua những kênh nào?',
    answer: (
      <>
        <p>Bạn có thể liên hệ với chúng tôi qua các kênh sau:</p>
        <ul className="mt-2 list-inside list-disc">
          <li>Hotline: (028) 3822 9999 - 0824 760000</li>
          <li>Email: contact@nikeshoes.vn</li>
          <li>Fanpage Facebook: Nike Shoes Vietnam</li>
          <li>Zalo: Nike Shoes Support</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Thời gian phản hồi các yêu cầu hỗ trợ là bao lâu?',
    answer: (
      <p>
        Chúng tôi cam kết phản hồi mọi yêu cầu hỗ trợ trong vòng 24 giờ làm
        việc. Đối với các vấn đề khẩn cấp, bạn nên liên hệ qua hotline để được
        hỗ trợ nhanh nhất.
      </p>
    ),
  },
  {
    question: 'Làm thế nào để tôi có thể theo dõi đơn hàng của mình?',
    answer: (
      <p>
        Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản trên
        website của chúng tôi, hoặc sử dụng mã vận đơn được cung cấp trong email
        xác nhận đơn hàng. Nếu cần hỗ trợ thêm, vui lòng liên hệ bộ phận CSKH
        qua hotline hoặc email.
      </p>
    ),
  },
  {
    question: 'Tôi muốn phản hồi về chất lượng sản phẩm thì phải làm sao?',
    answer: (
      <p>
        Chúng tôi rất trân trọng mọi phản hồi từ khách hàng. Bạn có thể gửi phản
        hồi về sản phẩm qua form liên hệ trên website, email hoặc liên hệ trực
        tiếp với nhân viên cửa hàng. Mọi ý kiến đóng góp sẽ giúp chúng tôi cải
        thiện sản phẩm và dịch vụ tốt hơn.
      </p>
    ),
  },
];

const ContactFAQ: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Một số câu hỏi thường gặp về việc liên hệ và hỗ trợ
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

          <div className="mt-8 text-center">
            <p className="mb-4 text-gray-700">
              Bạn không tìm thấy câu trả lời cho thắc mắc của mình?
            </p>
            <Link
              to={ROUTES.SERVICE}
              className="font-medium text-[#291D4C] underline transition-colors hover:text-[#3a2a6b]"
            >
              Xem thêm các câu hỏi thường gặp khác
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFAQ;
