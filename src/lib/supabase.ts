import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image_url: string;
  images?: string[];
  featured: boolean;
  completed_date: string;
  challenge?: string;
  solution?: string;
  result?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  location: string;
  project_type: string;
  quote: string;
  rating: number;
  featured: boolean;
  created_at: string;
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  service_type: string;
  preferred_contact: string;
  status?: string;
  notes?: string;
  is_read?: boolean;
  is_archived?: boolean;
  is_deleted?: boolean;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobProgress {
  id: string;
  job_name: string;
  customer_info: string;
  progress_percentage: number;
  description: string;
  last_updated: string;
  is_enabled: boolean;
  display_order: number;
  created_at: string;
}
