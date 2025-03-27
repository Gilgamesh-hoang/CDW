import React, { useState } from 'react';
import ShopHero from './components/ShopHero';
import ProductGrid from './components/ProductGrid';
import ShopSidebar from './components/ShopSidebar';
import MobileFilters from './components/MobileFilters';
import ShopHeader from './components/ShopHeader';
import { Product } from '../../type';

// Define the mockProducts array with the Product type
const mockProducts: Product[] = [
  {
    id: 30,
    name: "Sabrina 1 (Team)",
    content: "&lt;p&gt;Bạn muốn thoải mái suốt ngày, mỗi ngày đúng không? Chúng tôi có sản phẩm cho bạn. Phiên bản AJ1 Low mang lại vẻ đẹp của phiên bản gốc dành cho bóng rổ, nhưng nhẹ hơn và có hình dáng mảnh mai hơn. Ngoài ra, chúng phù hợp với mọi trang phục chỉ cần ràng buộc dây giày và đi.&lt;/p&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Lợi ích&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Công nghệ Nike Air hấp thụ va chạm để mang lại sự êm ái mỗi bước đi.&lt;/li&gt;&lt;li&gt;Chất liệu da thật và da tổng hợp kết hợp với vật liệu dệt nhẹ nhàng mang lại độ bền cao và sự vừa vặn tốt.&lt;/li&gt;&lt;li&gt;Đế cao su cung cấp độ bám đầy đủ.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Thông tin sản phẩm&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Logo Jumpman trên lưỡi giày&lt;/li&gt;&lt;li&gt;Logo Swoosh được may chắc&lt;ul&gt;&lt;li&gt;Hiển thị: Đen/Đen/Trắng&lt;/li&gt;&lt;li&gt;Kiểu dáng: DV0990-001&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;",
    shortDescription: "Bạn muốn thoải mái suốt ng&agrave;y, mỗi ng&agrave;y đ&uacute;ng kh&ocirc;ng? Ch&uacute;ng t&ocirc;i c&oacute; sản phẩm cho bạn.",
    thumbnail: "http://res.cloudinary.com/da5wewzih/image/upload/v1713726694/bsji4vuuidbixhk90v2e.png",
    price: 3500000.0,
    categoryId: 6,
    categoryName: "Giày Golf",
    totalViewAndSearch: 4,
  },
  {
    id: 29,
    name: "Nike Zoom Vomero 5 SE",
    content: "&lt;p&gt;Bạn muốn thoải mái suốt ngày, mỗi ngày đúng không? Chúng tôi có sản phẩm cho bạn. Phiên bản AJ1 Low mang lại vẻ đẹp của phiên bản gốc dành cho bóng rổ, nhưng nhẹ hơn và có hình dáng mảnh mai hơn. Ngoài ra, chúng phù hợp với mọi trang phục chỉ cần ràng buộc dây giày và đi.&lt;/p&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Lợi ích&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Công nghệ Nike Air hấp thụ va chạm để mang lại sự êm ái mỗi bước đi.&lt;/li&gt;&lt;li&gt;Chất liệu da thật và da tổng hợp kết hợp với vật liệu dệt nhẹ nhàng mang lại độ bền cao và sự vừa vặn tốt.&lt;/li&gt;&lt;li&gt;Đế cao su cung cấp độ bám đầy đủ.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Thông tin sản phẩm&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Logo Jumpman trên lưỡi giày&lt;/li&gt;&lt;li&gt;Logo Swoosh được may chắc&lt;ul&gt;&lt;li&gt;Hiển thị: Đen/Đen/Trắng&lt;/li&gt;&lt;li&gt;Kiểu dáng: DV0990-001&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;",
    shortDescription: "Bạn muốn thoải m&aacute;i suốt ng&agrave;y, mỗi ng&agrave;y đ&uacute;ng kh&ocirc;ng? Ch&uacute;ng t&ocirc;i c&oacute; sản phẩm cho bạn.",
    thumbnail: "http://res.cloudinary.com/da5wewzih/image/upload/v1713726615/wzj2lti74ptzjqntmwdr.png",
    price: 2700000.0,
    categoryId: 4,
    categoryName: "Giày Bóng chày",
    totalViewAndSearch: 8,
  },
  {
    id: 28,
    name: "Nike Zoom HyperAce 2",
    content: "&lt;p&gt;Bạn muốn thoải mái suốt ngày, mỗi ngày đúng không? Chúng tôi có sản phẩm cho bạn. Phiên bản AJ1 Low mang lại vẻ đẹp của phiên bản gốc dành cho bóng rổ, nhưng nhẹ hơn và có hình dáng mảnh mai hơn. Ngoài ra, chúng phù hợp với mọi trang phục chỉ cần ràng buộc dây giày và đi.&lt;/p&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Lợi ích&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Công nghệ Nike Air hấp thụ va chạm để mang lại sự êm ái mỗi bước đi.&lt;/li&gt;&lt;li&gt;Chất liệu da thật và da tổng hợp kết hợp với vật liệu dệt nhẹ nhàng mang lại độ bền cao và sự vừa vặn tốt.&lt;/li&gt;&lt;li&gt;Đế cao su cung cấp độ bám đầy đủ.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Thông tin sản phẩm&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Logo Jumpman trên lưỡi giày&lt;/li&gt;&lt;li&gt;Logo Swoosh được may chắc&lt;ul&gt;&lt;li&gt;Hiển thị: Đen/Đen/Trắng&lt;/li&gt;&lt;li&gt;Kiểu dáng: DV0990-001&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;",
    shortDescription: "Bạn muốn thoải m&aacute;i suốt ng&agrave;y, mỗi ng&agrave;y đ&uacute;ng kh&ocirc;ng? Ch&uacute;ng t&ocirc;i c&oacute; sản phẩm cho bạn.",
    thumbnail: "http://res.cloudinary.com/da5wewzih/image/upload/v1713726561/grdvdiudgw8bpq9rufav.png",
    price: 4300000.0,
    categoryId: 5,
    categoryName: "Giày Bóng chuyền",
    totalViewAndSearch: 7,
  },
  {
    id: 27,
    name: "Nike Winflo 10",
    content: "&lt;p&gt;Bạn muốn thoải mái suốt ngày, mỗi ngày đúng không? Chúng tôi có sản phẩm cho bạn. Phiên bản AJ1 Low mang lại vẻ đẹp của phiên bản gốc dành cho bóng rổ, nhưng nhẹ hơn và có hình dáng mảnh mai hơn. Ngoài ra, chúng phù hợp với mọi trang phục chỉ cần ràng buộc dây giày và đi.&lt;/p&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Lợi ích&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Công nghệ Nike Air hấp thụ va chạm để mang lại sự êm ái mỗi bước đi.&lt;/li&gt;&lt;li&gt;Chất liệu da thật và da tổng hợp kết hợp với vật liệu dệt nhẹ nhàng mang lại độ bền cao và sự vừa vặn tốt.&lt;/li&gt;&lt;li&gt;Đế cao su cung cấp độ bám đầy đủ.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Thông tin sản phẩm&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Logo Jumpman trên lưỡi giày&lt;/li&gt;&lt;li&gt;Logo Swoosh được may chắc&lt;ul&gt;&lt;li&gt;Hiển thị: Đen/Đen/Trắng&lt;/li&gt;&lt;li&gt;Kiểu dáng: DV0990-001&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;",
    shortDescription: "Bạn muốn thoải m&aacute;i suốt ng&agrave;y, mỗi ng&agrave;y đ&uacute;ng kh&ocirc;ng? Ch&uacute;ng t&ocirc;i c&oacute; sản phẩm cho bạn.",
    thumbnail: "http://res.cloudinary.com/da5wewzih/image/upload/v1713726465/ogsv89vpdnwr1gof02kr.png",
    price: 2000000.0,
    categoryId: 7,
    categoryName: "Giày Chạy bộ",
    totalViewAndSearch: 0,
  },
  {
    id: 26,
    name: "Nike Vaporfly 3",
    content: "&lt;p&gt;Bạn muốn thoải mái suốt ngày, mỗi ngày đúng không? Chúng tôi có sản phẩm cho bạn. Phiên bản AJ1 Low mang lại vẻ đẹp của phiên bản gốc dành cho bóng rổ, nhưng nhẹ hơn và có hình dáng mảnh mai hơn. Ngoài ra, chúng phù hợp với mọi trang phục chỉ cần ràng buộc dây giày và đi.&lt;/p&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Lợi ích&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Công nghệ Nike Air hấp thụ va chạm để mang lại sự êm ái mỗi bước đi.&lt;/li&gt;&lt;li&gt;Chất liệu da thật và da tổng hợp kết hợp với vật liệu dệt nhẹ nhàng mang lại độ bền cao và sự vừa vặn tốt.&lt;/li&gt;&lt;li&gt;Đế cao su cung cấp độ bám đầy đủ.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Thông tin sản phẩm&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Logo Jumpman trên lưỡi giày&lt;/li&gt;&lt;li&gt;Logo Swoosh được may chắc&lt;ul&gt;&lt;li&gt;Hiển thị: Đen/Đen/Trắng&lt;/li&gt;&lt;li&gt;Kiểu dáng: DV0990-001&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;",
    shortDescription: "Bạn muốn thoải m&aacute;i suốt ng&agrave;y, mỗi ng&agrave;y đ&uacute;ng kh&ocirc;ng? Ch&uacute;ng t&ocirc;i c&oacute; sản phẩm cho bạn.",
    thumbnail: "http://res.cloudinary.com/da5wewzih/image/upload/v1713726398/cykyeweo71id4iw4oyur.png",
    price: 999000.0,
    categoryId: 6,
    categoryName: "Giày Golf",
    totalViewAndSearch: 2,
  }
];
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
