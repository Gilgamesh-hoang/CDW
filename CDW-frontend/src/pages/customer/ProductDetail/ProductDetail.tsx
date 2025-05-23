import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spin, Breadcrumb } from 'antd';
import { ProductDetails } from '@/models';
import { getProductDetails } from '@/services/product';
import { ROUTES } from '@/utils/constant';
import { toast } from 'react-toastify';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import { mockReviews } from './mockData';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await getProductDetails(Number(id));
        setProductDetails(response);
      } catch (error) {
        toast.error('Lỗi: Không thể tải thông tin sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Không tìm thấy sản phẩm</h2>
        <Link to={ROUTES.SHOP.url} className="text-[#291D4C] underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-16 pt-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <Breadcrumb.Item>
            <Link to={ROUTES.HOME.url}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.SHOP.url}>Cửa hàng</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={`${ROUTES.SHOP.url}?category=${productDetails.categoryId}`}
            >
              {productDetails.categoryName}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productDetails.name}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="mb-16 grid gap-12 md:grid-cols-2">
          {/* Product Images */}
          <ProductImages
            thumbnail={productDetails.thumbnail}
            images={productDetails.images}
            productName={productDetails.name}
          />

          {/* Product Info */}
          <ProductInfo
            product={productDetails}
            reviewCount={mockReviews.length}
          />
        </div>

        {/* Product Tabs - Description, Reviews, Shipping */}
        <ProductTabs
          content={productDetails.content}
          productId={productDetails.id}
          reviews={mockReviews}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
