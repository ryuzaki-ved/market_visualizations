/*
  # Options Chain Tables

  1. New Tables
    - options_chain: Stores options chain data for different indices
      - id (uuid, primary key)
      - index (text): Index name (NIFTY, BANKNIFTY)
      - expiry (timestamp): Option expiry date
      - strike (numeric): Strike price
      - type (text): Option type (call/put)
      - ltp (numeric): Last traded price
      - iv (numeric): Implied volatility
      - volume (integer): Trading volume
      - oi (integer): Open interest
      - coi (integer): Change in open interest
      - value (numeric): Option value
      - delta_volume (numeric): Delta volume
      - score (numeric): Option score
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Add policy for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS options_chain (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  index text NOT NULL,
  expiry timestamp with time zone NOT NULL,
  strike numeric NOT NULL,
  type text CHECK (type IN ('call', 'put')) NOT NULL,
  ltp numeric NOT NULL,
  iv numeric NOT NULL,
  volume integer NOT NULL,
  oi integer NOT NULL,
  coi integer NOT NULL,
  value numeric NOT NULL,
  delta_volume numeric NOT NULL,
  score numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE options_chain ENABLE ROW LEVEL SECURITY;

-- Create policy for read access
CREATE POLICY "Allow read access to options chain"
  ON options_chain
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_options_chain_index ON options_chain(index);
CREATE INDEX IF NOT EXISTS idx_options_chain_expiry ON options_chain(expiry);
CREATE INDEX IF NOT EXISTS idx_options_chain_strike ON options_chain(strike);