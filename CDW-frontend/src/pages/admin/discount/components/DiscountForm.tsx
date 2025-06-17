import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Row,
  Col,
  Switch,
  message,
  Divider,
} from 'antd';
import { DiscountType } from '@/services/adminDiscount';
import dayjs from 'dayjs';
import axios from 'axios';
import { API_URL } from '@/config';
import { httpGet } from '@/axios';
import { ApiResponse } from '@/models';
import * as categoryService from '@/services/category';
import * as productService from '@/services/product';

const { Option } = Select;
const { TextArea } = Input;

interface DiscountFormProps {
  initialValues?: DiscountType;
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState<string>(
    initialValues?.discountType || 'PERCENTAGE'
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const isEditing = !!initialValues?.id;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate
          ? dayjs(initialValues.startDate)
          : null,
        endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null,
      });
      setDiscountType(initialValues.discountType);
    }
  }, [initialValues, form]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await categoryService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
      message.error('Không thể tải danh mục');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      message.error('Không thể tải sản phẩm');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };

    try {
      await onSubmit(formattedValues);
      if (!isEditing) {
        form.resetFields();
      }
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
    }
  };

  const handleDiscountTypeChange = (value: string) => {
    setDiscountType(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        discountType: 'PERCENTAGE',
        isActive: true,
      }}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="code"
            label="Mã giảm giá"
            rules={[
              { required: true, message: 'Vui lòng nhập mã giảm giá' },
              {
                pattern: /^[A-Z0-9_]+$/,
                message: 'Mã chỉ được chứa chữ in hoa, số và dấu gạch dưới',
              },
              { min: 3, max: 20, message: 'Mã phải từ 3-20 ký tự' },
            ]}
            tooltip="Chỉ nhập chữ in hoa, số và dấu gạch dưới (_)."
          >
            <Input placeholder="VD: SUMMER_SALE" disabled={isEditing} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="discountType"
            label="Loại giảm giá"
            rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá' }]}
          >
            <Select
              onChange={handleDiscountTypeChange}
              placeholder="Chọn loại giảm giá"
            >
              <Option value="PERCENTAGE">Phần trăm</Option>
              <Option value="FIXED_AMOUNT">Số tiền cố định</Option>
              <Option value="FREE_SHIPPING">Miễn phí vận chuyển</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="discountValue"
            label="Giá trị giảm"
            rules={[
              { required: true, message: 'Vui lòng nhập giá trị giảm' },
              {
                type: 'number',
                min: 0,
                message: 'Giá trị phải lớn hơn 0',
              },
              {
                type: 'number',
                max: discountType === 'PERCENTAGE' ? 100 : 1000000,
                message:
                  discountType === 'PERCENTAGE'
                    ? 'Phần trăm không vượt quá 100%'
                    : 'Số tiền quá lớn',
              },
            ]}
            tooltip={
              discountType === 'PERCENTAGE'
                ? 'Nhập giá trị phần trăm (0-100)'
                : discountType === 'FIXED_AMOUNT'
                ? 'Nhập số tiền giảm cố định'
                : 'Nhập giá trị miễn phí vận chuyển'
            }
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={
                discountType === 'PERCENTAGE' ? 'VD: 10 cho 10%' : 'VD: 15000'
              }
              disabled={discountType === 'FREE_SHIPPING'}
              min={0}
              max={discountType === 'PERCENTAGE' ? 100 : undefined}
              precision={discountType === 'PERCENTAGE' ? 0 : 2}
              addonAfter={discountType === 'PERCENTAGE' ? '%' : '₫'}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="minimumOrderValue"
            label="Giá trị đơn hàng tối thiểu"
            tooltip="Đơn hàng tối thiểu để áp dụng mã (không bắt buộc)"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="VD: 50000"
              min={0}
              precision={2}
              addonAfter="₫"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              disabledDate={(current) =>
                current && current < dayjs().startOf('day')
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[
              { required: true, message: 'Vui lòng chọn ngày kết thúc' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    !getFieldValue('startDate') ||
                    value.isAfter(getFieldValue('startDate'))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Ngày kết thúc phải sau ngày bắt đầu')
                  );
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              disabledDate={(current) => {
                const startDate = form.getFieldValue('startDate');
                return (
                  (current && current < dayjs().startOf('day')) ||
                  (startDate && current && current < startDate)
                );
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="usageLimit"
            label="Giới hạn lượt sử dụng"
            tooltip="Số lần mã được sử dụng tối đa (để trống nếu không giới hạn)"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="VD: 100"
              min={1}
              precision={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="maximumDiscountAmount"
            label="Số tiền giảm tối đa"
            tooltip="Số tiền giảm tối đa cho mã phần trăm"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="VD: 50000"
              min={0}
              precision={2}
              addonAfter="₫"
              disabled={discountType !== 'PERCENTAGE'}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ max: 500, message: 'Mô tả không vượt quá 500 ký tự' }]}
      >
        <TextArea
          placeholder="Nhập mô tả cho mã giảm giá"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>

      <Divider orientation="left">Phạm vi áp dụng</Divider>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="categoryIds"
            label="Áp dụng cho danh mục"
            tooltip="Chọn danh mục áp dụng (để trống để áp dụng cho tất cả)"
          >
            <Select
              mode="multiple"
              placeholder="Chọn danh mục"
              loading={loadingCategories}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="productIds"
            label="Áp dụng cho sản phẩm"
            tooltip="Chọn sản phẩm áp dụng (để trống để áp dụng theo danh mục)"
          >
            <Select
              mode="multiple"
              placeholder="Chọn sản phẩm"
              loading={loadingProducts}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {products.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {isEditing && (
        <Form.Item name="isActive" label="Kích hoạt" valuePropName="checked">
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEditing ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DiscountForm;
