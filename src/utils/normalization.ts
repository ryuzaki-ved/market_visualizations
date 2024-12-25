import { MinuteData, TickData } from '../types/options';

export interface NormalizationOptions {
  method: 'minmax' | 'zscore';
  customRange?: {
    min: number;
    max: number;
  };
}

export function normalizeValue(
  value: number,
  min: number,
  max: number,
  options?: NormalizationOptions
): number {
  if (options?.method === 'zscore') {
    const mean = (max + min) / 2;
    const std = (max - min) / 4; // Approximate std dev for normal distribution
    return (value - mean) / std;
  }

  const normalized = (value - min) / (max - min);

  if (options?.customRange) {
    const { min: targetMin, max: targetMax } = options.customRange;
    return normalized * (targetMax - targetMin) + targetMin;
  }

  return normalized;
}

export function normalizeDataSeries(
  data: (MinuteData | TickData)[],
  options?: NormalizationOptions
): (MinuteData | TickData)[] {
  if (!data.length) return [];

  const prices = data.map(d => 'price' in d ? d.price : d.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return data.map(item => ({
    ...item,
    ...'price' in item
      ? { price: normalizeValue(item.price, min, max, options) }
      : {
          open: normalizeValue(item.open, min, max, options),
          high: normalizeValue(item.high, min, max, options),
          low: normalizeValue(item.low, min, max, options),
          close: normalizeValue(item.close, min, max, options),
        },
    normalized: true,
  }));
}