import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export const Header: React.FC = () => {
  return (
    <header className="relative">
      <div className="px-6 md:px-8 py-4 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 
                    dark:from-blue-400 dark:to-purple-400">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-800 
                      animate-shimmer" />
      </div>
    </header>
  );
};