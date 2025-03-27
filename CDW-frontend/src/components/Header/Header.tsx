import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import Button from '../Button';
import { FaArrowRight } from 'react-icons/fa6';
import { RiMenu2Line } from 'react-icons/ri';
import MobileSideMenu from './components/MobileSideMenu';
import NavItem, { NavItemInterface } from './components/NavItem';
import { ROUTES } from '@/utils/constant';
import { Link } from 'react-router-dom';

const listNavItems: NavItemInterface[] = [
  {
    label: 'Trang chủ',
    href: ROUTES.HOME,
    dropDown: false,
  },
  {
    label: 'Cửa hàng',
    href: ROUTES.SHOP,
    dropDown: false,
  },
  {
    label: 'Về chúng tôi',
    href: ROUTES.ABOUT_US,
    dropDown: false,
  },
  // {
  //   label: 'Dịch vụ',
  //   href: ROUTES.SERVICE,
  //   dropDown: false,
  // },
  // {
  //   label: 'Tin tức',
  //   href: ROUTES.NEWS,
  //   dropDown: false,
  // },
  {
    label: 'Liên hệ',
    href: ROUTES.CONTACT,
    dropDown: false,
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="h-[72px] grid place-items-center bg-white text-[#584f78] border-b-[1px] border-b-[#584f78]">
      <div className="lg:container h-full w-full px-5 lg:px-0 flex justify-between items-center">
        <Link to={ROUTES.HOME}>
          <img src={logo} className="w-[70px]" alt="Logo" loading="lazy" />
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
