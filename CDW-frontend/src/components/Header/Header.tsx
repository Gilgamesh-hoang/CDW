import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import { RiMenu2Line } from 'react-icons/ri';
import MobileSideMenu from './components/MobileSideMenu';
import NavItem, { NavItemInterface } from './components/NavItem';
import { ROUTES } from '@/utils/constant';
import { Link, NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosCart } from 'react-icons/io';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

        {/*<div>*/}
        {/*  <Button*/}
        {/*    secondary*/}
        {/*    className="p-2 ps-3 items-center justify-center lg:flex hidden"*/}
        {/*    icon={*/}
        {/*      <div className="bg-[#291d4c] text-white rounded-md w-8 h-8 grid place-items-center">*/}
        {/*        <FaArrowRight />*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*    href={ROUTES.LOGIN}*/}
        {/*  >*/}
        {/*    Sign in*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className="flex items-center space-x-4 gap-4">
          {/* User Icon with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <FaRegUserCircle size={22} className="cursor-pointer hover:text-orange-500" />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Đăng nhập</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Đăng ký</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Đăng xuất</li>
                </ul>
              </div>
            )}
          </div>
          <NavLink to={ROUTES.CART}
            className="cursor-pointer hover:text-orange-500">
            <IoIosCart size={22} />
          </NavLink>
        </div>

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
