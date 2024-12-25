/*
  # Add normalization function

  1. New Functions
    - `normalize_price`: Utility function to normalize price data between 0 and 1
*/

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