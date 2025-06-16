import React from 'react';
import { Table } from 'antd';
import { OrderDetail, Product } from '@/models';
import { formatCurrency } from '@/utils/format';
import OptimizedImage from '@/components/OptimizedImage';

interface ProductListProps {
  orderDetails: OrderDetail[];
}

const ProductList: React.FC<ProductListProps> = ({ orderDetails }) => {
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: Product) => (
        <div className="flex items-center">
          <div className="w-16 h-16 mr-4 flex-shrink-0 rounded overflow-hidden">
            <OptimizedImage
              src={record.thumbnail || ''}
              alt={record.name || ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">
              Size: {record.sizeName || 'N/A'}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as const,
      render: (price: number) => formatCurrency(price || 0),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center' as const,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subTotal',
      key: 'subTotal',
      align: 'right' as const,
      render: (subTotal: number) => formatCurrency(subTotal || 0),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sản phẩm đã đặt</h2>

      <Table
        columns={columns}
        dataSource={orderDetails.map((detail) => ({
          ...detail,
          name: detail.productSize.productName,
          thumbnail: detail.productSize.productThumbnail,
          price: detail.productSize.price,
          sizeName: detail.productSize.sizeName,
        }))}
        rowKey="id"
        pagination={false}
        className="border rounded-lg overflow-hidden"
        summary={(pageData) => {
          let totalPrice = 0;
          pageData.forEach(({ subTotal }) => {
            totalPrice += subTotal || 0;
          });

          return (
            <Table.Summary.Row className="bg-gray-50">
              <Table.Summary.Cell
                index={0}
                colSpan={3}
                className="font-semibold"
              >
                Tổng tiền sản phẩm
              </Table.Summary.Cell>
              <Table.Summary.Cell
                index={1}
                align="right"
                className="font-semibold text-[#291D4C]"
              >
                {formatCurrency(totalPrice)}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default ProductList;
