import React, { useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import { toast } from 'react-toastify';
import { useWebSocket } from '@/contexts/WebSocketContext';
import axios from 'axios';
import { API_URL } from '@/config';
import { ACCESS_TOKEN_LOCALSTORAGE } from '@/utils/constant';

const { TextArea } = Input;

interface ReviewFormProps {
  productId: number;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { publish } = useWebSocket();
  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE)
    ? true
    : false;

  const handleSubmit = async (values: any) => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để gửi đánh giá');
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = {
        ...values,
        productId,
      };

      // Send via REST API
      await axios.post(`${API_URL}/opinions`, reviewData);

      // Or alternatively, publish to WebSocket topic
      // publish('/app/opinions/create', reviewData);

      toast.success('Cảm ơn bạn đã gửi đánh giá!');
      form.resetFields();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Không thể gửi đánh giá. Vui lòng thử lại sau.');
      console.error('Error submitting review:', error);
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

        <Form.Item name="title" label="Tiêu đề">
          <Input placeholder="Tiêu đề ngắn gọn cho đánh giá của bạn" />
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
            disabled={!isAuthenticated}
          >
            {isAuthenticated ? 'Gửi đánh giá' : 'Đăng nhập để đánh giá'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
