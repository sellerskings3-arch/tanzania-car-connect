import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import FilterSidebar from '@/components/FilterSidebar';
import { cars } from '@/lib/mock-data';
import { FilterState } from '@/lib/types';
import { SlidersHorizontal, X, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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

type SortOption = 'newest' | 'price-low' | 'price-high' | 'mileage';

export default function CarsPage() {
  const [searchParams] = useSearchParams();
  const regionParam = searchParams.get('region');
  const brandParam = searchParams.get('brand');

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    region: regionParam || 'all',
    brand: brandParam || 'all',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filtered = useMemo(() => {
    let result = cars.filter((car) => {
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

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'mileage': result.sort((a, b) => a.mileage - b.mileage); break;
      case 'newest': result.sort((a, b) => b.year - a.year); break;
    }
    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Page Header */}
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl md:text-4xl font-bold text-primary-foreground"
            >
              {filters.region !== 'all' ? `Cars in ${filters.region}` : 'All Cars'}
            </motion.h1>
            <p className="mt-2 text-primary-foreground/60">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="lg:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                {mobileFiltersOpen ? <X className="w-4 h-4 mr-1.5" /> : <SlidersHorizontal className="w-4 h-4 mr-1.5" />}
                Filters
              </Button>
            </div>

            <div className="hidden lg:block text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> results
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Sort */}
              <div className="relative flex items-center gap-1.5">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-9 pl-2 pr-7 rounded-lg border border-input bg-background text-sm text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="mileage">Lowest Mileage</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="hidden md:flex items-center border border-input rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
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

            {/* Grid/List */}
            <div className="flex-1">
              {filtered.length > 0 ? (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                    : 'flex flex-col gap-4'
                }>
                  {filtered.map((car, i) => (
                    <CarCard key={car.id} car={car} index={i} layout={viewMode} />
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
