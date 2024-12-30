import React, { useState, useEffect } from 'react';
import { ChartContainer } from './components/Chart/ChartContainer';
import { DataControls } from './components/Controls/DataControls';
import { StrikeSelector } from './components/Controls/StrikeSelector';
import { DateRangeFilter } from './components/Controls/DateRangeFilter';
import { ThemeToggle } from './components/Theme/ThemeToggle';
import { Header } from './components/Header/Header';
import { LoadingAnimation } from './components/LoadingAnimation/LoadingAnimation';
import { OptionsChainPage } from './pages/OptionsChain/OptionsChainPage';
import { PPMPage } from './pages/PPM/PPMPage';
import { useOptionsData } from './hooks/useOptionsData';
import { useThemeEffect } from './hooks/useThemeEffect';

const DEMO_STRIKES = [100, 105, 110, 115, 120];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'data-viz' | 'ppm' | 'options-chain'>('data-viz');
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

  const renderPage = () => {
    switch (currentPage) {
      case 'data-viz':
        return (
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
        );
      case 'ppm':
        return <PPMPage />;
      case 'options-chain':
        return <OptionsChainPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header onPageChange={setCurrentPage} currentPage={currentPage} />
      <ThemeToggle />
      {renderPage()}
    </div>
  );
}

export default App;