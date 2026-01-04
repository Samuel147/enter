import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className = '', ...props }: CardProps) {
  const hoverClass = hover ? 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300' : '';
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
