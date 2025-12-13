/*
  # Add Template Field to Student Receipts

  1. Changes
    - Add `template` column to `student_receipts` table
      - Type: text with default value 'academic'
      - Allows NULL for backward compatibility
    
  2. Notes
    - Existing receipts will default to 'academic' template
    - Valid template values: academic, modern, premium, corporate, minimalist, colorful
*/

-- Add template column to student_receipts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_receipts' AND column_name = 'template'
  ) THEN
    ALTER TABLE student_receipts ADD COLUMN template text DEFAULT 'academic';
  END IF;
END $$;
