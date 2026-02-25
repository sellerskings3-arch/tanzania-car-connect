import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import FilterSidebar from '@/components/FilterSidebar';
import { cars } from '@/lib/mock-data';
import { FilterState } from '@/lib/types';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const defaultFilters: FilterState = {
  region: 'all',
  brand: 'all',
  minPrice: 0,
  maxPrice: 250000000,
  year: 'all',
  transmission: 'all',
  fuelType: 'all',
  condition: 'all',
};

export default function CarsPage() {
  const [searchParams] = useSearchParams();
  const regionParam = searchParams.get('region');

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    region: regionParam || 'all',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      if (filters.region !== 'all' && car.region !== filters.region) return false;
      if (filters.brand !== 'all' && car.brand !== filters.brand) return false;
      if (car.price > filters.maxPrice) return false;
      if (filters.year !== 'all' && car.year !== Number(filters.year)) return false;
      if (filters.transmission !== 'all' && car.transmission !== filters.transmission) return false;
      if (filters.fuelType !== 'all' && car.fuelType !== filters.fuelType) return false;
      if (filters.condition !== 'all' && car.condition !== filters.condition) return false;
      if (car.status === 'Sold') return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Page Header */}
        <div className="bg-primary py-10">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              {filters.region !== 'all' ? `Cars in ${filters.region}` : 'All Cars'}
            </h1>
            <p className="mt-2 text-primary-foreground/60">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full justify-center"
            >
              {mobileFiltersOpen ? <X className="w-4 h-4 mr-2" /> : <SlidersHorizontal className="w-4 h-4 mr-2" />}
              {mobileFiltersOpen ? 'Close Filters' : 'Filters'}
            </Button>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
              />
            </aside>

            {/* Grid */}
            <div className="flex-1">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">No cars match your filters.</p>
                  <Button variant="gold" className="mt-4" onClick={() => setFilters(defaultFilters)}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
