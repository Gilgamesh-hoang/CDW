import React, { useState } from 'react';
import { NavItemInterface } from './NavItem';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
interface MobileMenuItemProps {
  children: React.ReactNode;
  href: string;
  dropDown?: boolean;
  items?: NavItemInterface[];
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  children,
  href,
  dropDown,
  items = [],
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className="border-b border-gray-200 hover:cursor-pointer"
      onClick={dropDown ? () => setExpanded(!expanded) : undefined}
    >
      <div className="flex justify-between items-center py-3 px-4">
        <a href={href} className="">
          <p className="text-[#291d4c] flex-grow font-semibold">{children}</p>
        </a>
        {dropDown && (
          <button
            className="p-2"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
          >
            {expanded ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        )}
      </div>

      {expanded && dropDown && (
        <div className="bg-[#f5f3f9] py-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block py-2 px-8 font-semibold hover:underline hover:bg-white transition-colors duration-150"
            >
              <p className="text-[#291d4c]">{item.label}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default MobileMenuItem;
