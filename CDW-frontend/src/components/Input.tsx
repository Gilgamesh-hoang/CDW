import React from 'react';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import clsx from 'clsx';

interface InputProps extends Omit<AntdInputProps, 'size'> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <AntdInput
    {...props}
    className={clsx(
      'border-[#D9D8FF] placeholder-[#D9D8FF] hover:border-[#291D4C] focus:border-[#291D4C] focus:outline-none focus:ring-0 px-3 py-2 rounded-md transition-all',
      className
    )}
  />
);

export default Input;
