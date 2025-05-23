import ComponentCard from '@/components/ComponentCard.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/table';
import { useEffect, useState } from 'react';
import { Order } from '@/type';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constant.ts';
import { IoEyeOutline } from 'react-icons/io5';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { getOrders } from '@/services/order.ts';
import { Pagination } from '../../../components/Pagination.tsx';

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const pageParam =
      new URLSearchParams(window.location.search).get('page') || 1;
    setCurrentPage(Number(pageParam));
  }, []);

  useEffect(() => {
    getOrders(currentPage, 10).then((data) => {
      setOrders(data.data);
      setTotalPage(data.totalPage);
    });
  }, [currentPage]);

  const renderStatus = (status: string) => {
    let text = '';
    let color;
    switch (status) {
      case 'PROCESSING':
        text = 'Đang xử lý';
        color = 'processing';
        break;
      case 'TRANSPORTING':
        text = 'Đang giao hàng';
        color = 'geekblue';
        break;
      case 'DELIVERED':
        text = 'Đã giao';
        color = 'success';
        break;
      case 'CANCELED':
        text = 'Đã hủy';
        color = 'error';
        break;
    }
    return (
      <Tag color={color}>
        <span className="text-sm">{text}</span>
      </Tag>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Danh sách đơn hàng">
          <div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        ID
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Tên khách hàng
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Trị giá
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Trạng thái
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Thời gian
                      </TableCell>
                      <TableCell isHeader>{''}</TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {orders &&
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="px-5 py-4 sm:px-6 text-start">
                            <div className="flex items-center gap-3">
                              {order.id}
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {order.address.fullName}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {order.totalAmount.toLocaleString('vi-VN')}₫
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {renderStatus(order.status)}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {format(order.createAt, 'dd/MM/yyyy HH:mm')}
                          </TableCell>
                          <TableCell className="text-gray-500 ">
                            <button
                              className="p-3 hover:text-red-500 cursor-pointer"
                              onClick={() => {
                                navigate(
                                  ROUTES.ADMIN_ORDER_DETAIL.url.replace(
                                    ':id',
                                    order.id.toString()
                                  )
                                );
                              }}
                            >
                              <IoEyeOutline size={20} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pathname={ROUTES.ADMIN_ORDER.url}
              />
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
