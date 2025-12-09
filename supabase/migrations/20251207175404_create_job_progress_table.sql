/*
  # Create Job Progress Table

  1. New Tables
    - `job_progress`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `job_name` (text) - Name/title of the job (e.g., "Full House Repaint")
      - `customer_info` (text) - Customer name or location
      - `progress_percentage` (integer) - Progress from 0 to 100
      - `description` (text) - Current status/notes about the job
      - `last_updated` (timestamptz) - When the job was last updated
      - `is_enabled` (boolean) - Whether to display this job on the public page
      - `display_order` (integer) - Order to display jobs (1, 2, 3, etc.)
      - `created_at` (timestamptz) - When the job was created

  2. Security
    - Enable RLS on `job_progress` table
    - Add policy for public read access (for the public job progress page)
    - Add policies for authenticated admin users to manage jobs
*/

CREATE TABLE IF NOT EXISTS job_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name text NOT NULL,
  customer_info text DEFAULT '',
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  description text DEFAULT '',
  last_updated timestamptz DEFAULT now(),
  is_enabled boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_progress ENABLE ROW LEVEL SECURITY;

-- Public can view enabled jobs
CREATE POLICY "Anyone can view enabled jobs"
  ON job_progress
  FOR SELECT
  USING (is_enabled = true);

-- Authenticated users can view all jobs (for admin)
CREATE POLICY "Authenticated users can view all jobs"
  ON job_progress
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert jobs
CREATE POLICY "Authenticated users can insert jobs"
  ON job_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update jobs
CREATE POLICY "Authenticated users can update jobs"
  ON job_progress
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete jobs
CREATE POLICY "Authenticated users can delete jobs"
  ON job_progress
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert two sample jobs
INSERT INTO job_progress (job_name, customer_info, progress_percentage, description, display_order, is_enabled)
VALUES 
  ('Full House Repaint', 'Smith Family - Hertfordshire', 65, 'Walls complete, woodwork in progress.', 1, true),
  ('Kitchen Extension', 'Jones Residence - Bedfordshire', 40, 'Foundation laid, framing in progress.', 2, true)
ON CONFLICT DO NOTHING;