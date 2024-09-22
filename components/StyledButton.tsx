import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface StyledButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const StyledButton: React.FC<StyledButtonProps> = ({ href, children, className = '' }) => {
  return (
    <Link href={href}>
      <motion.button
        className={`px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.button>
    </Link>
  );
};