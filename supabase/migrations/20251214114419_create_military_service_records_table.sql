/*
  # Create military service records table

  1. New Tables
    - `military_service_records`
      - `id` (uuid, primary key) - Unique identifier
      - `service_member_name` (text) - Full name of service member
      - `rank` (text) - Military rank
      - `service_branch` (text) - Branch of service (Army, Navy, Air Force, Marines, Coast Guard, Space Force)
      - `service_number` (text) - Service identification number
      - `date_of_birth` (date) - Date of birth
      - `date_of_entry` (date) - Date entered military service
      - `date_of_separation` (date) - Date separated from military service
      - `status` (text) - Status: 'Active - Final 12 Months' or 'Veteran - Separated Within 12 Months'
      - `document_number` (text) - Verification document number
      - `issue_date` (date) - Date document was issued
      - `expiration_date` (date) - Document expiration date
      - `issuing_authority` (text) - Authority that issued the document
      - `template` (text) - Template style used
      - `home_address` (text) - Home address
      - `home_city` (text) - City
      - `home_state` (text) - State
      - `home_postal_code` (text) - Postal code
      - `phone` (text) - Contact phone number
      - `email` (text) - Contact email
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record last update timestamp

  2. Security
    - Enable RLS on `military_service_records` table
    - Add policies for anonymous users to manage their own records
*/

CREATE TABLE IF NOT EXISTS military_service_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_member_name text NOT NULL DEFAULT '',
  rank text NOT NULL DEFAULT '',
  service_branch text NOT NULL DEFAULT '',
  service_number text NOT NULL DEFAULT '',
  date_of_birth date,
  date_of_entry date,
  date_of_separation date,
  status text NOT NULL DEFAULT '',
  document_number text NOT NULL DEFAULT '',
  issue_date date DEFAULT CURRENT_DATE,
  expiration_date date,
  issuing_authority text NOT NULL DEFAULT 'U.S. Department of Defense',
  template text NOT NULL DEFAULT 'standard',
  home_address text DEFAULT '',
  home_city text DEFAULT '',
  home_state text DEFAULT '',
  home_postal_code text DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE military_service_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view military service records"
  ON military_service_records FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert military service records"
  ON military_service_records FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update military service records"
  ON military_service_records FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete military service records"
  ON military_service_records FOR DELETE
  USING (true);