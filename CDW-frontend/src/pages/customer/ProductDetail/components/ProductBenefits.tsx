import React from 'react';
import { FaTruck, FaShieldAlt, FaBoxOpen, FaUndo } from 'react-icons/fa';
const ProductBenefits = () => {
  return (
    <div>
      {/* Product Benefits */}
      <div className="mb-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold">Tại sao chọn Nike?</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#291D4C] p-2 text-white">
              <FaTruck size={16} />
            </div>
            <span className="text-sm text-gray-700">
              Miễn phí vận chuyển cho đơn hàng trên 1.000.000₫
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#291D4C] p-2 text-white">
              <FaShieldAlt size={16} />
            </div>
            <span className="text-sm text-gray-700">
              Đảm bảo sản phẩm chính hãng
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#291D4C] p-2 text-white">
              <FaBoxOpen size={16} />
            </div>
            <span className="text-sm text-gray-700">Đóng gói an toàn</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#291D4C] p-2 text-white">
              <FaUndo size={16} />
            </div>
            <span className="text-sm text-gray-700">
              Đổi trả dễ dàng trong 30 ngày
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBenefits;
