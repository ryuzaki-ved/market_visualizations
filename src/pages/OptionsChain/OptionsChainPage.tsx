import React from 'react';
import { OptionsChainTable } from './components/OptionsChainTable';
import { OptionsChainFilters } from './components/OptionsChainFilters';
import { OptionsChainCharts } from './components/OptionsChainCharts';
import { useOptionsChainStore } from '../../store/optionsChainStore';

export const OptionsChainPage: React.FC = () => {
  const { selectedStrikes } = useOptionsChainStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-8 md:px-12 py-8 max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Options Chain
        </h1>
        
        <div className="space-y-6">
          <OptionsChainFilters />
          <OptionsChainTable />
          {selectedStrikes.length > 0 && <OptionsChainCharts />}
        </div>
      </div>
    </div>
  );
};