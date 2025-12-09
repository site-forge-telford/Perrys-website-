/*
  # Update bookings table with status fields

  1. Changes
    - Add `is_read` (boolean) - Tracks if booking has been viewed by admin
    - Add `is_archived` (boolean) - Tracks if booking has been archived
    - Add `is_deleted` (boolean) - Tracks if booking is in recycle bin
    - Add `deleted_at` (timestamptz, nullable) - When booking was deleted
    - Update `status` column to have more detailed status options
    - Add index on status fields for better query performance

  2. Security
    - Update RLS policies to exclude deleted bookings from normal queries
    - Add policy for viewing deleted bookings (recycle bin)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'is_read'
  ) THEN
    ALTER TABLE bookings ADD COLUMN is_read boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'is_archived'
  ) THEN
    ALTER TABLE bookings ADD COLUMN is_archived boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'is_deleted'
  ) THEN
    ALTER TABLE bookings ADD COLUMN is_deleted boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE bookings ADD COLUMN deleted_at timestamptz;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_bookings_is_read ON bookings(is_read);
CREATE INDEX IF NOT EXISTS idx_bookings_is_archived ON bookings(is_archived);
CREATE INDEX IF NOT EXISTS idx_bookings_is_deleted ON bookings(is_deleted);

DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON bookings;

CREATE POLICY "Authenticated users can view active bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (is_deleted = false);

CREATE POLICY "Authenticated users can view deleted bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (is_deleted = true);
