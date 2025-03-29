import React from 'react';

interface HeroSectionSimpleProps {
  imageUrl: string;
  title: string;
  description?: string;
  heightStyle?: string;
}

const HeroSectionSimple: React.FC<HeroSectionSimpleProps> = ({
                                                               imageUrl,
                                                               title,
                                                               description,
                                                               heightStyle = 'h-[50vh]',
                                                             }) => {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-[#1e1a3a] to-[#291D4C] ` + heightStyle}>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover opacity-40"
          loading="eager"
        />
      </div>
      <div
        className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg md:text-xl">{description}</p>
        )}
      </div>
    </div>
  );
};

export default HeroSectionSimple;
