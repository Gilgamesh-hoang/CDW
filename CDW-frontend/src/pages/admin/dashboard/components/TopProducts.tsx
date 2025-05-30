import { Product } from '@/models';

interface TopProductsProps {
  products: Product[];
}

export const TopProducts = ({ products }: TopProductsProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
        <p className="text-gray-500">No product data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-3">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${
                        ((product.sales || 0) / (products[0]?.sales || 1)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.sales} sold
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
