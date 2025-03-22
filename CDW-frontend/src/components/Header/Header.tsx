import React, { useState } from 'react';
import logo from '@/assets/logo.webp';
import logoMd from '@/assets/logo-md.webp';
import Button from '../Button';
import { FaArrowRight } from 'react-icons/fa6';
import { RiMenu2Line } from 'react-icons/ri';
import MobileSideMenu from './components/MobileSideMenu';
import NavItem, { NavItemInterface } from './components/NavItem';
import { ROUTES } from '@/utils/constant';
import { Link } from 'react-router-dom';
import OptimizedImage from '../OptimizedImage';

const listNavItems: NavItemInterface[] = [
  {
    label: 'CTV',
    href: ROUTES.HOME,
    dropDown: true,
    items: [
      { label: 'Đăng ký CTV', href: '#' },
      { label: 'Quyền lợi CTV', href: '#' },
      { label: 'Hướng dẫn', href: '#' },
    ],
  },
  {
    label: 'Đại Lý',
    href: ROUTES.ROLLOVER,
    dropDown: true,
    items: [
      { label: 'Đăng ký Đại Lý', href: '#' },
      { label: 'Quyền lợi Đại Lý', href: '#' },
      { label: 'Thông tin thêm', href: '#' },
    ],
  },
  {
    label: 'Tăng Thu Nhập',
    href: ROUTES.INCOME,
    dropDown: true,
    items: [
      { label: 'Hướng dẫn', href: '#' },
      { label: 'Chiến lược', href: '#' },
    ],
  },
  {
    label: 'Công Việc',
    href: ROUTES.JOBS,
    dropDown: true,
    items: [
      { label: 'Tìm việc', href: '#' },
      { label: 'Đăng việc', href: '#' },
    ],
  },
  {
    label: 'Về Chúng Tôi',
    href: ROUTES.ABOUT_US,
    dropDown: true,
    items: [
      { label: 'Giới thiệu', href: '#' },
      { label: 'Lịch sử', href: '#' },
      { label: 'Tầm nhìn', href: '#' },
    ],
  },
  {
    label: 'Đối Tác',
    href: '#',
    dropDown: true,
    items: [
      { label: 'Danh sách đối tác', href: '#' },
      { label: 'Trở thành đối tác', href: '#' },
    ],
  },
  {
    label: 'Hỗ Trợ',
    href: ROUTES.SUPPORT,
    dropDown: true,
    items: [
      { label: 'FAQ', href: '#' },
      { label: 'Liên hệ', href: '#' },
      { label: 'Trung tâm hỗ trợ', href: '#' },
    ],
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="h-[72px] grid place-items-center bg-white text-[#584f78] border-b-[1px] border-b-[#584f78]">
      <div className="lg:container h-full w-full px-5 lg:px-0 flex justify-between items-center">
        <Link to={ROUTES.HOME}>
          <OptimizedImage
            sizes="(max-width: 1024px) 211px, (min-width: 1280px) 211px"
            src={logo}
            className="h-[26px] w-[105px] block lg:hidden xl:block"
            alt="Logo"
            loading='lazy'
          />
          <OptimizedImage
            sizes="100px"
            src={logoMd}
            className="h-[50px] xl:hidden lg:block hidden"
            alt="Logo"
            loading='lazy'
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="lg:flex h-full hidden list-none gap-4">
          {listNavItems.map((item, index) => (
            <NavItem
              key={index}
              href={item.href}
              dropDown={item.dropDown}
              items={item.items}
            >
              {item.label}
            </NavItem>
          ))}
        </ul>

        <Button
          secondary
          className="p-2 ps-3 items-center justify-center lg:flex hidden"
          icon={
            <div className="bg-[#291d4c] text-white rounded-md w-8 h-8 grid place-items-center">
              <FaArrowRight />
            </div>
          }
          href={ROUTES.LOGIN}
        >
          Sign in
        </Button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden block hover:cursor-pointer"
          aria-label="Open menu"
        >
          <RiMenu2Line fontSize={24} className="text-[#291d4c]" />
        </button>

        {/* Mobile Side Menu */}
        <MobileSideMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={listNavItems}
        />
      </div>
    </header>
  );
};

export default Header;
