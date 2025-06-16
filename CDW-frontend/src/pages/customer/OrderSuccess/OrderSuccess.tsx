import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Result, Divider, Button } from 'antd';
import { getOrderBySlug } from '@/services/order';
import { Order } from '@/models';
import HeroSectionSimple from '@/components/HeroSectionSimple';
import { ROUTES } from '@/utils/constant';
import OrderDetails from './components/OrderDetails';
import ProductList from './components/ProductList';
import ShippingInfo from './components/ShippingInfo';

const OrderSuccess: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!slug) {
        setError('Không tìm thấy mã đơn hàng');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getOrderBySlug(slug);

        if (response && response) {
          setOrder(response);
        } else {
          setError('Không thể tải thông tin đơn hàng');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Đã xảy ra lỗi khi tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="Đang tải thông tin đơn hàng..." />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSectionSimple
          imageUrl="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          title="KHÔNG TÌM THẤY ĐƠN HÀNG"
          heightStyle={'h-[30vh]'}
        />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Result
            status="error"
            title="Không tìm thấy đơn hàng"
            subTitle={error || 'Đơn hàng không tồn tại hoặc đã bị xóa'}
            extra={[
              <Button
                key="home"
                type="primary"
                onClick={() => navigate(ROUTES.HOME.url)}
                className="bg-[#291D4C] hover:bg-[#1a1233]"
              >
                Về trang chủ
              </Button>,
              <Button key="shop" onClick={() => navigate(ROUTES.SHOP.url)}>
                Tiếp tục mua sắm
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSectionSimple
        imageUrl="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
        title="ĐẶT HÀNG THÀNH CÔNG"
        heightStyle={'h-[30vh]'}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Order status and confirmation */}
          <div className="bg-[#291D4C] text-white p-6 text-center">
            <h1 className="text-2xl font-bold">Cảm ơn bạn đã đặt hàng!</h1>
            <p className="mt-2">
              Đơn hàng #{order.id} đã được xác nhận. Chúng tôi sẽ sớm liên hệ
              với bạn.
            </p>
          </div>

          <div className="p-6">
            {/* Order Details */}
            <OrderDetails order={order} />

            <Divider />

            {/* Product List */}
            <ProductList orderDetails={order.orderDetails || []} />

            <Divider />

            {/* Shipping Information */}
            <ShippingInfo address={order.address} />

            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => navigate(ROUTES.HOME.url)}
                className="border border-[#291D4C] text-[#291D4C]"
              >
                Về trang chủ
              </Button>

              <Button
                type="primary"
                onClick={() => navigate(ROUTES.SHOP.url)}
                className="bg-[#291D4C] hover:bg-[#1a1233]"
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
