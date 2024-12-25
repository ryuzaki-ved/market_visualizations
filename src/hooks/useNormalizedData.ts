import { useMemo } from 'react';
import { MinuteData, TickData } from '../types/options';
import { normalizeDataSeries, NormalizationOptions } from '../utils/normalization';

export function useNormalizedData(
  data: (MinuteData | TickData)[],
  options?: NormalizationOptions
) {
  return useMemo(() => {
    if (!data.length) return [];
    return normalizeDataSeries(data, options);
  }, [data, options?.method, options?.customRange?.min, options?.customRange?.max]);
}