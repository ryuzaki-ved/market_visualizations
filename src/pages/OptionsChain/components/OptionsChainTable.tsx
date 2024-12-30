import React from 'react';
import { useOptionsChainStore } from '../../../store/optionsChainStore';
import { OptionsTableRow } from './OptionsTableRow';

export const OptionsChainTable: React.FC = () => {
  const { optionsData } = useOptionsChainStore();

  const callColumns = [
    'Score',
    'Delta Volume',
    'Value',
    'COI',
    'OI',
    'Vol',
    'IV',
    'LTP'
  ];

  const putColumns = [
    'LTP',
    'IV',
    'Vol',
    'OI',
    'COI',
    'Value',
    'Delta Volume',
    'Score'
  ];

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th colSpan={9} className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider text-center bg-blue-50 dark:bg-blue-900/20">
              CALLS
            </th>
            <th className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center bg-gray-50 dark:bg-gray-900">
              STRIKE
            </th>
            <th colSpan={9} className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wider text-center bg-red-50 dark:bg-red-900/20">
              PUTS
            </th>
          </tr>
          <tr>
            {/* Calls columns */}
            {callColumns.map((col) => (
              <th key={`call-${col}`} className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                {col}
              </th>
            ))}
            <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
              Select
            </th>
            
            {/* Strike column */}
            <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center bg-gray-50 dark:bg-gray-900">
              Strike
            </th>
            
            {/* Select column */}
            <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
              Select
            </th>
            
            {/* Puts columns */}
            {putColumns.map((col) => (
              <th key={`put-${col}`} className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {optionsData.map((row) => (
            <OptionsTableRow key={row.strike} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};