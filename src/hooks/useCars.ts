import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Car, CarWithImages } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { cars as mockCars } from '@/lib/mock-data';

// Convert mock cars to CarWithImages format
function getMockCarsWithImages(): CarWithImages[] {
  return mockCars.map((car) => ({
    id: car.id,
    title: car.title,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    fuel_type: car.fuelType,
    transmission: car.transmission,
    condition: car.condition as 'New' | 'Used',
    description: car.description,
    status: car.status === 'Available' ? 'available' as const : 'sold' as const,
    region: car.region,
    engine: null,
    engine_capacity: null,
    color: null,
    seating_capacity: null,
    country_of_import: null,
    features: null,
    created_at: new Date().toISOString(),
    created_by: null,
    updated_at: new Date().toISOString(),
    car_images: car.images.map((url, i) => ({
      id: `${car.id}-img-${i}`,
      car_id: car.id,
      image_url: url,
      display_order: i,
      created_at: new Date().toISOString(),
    })),
  })) as any;
}

// Fetch all cars (admin view)
export function useAdminCars() {
  return useQuery({
    queryKey: ['admin-cars'],
    queryFn: async () => {
      if (!supabase) return getMockCarsWithImages();
      const { data, error } = await supabase
        .from('cars')
        .select(`*, car_images (*)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as CarWithImages[];
    },
  });
}

// Fetch available cars (public view)
export function usePublicCars(filters?: {
  brand?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  transmission?: string;
  fuelType?: string;
}) {
  return useQuery({
    queryKey: ['public-cars', filters],
    queryFn: async () => {
      if (!supabase) {
        let result = getMockCarsWithImages().filter((c: any) => c.status === 'available');
        if (filters?.brand) result = result.filter((c: any) => c.brand === filters.brand);
        if (filters?.region) result = result.filter((c: any) => c.region === filters.region);
        if (filters?.transmission) result = result.filter((c: any) => c.transmission === filters.transmission);
        return result;
      }

      let query = supabase
        .from('cars')
        .select(`*, car_images (*)`)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (filters?.brand) query = query.eq('brand', filters.brand);
      if (filters?.minPrice) query = query.gte('price', filters.minPrice);
      if (filters?.maxPrice) query = query.lte('price', filters.maxPrice);
      if (filters?.minYear) query = query.gte('year', filters.minYear);
      if (filters?.maxYear) query = query.lte('year', filters.maxYear);
      if (filters?.transmission) query = query.eq('transmission', filters.transmission);

      const { data, error } = await query;
      if (error) throw error;
      return data as CarWithImages[];
    },
  });
}

// Fetch single car
export function useCar(id: string) {
  return useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      if (!supabase) {
        const car = getMockCarsWithImages().find((c: any) => c.id === id);
        if (!car) throw new Error('Car not found');
        return car;
      }
      const { data, error } = await supabase
        .from('cars')
        .select(`*, car_images (*)`)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as CarWithImages;
    },
    enabled: !!id,
  });
}

// Create car
export function useCreateCar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (carData: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
      if (!supabase) throw new Error('Database not connected');
      const { data, error } = await supabase.from('cars').insert([carData]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cars'] });
      toast({ title: 'Success', description: 'Car created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to create car', variant: 'destructive' });
    },
  });
}

// Update car
export function useUpdateCar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...carData }: Partial<Car> & { id: string }) => {
      if (!supabase) throw new Error('Database not connected');
      const { data, error } = await supabase.from('cars').update(carData).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-cars'] });
      queryClient.invalidateQueries({ queryKey: ['car', variables.id] });
      toast({ title: 'Success', description: 'Car updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to update car', variant: 'destructive' });
    },
  });
}

// Delete car
export function useDeleteCar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error('Database not connected');
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cars'] });
      toast({ title: 'Success', description: 'Car deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to delete car', variant: 'destructive' });
    },
  });
}

// Upload car image
export function useUploadCarImage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, carId }: { file: File; carId: string }) => {
      if (!supabase) throw new Error('Database not connected');
      const fileExt = file.name.split('.').pop();
      const fileName = `${carId}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('car-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('car-images').getPublicUrl(fileName);
      const { data, error } = await supabase.from('car_images').insert([{ car_id: carId, image_url: publicUrl }]).select().single();
      if (error) throw error;
      return data;
    },
    onError: (error) => {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to upload image', variant: 'destructive' });
    },
  });
}

// Delete car image
export function useDeleteCarImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ imageId, imageUrl }: { imageId: string; imageUrl: string }) => {
      if (!supabase) throw new Error('Database not connected');
      const urlParts = imageUrl.split('/car-images/');
      if (urlParts.length > 1) {
        await supabase.storage.from('car-images').remove([urlParts[1]]);
      }
      const { error } = await supabase.from('car_images').delete().eq('id', imageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cars'] });
      toast({ title: 'Success', description: 'Image deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to delete image', variant: 'destructive' });
    },
  });
}
