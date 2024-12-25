import React, { useState } from 'react';

interface NavItemProps {
  label: string;
  abbreviation: string;
  href: string;
}

export const NavItem: React.FC<NavItemProps> = ({ label, abbreviation, href }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <a
        href={href}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 
                 transition-colors duration-200 text-sm md:text-base"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {abbreviation}
      </a>
      
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap
                     bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-200 
                     text-xs px-2 py-1 rounded shadow-lg z-50
                     animate-fade-in">
          {label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                       border-4 border-transparent border-b-gray-800 dark:border-b-gray-700" />
        </div>
      )}
    </div>
  );
};