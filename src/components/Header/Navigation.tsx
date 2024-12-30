import React from 'react';
import { NavItem } from './NavItem';

interface NavigationProps {
  onPageChange: (page: 'data-viz' | 'ppm' | 'options-chain') => void;
  currentPage: 'data-viz' | 'ppm' | 'options-chain';
}

export const Navigation: React.FC<NavigationProps> = ({ onPageChange, currentPage }) => {
  const navItems = [
    { 
      label: 'Data Visualization',
      abbreviation: 'Data Viz',
      onClick: () => onPageChange('data-viz'),
      page: 'data-viz'
    },
    { 
      label: 'Participant wise Position Mapping',
      abbreviation: 'PPM',
      onClick: () => onPageChange('ppm'),
      page: 'ppm'
    },
    { 
      label: 'Options Chain',
      abbreviation: 'Options Chain',
      onClick: () => onPageChange('options-chain'),
      page: 'options-chain'
    },
    { 
      label: 'More Options',
      abbreviation: 'More',
      onClick: () => {},
      page: null
    },
  ];

  return (
    <nav className="mr-16">
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavItem 
              {...item} 
              isActive={item.page === currentPage}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}