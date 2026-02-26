import { AdminLayout } from '@/components/admin/AdminLayout';
import { CarForm } from '@/components/admin/CarForm';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useCar, useUpdateCar } from '@/hooks/useCars';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Car } from '@/lib/supabase';

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading } = useCar(id!);
  const updateMutation = useUpdateCar();
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<Car>) => {
    await updateMutation.mutateAsync({
      id: id!,
      ...data,
    });
    navigate('/admin/dashboard');
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!car) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Car not found</h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Car</h1>
          <p className="text-muted-foreground">Update car details and manage images</p>
        </div>

        <ImageUpload carId={car.id} images={car.car_images || []} />

        <CarForm
          defaultValues={{
            title: car.title,
            brand: car.brand,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            fuel_type: car.fuel_type,
            transmission: car.transmission,
            condition: car.condition,
            price: Number(car.price),
            description: car.description || '',
            status: car.status,
            engine: car.engine || '',
            engine_capacity: car.engine_capacity || '',
            color: car.color || '',
            seating_capacity: car.seating_capacity || undefined,
            country_of_import: car.country_of_import || '',
            features: car.features || '',
          }}
          onSubmit={handleSubmit}
          loading={updateMutation.isPending}
        />
      </div>
    </AdminLayout>
  );
}
