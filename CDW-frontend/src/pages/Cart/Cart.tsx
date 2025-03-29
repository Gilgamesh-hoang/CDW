import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import HeroSectionSimple from '../../components/HeroSectionSimple.tsx';
import { MdOutlinePayment } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constant.ts';
import CartItem from './components/CartItem.tsx';
import { deleteCartItem, getCart } from '../../services/cart.ts';
import { Product } from '../../type';

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    getCart().then((response) => {
      setCartItems(response);
    });
  }, []);

// Hàm xóa sản phẩm
  const removeItem = (productId: number, sizeId: number) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.sizeId === sizeId)));
    deleteCartItem(productId, sizeId);

  };
  return (
    <div className="w-full">
      <HeroSectionSimple
        imageUrl="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
        title="GIỎ HÀNG"
        heightStyle={'h-[30vh]'}
      />

      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg my-12">
        {/* Danh sách sản phẩm */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Giỏ hàng trống.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem item={item} key={`${item.id}-${item.sizeId}`} removeItem={removeItem} />
            ))}
          </div>
        )}

        {/* Nút điều hướng */}
        <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-md">
          <NavLink
            className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
            to={ROUTES.SHOP}
          >
            <FaArrowLeft className="mr-2" />
            Tiếp tục mua hàng
          </NavLink>
          {cartItems.length > 0 &&
            <div className="flex">
              <button className="flex items-center text-gray-600 hover:text-red-500 cursor-pointer">
                <MdOutlinePayment className="mr-2" />
                Thanh toán
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default Cart;