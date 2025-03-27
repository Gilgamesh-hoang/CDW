
export const mockProducts = [
  {
    id: 'nike-',
    name: 'Nike Air Max 90',
    price: 3200000,
    discountPrice: 2850000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-max-90-shoes-N7Tbw0.png',
    category: 'Giày Thể Thao',
    isNew: true,
  },
  {
    id: 'nike-air',
    name: 'Nike Air Max 90',
    price: 3200000,
    discountPrice: 2850000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-max-90-shoes-N7Tbw0.png',
    category: 'Giày Thể Thao',
    isNew: true,
  },
  {
    id: 'nike-air-',
    name: 'Nike Air Max 90',
    price: 3200000,
    discountPrice: 2850000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-max-90-shoes-N7Tbw0.png',
    category: 'Giày Thể Thao',
    isNew: true,
  },
  {
    id: 'nike-air-force-1',
    name: "Nike Air Force 1 '07",
    price: 2900000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes-WrLlWX.png',
    category: 'Giày Thể Thao',
  },
  {
    id: 'nike-dunk-low',
    name: 'Nike Dunk Low Retro',
    price: 2500000,
    discountPrice: 2100000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5df04572-e30d-4dea-bd19-50a3dcd7dd88/dunk-low-retro-shoe-66RGqF.png',
    category: 'Giày Thể Thao',
  },
  {
    id: 'nike-air-jordan-1',
    name: 'Air Jordan 1 Mid',
    price: 3500000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8d752b32-18ae-4484-92ae-d23118f8a5e4/air-jordan-1-mid-shoes-SQf7DM.png',
    category: 'Giày Thể Thao',
    isNew: true,
  },
  {
    id: 'nike-revolution-6',
    name: 'Nike Revolution 6',
    price: 1900000,
    discountPrice: 1600000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/263a99e8-b3c8-4404-b703-e0ebc11b4456/revolution-6-road-running-shoes-HcvXts.png',
    category: 'Giày Chạy Bộ',
  },
  {
    id: 'nike-pegasus-40',
    name: 'Nike Pegasus 40',
    price: 3800000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cd1fc4e8-22fd-4e19-8308-80b9173aec66/pegasus-40-road-running-shoes-ztffS8.png',
    category: 'Giày Chạy Bộ',
  },
  {
    id: 'nike-zoomx-vaporfly',
    name: 'Nike ZoomX Vaporfly NEXT% 3',
    price: 6900000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6d2e2473-a1a5-48e9-a4d0-0e82a5e6eafd/zoomx-vaporfly-next-3-road-racing-shoes-wdmCSD.png',
    category: 'Giày Chạy Bộ',
    isNew: true,
  },
  {
    id: 'nike-zoom-fly-5',
    name: 'Nike Zoom Fly 5',
    price: 4100000,
    discountPrice: 3690000,
    image:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3c60f4e1-4a12-4bca-99f1-e971e31ba752/zoom-fly-5-road-running-shoes-wvhpHm.png',
    category: 'Giày Chạy Bộ',
  },
];

export const featuredCollections = [
  {
    id: 'running-shoes',
    title: 'Giày Chạy Bộ',
    description: 'Hiệu suất cao & thoải mái suốt chặng đường dài',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e7464b02-c082-4864-a38c-23bde28b5407/NIKE+VOMERO+18+%28GS%29.png',
    link: '/cua-hang?category=chay-bo',
  },
  {
    id: 'basketball-shoes',
    title: 'Giày Bóng Rổ',
    description: 'Đệm chân tối ưu & bám sân tuyệt đối',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8765254d-e642-4860-b10f-3d0eb097f007/LEBRON+XXII+XMAS+EP.png',
    link: '/cua-hang?category=bong-ro',
  },
  {
    id: 'lifestyle-shoes',
    title: 'Giày Lifestyle',
    description: 'Phong cách đường phố & sự thoải mái hàng ngày',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3ce45dc-21a3-4b34-ad29-cc09ec142136/AIR+MONARCH+IV.png',
    link: '/cua-hang?category=lifestyle',
  },
];

export const newArrivals = mockProducts.filter((product) => product.isNew);
export const bestSellers = mockProducts.filter((_, index) => index % 2 === 0);
export const saleProducts = mockProducts.filter(
  (product) => product.discountPrice
);
