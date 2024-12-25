/*
  # Add test data for all strikes

  1. Changes
    - Add minute data for all strikes (100, 105, 110, 115, 120)
    - Date range: 2024-12-16 00:00:00 to 2024-12-23 12:59:59
    - Each strike has unique price movements
*/

-- Function to generate random price within a range
CREATE OR REPLACE FUNCTION random_price(base_price numeric, variation numeric)
RETURNS numeric AS $$
BEGIN
  RETURN base_price + (random() * variation * 2 - variation);
END;
$$ LANGUAGE plpgsql;

-- Insert test data for each strike
DO $$
DECLARE
  strike RECORD;
  ts timestamp;
  base_price numeric;
BEGIN
  FOR strike IN SELECT unnest(ARRAY[100, 105, 110, 115, 120]) AS price
  LOOP
    base_price := strike.price * 1.1; -- Set base price 10% above strike
    
    FOR ts IN 
      SELECT generate_series(
        '2024-12-16 00:00:00'::timestamp,
        '2024-12-23 12:59:59'::timestamp,
        '1 minute'::interval
      ) as time
    LOOP
      INSERT INTO minute_data (
        ticker,
        timestamp,
        open,
        high,
        low,
        close,
        volume
      ) VALUES (
        'DEMO' || strike.price::text,
        ts,
        random_price(base_price, base_price * 0.02),
        random_price(base_price * 1.01, base_price * 0.02),
        random_price(base_price * 0.99, base_price * 0.02),
        random_price(base_price, base_price * 0.02),
        floor(random() * 1000 + 100)::integer
      );
    END LOOP;
  END LOOP;
END $$;