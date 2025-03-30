import React, { useState } from 'react';
import { message } from 'antd';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập gửi form
    setTimeout(() => {
      message.success(
        'Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.'
      );
      setFormData(initialFormData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Gửi Tin Nhắn Cho Chúng Tôi
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Hãy cho chúng tôi biết nếu bạn có bất kỳ câu hỏi nào về sản phẩm,
            dịch vụ hoặc cần hỗ trợ
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-white p-8 shadow-md"
          >
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#291D4C] focus:outline-none focus:ring-1 focus:ring-[#291D4C]"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#291D4C] focus:outline-none focus:ring-1 focus:ring-[#291D4C]"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#291D4C] focus:outline-none focus:ring-1 focus:ring-[#291D4C]"
                  placeholder="0912 345 678"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Chủ đề <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#291D4C] focus:outline-none focus:ring-1 focus:ring-[#291D4C]"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="product">Thông tin sản phẩm</option>
                  <option value="order">Đơn hàng & Vận chuyển</option>
                  <option value="return">Đổi trả & Hoàn tiền</option>
                  <option value="support">Hỗ trợ kỹ thuật</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nội dung tin nhắn <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#291D4C] focus:outline-none focus:ring-1 focus:ring-[#291D4C]"
                placeholder="Hãy mô tả chi tiết để chúng tôi có thể hỗ trợ bạn tốt nhất"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-full bg-[#291D4C] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a2a6b] ${
                  loading ? 'cursor-not-allowed opacity-75' : ''
                }`}
              >
                {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
