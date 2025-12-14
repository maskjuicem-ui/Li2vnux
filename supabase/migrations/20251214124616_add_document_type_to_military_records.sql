/*
  # Add Document Type Fields to Military Service Records

  1. Changes
    - Add `document_type` column to military_service_records table
      - Values: 'Active Duty/Reservist', 'Veteran', 'Retiree'
    - Add `document_subtype` column to military_service_records table
      - For Active Duty/Reservist: 'Recent LES (within 90 days)', 'Current Orders (issued within 1 year)'
      - For Veteran: 'DD-214', 'VA ID', 'VA Benefits Letter', 'Discharge Certificate (DD256)', 'Driver\'s License with Veteran designation'
      - For Retiree: 'DD-214', 'VA ID', 'VA Benefits Letter', 'Retirement Certificate', 'Retirement Orders'

  2. Notes
    - Default document_type is 'Active Duty/Reservist'
    - Default document_subtype is 'Recent LES (within 90 days)'
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'military_service_records' AND column_name = 'document_type'
  ) THEN
    ALTER TABLE military_service_records ADD COLUMN document_type text NOT NULL DEFAULT 'Active Duty/Reservist';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'military_service_records' AND column_name = 'document_subtype'
  ) THEN
    ALTER TABLE military_service_records ADD COLUMN document_subtype text NOT NULL DEFAULT 'Recent LES (within 90 days)';
  END IF;
END $$;