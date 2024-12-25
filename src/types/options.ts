export interface OptionsData {
  id: string;
  ticker: string;
  strike: number;
  expiry: string;
  type: 'call' | 'put';
  spot_price: number;
  created_at: string;
}

export interface MinuteData {
  id: string;
  ticker: string;
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  normalized: boolean;
}

export interface TickData {
  id: string;
  ticker: string;
  trade_id: string;
  timestamp: string;
  price: number;
  volume: number;
  normalized: boolean;
}