import React from 'react';
import { Zap } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Zap className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
        OptionsViz
      </span>
    </div>
  );
};