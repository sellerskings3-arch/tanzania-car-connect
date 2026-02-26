# Kings Sellers - Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

## 2. Database Schema

Run the following SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cars table
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('New', 'Used')),
  price DECIMAL(12, 2) NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car images table
CREATE TABLE car_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_brand ON cars(brand);
CREATE INDEX idx_cars_created_at ON cars(created_at DESC);
CREATE INDEX idx_car_images_car_id ON car_images(car_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;

-- Public can view available cars
CREATE POLICY "Public can view available cars"
  ON cars FOR SELECT
  USING (status = 'available');

-- Authenticated admins can do everything with cars
CREATE POLICY "Admins can insert cars"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update cars"
  ON cars FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete cars"
  ON cars FOR DELETE
  TO authenticated
  USING (true);

-- Public can view images of available cars
CREATE POLICY "Public can view car images"
  ON car_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cars
      WHERE cars.id = car_images.car_id
      AND cars.status = 'available'
    )
  );

-- Authenticated admins can manage all car images
CREATE POLICY "Admins can insert car images"
  ON car_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update car images"
  ON car_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete car images"
  ON car_images FOR DELETE
  TO authenticated
  USING (true);
```

## 4. Storage Setup

1. Go to Storage in Supabase Dashboard
2. Create a new bucket called `car-images`
3. Make it public
4. Set up the following policies:

```sql
-- Allow public to view images
CREATE POLICY "Public can view car images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload car images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'car-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update car images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'car-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete car images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'car-images');
```

## 5. Create Admin User

1. Go to Authentication > Users
2. Add a new user with email and password
3. This will be your admin account

## 6. Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 7. Test Connection

After setup, test your connection by logging in with the admin credentials.
