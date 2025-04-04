import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({children, className = ''}: ContainerProps) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 md:px-8 overflow-x-hidden ${className}`}
    >
      {children}
    </div>
  );
}
