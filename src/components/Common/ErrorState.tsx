import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  details?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, details }) => {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-3">
      <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
      <div className="text-center">
        <p className="font-medium text-red-500 dark:text-red-400">{message}</p>
        {details && <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{details}</p>}
      </div>
    </div>
  );
};