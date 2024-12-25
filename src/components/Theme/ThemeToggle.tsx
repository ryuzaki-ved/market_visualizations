import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                transition-all duration-500 hover:scale-110 hover:rotate-12
                shadow-lg hover:shadow-xl"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`w-6 h-6 text-yellow-500 transition-all duration-500 absolute 
                     ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
        />
        <Moon 
          className={`w-6 h-6 text-blue-300 transition-all duration-500 absolute 
                     ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'}`}
        />
      </div>
    </button>
  );
};