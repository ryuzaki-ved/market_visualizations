import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export const useThemeEffect = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
};