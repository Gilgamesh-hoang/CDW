import React, { ReactNode, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import clsx from 'clsx';

interface FilterGroupProps {
  title: string;
  children: ReactNode;
  initialExpanded?: boolean;
  className?: string;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  children,
  initialExpanded = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div className={clsx('border-b border-gray-200 pb-4', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-2 flex w-full items-center justify-between py-2 font-medium text-[#291D4C]"
      >
        <span>{title}</span>
        {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </button>
      <div
        className={clsx('transition-all duration-300 ease-in-out', {
          'max-h-96 opacity-100': isExpanded,
          'max-h-0 overflow-hidden opacity-0': !isExpanded,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterGroup;
