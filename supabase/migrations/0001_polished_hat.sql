/*
  # Create Options Data Tables

  1. New Tables
    - `options_metadata`
      - Stores metadata about options including ticker, strike, expiry, etc.
    - `minute_data`
      - Stores minute-level price and volume data
    - `tick_data`
      - Stores individual trade data
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create options_metadata table
CREATE TABLE IF NOT EXISTS options_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  strike numeric NOT NULL,
  expiry timestamp with time zone NOT NULL,
  type text CHECK (type IN ('call', 'put')) NOT NULL,
  spot_price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create minute_data table
CREATE TABLE IF NOT EXISTS minute_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  timestamp timestamp with time zone NOT NULL,
  open numeric NOT NULL,
  high numeric NOT NULL,
  low numeric NOT NULL,
  close numeric NOT NULL,
  volume integer NOT NULL,
  normalized boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create tick_data table
CREATE TABLE IF NOT EXISTS tick_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  trade_id text NOT NULL,
  timestamp timestamp with time zone NOT NULL,
  price numeric NOT NULL,
  volume integer NOT NULL,
  normalized boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE options_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE minute_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE tick_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to options_metadata"
  ON options_metadata
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to minute_data"
  ON minute_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to tick_data"
  ON tick_data
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_options_metadata_ticker ON options_metadata(ticker);
CREATE INDEX IF NOT EXISTS idx_minute_data_ticker_timestamp ON minute_data(ticker, timestamp);
CREATE INDEX IF NOT EXISTS idx_tick_data_ticker_timestamp ON tick_data(ticker, timestamp);

-- Add normalization function
CREATE OR REPLACE FUNCTION normalize_price(
  price numeric,
  min_price numeric,
  max_price numeric
) RETURNS numeric AS $$
BEGIN
  RETURN CASE
    WHEN max_price = min_price THEN 0
    ELSE (price - min_price) / (max_price - min_price)
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;