import React from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { authStateSelector } from '@/redux/selector';
import { useAppDispatch } from '@/redux/hook';
import { login } from '@/features/auth/authSlice';
import { toastError } from '../../utils/showToast.ts';
import { UserRole } from '../../models/enums.ts';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(authStateSelector);


  const onFinish = async (values: any) => {
    try {
      const res = await dispatch(login(values));
      if (res.payload.status !== 200) {
        toastError('Đăng nhập thất bại');
        return;
      }

      if (res.payload.data.role === UserRole.ADMIN) {
        navigate(ROUTES.ADMIN_DASHBOARD);
        return;
      } else {
        navigate(ROUTES.HOME);
        return;
      }

    } catch (error) {
      toastError('Đăng nhập thất bại');
    }
  };

  return (
    <div className="md:h-[70vh] mt-20">
      <div className="max-w-md mx-auto p-6 border-0">
        <div className="text-center mb-10">
          <p className="text-5xl font-medium">Đăng nhập</p>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email' }, {
              type: 'email',
              message: 'Email không hợp lệ',
            }]}
          >
            <Input placeholder="Tên đăng nhập" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="flex justify-end mb-4">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-sm text-[#291D4C]"
            >
              Quên mật khẩu
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10"
              style={{ backgroundColor: '#291D4C' }}
              size="large"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Bạn chưa có tài khoản?
            <Link
              to={ROUTES.REGISTER}
              className="text-[#291D4C] font-medium ml-1"
            >
              Đăng kí ngay!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;