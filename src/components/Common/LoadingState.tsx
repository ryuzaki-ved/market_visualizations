import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading data...' }) => {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 dark:bg-blue-600 rounded-full animate-pulse-slow opacity-30" />
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400 relative z-10" />
      </div>
      <p className="animate-slide-up">{message}</p>
    </div>
  );
};