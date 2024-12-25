/*
  # Add sample options data

  1. Sample Data
    - Add sample options metadata for different strikes
    - Add minute data for price history
    - Add tick data for detailed price movements

  2. Data Structure
    - Options: 5 different strike prices for testing
    - Minute data: Last 7 days of price history
    - Tick data: Last 24 hours of detailed trades
*/

-- Insert sample options metadata
INSERT INTO options_metadata (ticker, strike, expiry, type, spot_price)
VALUES
  ('AAPL240419C150', 150, '2024-04-19', 'call', 175.50),
  ('AAPL240419C160', 160, '2024-04-19', 'call', 175.50),
  ('AAPL240419C170', 170, '2024-04-19', 'call', 175.50),
  ('AAPL240419C180', 180, '2024-04-19', 'call', 175.50),
  ('AAPL240419C190', 190, '2024-04-19', 'call', 175.50);

-- Insert sample minute data (last 7 days)
INSERT INTO minute_data (ticker, timestamp, open, high, low, close, volume)
SELECT
  'AAPL240419C170' as ticker,
  ts as timestamp,
  175.50 + (random() * 2 - 1) as open,
  175.50 + (random() * 3) as high,
  175.50 - (random() * 3) as low,
  175.50 + (random() * 2 - 1) as close,
  floor(random() * 1000 + 100)::integer as volume
FROM generate_series(
  NOW() - INTERVAL '7 days',
  NOW(),
  INTERVAL '1 minute'
) as ts;

-- Insert sample tick data (last 24 hours)
WITH numbered_series AS (
  SELECT 
    generate_series(1, 1000) as n,
    NOW() - (INTERVAL '1 second' * generate_series(1, 1000)) as ts
)
INSERT INTO tick_data (ticker, trade_id, timestamp, price, volume)
SELECT
  'AAPL240419C170' as ticker,
  'T' || LPAD(n::text, 6, '0') as trade_id,
  ts as timestamp,
  175.50 + (random() * 2 - 1) as price,
  floor(random() * 100 + 10)::integer as volume
FROM numbered_series;