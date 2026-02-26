import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePublicCars } from '@/hooks/useCars';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Fuel, Gauge, Calendar, Loader2 } from 'lucide-react';

export default function CarsPage() {
  const [searchParams] = useSearchParams();

  const filters = useMemo(() => ({
    brand: searchParams.get('brand') || undefined,
    transmission: searchParams.get('transmission') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    minYear: searchParams.get('minYear') ? Number(searchParams.get('minYear')) : undefined,
    maxYear: searchParams.get('maxYear') ? Number(searchParams.get('maxYear')) : undefined,
  }), [searchParams]);

  const { data: cars, isLoading } = usePublicCars(filters);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Our Cars</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              Find your perfect vehicle — use the search bar above to filter by brand, price, year & more
            </p>
            {activeFilterCount > 0 && (
              <p className="text-sm text-accent mt-2">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</p>
            )}
          </div>
        </section>

        {/* Cars Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div>
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
                    <Button onClick={() => window.location.href = '/cars'}>Reset Filters</Button>
                  </div>
                )}
              </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
