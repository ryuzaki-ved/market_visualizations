import React from 'react';
import { BarChart, PieChart, Network } from 'lucide-react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <div className="flex gap-8 items-center">
        <div className="relative w-12 h-12">
          <BarChart className="w-12 h-12 text-blue-500 absolute inset-0" />
          <svg className="w-12 h-12 absolute inset-0 animate-bars-sequence">
            <rect x="2" y="6" width="4" height="12" className="fill-blue-500" />
            <rect x="8" y="2" width="4" height="16" className="fill-blue-500" />
            <rect x="14" y="8" width="4" height="10" className="fill-blue-500" />
          </svg>
        </div>
        
        <div className="relative w-12 h-12">
          <PieChart className="w-12 h-12 text-purple-500 absolute inset-0" />
          <svg className="w-12 h-12 absolute inset-0 animate-pie-sections" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" className="fill-purple-500" />
          </svg>
        </div>
        
        <div className="relative w-12 h-12">
          <Network className="w-12 h-12 text-green-500 animate-pulse-network" />
        </div>
      </div>
    </div>
  );
};