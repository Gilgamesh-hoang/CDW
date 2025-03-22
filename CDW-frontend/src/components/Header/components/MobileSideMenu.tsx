import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { NavItemInterface } from './NavItem';
import { Drawer } from 'antd';
import MobileMenuItem from './MobileMenuItem';
import Button from '@/components/Button';
import { FaArrowRight } from 'react-icons/fa6';
interface MobileSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItemInterface[];
}
const MobileSideMenu: React.FC<MobileSideMenuProps> = ({
  isOpen,
  onClose,
  navItems = [],
}) => {
  return (
    <Drawer
      placement="right"
      width={300}
      onClose={onClose}
      open={isOpen}
      closeIcon={<RiCloseLine className="text-2xl text-[#291d4c]" />}
      styles={{
        header: { borderBottom: '1px solid #e8e8e8' },
        body: { padding: 0 },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          {navItems.map((item, index) => (
            <MobileMenuItem
              key={index}
              href={item.href}
              dropDown={item.dropDown}
              items={item.items}
            >
              {item.label}
            </MobileMenuItem>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            secondary
            className="w-full p-2 ps-3 items-center justify-center flex"
            icon={
              <div className="bg-[#291d4c] text-white rounded-md w-8 h-8 grid place-items-center">
                <FaArrowRight />
              </div>
            }
            href="/sign-in"
          >
            Sign in
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileSideMenu;
