import clsx from 'clsx';
import React, { ReactNode } from 'react';

export interface InfoCardGridProps {
  title?: string;
  description?: string;
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  sectionClassName?: string;
}

const InfoCardGrid: React.FC<InfoCardGridProps> = ({
  title,
  description,
  children,
  columns = 4,
  className = '',
  sectionClassName = '',
}) => {
  const getColumnsClass = () => {
    switch (columns) {
      case 1:
        return 'md:grid-cols-1';
      case 2:
        return 'md:grid-cols-2';
      case 3:
        return 'md:grid-cols-3';
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className={clsx('py-16', sectionClassName)}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <>
                <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
                  {title}
                </h2>
                <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
              </>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-gray-700">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={clsx(`grid gap-8 ${getColumnsClass()}`, className)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCardGrid;
