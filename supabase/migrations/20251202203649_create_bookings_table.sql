/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `name` (text) - Customer's full name
      - `email` (text) - Customer's email address
      - `mobile` (text) - Customer's mobile phone number
      - `address` (text) - Service address
      - `service_type` (text) - Type of service requested (e.g., Extension, Kitchen, Bathroom, etc.)
      - `preferred_contact` (text) - Preferred contact method (email, phone, or either)
      - `status` (text) - Booking status (pending, contacted, completed)
      - `notes` (text, nullable) - Additional notes or requirements
      - `created_at` (timestamptz) - When the booking was created
      - `updated_at` (timestamptz) - When the booking was last updated

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for anonymous users to insert bookings (so customers can submit)
    - Add policy for authenticated users to view all bookings (for admin access)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  address text NOT NULL,
  service_type text NOT NULL,
  preferred_contact text NOT NULL DEFAULT 'either',
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
