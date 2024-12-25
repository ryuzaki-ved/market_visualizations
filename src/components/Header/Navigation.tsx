import React from 'react';
import { NavItem } from './NavItem';

export const Navigation: React.FC = () => {
  const navItems = [
    { 
      label: 'Participant wise Position Mapping',
      abbreviation: 'PPM',
      href: '#' 
    },
    { 
      label: 'Options Chain',
      abbreviation: 'Options Chain',
      href: '#' 
    },
    { 
      label: 'More Options',
      abbreviation: 'More',
      href: '#' 
    },
  ];

  return (
    <nav className="mr-16"> {/* Added margin to prevent overlap with theme toggle */}
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};