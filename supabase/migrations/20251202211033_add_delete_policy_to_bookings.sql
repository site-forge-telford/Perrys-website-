/*
  # Add DELETE policy for bookings table

  1. Changes
    - Add DELETE policy for authenticated users to permanently delete bookings
  
  2. Security
    - Only authenticated users can delete bookings
    - This allows admin users to permanently delete bookings from the recycle bin
*/

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
