import React from 'react';

interface FullWidthImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * FullWidthImage component that breaks out of container constraints
 * and spans the full width of the viewport
 */
export function FullWidthImage({
  src,
  alt,
  className = '',
}: FullWidthImageProps) {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="max-w-[120%] mx-auto">
        <img src={src} alt={alt} className={`w-full ${className} -mt-1`} />
      </div>
    </div>
  );
}
