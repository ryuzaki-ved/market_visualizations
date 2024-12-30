import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

interface HeaderProps {
  onPageChange: (page: 'data-viz' | 'ppm' | 'options-chain') => void;
  currentPage: 'data-viz' | 'ppm' | 'options-chain';
}

export const Header: React.FC<HeaderProps> = ({ onPageChange, currentPage }) => {
  return (
    <header className="relative bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation onPageChange={onPageChange} currentPage={currentPage} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
                      dark:from-blue-400 dark:to-purple-400" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                      dark:via-gray-800 animate-shimmer" />
      </div>
    </header>
  );
};