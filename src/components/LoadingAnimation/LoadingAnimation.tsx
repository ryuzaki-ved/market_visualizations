import React from 'react';
import { BarChart, PieChart, Network } from 'lucide-react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <div className="flex gap-8 items-center">
        <BarChart className="w-12 h-12 text-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <PieChart className="w-12 h-12 text-purple-500 animate-bounce" style={{ animationDelay: '200ms' }} />
        <Network className="w-12 h-12 text-green-500 animate-bounce" style={{ animationDelay: '400ms' }} />
      </div>
    </div>
  );
};