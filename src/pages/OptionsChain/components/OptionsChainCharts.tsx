import React from 'react';
import { useOptionsChainStore } from '../../../store/optionsChainStore';
import { Chart } from '../../../components/Chart/Chart';

export const OptionsChainCharts: React.FC = () => {
  const { selectedStrikes, optionsData } = useOptionsChainStore();

  // Transform data for selected strikes
  const chartData = React.useMemo(() => {
    return selectedStrikes.map(strikeId => {
      const [strike, type] = strikeId.split('-');
      const data = optionsData.find(d => d.strike === Number(strike));
      if (!data) return null;
      
      return {
        id: strikeId,
        data: type === 'C' ? data.call : data.put,
        strike: Number(strike),
        type
      };
    }).filter(Boolean);
  }, [selectedStrikes, optionsData]);

  if (!chartData.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Selected Options Charts
      </h3>
      <div className="space-y-4">
        {chartData.map(item => (
          <div key={item!.id} className="border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">
              Strike {item!.strike} ({item!.type === 'C' ? 'Call' : 'Put'})
            </h4>
            <Chart data={[item!.data]} />
          </div>
        ))}
      </div>
    </div>
  );
};