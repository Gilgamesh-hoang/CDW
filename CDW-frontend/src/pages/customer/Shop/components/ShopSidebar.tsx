import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import FilterGroup from '@/components/FilterGroup';
import { FaTimes } from 'react-icons/fa';
import { Category, Size } from '../../../../models';
import { getSizes } from '../../../../services/size.ts';
import { getCategories } from '../../../../services/category.ts';

interface ShopSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
  handleFilter: (sizesSelected: number[], categoriesSelected: number[], priceRangeSelected: string | null) => void;
}
const priceRanges = [
  { id: '0-1000000', name: 'Dưới 1.000.000₫' },
  { id: '1000000-2000000', name: '1.000.000₫ - 2.000.000₫' },
  { id: '2000000-3000000', name: '2.000.000₫ - 3.000.000₫' },
  { id: '3000000-5000000', name: '3.000.000₫ - 5.000.000₫' },
  { id: '5000000-999999999999999', name: 'Trên 5.000.000₫' },
];

const ShopSidebar: React.FC<ShopSidebarProps> = forwardRef(({
                                                              onClose,
                                                              isMobile = false,
                                                              handleFilter,
                                                            }, ref) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [sizesSelected, setSizesSelected] = useState<number[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const [priceRangeSelected, setPriceRangeSelected] = useState<string | null>(null);

  // Expose handleClearFilter ra ngoài qua ref
  useImperativeHandle(ref, () => ({
    clearFilter: handleClearFilter,
  }));

  useEffect(() => {
    Promise.all([getCategories(1, 20), getSizes(1, 20)]).then(
      ([categoriesData, sizesData]) => {
        setCategories(categoriesData);
        setSizes(sizesData);
      },
    );
  }, []);

  const handleCategoryChange = (id: number) => {
    setCategoriesSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleSizeChange = (id: number) => {
    setSizesSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleClearFilter = () => {
    setCategoriesSelected([]);
    setSizesSelected([]);
    setPriceRangeSelected(null);
  };

  const handleApplyFilter = () => {
    handleFilter(sizesSelected, categoriesSelected, priceRangeSelected);
  };

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
            <div key={category.id}
                 className="flex items-center"
            >
              <input
                type="checkbox"
                id={`category-${category.id}`}
                className="h-4 w-4 rounded border-gray-300 text-[#291D4C] focus:ring-[#291D4C]"
                onChange={() => handleCategoryChange(category.id)}
                checked={categoriesSelected.includes(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 flex-1 text-sm text-gray-700"
              >
                {category.name}
              </label>
              <span className="text-xs text-gray-500">{category.productCount ?? 0}</span>
            </div>
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
                checked={sizesSelected.includes(size.id)}
                onChange={() => handleSizeChange(size.id)}
              />
              <span
                className="flex h-9 w-24 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700 peer-checked:border-[#291D4C] peer-checked:bg-[#291D4C] peer-checked:text-white">
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
                onChange={() => setPriceRangeSelected(range.id)}
                checked={priceRangeSelected === range.id}
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

      <div className="pt-4">
        <button onClick={handleApplyFilter}
                className="w-full rounded-full bg-[#291D4C] py-3 font-medium text-white transition-colors hover:bg-[#3a2a6b]">
          Áp dụng bộ lọc
        </button>
        <button onClick={handleClearFilter}
                className="mt-2 w-full rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
});
ShopSidebar.displayName = 'ShopSidebar'; // Đặt tên cho component khi dùng forwardRef
export default React.memo(ShopSidebar);
