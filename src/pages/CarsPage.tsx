import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePublicCars } from '@/hooks/useCars';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Car, Fuel, Gauge, Calendar, Loader2 } from 'lucide-react';

const BRANDS = [
  'All Brands',
  'Toyota', 'Honda', 'Nissan', 'Mazda', 'Mitsubishi', 'Subaru',
  'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Chevrolet',
  'Hyundai', 'Kia', 'Suzuki', 'Isuzu', 'Land Rover', 'Jeep'
];

const TRANSMISSIONS = ['All', 'Manual', 'Automatic', 'CVT', 'Semi-Automatic'];

export default function CarsPage() {
  const [brand, setBrand] = useState('All Brands');
  const [transmission, setTransmission] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  const filters = {
    brand: brand !== 'All Brands' ? brand : undefined,
    transmission: transmission !== 'All' ? transmission : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minYear: minYear ? Number(minYear) : undefined,
    maxYear: maxYear ? Number(maxYear) : undefined,
  };

  const { data: cars, isLoading } = usePublicCars(filters);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const resetFilters = () => {
    setBrand('All Brands');
    setTransmission('All');
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setMaxYear('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Our Cars</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              Find your perfect vehicle from our extensive collection of quality cars
            </p>
          </div>
        </section>

        {/* Filters & Cars */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center justify-between">
                          Filters
                          <Button variant="ghost" size="sm" onClick={resetFilters}>
                            Reset
                          </Button>
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <Label>Brand</Label>
                        <Select value={brand} onValueChange={setBrand}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {BRANDS.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Transmission</Label>
                        <Select value={transmission} onValueChange={setTransmission}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TRANSMISSIONS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Price Range (TZS)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Year Range</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minYear}
                            onChange={(e) => setMinYear(e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxYear}
                            onChange={(e) => setMaxYear(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </aside>

              {/* Cars Grid */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : cars && cars.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <p className="text-muted-foreground">
                        Showing {cars.length} {cars.length === 1 ? 'car' : 'cars'}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {cars.map((car) => (
                        <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video relative overflow-hidden bg-muted">
                            {car.car_images?.[0] ? (
                              <img
                                src={car.car_images[0].image_url}
                                alt={car.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Car className="h-16 w-16 text-muted-foreground" />
                              </div>
                            )}
                            <Badge className="absolute top-3 right-3">
                              {car.condition}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-2 line-clamp-1">{car.title}</h3>
                            <p className="text-2xl font-bold text-primary mb-4">
                              {formatPrice(Number(car.price))}
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{car.year}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Gauge className="h-4 w-4" />
                                <span>{car.mileage.toLocaleString()} km</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Fuel className="h-4 w-4" />
                                <span>{car.fuel_type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Car className="h-4 w-4" />
                                <span>{car.transmission}</span>
                              </div>
                            </div>
                            <Link to={`/cars/${car.id}`}>
                              <Button className="w-full">View Details</Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20">
                    <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters to see more results
                    </p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
