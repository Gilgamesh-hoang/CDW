import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import logo from '@/assets/logo.png';
import { ROUTES } from '../../utils/constant.ts';
import { BiCategory } from 'react-icons/bi';
import { RiDashboard2Line } from 'react-icons/ri';
import { AiOutlineFontSize } from 'react-icons/ai';
import { IoBagCheckOutline } from 'react-icons/io5';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <RiDashboard2Line className="size-6" />,
    name: ROUTES.ADMIN_DASHBOARD.name,
    path: ROUTES.ADMIN_DASHBOARD.url,
  },
  {
    icon: <BiCategory className="size-6" />,
    name: ROUTES.ADMIN_CATEGORY.name,
    path: ROUTES.ADMIN_CATEGORY.url,
  },
  {
    icon: <AiOutlineFontSize className="size-6" />,
    name: ROUTES.ADMIN_SIZE.name,
    path: ROUTES.ADMIN_SIZE.url,
  },
  {
    icon: <IoBagCheckOutline className="size-6" />,
    name: ROUTES.ADMIN_ORDER.name,
    path: ROUTES.ADMIN_ORDER.url,
  },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              to={nav.path}
              className={`relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-sm leading-5 group ${
                isActive(nav.path)
                  ? 'bg-[#ecf3ff] text-[#465fff]'
                  : 'text-gray-700 hover:bg-gray-100 group-hover:text-gray-700 '
              }`}
            >
              <span
                className={
                  isActive(nav.path)
                    ? 'text-[#465fff]'
                    : 'text-gray-500 group-hover:text-gray-700'
                }
              >
                {nav.icon}
              </span>
              <span className="">{nav.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px] -translate-x-full lg:translate-x-0`}
    >
      <div className={`py-4 flex justify-start`}>
        <Link to={ROUTES.HOME.url}>
          <img src={logo} className="w-[70px]" alt="Logo" loading="lazy" />
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 justify-start`}
              >
                Menu
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
