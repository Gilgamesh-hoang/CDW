import { FC, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Product } from '../../../../type';
import { addOrUpdateCartItem } from '../../../../services/cart.ts';

interface CartItemProps {
  item: Product;
  removeItem: (productId: number, sizeId: number) => void;

}

const CartItem: FC<CartItemProps> = ({ item, removeItem }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    if (quantity < 100) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      addOrUpdateCartItem(item.id, item.sizeId, newQuantity).catch(() => {
        console.log('Failed to increase quantity');
        setQuantity(newQuantity - 1);
      });
    }
  };

  // Hàm giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      addOrUpdateCartItem(item.id, item.sizeId, newQuantity).catch(() => {
        console.log('Failed to decrease quantity');
        setQuantity(newQuantity + 1);
      });
    }
  };

  if (!item.sizeId) {
    console.error('SizeId is not defined');
    return null;
  }

  return (
    <div key={item.id} className="flex items-center justify-between p-4 border-b border-b-gray-100">
      {/* Hình ảnh sản phẩm */}
      <div className="w-24 h-24 bg-gray-300 rounded-md">
        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 ml-4">
        <h2 className="font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-500">{item.categoryName}</p>
        <p className="text-sm text-gray-500">Size: {item.sizeName}</p>
      </div>
      <div className="flex gap-10">
        {/* Giá */}
        <div className="text-lg ">{(item.price * quantity).toLocaleString('vi-VN')}₫</div>


        {/* Số lượng */}
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseQuantity}
            className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Nút xóa */}
        <button
          onClick={() => removeItem(item.id, item.sizeId)}
          className="text-gray-500 hover:text-red-500  cursor-pointer"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );

};
export default CartItem;