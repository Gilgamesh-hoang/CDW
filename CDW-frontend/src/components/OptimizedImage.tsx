import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  sizes?: string;
  widths?: number[];
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '',
  sizes = '100vw',
  widths = [400, 800, 1200, 1600],
  ...props
}) => {
  const hostname = window.location.origin;

  const srcWithHost = src.startsWith('http') ? src : `${hostname}${src}`;

  const srcSet = widths
    .map(width => {
      const wsrvUrl = `https://wsrv.nl/?url=${encodeURIComponent(srcWithHost)}&w=${width}&output=webp`;
      return `${wsrvUrl} ${width}w`;
    })
    .join(', ');

  // Fallback URL
  const defaultSrc = `https://wsrv.nl/?url=${encodeURIComponent(srcWithHost)}&w=${widths[1]}&output=webp`;

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

export default OptimizedImage;
