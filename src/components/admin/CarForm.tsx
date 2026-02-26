import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const carSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  mileage: z.number().min(0),
  fuel_type: z.string().min(1, 'Fuel type is required'),
  transmission: z.string().min(1, 'Transmission is required'),
  condition: z.enum(['New', 'Used']),
  price: z.number().min(0),
  description: z.string().optional(),
  status: z.enum(['available', 'sold']),
  engine: z.string().optional(),
  engine_capacity: z.string().optional(),
  color: z.string().optional(),
  seating_capacity: z.number().optional(),
  country_of_import: z.string().optional(),
  features: z.string().optional(),
});

type CarFormData = z.infer<typeof carSchema>;

type CarFormProps = {
  defaultValues?: Partial<CarFormData>;
  onSubmit: (data: CarFormData) => void;
  loading?: boolean;
};

const BRANDS = [
  'Toyota', 'Honda', 'Nissan', 'Mazda', 'Mitsubishi', 'Subaru',
  'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Chevrolet',
  'Hyundai', 'Kia', 'Suzuki', 'Isuzu', 'Land Rover', 'Jeep', 'Other'
];

const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'];
const TRANSMISSIONS = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic'];

export function CarForm({ defaultValues, onSubmit, loading }: CarFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: defaultValues || {
      condition: 'Used',
      status: 'available',
      year: new Date().getFullYear(),
      mileage: 0,
      price: 0,
      brand: '',
      fuel_type: '',
      transmission: '',
    },
  });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {hasErrors && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Please fix the errors below before submitting the form.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the main details about the car
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">
                Car Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="e.g., Toyota Corolla 2020 - Excellent Condition"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">
                Brand <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.brand ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANDS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.brand && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.brand.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">
                Model <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="model" 
                {...register('model')} 
                placeholder="e.g., Corolla"
                className={errors.model ? 'border-destructive' : ''}
              />
              {errors.model && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.model.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">
                Year <span className="text-destructive">*</span>
              </Label>
              <Input
                id="year"
                type="number"
                {...register('year', { valueAsNumber: true })}
                placeholder={new Date().getFullYear().toString()}
                className={errors.year ? 'border-destructive' : ''}
              />
              {errors.year && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.year.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">
                Mileage (km) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mileage"
                type="number"
                {...register('mileage', { valueAsNumber: true })}
                placeholder="e.g., 50000"
                className={errors.mileage ? 'border-destructive' : ''}
              />
              {errors.mileage && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.mileage.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                Price (TZS) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="e.g., 25000000"
                className={errors.price ? 'border-destructive' : ''}
              />
              {errors.price && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.price.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter price in Tanzanian Shillings
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuel_type">
                Fuel Type <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="fuel_type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.fuel_type ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUEL_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.fuel_type && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.fuel_type.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">
                Transmission <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="transmission"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.transmission ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSMISSIONS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.transmission && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  {errors.transmission.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">
                Condition <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe the car's features, condition, service history, and any additional information that buyers should know..."
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Optional: Add detailed information about the car
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
          <CardDescription>
            Optional technical and import information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="engine">Engine Model</Label>
              <Input
                id="engine"
                {...register('engine')}
                placeholder="e.g., 1HD-FT, 2JZ-GTE"
              />
              <p className="text-xs text-muted-foreground">
                Engine model or code
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="engine_capacity">Engine Capacity</Label>
              <Input
                id="engine_capacity"
                {...register('engine_capacity')}
                placeholder="e.g., 4163 Cc, 2000 Cc"
              />
              <p className="text-xs text-muted-foreground">
                Engine displacement in Cc
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                {...register('color')}
                placeholder="e.g., White, Black, Multi Colour"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seating_capacity">Seating Capacity</Label>
              <Input
                id="seating_capacity"
                type="number"
                {...register('seating_capacity', { valueAsNumber: true })}
                placeholder="e.g., 5, 7, 29"
              />
              <p className="text-xs text-muted-foreground">
                Number of passengers/seats
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country_of_import">Country of Import</Label>
              <Input
                id="country_of_import"
                {...register('country_of_import')}
                placeholder="e.g., Japan, UK, USA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features & Special Notes</Label>
            <Textarea
              id="features"
              {...register('features')}
              placeholder="List special features, one per line:&#10;- New Tyres&#10;- NO DENTS&#10;- NO SCRATCH&#10;- Electronic Passenger Door&#10;- Spring Nyuma&#10;- AC&#10;- UNAWEZA KUPATA K/MKOPO&#10;- MALIPO YA AWAMU KDG KDG"
              rows={8}
              className="resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Optional: List features, financing options, or special notes
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button 
          type="submit" 
          disabled={loading} 
          size="lg"
          className="min-w-[150px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Car'
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </p>
      </div>
    </form>
  );
}
