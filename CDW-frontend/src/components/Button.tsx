import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
interface ButtonProps {
  id?: string;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  outline?: boolean;
  children?: React.ReactNode;
  danger?: boolean;
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  bgGray?: boolean;
  linkTag? : boolean;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  secondary,
  outline,
  children,
  danger,
  className,
  href,
  icon,
  bgGray,
  linkTag,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={href ? (linkTag ? () => window.open(href, '_blank') : () => navigate(href)) : onClick}
      disabled={disabled}
      className={clsx(
        `
        flex
        justify-center
        items-center
        rounded-md
        font-bold
        text-[14px]
        hover:cursor-pointer
        gap-3
        `,
        disabled && 'opacity-70 cursor-default',
        secondary && 'text-[#291d4c] bg-[#d9d8ff]',
        danger && 'bg-rose-600 hover:bg-rose-500',
        outline &&
          'bg-transparent hover:bg-white hover:text-[#291d4c] border border-white text-white',
        !secondary && !danger && !outline && 'bg-[#291d4c]',
        bgGray && 'bg-[#0000000d]',
        className
      )}
    >
      {children}
      {icon}
    </button>
  );
};

export default Button;
