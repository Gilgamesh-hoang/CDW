import { useEffect, useState } from 'react';
import { Button, Select, Tag } from 'antd';
import { format } from 'date-fns';
import { FaTruck, FaUser } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/table';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder } from '@/services/order.ts';
import { toastSuccess } from '@/utils/showToast.ts';
import { updateOrderStatus } from '../../../services/order.ts';
import { Order } from '../../../models';

const { Option } = Select;
export default function OrderDetail() {
  const [order, setOrder] = useState<Order | null>(null);
  const [statusSelected, setStatusSelected] = useState<string | null>(null);
  const [disableChangeStatus, setDisableChangeStatus] = useState<boolean>(
    order !== null && (order.status === 'DELIVERED' || order.status === 'CANCELED'),
  );
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  try {
    Number(id);
  } catch (e) {
    navigate(-1);
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    getOrder(Number(id)).then((res) => {
      setOrder(res);
    });
  }, [id]);

  const handleChangeStatus = () => {
    if (!id || !statusSelected) {
      return;
    }

    if (statusSelected === order?.status) {
      return;
    }

    updateOrderStatus(Number(id), statusSelected).then(() => {
      toastSuccess('Đã thay đổi trạng thái');
      setOrder(pre => {
        if (pre) {
          pre.status = statusSelected;
        }
        return pre;
      });
      setDisableChangeStatus(statusSelected === 'DELIVERED' || statusSelected === 'CANCELED');
    }).catch((err) => {
      console.log(err);
    });
  };

  if (!order) {
    return null;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Header: Ngày và ID đơn hàng */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(order.createAt, 'dd/MM/yyyy HH:mm')}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Mã đơn: {order?.id}
          </p>
        </div>
        <div>
          <p className=" text-gray-700">
            Tổng trị giá: {order?.totalAmount.toLocaleString('vi-VN')}₫
          </p>
        </div>

      </div>

      {/* Thông tin khách hàng, đơn hàng, và địa chỉ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Customer */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <FaUser className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Người nhận</p>
            <p className="text-gray-700 dark:text-gray-300">{order.address.fullName}</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <FaTruck className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Thông tin thanh toán</p>
            <p className="text-gray-700 dark:text-gray-300">
              {order.isPaid ?
                <Tag color={'success'}>
                  <span className="text-sm">
                    Đã thanh toán
                  </span>
                </Tag> :
                <Tag color={'warning'}>
                  <span className="text-sm">
                      Chưa thanh toán
                  </span>
                </Tag>
              }

            </p>
          </div>
        </div>

        {/* Deliver to */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <FaMapLocationDot className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Deliver to</p>
            <p className="text-gray-700 dark:text-gray-300">{order.address.hamlet}</p>
          </div>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <Table>
        {/* Table Header */}
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Sản phẩm
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Giá
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
            >
              Số lượng
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Tổng
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {order.listProduct.map((product) => (
            <TableRow key={`${product.id}${product.sizeId}`}>
              <TableCell className="py-4 sm:px-6 text-start">
                <div className="flex items-center justify-between">
                  {/* Hình ảnh sản phẩm */}
                  <div className="w-24 h-24 bg-gray-300 rounded-md">
                    <img src={product.thumbnail} alt={product.name}
                         className="w-full h-full object-cover rounded-md" />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex-1 ml-4">
                    <h2 className="text-sm font-medium">{product.name}</h2>
                    <p className="text-sm text-gray-500">{product.categoryName}</p>
                    <p className="text-sm text-gray-500">Size: {product.sizeName}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {product.price.toLocaleString('vi-VN')}₫
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                {product.quantity}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {product.subTotal?.toLocaleString('vi-VN')}₫
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Tổng tiền */}
      <div className="flex justify-between items-center mt-[30px]">
        <div>
          <p>Ghi chú</p>
          <p
            className="text-sm text-gray-700 max-w-[500px] max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          >
            {order.note}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Select defaultValue={order.status}
                    className="w-40"
                    size={'large'}
                    disabled={disableChangeStatus}
                    onSelect={(value) => {
                      console.log('select', value);
                      setStatusSelected(value);
                    }}
            >
              <Option value="PROCESSING">Đang xử lý</Option>
              <Option value="TRANSPORTING">Đang giao</Option>
              <Option value="DELIVERED">Đã giao</Option>
              <Option value="CANCELED">Đã hủy</Option>
            </Select>
          </div>
          <Button style={{ backgroundColor: '#ecf3ff' }}
                  size={'large'}
                  disabled={disableChangeStatus}
                  onClick={handleChangeStatus}
          >Thay đổi trạng thái</Button>
        </div>
      </div>
    </div>
  );
};