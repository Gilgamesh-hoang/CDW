import React from 'react';
import SearchBar from '@/components/SearchBar';
import { FaFilter, FaThList, FaThLarge } from 'react-icons/fa';

interface ShopHeaderProps {
  onSearch: (query: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  onFilterToggle: () => void;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({
  onSearch,
  sortOption,
  onSortChange,
  onFilterToggle,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={onFilterToggle}
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-[#291D4C]"
        >
          <FaFilter size={14} />
          <span>Lọc sản phẩm</span>
        </button>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-[#291D4C]"
        >
          <option value="featured">Nổi bật</option>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá: Thấp đến cao</option>
          <option value="price-desc">Giá: Cao đến thấp</option>
        </select>
      </div>

      <div className="w-full md:w-2/5">
        <SearchBar
          placeholder="Tìm kiếm sản phẩm..."
          onSearch={onSearch}
          className="h-10"
        />
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <div className="flex gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-md bg-[#291D4C] text-white transition-colors hover:bg-[#3a2a6b]">
            <FaThLarge size={14} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-md border border-gray-300 text-gray-600 transition-colors hover:border-[#291D4C] hover:text-[#291D4C]">
            <FaThList size={14} />
          </button>
        </div>

        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-[#291D4C]"
        >
          <option value="featured">Nổi bật</option>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá: Thấp đến cao</option>
          <option value="price-desc">Giá: Cao đến thấp</option>
        </select>
      </div>
    </div>
  );
};

export default ShopHeader;
