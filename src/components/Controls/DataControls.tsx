import React from 'react';
import { useOptionsStore } from '../../store/optionsStore';

export const DataControls: React.FC = () => {
  const {
    mode,
    dataType,
    chartType,
    normalized,
    showSpotPrice,
    setMode,
    setDataType,
    setChartType,
    toggleNormalization,
    toggleSpotPrice,
  } = useOptionsStore();

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
      <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4">
        <button
          onClick={() => setMode('realtime')}
          className={`px-3 py-2 md:px-4 text-sm md:text-base rounded transition-colors ${
            mode === 'realtime' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
          }`}
        >
          Real-time
        </button>
        <button
          onClick={() => setMode('historical')}
          className={`px-3 py-2 md:px-4 text-sm md:text-base rounded transition-colors ${
            mode === 'historical' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
          }`}
        >
          Historical
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value as 'minute' | 'tick')}
          className="px-3 py-2 border rounded text-sm md:text-base 
                   bg-white dark:bg-gray-700 
                   text-gray-800 dark:text-gray-200
                   border-gray-300 dark:border-gray-600
                   hover:border-blue-500 dark:hover:border-blue-400
                   focus:border-blue-500 dark:focus:border-blue-400
                   focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                   outline-none transition-colors duration-200"
        >
          <option value="minute">Minute Data</option>
          <option value="tick">Tick Data</option>
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'line' | 'bar' | 'candlestick' | 'histogram')}
          className="px-3 py-2 border rounded text-sm md:text-base 
                   bg-white dark:bg-gray-700 
                   text-gray-800 dark:text-gray-200
                   border-gray-300 dark:border-gray-600
                   hover:border-blue-500 dark:hover:border-blue-400
                   focus:border-blue-500 dark:focus:border-blue-400
                   focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                   outline-none transition-colors duration-200"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="candlestick">Candlestick</option>
          <option value="histogram">Histogram</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm md:text-base text-gray-800 dark:text-gray-200">
          <input
            type="checkbox"
            checked={normalized}
            onChange={toggleNormalization}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600
                     text-blue-500 dark:text-blue-400
                     focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          Normalize Data
        </label>

        <label className="flex items-center gap-2 text-sm md:text-base text-gray-800 dark:text-gray-200">
          <input
            type="checkbox"
            checked={showSpotPrice}
            onChange={toggleSpotPrice}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600
                     text-blue-500 dark:text-blue-400
                     focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          Show Spot Price
        </label>
      </div>
    </div>
  );
};