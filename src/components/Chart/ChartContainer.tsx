import React from 'react';
import { Chart } from './Chart';
import { ChartHeader } from './ChartHeader';
import { LoadingState } from '../Common/LoadingState';
import { ErrorState } from '../Common/ErrorState';
import { useOptionsStore } from '../../store/optionsStore';
import { useOptionsData } from '../../hooks/useOptionsData';

export const ChartContainer: React.FC = () => {
  const { data, selectedStrikes } = useOptionsStore();
  const { loading, error } = useOptionsData();

  const renderContent = () => {
    if (selectedStrikes.length === 0) {
      return (
        <div className="h-[400px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          Please select at least one strike price to view the chart
        </div>
      );
    }

    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} />;
    }

    if (data.length === 0) {
      return (
        <ErrorState 
          message="No data available" 
          details="Try adjusting your date range or strike price selection" 
        />
      );
    }

    return <Chart data={data} />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow w-full overflow-hidden transition-colors duration-200">
      <ChartHeader />
      {renderContent()}
    </div>
  );
};