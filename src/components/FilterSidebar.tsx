import { regions, brands } from '@/lib/mock-data';
import { FilterState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { formatPrice } from '@/lib/mock-data';
import { RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 15 }, (_, i) => String(currentYear - i));
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const transmissions = ['Manual', 'Automatic'];
const conditions = ['New', 'Used'];

export default function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const update = (key: keyof FilterState, value: string | number) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-card-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-muted-foreground">
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Region */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Region</label>
        <Select value={filters.region} onValueChange={(v) => update('region', v)}>
          <SelectTrigger><SelectValue placeholder="All Regions" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Brand</label>
        <Select value={filters.brand} onValueChange={(v) => update('brand', v)}>
          <SelectTrigger><SelectValue placeholder="All Brands" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Price Range</label>
        <Slider
          value={[filters.maxPrice]}
          onValueChange={([v]) => update('maxPrice', v)}
          max={250000000}
          min={10000000}
          step={5000000}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>TZS 10M</span>
          <span className="font-medium text-card-foreground">{formatPrice(filters.maxPrice)}</span>
        </div>
      </div>

      {/* Year */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Year</label>
        <Select value={filters.year} onValueChange={(v) => update('year', v)}>
          <SelectTrigger><SelectValue placeholder="Any Year" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Year</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Transmission</label>
        <Select value={filters.transmission} onValueChange={(v) => update('transmission', v)}>
          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {transmissions.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fuel Type</label>
        <Select value={filters.fuelType} onValueChange={(v) => update('fuelType', v)}>
          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {fuelTypes.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Condition</label>
        <Select value={filters.condition} onValueChange={(v) => update('condition', v)}>
          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {conditions.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
