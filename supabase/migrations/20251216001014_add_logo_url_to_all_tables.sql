/*
  # Add logo_url column to certificates, student_receipts, and military_service_records
  
  1. Changes
    - Add `logo_url` (text) column to `certificates` table for storing uploaded logo
    - Add `logo_url` (text) column to `student_receipts` table for storing uploaded logo
    - Add `logo_url` (text) column to `military_service_records` table for storing uploaded logo
    
  2. Notes
    - Logo URL stores base64 encoded image data or external URL
    - This field is optional (nullable)
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'certificates' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE certificates ADD COLUMN logo_url text;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_receipts' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE student_receipts ADD COLUMN logo_url text;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'military_service_records' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE military_service_records ADD COLUMN logo_url text;
  END IF;
END $$;