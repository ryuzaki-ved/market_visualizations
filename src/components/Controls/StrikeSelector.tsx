import React from 'react';
import { useOptionsStore } from '../../store/optionsStore';

export const StrikeSelector: React.FC<{ strikes: number[] }> = ({ strikes }) => {
  const { selectedStrikes, setSelectedStrikes } = useOptionsStore();

  const handleStrikeChange = (strike: number) => {
    setSelectedStrikes(
      selectedStrikes.includes(strike)
        ? selectedStrikes.filter(s => s !== strike)
        : [...selectedStrikes, strike]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl">
      <h3 className="font-semibold mb-3 text-sm md:text-base text-gray-800 dark:text-gray-200">Select Strikes</h3>
      <div className="flex flex-wrap gap-3">
        {strikes.map((strike, index) => (
          <label
            key={strike}
            className="relative inline-flex items-center group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <input
              type="checkbox"
              checked={selectedStrikes.includes(strike)}
              onChange={() => handleStrikeChange(strike)}
              className="sr-only peer"
            />
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer select-none
                          bg-gray-100 dark:bg-gray-700
                          peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600
                          peer-checked:text-white dark:peer-checked:text-white
                          text-gray-800 dark:text-gray-200
                          transition-all duration-200 transform hover:scale-105
                          peer-checked:shadow-md">
              <span className="text-sm font-medium">{strike}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};