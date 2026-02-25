export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  condition: 'New' | 'Used';
  description: string;
  status: 'Available' | 'Reserved' | 'Sold';
  region: string;
  images: string[];
  createdBy?: string;
  createdAt?: string;
}

export interface Region {
  id: string;
  name: string;
  carCount: number;
}

export type FilterState = {
  region: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  year: string;
  transmission: string;
  fuelType: string;
  condition: string;
};
