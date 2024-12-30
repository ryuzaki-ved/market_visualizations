import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { NSE_REPORTS } from '../../constants/nseReports';
import type { NSEReport } from '../../types/nse';

interface ReportSelectorProps {
  selectedReport: string;
  onReportChange: (reportId: string) => void;
}

export const ReportSelector: React.FC<ReportSelectorProps> = ({
  selectedReport,
  onReportChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <FileSpreadsheet className="w-5 h-5" />
        Select Report Type
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {NSE_REPORTS.map((report: NSEReport) => (
          <label
            key={report.id}
            className="relative inline-flex items-center group cursor-pointer"
          >
            <input
              type="radio"
              name="report"
              value={report.id}
              checked={selectedReport === report.id}
              onChange={() => onReportChange(report.id)}
              className="sr-only peer"
            />
            <div className="p-3 rounded-lg border-2 transition-all duration-200
                          peer-checked:border-blue-500 peer-checked:bg-blue-50
                          dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20
                          border-gray-200 dark:border-gray-700
                          hover:border-blue-200 dark:hover:border-blue-800">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {report.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {report.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};