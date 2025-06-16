import React from 'react';
import { Tabs } from 'antd';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { Review } from '@/models';

interface ProductTabsProps {
  content: string;
  productId: number;
  reviews?: Review[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  content,
  productId,
  reviews = [],
}) => {
  return (
    <div className="border-t border-gray-200 pt-12">
      <Tabs
        defaultActiveKey="description"
        size="large"
        className="product-tabs"
        items={[
          {
            key: 'description',
            label: 'Mô tả sản phẩm',
            children: (
              <div
                dangerouslySetInnerHTML={{
                  __html: content || '',
                }}
                className="prose max-w-none text-gray-700"
              />
            ),
          },
          {
            key: 'reviews',
            label: 'Đánh giá',
            children: (
              <div>
                <ReviewForm productId={productId} />
                <ReviewList productId={productId} initialReviews={reviews} />
              </div>
            ),
          },
          {
            key: 'shipping',
            label: 'Vận chuyển & Đổi trả',
            children: (
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Thông tin vận chuyển
                  </h3>
                  <p>
                    Chúng tôi cung cấp dịch vụ vận chuyển toàn quốc với các lựa
                    chọn sau:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      Vận chuyển tiêu chuẩn (3-5 ngày làm việc): Miễn phí cho
                      đơn hàng trên 1.000.000₫
                    </li>
                    <li>Vận chuyển nhanh (1-2 ngày làm việc): 50.000₫</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Chính sách đổi trả
                  </h3>
                  <p>
                    Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày
                    mua cho các sản phẩm chưa qua sử dụng, còn nguyên tình trạng
                    ban đầu với đầy đủ tem mác. Miễn phí vận chuyển đổi hàng. Có
                    thể áp dụng phí vận chuyển cho việc hoàn tiền.
                  </p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProductTabs;
