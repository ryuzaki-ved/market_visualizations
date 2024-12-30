import React, { useState } from 'react';
import { DateRangePicker } from '../../components/PPM/DateRangePicker';
import { ReportSelector } from '../../components/PPM/ReportSelector';
import { DataGrid } from '../../components/PPM/DataGrid';
import { useNSEData } from '../../hooks/useNSEData';

export const PPMPage: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  
  const { data, loading, error } = useNSEData({
    reportId: selectedReport,
    startDate,
    endDate
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-8 md:px-12 py-8 max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Participant wise Position Mapping
        </h1>
        
        <div className="space-y-6">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          <ReportSelector
            selectedReport={selectedReport}
            onReportChange={setSelectedReport}
          />
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          
          <DataGrid data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};