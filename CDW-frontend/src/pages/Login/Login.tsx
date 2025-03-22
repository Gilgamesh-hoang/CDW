import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { authStateSelector } from '@/redux/selector';
import { useAppDispatch } from '@/redux/hook';
import { login, resetAuthState } from '@/features/auth/authSlice';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { isError, isSuccess, isLoading, message: authMessage } = useSelector(authStateSelector);

  useEffect(() => {
    // Handle authentication status changes
    if (isError) {
      message.error(authMessage || 'Login failed');
    }

    if (isSuccess) {
      message.success('Login successful');
      navigate(ROUTES.HOME);
    }

    return () => {
      dispatch(resetAuthState());
    };
  }, [isError, isSuccess, authMessage, dispatch, navigate]);

  const onFinish = async (values: any) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      if (result && result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="md:h-[70vh] mt-20">
      <div className="max-w-md mx-auto p-6 border-0">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
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
            >
              Đăng Nhập
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