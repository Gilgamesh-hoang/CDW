import React from 'react';
import FilterGroup from '@/components/FilterGroup';
import { FaTimes } from 'react-icons/fa';

interface ShopSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const categories = [
  { id: 'running', name: 'Giày chạy bộ', count: 24 },
  { id: 'basketball', name: 'Giày bóng rổ', count: 18 },
  { id: 'lifestyle', name: 'Giày lifestyle', count: 32 },
  { id: 'football', name: 'Giày bóng đá', count: 16 },
  { id: 'training', name: 'Giày training', count: 12 },
  { id: 'skateboarding', name: 'Giày skateboard', count: 8 },
];

const colors = [
  { id: 'black', name: 'Đen', hex: '#000000' },
  { id: 'white', name: 'Trắng', hex: '#FFFFFF' },
  { id: 'red', name: 'Đỏ', hex: '#FF0000' },
  { id: 'blue', name: 'Xanh dương', hex: '#0000FF' },
  { id: 'green', name: 'Xanh lá', hex: '#008000' },
  { id: 'yellow', name: 'Vàng', hex: '#FFFF00' },
  { id: 'orange', name: 'Cam', hex: '#FFA500' },
  { id: 'purple', name: 'Tím', hex: '#800080' },
  { id: 'pink', name: 'Hồng', hex: '#FFC0CB' },
  { id: 'gray', name: 'Xám', hex: '#808080' },
];

const sizes = [
  { id: '35', name: '35' },
  { id: '36', name: '36' },
  { id: '37', name: '37' },
  { id: '38', name: '38' },
  { id: '39', name: '39' },
  { id: '40', name: '40' },
  { id: '41', name: '41' },
  { id: '42', name: '42' },
  { id: '43', name: '43' },
  { id: '44', name: '44' },
  { id: '45', name: '45' },
];

const priceRanges = [
  { id: 'under-1m', name: 'Dưới 1.000.000₫' },
  { id: '1m-2m', name: '1.000.000₫ - 2.000.000₫' },
  { id: '2m-3m', name: '2.000.000₫ - 3.000.000₫' },
  { id: '3m-5m', name: '3.000.000₫ - 5.000.000₫' },
  { id: 'over-5m', name: 'Trên 5.000.000₫' },
];

const ShopSidebar: React.FC<ShopSidebarProps> = ({
  onClose,
  isMobile = false,
}) => {
  return (
    <div className="sticky top-24 space-y-6">
      {isMobile && (
        <div className="mb-4 flex items-center justify-between pb-2">
          <h2 className="text-xl font-bold text-[#291D4C]">Lọc sản phẩm</h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Đóng"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <FilterGroup title="Danh mục">
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                className="h-4 w-4 rounded border-gray-300 text-[#291D4C] focus:ring-[#291D4C]"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 flex-1 text-sm text-gray-700"
              >
                {category.name}
              </label>
              <span className="text-xs text-gray-500">{category.count}</span>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Màu sắc">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              className="group relative h-8 w-8 rounded-full border border-gray-300 p-0.5"
              title={color.name}
            >
              <span
                className="block h-full w-full rounded-full"
                style={{ backgroundColor: color.hex }}
              ></span>
              <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Kích thước">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <label key={size.id} className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                id={`size-${size.id}`}
                className="peer hidden"
              />
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700 peer-checked:border-[#291D4C] peer-checked:bg-[#291D4C] peer-checked:text-white">
                {size.name}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Khoảng giá">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <input
                type="radio"
                id={`price-${range.id}`}
                name="price-range"
                className="h-4 w-4 border-gray-300 text-[#291D4C] focus:ring-[#291D4C]"
              />
              <label
                htmlFor={`price-${range.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {range.name}
              </label>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Đánh giá">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                className="h-4 w-4 rounded border-gray-300 text-[#291D4C] focus:ring-[#291D4C]"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-2 flex items-center text-sm text-gray-700"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`h-4 w-4 ${
                        index < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1">
                  {rating === 5 ? ' Trở lên' : ' Trở lên'}
                </span>
              </label>
            </div>
          ))}
        </div>
      </FilterGroup>

      <div className="pt-4">
        <button className="w-full rounded-full bg-[#291D4C] py-3 font-medium text-white transition-colors hover:bg-[#3a2a6b]">
          Áp dụng bộ lọc
        </button>
        <button className="mt-2 w-full rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ShopSidebar;
