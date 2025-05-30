import React from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';
import { RegisterParams } from '@/features/auth/authService';
import AuthService from '@/features/auth/authService';
import { toastSuccess, toastError } from '@/utils/showToast';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    email: string;
    fullName: string;
    userName: string;
    password: string;
    confirmPassword: string;
  }) => {
    const registerData: RegisterParams = {
      email: values.email,
      fullName: values.fullName,
      userName: values.userName,
      password: values.password,
      retypePassword: values.confirmPassword,
    };

    setIsLoading(true);
    try {
      const response = await AuthService.register(registerData);
      toastSuccess('Đăng ký thành công! Vui lòng đăng nhập.', 2000);
      navigate(ROUTES.LOGIN.url);
    } catch (error: any) {
      toastError(error.message || 'Đăng ký thất bại. Vui lòng thử lại.', 2000);
    } finally {
      setIsLoading(false);
    }
  };

  // Username validation regex: letters, numbers, dots, underscores, and hyphens, 3-50 chars
  const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;

  // Password validation regex: at least one digit, lowercase, uppercase, special char, no whitespace, min 8 chars
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;

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
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên' },
              { max: 100, message: 'Họ và tên không được vượt quá 100 ký tự' },
            ]}
          >
            <Input placeholder="Họ và tên" size="large" />
          </Form.Item>

          <Form.Item
            name="userName"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập' },
              {
                min: 3,
                max: 50,
                message: 'Tên đăng nhập phải từ 3 đến 50 ký tự',
              },
              {
                pattern: usernameRegex,
                message:
                  'Tên đăng nhập chỉ được chứa chữ cái, số, dấu chấm, gạch dưới và gạch ngang',
              },
            ]}
          >
            <Input placeholder="Tên đăng nhập" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
              {
                pattern: passwordRegex,
                message:
                  'Mật khẩu phải chứa ít nhất một chữ số, một chữ thường, một chữ hoa, một ký tự đặc biệt và không có khoảng trắng',
              },
            ]}
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
            to={ROUTES.LOGIN.url}
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
