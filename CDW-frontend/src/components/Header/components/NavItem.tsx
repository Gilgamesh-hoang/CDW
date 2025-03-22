import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import NavDropdown from './NavDropdown';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
export interface NavItemInterface {
  label: string;
  href: string;
  dropDown?: boolean;
  items?: NavItemInterface[];
}
interface NavItemProps {
  children: React.ReactNode;
  href: string;
  dropDown?: boolean;
  items?: NavItemInterface[];
}
const NavItem: React.FC<NavItemProps> = ({
  children,
  href,
  dropDown,
  items = [],
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <li
      className={clsx(
        'relative flex gap-2 justify-center items-center hover:text-[#590f85] border-b-2 border-b-transparent hover:border-b-[#590f85]',
        dropDown && 'cursor-pointer'
      )}
      onClick={dropDown ? () => setShowDropdown(!showDropdown) : undefined}
      onMouseEnter={dropDown ? () => setShowDropdown(true) : undefined}
      onMouseLeave={dropDown ? () => setShowDropdown(false) : undefined}
    >
      <Link
        to={href}
        className="hover:text-[#291d4c] transition-colors duration-200"
      >
        {children}
      </Link>
      {dropDown && (
        <div>
          <FaAngleDown
            className={`transition-transform duration-200 ease-in-out ${
              showDropdown ? 'rotate-180' : ''
            }`}
          />
          {showDropdown && <NavDropdown items={items} />}
        </div>
      )}
    </li>
  );
};
export default NavItem;
