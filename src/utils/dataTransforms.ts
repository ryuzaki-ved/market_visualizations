import { MinuteData, TickData } from '../types/options';

export function normalizeData(data: (MinuteData | TickData)[]): (MinuteData | TickData)[] {
  if (!data.length) return [];

  const prices = data.map(d => 'price' in d ? d.price : d.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return data.map(item => ({
    ...item,
    ...'price' in item
      ? { price: normalizeValue(item.price, min, max) }
      : {
          open: normalizeValue(item.open, min, max),
          high: normalizeValue(item.high, min, max),
          low: normalizeValue(item.low, min, max),
          close: normalizeValue(item.close, min, max),
        },
    normalized: true,
  }));
}

function normalizeValue(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}