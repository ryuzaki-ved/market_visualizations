import React from 'react';
import { Table } from 'lucide-react';

interface DataGridProps {
  data: any[][] | null;
  loading: boolean;
}

export const DataGrid: React.FC<DataGridProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <Table className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          Select a report type and date range to view data
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100
                             border-r last:border-r-0 border-gray-200 dark:border-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};