/*
  # Add logo_url column to paystubs table

  1. Changes
    - Add `logo_url` column to `paystubs` table to store institution/company logo
    - Column is optional (nullable) and stores text (image URL or base64 data)
  
  2. Purpose
    - Allow users to upload custom logos for paystubs
    - Supports templates like Walter Reed P9Q that display institution logos
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'paystubs' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE paystubs ADD COLUMN logo_url TEXT;
  END IF;
END $$;
