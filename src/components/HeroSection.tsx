import heroBg from '@/assets/hero-bg.jpg';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { brands, regions } from '@/lib/mock-data';

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchBrand, setSearchBrand] = useState('all');
  const [searchRegion, setSearchRegion] = useState('all');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchRegion !== 'all') params.set('region', searchRegion);
    if (searchBrand !== 'all') params.set('brand', searchBrand);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium car" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-sm font-semibold tracking-wide uppercase"
          >
            <MapPin className="w-4 h-4" />
            Tanzania's #1 Car Marketplace
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05]"
          >
            Find Your <br />
            <span className="text-gradient-gold">Perfect Car</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed"
          >
            Browse premium vehicles across Dar es Salaam, Arusha, Dodoma, Mbeya, Mwanza and more. Quality cars, trusted sellers.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/95 backdrop-blur-xl rounded-2xl p-4 md:p-5 shadow-2xl border border-border/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</label>
                <div className="relative">
                  <select
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                    className="w-full h-11 px-3 pr-8 rounded-lg border border-input bg-background text-sm text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
                  >
                    <option value="all">All Brands</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</label>
                <div className="relative">
                  <select
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                    className="w-full h-11 px-3 pr-8 rounded-lg border border-input bg-background text-sm text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
                  >
                    <option value="all">All Regions</option>
                    {regions.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="flex items-end">
                <Button variant="gold" size="lg" className="w-full h-11" onClick={handleSearch}>
                  <Search className="w-4 h-4 mr-2" />
                  Search Cars
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-10 pt-6"
          >
            {[
              { value: '150+', label: 'Cars Available' },
              { value: '8', label: 'Regions' },
              { value: '500+', label: 'Cars Sold' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-display font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-primary-foreground/50 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
