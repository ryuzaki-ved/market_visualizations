import { create } from 'zustand';
import { OptionsData, MinuteData, TickData } from '../types/options';
import { NormalizationOptions } from '../utils/normalization';

interface DateRange {
  from: string;
  to: string;
}

interface OptionsStore {
  selectedStrikes: number[];
  showSpotPrice: boolean;
  normalized: boolean;
  normalizationOptions: NormalizationOptions;
  mode: 'realtime' | 'historical';
  dataType: 'minute' | 'tick';
  chartType: 'line' | 'bar' | 'candlestick' | 'histogram';
  data: (MinuteData | TickData)[];
  dateRange: DateRange;
  setSelectedStrikes: (strikes: number[]) => void;
  toggleSpotPrice: () => void;
  toggleNormalization: () => void;
  setNormalizationOptions: (options: NormalizationOptions) => void;
  setMode: (mode: 'realtime' | 'historical') => void;
  setDataType: (type: 'minute' | 'tick') => void;
  setChartType: (type: 'line' | 'bar' | 'candlestick' | 'histogram') => void;
  setData: (data: (MinuteData | TickData)[]) => void;
  setDateRange: (dateRange: DateRange) => void;
}

// Helper to get default date range (last 7 days)
const getDefaultDateRange = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);
  
  return {
    from: from.toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:mm
    to: to.toISOString().slice(0, 16),
  };
};

export const useOptionsStore = create<OptionsStore>((set) => ({
  selectedStrikes: [],
  showSpotPrice: false,
  normalized: false,
  normalizationOptions: {
    method: 'minmax',
  },
  mode: 'historical',
  dataType: 'minute',
  chartType: 'line',
  data: [],
  dateRange: getDefaultDateRange(),
  setSelectedStrikes: (strikes) => set({ selectedStrikes: strikes }),
  toggleSpotPrice: () => set((state) => ({ showSpotPrice: !state.showSpotPrice })),
  toggleNormalization: () => set((state) => ({ normalized: !state.normalized })),
  setNormalizationOptions: (options) => set({ normalizationOptions: options }),
  setMode: (mode) => set({ mode }),
  setDataType: (dataType) => set({ dataType }),
  setChartType: (chartType) => set({ chartType }),
  setData: (data) => set({ data }),
  setDateRange: (dateRange) => set({ dateRange }),
}));