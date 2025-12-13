/*
  # Create Certificates Table (Updated Structure)

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - certificate_number, issue_date
      - recipient_name, university_name, school_department
      - certificate_type, field_of_study
      - specializations (jsonb array)
      - position_title, description
      - Signatories: dean_name, dean_title, principal_name, principal_title
      - Timestamps: created_at, updated_at
      
  2. Security
    - Enable RLS on `certificates` table
    - Add policies for authenticated users
*/

DROP TABLE IF EXISTS certificates;

CREATE TABLE certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number text NOT NULL,
  issue_date date NOT NULL,
  recipient_name text NOT NULL,
  university_name text NOT NULL,
  school_department text DEFAULT '',
  certificate_type text NOT NULL,
  field_of_study text NOT NULL,
  specializations jsonb DEFAULT '[]'::jsonb,
  position_title text DEFAULT '',
  description text DEFAULT '',
  dean_name text DEFAULT '',
  dean_title text DEFAULT '',
  principal_name text DEFAULT '',
  principal_title text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users"
  ON certificates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for all authenticated users"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for all authenticated users"
  ON certificates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all authenticated users"
  ON certificates FOR DELETE
  TO authenticated
  USING (true);