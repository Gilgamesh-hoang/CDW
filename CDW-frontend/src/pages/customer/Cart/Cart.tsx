import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import HeroSectionSimple from '../../../components/HeroSectionSimple.tsx';
import { MdOutlinePayment } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/constant.ts';
import CartItem from './components/CartItem.tsx';
import { deleteCartItem, getCart } from '../../../services/cart.ts';
import { Product } from '../../../models';
import { Empty, Spin } from 'antd';

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCartItems(response || []);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa sản phẩm
  const removeItem = async (productId: number, sizeId: number) => {
    try {
      await deleteCartItem(productId, sizeId);
      setCartItems(
        cartItems.filter(
          (item) => !(item.id === productId && item.sizeId === sizeId)
        )
      );
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  // Tính tổng tiền
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="w-full">
      <HeroSectionSimple
        imageUrl="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
        title="GIỎ HÀNG"
        heightStyle={'h-[30vh]'}
      />

      <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg my-12">
        <h1 className="text-2xl font-bold text-[#291D4C] mb-6">
          Giỏ hàng của bạn
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="py-8">
            <Empty
              description="Giỏ hàng của bạn đang trống"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <div className="mt-4 flex justify-center">
              <NavLink
                to={ROUTES.SHOP.url}
                className="bg-[#291D4C] text-white px-6 py-2 rounded-md hover:bg-[#1a1233] transition-colors"
              >
                Tiếp tục mua sắm
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            {/* Tiêu đề cột */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 rounded-md mb-4 font-medium text-gray-700">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-center">Thành tiền</div>
              <div className="col-span-1 text-center">Xóa</div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={`${item.id}-${item.sizeId}`}
                  removeItem={removeItem}
                />
              ))}
            </div>

            {/* Tổng tiền và thanh toán */}
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="text-2xl font-bold text-[#291D4C]">
                  {calculateTotalPrice().toLocaleString('vi-VN')}₫
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <NavLink
                  className="flex items-center justify-center text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-6 py-3"
                  to={ROUTES.SHOP.url}
                >
                  <FaArrowLeft className="mr-2" />
                  Tiếp tục mua hàng
                </NavLink>

                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center bg-[#291D4C] text-white rounded-md px-8 py-3 hover:bg-[#1a1233] transition-colors"
                >
                  <MdOutlinePayment className="mr-2" />
                  Thanh toán
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
