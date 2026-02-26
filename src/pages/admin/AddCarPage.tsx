import { AdminLayout } from '@/components/admin/AdminLayout';
import { CarForm } from '@/components/admin/CarForm';
import { useCreateCar } from '@/hooks/useCars';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Car } from '@/lib/supabase';

export default function AddCarPage() {
  const createMutation = useCreateCar();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (data: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
    await createMutation.mutateAsync({
      ...data,
      created_by: user?.id,
    });
    navigate('/admin/dashboard');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Car</h1>
          <p className="text-muted-foreground">Fill in the details to add a new car to inventory</p>
        </div>

        <CarForm onSubmit={handleSubmit} loading={createMutation.isPending} />
      </div>
    </AdminLayout>
  );
}
