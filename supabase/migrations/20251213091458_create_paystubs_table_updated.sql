/*
  # Create Paystubs Table (Updated Structure)

  1. New Tables
    - `paystubs`
      - `id` (uuid, primary key)
      - Check Information: check_number, pay_date, period_start, period_end
      - School Information: school_name, school_location, school_code, employer_ein
      - Employee Information: employee_name, employee_ssn, position, file_number, hire_date, salary_rate
      - Pay Information: gross_pay_current, gross_pay_ytd
      - Deductions: deductions (jsonb array), total_deductions_current, total_deductions_ytd
      - Net Pay: net_pay_current, net_pay_ytd
      - payment_method, template
      - Timestamps: created_at, updated_at
      
  2. Security
    - Enable RLS on `paystubs` table
    - Add policies for authenticated users
*/

DROP TABLE IF EXISTS paystubs;

CREATE TABLE paystubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_number text NOT NULL,
  pay_date date NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  school_name text NOT NULL DEFAULT '',
  school_location text DEFAULT '',
  school_code text DEFAULT '',
  employer_ein text DEFAULT '',
  employee_name text NOT NULL,
  employee_ssn text DEFAULT '',
  position text DEFAULT '',
  file_number text DEFAULT '',
  hire_date date,
  salary_rate numeric(10, 2) DEFAULT 0,
  gross_pay_current numeric(10, 2) DEFAULT 0,
  gross_pay_ytd numeric(10, 2) DEFAULT 0,
  deductions jsonb DEFAULT '[]'::jsonb,
  total_deductions_current numeric(10, 2) DEFAULT 0,
  total_deductions_ytd numeric(10, 2) DEFAULT 0,
  net_pay_current numeric(10, 2) DEFAULT 0,
  net_pay_ytd numeric(10, 2) DEFAULT 0,
  payment_method text DEFAULT 'Direct Deposit',
  template text DEFAULT 'modern',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE paystubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users"
  ON paystubs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for all authenticated users"
  ON paystubs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for all authenticated users"
  ON paystubs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all authenticated users"
  ON paystubs FOR DELETE
  TO authenticated
  USING (true);