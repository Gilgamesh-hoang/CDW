import React, { useState } from 'react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ở đây sẽ xử lý đăng ký newsletter
    // Tạm thời chỉ hiển thị trạng thái đã đăng ký
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="bg-[#291D4C] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Đăng Ký Nhận Thông Tin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và các sự kiện
            độc quyền từ Nike
          </p>

          {submitted ? (
            <div className="mt-8 rounded-lg bg-green-600 p-4">
              <p className="font-medium">
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ sớm liên hệ với bạn.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email của bạn"
                  required
                  className="h-12 w-full rounded-full bg-white/10 px-6 text-white outline-none backdrop-blur-sm placeholder:text-gray-300 focus:ring-2 focus:ring-white/50 sm:w-auto sm:flex-1"
                />
                <button
                  type="submit"
                  className="h-12 w-full rounded-full bg-white px-8 font-medium text-[#291D4C] transition-colors hover:bg-gray-100 sm:w-auto"
                >
                  Đăng Ký
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-300">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng
                ký bất cứ lúc nào.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
