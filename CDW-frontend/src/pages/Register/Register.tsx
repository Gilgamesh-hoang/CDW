import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { register, resetAuthState } from '@/features/auth/authSlice';
import { authStateSelector } from '@/redux/selector';
import { RegisterParams } from '@/features/auth/authService';
import { useAppDispatch } from '@/redux/hook';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, message: authMessage } = useSelector(authStateSelector);

  const onFinish = (values: { email: string; phoneNumber: string; fullname: string; username: string; password: string; confirmPassword: string }) => {
    const registerData : RegisterParams = {
      email: values.email,
      phoneNumber: values.phoneNumber,
      fullname: values.fullname,
      username: values.username,
      password: values.password,
      retypePassword: values.confirmPassword
    };
    
    dispatch(register(registerData));
  };

  useEffect(() => {
    if (isError) {
      message.error(authMessage);
      dispatch(resetAuthState());
    }
    
    if (isSuccess) {
      message.success(authMessage || 'Đăng ký thành công!');
      dispatch(resetAuthState());
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1000);
    }
  }, [isError, isSuccess, authMessage, dispatch, navigate]);

  const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

  return (
    <div className="md:h-[70vh] my-20">
      <div className="max-w-md mx-auto p-6 ">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email', type: 'email' },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                pattern: phoneRegex,
                message: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ'
              }
            ]}
          >
            <Input placeholder="Số điện thoại" size="large" />
          </Form.Item>

          <Form.Item
            name="fullname"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input placeholder="Họ và tên" size="large" />
          </Form.Item>

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

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu xác nhận không khớp')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

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
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Link
            to={ROUTES.LOGIN}
            className="text-[#291D4C] flex items-center justify-center gap-1 text-sm"
          >
            <span>← Quay lại đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;