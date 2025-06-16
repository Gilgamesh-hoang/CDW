import { FC, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Product } from '../../../../models';
import { addOrUpdateCartItem } from '../../../../services/cart.ts';
import { Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/constant';

interface CartItemProps {
  item: Product;
  removeItem: (productId: number, sizeId: number) => void;
}

const CartItem: FC<CartItemProps> = ({ item, removeItem }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isUpdating, setIsUpdating] = useState(false);

  // Ensure sizeId is not undefined
  if (!item.sizeId) {
    console.error('SizeId is not defined for item:', item);
    return null;
  }

  // Safe sizeId to use in API calls
  const sizeId = item.sizeId;

  // Hàm tăng số lượng
  const increaseQuantity = async () => {
    if (quantity < 100) {
      try {
        setIsUpdating(true);
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        await addOrUpdateCartItem(item.id, sizeId, newQuantity);
      } catch (error) {
        console.error('Failed to increase quantity', error);
        setQuantity(quantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Hàm giảm số lượng
  const decreaseQuantity = async () => {
    if (quantity > 1) {
      try {
        setIsUpdating(true);
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        await addOrUpdateCartItem(item.id, sizeId, newQuantity);
      } catch (error) {
        console.error('Failed to decrease quantity', error);
        setQuantity(quantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Hàm thay đổi số lượng
  const handleQuantityChange = async (value: number | null) => {
    if (value !== null && value >= 1 && value <= 100) {
      try {
        setIsUpdating(true);
        setQuantity(value);
        await addOrUpdateCartItem(item.id, sizeId, value);
      } catch (error) {
        console.error('Failed to update quantity', error);
        setQuantity(quantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const subtotal = item.price * quantity;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Sản phẩm */}
      <div className="md:col-span-5 flex items-center">
        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <Link
            to={`${ROUTES.PRODUCT.url}/${item.slug || item.id}`}
            className="font-medium text-[#291D4C] hover:underline"
          >
            {item.name}
          </Link>
          <div className="text-sm text-gray-500 mt-1">
            {item.categoryName && (
              <span className="mr-2">{item.categoryName}</span>
            )}
            {item.sizeName && <span>Size: {item.sizeName}</span>}
          </div>
        </div>
      </div>

      {/* Đơn giá */}
      <div className="md:col-span-2 flex md:justify-center items-center">
        <div className="md:hidden font-medium mr-2">Đơn giá:</div>
        <div className="text-gray-700">
          {item.price.toLocaleString('vi-VN')}₫
        </div>
      </div>

      {/* Số lượng */}
      <div className="md:col-span-2 flex md:justify-center items-center">
        <div className="md:hidden font-medium mr-2">Số lượng:</div>
        <div className="flex items-center">
          <Button
            onClick={decreaseQuantity}
            disabled={isUpdating || quantity <= 1}
            className="flex items-center justify-center border border-gray-300 text-gray-600 hover:text-[#291D4C] hover:border-[#291D4C]"
          >
            -
          </Button>
          <InputNumber
            min={1}
            max={100}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={isUpdating}
            className="mx-1 w-12 text-center"
          />
          <Button
            onClick={increaseQuantity}
            disabled={isUpdating || quantity >= 100}
            className="flex items-center justify-center border border-gray-300 text-gray-600 hover:text-[#291D4C] hover:border-[#291D4C]"
          >
            +
          </Button>
        </div>
      </div>

      {/* Thành tiền */}
      <div className="md:col-span-2 flex md:justify-center items-center">
        <div className="md:hidden font-medium mr-2">Thành tiền:</div>
        <div className="font-medium text-[#291D4C]">
          {subtotal.toLocaleString('vi-VN')}₫
        </div>
      </div>

      {/* Nút xóa */}
      <div className="md:col-span-1 flex md:justify-center items-center">
        <Button
          type="text"
          danger
          icon={<FaTrash />}
          onClick={() => removeItem(item.id, sizeId)}
          className="flex items-center justify-center text-gray-500 hover:text-red-500"
        />
      </div>
    </div>
  );
};
export default CartItem;
