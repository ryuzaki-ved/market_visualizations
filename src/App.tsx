import React, { useState, useEffect } from 'react';
import { ChartContainer } from './components/Chart/ChartContainer';
import { DataControls } from './components/Controls/DataControls';
import { StrikeSelector } from './components/Controls/StrikeSelector';
import { DateRangeFilter } from './components/Controls/DateRangeFilter';
import { ThemeToggle } from './components/Theme/ThemeToggle';
import { Header } from './components/Header/Header';
import { LoadingAnimation } from './components/LoadingAnimation/LoadingAnimation';
import { useOptionsData } from './hooks/useOptionsData';
import { useThemeEffect } from './hooks/useThemeEffect';

const DEMO_STRIKES = [100, 105, 110, 115, 120];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useOptionsData();
  useThemeEffect();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <ThemeToggle />
      <div className="container mx-auto px-8 md:px-12 py-8 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Options Data Visualization
        </h1>
        
        <div className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:gap-6">
            <DataControls />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StrikeSelector strikes={DEMO_STRIKES} />
              <DateRangeFilter />
            </div>
          </div>
          <ChartContainer />
        </div>
      </div>
    </div>
  );
}

export default App;