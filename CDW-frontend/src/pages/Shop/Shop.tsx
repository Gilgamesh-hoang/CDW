import React, { useState } from 'react';
import ShopHero from './components/ShopHero';
import ProductGrid from './components/ProductGrid';
import ShopSidebar from './components/ShopSidebar';
import { mockProducts } from '@/data/products';
import MobileFilters from './components/MobileFilters';
import ShopHeader from './components/ShopHeader';

const Shop: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [filterMobileOpen, setFilterMobileOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Xử lý tìm kiếm sẽ được thêm sau
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    // Xử lý sắp xếp sẽ được thêm sau
  };

  return (
    <div className="bg-white">
      <ShopHero />

      <div className="container mx-auto px-4 py-8">
        <ShopHeader
          onSearch={handleSearch}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterToggle={() => setFilterMobileOpen(true)}
        />

        <div className="mt-6 flex gap-8">
          {/* Sidebar filters - Ẩn trên mobile */}
          <div className="hidden w-1/4 lg:block">
            <ShopSidebar />
          </div>

          {/* Danh sách sản phẩm */}
          <div className="w-full lg:w-3/4">
            <ProductGrid products={mockProducts} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilters
        isOpen={filterMobileOpen}
        onClose={() => setFilterMobileOpen(false)}
      />
    </div>
  );
};

export default Shop;
