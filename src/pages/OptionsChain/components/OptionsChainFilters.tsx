import React from 'react';
import { useOptionsChainStore } from '../../../store/optionsChainStore';

export const OptionsChainFilters: React.FC = () => {
  const { 
    indices, 
    expiries,
    selectedIndex,
    selectedExpiry,
    setSelectedIndex,
    setSelectedExpiry 
  } = useOptionsChainStore();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Index
          </label>
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Index</option>
            {indices.map((index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Expiry
          </label>
          <select
            value={selectedExpiry}
            onChange={(e) => setSelectedExpiry(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Expiry</option>
            {expiries.map((expiry) => (
              <option key={expiry} value={expiry}>
                {expiry}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};