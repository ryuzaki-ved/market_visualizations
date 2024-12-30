import React from 'react';
import { BarChart3, LineChart, CandlestickChart, BarChart, Footprints, Info } from 'lucide-react';
import { useOptionsStore } from '../../store/optionsStore';
import { Tooltip } from '../Common/Tooltip';

export const ChartHeader: React.FC = () => {
  const { chartType, setChartType } = useOptionsStore();

  const chartTypes = [
    { type: 'line', icon: LineChart, tooltip: 'Line Chart' },
    { type: 'bar', icon: BarChart3, tooltip: 'Bar Chart' },
    { type: 'candlestick', icon: CandlestickChart, tooltip: 'Candlestick Chart' },
    { type: 'histogram', icon: BarChart, tooltip: 'Histogram' },
    { type: 'footprint', icon: Footprints, tooltip: 'Footprint Chart' },
  ] as const;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Chart Visualization</h2>
        <Tooltip content="Select different chart types to visualize the data">
          <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <div className="flex gap-2">
        {chartTypes.map(({ type, icon: Icon, tooltip }) => (
          <Tooltip key={type} content={tooltip}>
            <button
              onClick={() => setChartType(type)}
              className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                chartType === type 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon size={20} />
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};