import { FC, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import useDebounce from '@/hooks/useDebounce.ts';
import { createCategory, existsCategory, getCategoryById, updateCategory } from '@/services/category.ts';
import { toastError, toastSuccess } from '@/utils/showToast.ts';
import { Modal } from '@/components/modal';
import { Category } from '../../../models';

interface CategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  categoryId: number | null;
  callback?: (category: Category) => void;
}

export const CategoryModal: FC<CategoryModalProps> = ({ isOpen, closeModal, categoryId, callback }) => {
  const [form] = Form.useForm();
  const [categoryCode, setCategoryCode] = useState('');
  const categoryCodeDebounce = useDebounce(categoryCode, 500);
  // const [categoryCodeExists, setCategoryCodeExists] = useState(false);
  let categoryCodeExists = false;

  useEffect(() => {
    // Kiểm tra mã danh mục đã tồn tại chưa
    if (categoryCodeDebounce && categoryCodeDebounce.trim().length >= 1) {
      existsCategory(categoryCodeDebounce).then((response) => {
        // setCategoryCodeExists(response);
        categoryCodeExists = response;
        form.validateFields(['code']);
      });

    }
  }, [categoryCodeDebounce]);

  useEffect(() => {
    if (categoryId) {
      getCategoryById(categoryId).then((data) => {
        // Cập nhật giá trị cho form
        form.setFieldsValue({
          code: data.code,
          name: data.name,
        });
        setCategoryCode(data.code); // Đồng bộ với state để kiểm tra
      });

    } else {
      form.resetFields();
      setCategoryCode(''); // Reset state khi thêm mới
      // setCategoryCodeExists(false); // Reset trạng thái kiểm tra
      categoryCodeExists = false;
    }
  }, [categoryId, form]);


  const onFinish = async (values: any) => {
    if (categoryCodeExists) {
      toastError('Mã danh mục đã tồn tại', 1500);
      return;
    }

    if (categoryId) {
      updateCategory(categoryId, values.name, values.code).then((data) => {

        if (callback) {
          callback(data);
        }
        form.resetFields();
        closeModal();
        toastSuccess('Cập nhật danh mục thành công', 1500);
      }).catch((err) => {
        console.error(err);
        form.resetFields();
        closeModal();
        toastError('Cập nhật danh mục thất bại', 1500);
      });
    } else {
      createCategory(values.name, values.code).then((data) => {
        if (callback) {
          callback(data);
        }
        form.resetFields();
        closeModal();
        toastSuccess('Thêm mới danh mục thành công', 1500);
      }).catch((err) => {
        form.resetFields();
        closeModal();
        console.error(err);
        toastError('Thêm mới danh mục thất bại', 1500);
      });
    }
  };

  // Custom validator kiểm tra sự tồn tại của mã danh mục
  const validateCategoryCode = async (_: any, value: string) => {
    if (categoryCodeExists && value === categoryCodeDebounce) {
      return Promise.reject(new Error('Mã danh mục đã tồn tại'));
    }
    return Promise.resolve();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div
        className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {categoryId ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
          </h4>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Mã danh mục"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã danh mục' },
              { validator: validateCategoryCode },
            ]}
          >

            <Input size="large"
                   onChange={(e) => {
                     setCategoryCode(e.target.value.trim());
                     form.setFieldValue('code', e.target.value.trim());
                   }} />
          </Form.Item>

          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input size="large" />
          </Form.Item>

          <div className="flex gap-6 justify-end">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className=" h-10"
                style={{ backgroundColor: '#291D4C' }}
                size="large"
                loading={false}
              >
                {categoryId ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="h-10 bg-red-500"
                style={{ backgroundColor: 'rgb(239 68 68)' }}
                size="large"
                onClick={closeModal}
              >
                Hủy
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
