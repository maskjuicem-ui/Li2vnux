/*
  # Fix RLS Policies for Anonymous Access

  1. Changes
    - Update all RLS policies to allow anonymous (anon) access
    - This allows the app to work without authentication
    
  2. Security
    - Policies now allow both authenticated and anonymous users
    - This is appropriate for this demo/testing application
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON paystubs;
DROP POLICY IF EXISTS "Enable insert access for all authenticated users" ON paystubs;
DROP POLICY IF EXISTS "Enable update access for all authenticated users" ON paystubs;
DROP POLICY IF EXISTS "Enable delete access for all authenticated users" ON paystubs;

DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON certificates;
DROP POLICY IF EXISTS "Enable insert access for all authenticated users" ON certificates;
DROP POLICY IF EXISTS "Enable update access for all authenticated users" ON certificates;
DROP POLICY IF EXISTS "Enable delete access for all authenticated users" ON certificates;

DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON student_receipts;
DROP POLICY IF EXISTS "Enable insert access for all authenticated users" ON student_receipts;
DROP POLICY IF EXISTS "Enable update access for all authenticated users" ON student_receipts;
DROP POLICY IF EXISTS "Enable delete access for all authenticated users" ON student_receipts;

-- Create new policies for anonymous access

-- Paystubs policies
CREATE POLICY "Allow all operations on paystubs"
  ON paystubs
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Certificates policies
CREATE POLICY "Allow all operations on certificates"
  ON certificates
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Student receipts policies
CREATE POLICY "Allow all operations on student_receipts"
  ON student_receipts
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);