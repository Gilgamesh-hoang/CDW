import React from 'react';
import { Rate, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Review } from '@/models';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Đánh giá của khách hàng</h3>

      {reviews.length === 0 ? (
        <p className="py-4 text-gray-500">
          Chưa có đánh giá nào cho sản phẩm này.
        </p>
      ) : (
        <div className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button className="rounded-full border-2 border-[#291D4C] px-6 py-2 font-medium text-[#291D4C] transition-colors hover:bg-[#291D4C] hover:text-white">
          Xem thêm đánh giá
        </button>
      </div>
    </div>
  );
};

export default ReviewList;
