import React, { useState } from 'react';

interface NavItemProps {
  label: string;
  abbreviation: string;
  onClick: () => void;
  isActive: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, abbreviation, onClick, isActive }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`text-sm md:text-base transition-colors duration-200 ${
          isActive 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
        }`}
      >
        {abbreviation}
      </button>
      
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 
                     bg-gray-800 dark:bg-gray-700 text-white px-3 py-1.5 
                     text-sm rounded-md shadow-lg z-50 whitespace-nowrap
                     animate-fade-in">
          {label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                       border-4 border-transparent border-b-gray-800 
                       dark:border-b-gray-700" />
        </div>
      )}
    </div>
  );
};