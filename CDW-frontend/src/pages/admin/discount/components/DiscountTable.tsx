import React from 'react';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DiscountType } from '@/services/adminDiscount';
import dayjs from 'dayjs';

interface DiscountTableProps {
  discounts: DiscountType[];
  loading: boolean;
  onEdit: (discount: DiscountType) => void;
  onDelete: (id: number) => void;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
}

const DiscountTable: React.FC<DiscountTableProps> = ({
  discounts,
  loading,
  onEdit,
  onDelete,
  pagination,
}) => {
  const getDiscountTypeColor = (type: string) => {
    switch (type) {
      case 'PERCENTAGE':
        return 'blue';
      case 'FIXED_AMOUNT':
        return 'green';
      case 'FREE_SHIPPING':
        return 'purple';
      default:
        return 'default';
    }
  };

  const getStatusColor = (
    status: boolean | undefined,
    startDate: Date | string,
    endDate: Date | string
  ) => {
    if (status === false) return 'red';

    const now = dayjs();
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (now.isBefore(start)) return 'orange'; // Upcoming
    if (now.isAfter(end)) return 'grey'; // Expired
    return 'green'; // Active
  };

  const getStatusText = (
    status: boolean | undefined,
    startDate: Date | string,
    endDate: Date | string
  ) => {
    if (status === false) return 'Không hoạt động';

    const now = dayjs();
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (now.isBefore(start)) return 'Sắp diễn ra';
    if (now.isAfter(end)) return 'Hết hạn';
    return 'Đang hoạt động';
  };

  const columns = [
    {
      title: 'Mã giảm giá',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Loại',
      dataIndex: 'discountType',
      key: 'discountType',
      render: (type: string) => (
        <Tag color={getDiscountTypeColor(type)}>
          {type === 'PERCENTAGE'
            ? 'Phần trăm'
            : type === 'FIXED_AMOUNT'
            ? 'Số tiền cố định'
            : 'Miễn phí vận chuyển'}
        </Tag>
      ),
    },
    {
      title: 'Giá trị',
      dataIndex: 'discountValue',
      key: 'discountValue',
      render: (value: number, record: DiscountType) => (
        <span>
          {record.discountType === 'PERCENTAGE'
            ? `${value}%`
            : record.discountType === 'FIXED_AMOUNT'
            ? `${value.toLocaleString('vi-VN')}₫`
            : 'Miễn phí'}
        </span>
      ),
    },
    {
      title: 'Thời gian áp dụng',
      key: 'validPeriod',
      render: (_: any, record: DiscountType) => (
        <span>
          {dayjs(record.startDate).format('DD/MM/YYYY')} -{' '}
          {dayjs(record.endDate).format('DD/MM/YYYY')}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: DiscountType) => (
        <Tag
          color={getStatusColor(
            record.isActive,
            record.startDate,
            record.endDate
          )}
        >
          {getStatusText(record.isActive, record.startDate, record.endDate)}
        </Tag>
      ),
    },
    {
      title: 'Số lượt sử dụng',
      key: 'usage',
      render: (_: any, record: DiscountType) => (
        <span>
          {record.usageCount || 0} /{' '}
          {record.usageLimit ? record.usageLimit : 'Không giới hạn'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: DiscountType) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            size="small"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mã giảm giá này?"
            onConfirm={() => record.id && onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={discounts.map((discount) => ({
        ...discount,
        key: discount.id,
      }))}
      pagination={pagination}
      loading={loading}
      scroll={{ x: 1000 }}
    />
  );
};

export default DiscountTable;
