import { FC, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import useDebounce from '@/hooks/useDebounce.ts';
import { toastError, toastSuccess } from '@/utils/showToast.ts';
import { Modal } from '@/components/modal';
import { createSize, existsSize, getSizeById, updateSize } from '@/services/size.ts';
import { Size } from '../../../models';

interface SizeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  sizeId: number | null;
  callback?: (category: Size) => void;
}

export const SizeModal: FC<SizeModalProps> = ({ isOpen, closeModal, sizeId, callback }) => {
  const [form] = Form.useForm();
  const [sizeName, setSizeName] = useState('');
  const sizeNameDebounce = useDebounce(sizeName, 500);
  let sizeExists = false;

  useEffect(() => {
    if (sizeNameDebounce && sizeNameDebounce.trim().length >= 1) {
      existsSize(sizeNameDebounce).then((response) => {
        sizeExists = response;
        form.validateFields(['name']);
      });

    }
  }, [sizeNameDebounce]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setSizeName(''); // Reset state khi thêm mới
      sizeExists = false;
      return;
    }

    if (sizeId) {
      getSizeById(sizeId).then((data) => {
        // Cập nhật giá trị cho form
        form.setFieldsValue({
          name: data.name,
        });
        setSizeName(data.name); // Đồng bộ với state để kiểm tra
      });

    } else {
      form.resetFields();
      setSizeName(''); // Reset state khi thêm mới
      sizeExists = false;
    }
  }, [sizeId, form, isOpen]);

  const onFinish = async (values: any) => {
    if (sizeExists) {
      toastError('Tên kích cỡ đã tồn tại', 1500);
      return;
    }

    if (sizeId) {
      updateSize(sizeId, values.name).then((data) => {

        if (callback) {
          callback(data);
        }
        form.resetFields();
        closeModal();
        toastSuccess('Cập nhật kích cỡ thành công', 1500);
      }).catch((err) => {
        console.error(err);
        form.resetFields();
        closeModal();
        toastError('Cập nhật kích cỡ thất bại', 1500);
      });
    } else {
      createSize(values.name).then((data) => {
        if (callback) {
          callback(data);
        }
        form.resetFields();
        closeModal();
        toastSuccess('Thêm mới kích cỡ thành công', 1500);
      }).catch((err) => {
        console.error(err);
        form.resetFields();
        closeModal();
        toastError('Thêm mới kích cỡ thất bại', 1500);
      });
    }
  };

  // Custom validator kiểm tra sự tồn tại của size name
  const validateSizeName = async (_: any, value: string) => {
    if (sizeExists && value === sizeNameDebounce) {
      return Promise.reject(new Error('Tên kích cỡ đã tồn tại'));
    }
    return Promise.resolve();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div
        className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {sizeId ? 'Cập nhật kích cỡ' : 'Thêm mới kích cỡ'}
          </h4>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên kích cỡ"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên kích cỡ' },
              { validator: validateSizeName }]}
          >
            <Input size="large"
                   onChange={(e) => {
                     setSizeName(e.target.value.trim());
                     form.setFieldValue('name', e.target.value.trim());
                   }} />
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
                {sizeId ? 'Cập nhật' : 'Thêm mới'}
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
