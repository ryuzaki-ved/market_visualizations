import { NSEReport } from '../types/nse';

export const NSE_REPORTS: NSEReport[] = [
  { 
    id: '1', 
    name: 'FII Derivatives Statistics', 
    description: 'Foreign Institutional Investors derivatives statistics' 
  },
  { 
    id: '2', 
    name: 'Participant wise Open Interest', 
    description: 'Open interest data segregated by participant type' 
  },
  { 
    id: '3', 
    name: 'Participant wise Trading Volumes', 
    description: 'Trading volume data segregated by participant type' 
  },
  { 
    id: '4', 
    name: 'Daily Volatility', 
    description: 'Daily volatility statistics for derivatives' 
  },
  { 
    id: '5', 
    name: 'Category wise Turnover', 
    description: 'Turnover data categorized by participant type' 
  }
];