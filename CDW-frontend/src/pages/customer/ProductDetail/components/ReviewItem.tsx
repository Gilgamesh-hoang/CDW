import { Review } from '@/models';
import { Rate } from 'antd';
import { Avatar } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <div key={review.id} className="py-6">
      <div className="flex items-start gap-3">
        <Avatar
          src={review.avatar}
          icon={!review.avatar && <UserOutlined />}
          size={50}
          className="mr-4"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h4 className="text-lg font-medium">{review.userName}</h4>
              <div className="flex items-center">
                <Rate
                  disabled
                  defaultValue={review.rating}
                  className="text-[#FFD700] text-sm"
                />
                <span className="ml-2 text-gray-500 text-sm">
                  {review.date}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-700">{review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
