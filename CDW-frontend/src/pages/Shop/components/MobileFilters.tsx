import React from 'react';
import ShopSidebar from './ShopSidebar';
import { FaTimes } from 'react-icons/fa';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transform overflow-auto bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-md transform bg-white p-6 shadow-xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ShopSidebar onClose={onClose} isMobile={true} />
      </div>
    </div>
  );
};

export default MobileFilters;
