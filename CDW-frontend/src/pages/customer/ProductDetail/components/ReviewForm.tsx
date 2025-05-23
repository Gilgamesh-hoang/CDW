import React, { useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import { toast } from 'react-toastify';

const { TextArea } = Input;

interface ReviewFormProps {
  productId: number;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // Mô phỏng gửi đánh giá thành công
      console.log('Submitting review:', { productId, ...values });

      // Đây là nơi bạn sẽ gọi API để gửi đánh giá`
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Cảm ơn bạn đã gửi đánh giá!');
      form.resetFields();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Không thể gửi đánh giá. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-8 mt-8 rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-xl font-semibold">Đánh giá sản phẩm</h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ rating: 5 }}
      >
        <Form.Item
          name="rating"
          label="Đánh giá của bạn"
          rules={[{ required: true, message: 'Vui lòng đánh giá sản phẩm' }]}
        >
          <Rate className="text-[#FFD700]" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung đánh giá"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung đánh giá' },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            className="bg-[#291D4C] hover:bg-[#1a1233]"
          >
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
