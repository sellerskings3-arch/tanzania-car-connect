import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client only if env vars are available; otherwise export null
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Database types
export type Car = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: 'New' | 'Used';
  price: number;
  description: string | null;
  status: 'available' | 'sold';
  engine: string | null;
  engine_capacity: string | null;
  color: string | null;
  seating_capacity: number | null;
  country_of_import: string | null;
  features: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string;
};

export type CarImage = {
  id: string;
  car_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
};

export type CarWithImages = Car & {
  car_images: CarImage[];
};
