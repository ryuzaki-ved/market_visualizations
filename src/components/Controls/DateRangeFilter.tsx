import React from 'react';
import { useOptionsStore } from '../../store/optionsStore';

export const DateRangeFilter: React.FC = () => {
  const { dateRange, setDateRange } = useOptionsStore();

  const handleDateChange = (field: 'from' | 'to', value: string) => {
    setDateRange({ ...dateRange, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-200">
      <h3 className="font-semibold mb-3 text-sm md:text-base text-gray-800 dark:text-gray-200">Date Range</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="fromDate" className="text-sm text-gray-600 dark:text-gray-400">From</label>
          <input
            type="datetime-local"
            id="fromDate"
            value={dateRange.from}
            onChange={(e) => handleDateChange('from', e.target.value)}
            className="px-3 py-2 border rounded text-sm
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-gray-200
                     border-gray-300 dark:border-gray-600
                     hover:border-blue-500 dark:hover:border-blue-400
                     focus:border-blue-500 dark:focus:border-blue-400
                     focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                     outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="toDate" className="text-sm text-gray-600 dark:text-gray-400">To</label>
          <input
            type="datetime-local"
            id="toDate"
            value={dateRange.to}
            onChange={(e) => handleDateChange('to', e.target.value)}
            className="px-3 py-2 border rounded text-sm
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-gray-200
                     border-gray-300 dark:border-gray-600
                     hover:border-blue-500 dark:hover:border-blue-400
                     focus:border-blue-500 dark:focus:border-blue-400
                     focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                     outline-none transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
};