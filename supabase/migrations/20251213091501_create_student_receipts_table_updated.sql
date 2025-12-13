/*
  # Create Student Receipts Table (Updated Structure)

  1. New Tables
    - `student_receipts`
      - `id` (uuid, primary key)
      - Student Information: student_name, student_id, student_email, student_phone
      - School Information: school_name, school_address, school_city, school_state, 
        school_country, school_postal_code, school_phone, school_website
      - Receipt Information: receipt_number, date_issued, term, academic_year
      - Payment Information: fee_items (jsonb array), total_amount, currency, 
        payment_method, payment_date
      - notes
      - Timestamps: created_at, updated_at
      
  2. Security
    - Enable RLS on `student_receipts` table
    - Add policies for authenticated users
*/

DROP TABLE IF EXISTS student_receipts;

CREATE TABLE student_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  student_id text NOT NULL,
  student_email text DEFAULT '',
  student_phone text DEFAULT '',
  school_name text NOT NULL,
  school_address text DEFAULT '',
  school_city text DEFAULT '',
  school_state text DEFAULT '',
  school_country text NOT NULL,
  school_postal_code text DEFAULT '',
  school_phone text DEFAULT '',
  school_website text DEFAULT '',
  receipt_number text NOT NULL,
  date_issued date NOT NULL,
  term text NOT NULL,
  academic_year text NOT NULL,
  fee_items jsonb DEFAULT '[]'::jsonb,
  total_amount numeric(10, 2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  payment_method text NOT NULL DEFAULT 'Cash',
  payment_date date NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE student_receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users"
  ON student_receipts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for all authenticated users"
  ON student_receipts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for all authenticated users"
  ON student_receipts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all authenticated users"
  ON student_receipts FOR DELETE
  TO authenticated
  USING (true);