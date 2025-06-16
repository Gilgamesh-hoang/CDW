import React, { useEffect, useState } from 'react';
import { Rate, Avatar, Divider, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Review } from '@/models';
import ReviewItem from './ReviewItem';
import { useWebSocket } from '@/contexts/WebSocketContext';
import axios from 'axios';
import { API_URL } from '@/config';
import { StompSubscription } from '@stomp/stompjs';

interface ReviewListProps {
  productId: number;
  initialReviews?: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({
  productId,
  initialReviews = [],
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<
    StompSubscription | undefined
  >();
  const { subscribe, unsubscribe, connected } = useWebSocket();

  // Fetch initial reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/opinions/product/${productId}`
        );
        if (response.data && response.data.data) {
          // Transform the data to match our Review interface
          const apiReviews = response.data.data.map((review: any) => ({
            id: review.id,
            userName: review.userName,
            avatar: review.userAvatar,
            rating: review.rating,
            content: review.content,
            title: review.title,
            date: new Date(review.createAt).toLocaleDateString('vi-VN'),
            productId: review.productId,
            userId: review.userId,
          }));
          setReviews(apiReviews);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Subscribe to WebSocket for real-time updates
  useEffect(() => {
    if (connected) {
      const newSubscription = subscribe(
        `/topic/product/${productId}/opinions`,
        (message) => {
          console.log('Socket received review:', message);
          // Transform the received opinion to match our Review interface
          const newReview: Review = {
            id: message.id,
            userName: message.userName,
            avatar: message.userAvatar,
            rating: message.rating,
            content: message.content,
            title: message.title,
            date: new Date(message.createAt).toLocaleDateString('vi-VN'),
            productId: message.productId,
            userId: message.userId,
          };

          // Add the new review to the list
          setReviews((prevReviews) => [newReview, ...prevReviews]);
        }
      );

      setSubscription(newSubscription);

      return () => {
        if (newSubscription) {
          unsubscribe(newSubscription);
        }
      };
    }
  }, [productId, connected, subscribe, unsubscribe]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Đánh giá của khách hàng</h3>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spin />
        </div>
      ) : reviews.length === 0 ? (
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

      {reviews.length > 5 && (
        <div className="mt-6 flex justify-center">
          <button className="rounded-full border-2 border-[#291D4C] px-6 py-2 font-medium text-[#291D4C] transition-colors hover:bg-[#291D4C] hover:text-white">
            Xem thêm đánh giá
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
