import Link from 'next/link';
import React from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
}

export const StyledButton: React.FC<StyledButtonProps> = ({ 
  children, 
  href, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  const combinedClasses = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};