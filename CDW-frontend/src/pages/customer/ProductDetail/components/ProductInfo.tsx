import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rate, Radio, InputNumber, Button } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { ProductDetails, Size } from '@/models';
import { ROUTES } from '@/utils/constant';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProductBenefits from './ProductBenefits';
import { addOrUpdateCartItem } from '@/services/cart';

interface ProductInfoProps {
  product: ProductDetails;
  reviewCount: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, reviewCount }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<Size | null>(() => {
    if (product.sizes && product.sizes.length > 0) {
      const sortedSizes = [...product.sizes].sort((a, b) => a.id - b.id);
      return sortedSizes[0];
    }
    return null;
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const handleSizeChange = (size: Size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.warning('Vui lòng chọn kích thước');
      return;
    }

    try {
      setIsAddingToCart(true);
      // Call API to add to cart
      await addOrUpdateCartItem(product.id, selectedSize.id, quantity);

      toast.success(
        `Đã thêm ${quantity} ${
          quantity > 1 ? 'sản phẩm' : 'sản phẩm'
        } vào giỏ hàng`
      );
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const goToCart = () => {
    navigate(ROUTES.CART.url);
  };

  const renderPrice = () => {
    if (!selectedSize) return null;

    return (
      <div className="mb-4 mt-2">
        <span className="text-3xl font-bold text-[#291D4C]">
          {selectedSize.price.toLocaleString('vi-VN')}₫
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h1 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
        {product.name}
      </h1>

      <div className="mb-4 mt-2 flex items-center">
        <Rate
          allowHalf
          defaultValue={4.5}
          disabled
          className="text-[#FFD700]"
        />
        <span className="ml-2 text-gray-500">({reviewCount} Đánh giá)</span>
      </div>

      {renderPrice()}

      <div
        className="mb-6 text-gray-600"
        dangerouslySetInnerHTML={{
          __html: product.shortDescription || '',
        }}
      />

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold">Kích thước</h3>
        <Radio.Group
          className="flex flex-wrap"
          style={{
            gap: '16px',
            marginLeft: '-8px',
          }}
          value={selectedSize?.id}
          onChange={(e) => {
            const size = product.sizes.find((s) => s.id === e.target.value);
            if (size) handleSizeChange(size);
          }}
        >
          {product.sizes.map((size) => (
            <Radio.Button
              key={size.id}
              value={size.id}
              style={{ margin: '0 8px' }}
              className={`flex h-14 min-w-[100px] items-center justify-center rounded-lg border border-2 px-4 text-center text-base transition-all hover:border-[#291D4C] hover:shadow-md ${
                selectedSize?.id === size.id
                  ? 'border-[#291D4C] bg-[#291D4C] text-white shadow-md'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              {size.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      {/* Quantity */}
      <div className="mb-8">
        <h3 className="mb-3 text-lg font-semibold">Số lượng</h3>
        <div className="flex items-center">
          <InputNumber
            min={1}
            max={10}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-32"
          />
          <span className="ml-3 text-gray-500">
            {product.available !== null && product.available !== undefined
              ? `${product.available} sản phẩm còn lại`
              : 'Còn hàng'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          loading={isAddingToCart}
          className="flex h-12 items-center justify-center bg-[#291D4C] px-8 text-white hover:bg-[#1a1233]"
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          size="large"
          onClick={goToCart}
          className="flex h-12 items-center justify-center border-[#291D4C] px-8 text-[#291D4C] hover:bg-[#291D4C] hover:text-white"
        >
          Xem giỏ hàng
        </Button>
        <Button
          size="large"
          icon={<HeartOutlined />}
          className="flex h-12 items-center justify-center border-gray-300 px-8 hover:border-[#291D4C] hover:text-[#291D4C]"
        >
          Thêm vào yêu thích
        </Button>
      </div>
      <ProductBenefits />
      {/* Category & Tags */}
      <div className="border-t border-gray-200 pt-6">
        <div className="mb-2 flex">
          <span className="font-semibold">Danh mục:</span>
          <Link
            to={`${ROUTES.SHOP.url}?category=${product.categoryId}`}
            className="ml-2 text-[#291D4C] hover:underline"
          >
            {product.categoryName}
          </Link>
        </div>
        <div className="flex">
          <span className="font-semibold">Mã sản phẩm:</span>
          <span className="ml-2 text-gray-600">
            {product.id.toString().padStart(6, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
