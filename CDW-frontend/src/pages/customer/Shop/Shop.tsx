import React, { useEffect, useRef, useState } from 'react';
import ShopHero from './components/ShopHero.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import ShopSidebar from './components/ShopSidebar.tsx';
import ShopHeader from './components/ShopHeader.tsx';
import { PageResponse, Product } from '../../../type';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/constant.ts';
import MobileFilters from './components/MobileFilters.tsx';
import { search } from '../../../services/search.ts';

const Shop: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sizesSelected, setSizesSelected] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const [priceRangeSelected, setPriceRangeSelected] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('newest-desc');
  const [products, setProducts] = useState<Product[]>([]);
  const sidebarRef = useRef<{ clearFilter: () => void }>(null);
  const [filterMobileOpen, setFilterMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    setSearchQuery(decodeURIComponent(query));

    const pageParam = new URLSearchParams(window.location.search).get('page') || 1;
    setPage(Number(pageParam));

    handleFilter([], [], null);
  }, []);

  useEffect(() => {
    handleClearFromShop();
  }, [searchQuery]);

  useEffect(() => {
    handleFilter(sizesSelected, categoriesSelected, priceRangeSelected);
  }, [searchQuery, page, sortOption]);

  const handleClearFromShop = () => {
    if (sidebarRef.current) {
      sidebarRef.current.clearFilter(); // Gọi hàm clearFilter từ ShopSidebar
    }
  };

  const handleFilter = (sizesSelected: number[], categoriesSelected: number[], priceRangeSelected: string | null) => {
    setSizesSelected(sizesSelected);
    setCategoriesSelected(categoriesSelected);
    setPriceRangeSelected(priceRangeSelected);

    const sorts = sortOption.split('-');
    search({
      keyword: searchQuery, page: page, size: 12, sort: sorts[0], direction: sorts[1],
      sizeIds: sizesSelected, categoryIds: categoriesSelected, priceRange: priceRangeSelected,
    })
      .then((response: PageResponse<Product[]>) => {
        setProducts(response.data);
        setTotalPage(response.totalPage);

        // scroll to top
        window.scrollTo({ top: 400, behavior: 'smooth' });
      });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Cập nhật state

    if (!query) {
      // Nếu query rỗng thì xóa query parameter khỏi URL
      navigate(ROUTES.SHOP);
      return;
    }

    // Encode query trước khi thêm vào URL
    const encodedQuery = encodeURIComponent(query);

    // Cập nhật URL với query parameter
    navigate({
      pathname: ROUTES.SHOP,
      search: `?query=${encodedQuery}`,
    });
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
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
            <ShopSidebar
              handleFilter={handleFilter}
              ref={sidebarRef}
            />
          </div>

          {/* Danh sách sản phẩm */}
          <div className="w-full lg:w-3/4">
            <ProductGrid products={products} totalPage={totalPage} currentPage={page} setPage={setPage} />
          </div>
        </div>
      </div>

      {/*Mobile filter drawer */}
      <MobileFilters
        isOpen={filterMobileOpen}
        onClose={() => setFilterMobileOpen(false)}
        handleFilter={handleFilter}
      />
      {/*}*/}
    </div>
  );
};

export default Shop;
