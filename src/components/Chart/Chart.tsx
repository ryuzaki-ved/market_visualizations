import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useOptionsStore } from '../../store/optionsStore';

interface ChartProps {
  data: any[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { chartType, normalized } = useOptionsStore();

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    // Group data by ticker
    const dataByTicker = data.reduce((acc, item) => {
      if (!acc[item.ticker]) {
        acc[item.ticker] = [];
      }
      acc[item.ticker].push({
        time: new Date(item.timestamp).getTime() / 1000,
        value: 'price' in item ? item.price : item.close,
      });
      return acc;
    }, {});

    // Create a series for each ticker with a unique color
    const colors = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed'];
    Object.entries(dataByTicker).forEach(([ticker, tickerData], index) => {
      const series = chart.addLineSeries({
        color: colors[index % colors.length],
        lineWidth: 2,
        title: ticker,
      });
      series.setData(tickerData as any[]);
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, chartType, normalized]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};