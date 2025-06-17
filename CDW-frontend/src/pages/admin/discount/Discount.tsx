import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  message,
  Modal,
  Typography,
  Row,
  Col,
  Input,
  Space,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import DiscountTable from './components/DiscountTable';
import DiscountForm from './components/DiscountForm';
import adminDiscountService, {
  DiscountType,
  CreateDiscountRequest,
  UpdateDiscountRequest,
} from '@/services/adminDiscount';

const { Title } = Typography;

const DiscountPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingDiscount, setEditingDiscount] = useState<
    DiscountType | undefined
  >(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const pageSize = 10;

  useEffect(() => {
    fetchDiscounts();
  }, [currentPage]);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await adminDiscountService.getAllDiscounts(
        currentPage - 1,
        pageSize
      );
      setDiscounts(response.data);
      setTotalItems(response.totalPage * pageSize); // Approximation
    } catch (error) {
      console.error('Error fetching discounts:', error);
      message.error('Không thể tải danh sách mã giảm giá');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDiscounts();
  };

  const handleCreateDiscount = () => {
    setEditingDiscount(undefined);
    setIsModalVisible(true);
  };

  const handleEditDiscount = (discount: DiscountType) => {
    setEditingDiscount(discount);
    setIsModalVisible(true);
  };

  const handleDeleteDiscount = async (id: number) => {
    try {
      setLoading(true);
      await adminDiscountService.deleteDiscount(id);
      message.success('Xóa mã giảm giá thành công');
      fetchDiscounts();
    } catch (error) {
      console.error('Error deleting discount:', error);
      message.error('Xóa mã giảm giá thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async (values: any) => {
    try {
      setFormLoading(true);
      if (editingDiscount) {
        const updateRequest: UpdateDiscountRequest = {
          id: editingDiscount.id!,
          ...values,
        };
        await adminDiscountService.updateDiscount(updateRequest);
        message.success('Cập nhật mã giảm giá thành công');
      } else {
        const createRequest: CreateDiscountRequest = values;
        await adminDiscountService.createDiscount(createRequest);
        message.success('Tạo mã giảm giá thành công');
      }
      setIsModalVisible(false);
      fetchDiscounts();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error(
        `Không thể ${editingDiscount ? 'cập nhật' : 'tạo'} mã giảm giá`
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <Card>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            <Title level={2}>Quản lý mã giảm giá</Title>
          </Col>
          <Col>
            <Space>
              <Input
                placeholder="Tìm kiếm mã giảm giá"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handleSearch}
                prefix={<SearchOutlined />}
                style={{ width: 250 }}
              />
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchDiscounts}
                loading={loading}
              >
                Làm mới
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateDiscount}
              >
                Thêm mã giảm giá
              </Button>
            </Space>
          </Col>
        </Row>

        <div className="mt-4">
          <DiscountTable
            discounts={discounts}
            loading={loading}
            onEdit={handleEditDiscount}
            onDelete={handleDeleteDiscount}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalItems,
              onChange: handlePageChange,
            }}
          />
        </div>

        <Modal
          title={`${editingDiscount ? 'Chỉnh sửa' : 'Tạo mới'} mã giảm giá`}
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={800}
        >
          <DiscountForm
            initialValues={editingDiscount}
            onSubmit={handleSubmitForm}
            loading={formLoading}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default DiscountPage;
