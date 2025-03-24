import clsx from 'clsx';
import React, { ReactNode } from 'react';

export interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string | ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  hoverEffect?: 'translate' | 'scale' | 'shadow' | 'none';
  className?: string;
  textColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  iconBgColor = 'bg-[#291D4C]',
  iconColor = 'text-white',
  hoverEffect = 'translate',
  className = '',
  textColor = '[#291D4C]',
}) => {
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'translate':
        return 'hover:-translate-y-2';
      case 'scale':
        return 'hover:scale-105';
      case 'shadow':
        return 'hover:shadow-xl';
      case 'none':
        return '';
      default:
        return 'hover:-translate-y-2';
    }
  };

  return (
    <div
      className={clsx(
        `rounded-lg bg-white p-6 text-center shadow-md transition-all ${getHoverEffectClass()}`,
        className
      )}
    >
      <div
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconBgColor} ${iconColor}`}
      >
        {icon}
      </div>
      <h3 className={`mb-2 text-xl font-bold text-${textColor}`}>{title}</h3>
      {typeof description === 'string' ? (
        <p className={textColor ? `text-${textColor}` : 'text-gray-700'}>
          {description}
        </p>
      ) : (
        description
      )}
    </div>
  );
};

export default InfoCard;
