import heroBg from '@/assets/hero-bg.jpg';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, CreditCard, Shield, Wrench, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { brands, regions } from '@/lib/mock-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const carousels = [
  {
    id: 1,
    items: [
      {
        icon: CreditCard,
        title: 'Tunatoa Mkopo',
        subtitle: 'Car Financing',
        description: 'Malipo ya awamu 12-60 months',
        gradient: 'from-blue-500 to-blue-600',
      },
      {
        icon: CreditCard,
        title: 'Riba ya Chini',
        subtitle: 'Low Interest Rates',
        description: 'Starting from 8% per year',
        gradient: 'from-blue-600 to-blue-700',
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        icon: Shield,
        title: 'Bima ya Gari',
        subtitle: 'Car Insurance',
        description: 'Comprehensive coverage',
        gradient: 'from-green-500 to-green-600',
      },
      {
        icon: Shield,
        title: 'Bima Kamili',
        subtitle: 'Full Protection',
        description: 'Accident & theft covered',
        gradient: 'from-green-600 to-green-700',
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        icon: Wrench,
        title: 'Matengenezo',
        subtitle: 'Maintenance',
        description: 'Expert mechanics available',
        gradient: 'from-orange-500 to-orange-600',
      },
      {
        icon: Wrench,
        title: 'Vipuri Halisi',
        subtitle: 'Genuine Parts',
        description: 'Original spare parts',
        gradient: 'from-orange-600 to-orange-700',
      },
    ],
  },
  {
    id: 4,
    items: [
      {
        icon: FileCheck,
        title: 'Usajili Haraka',
        subtitle: 'Fast Registration',
        description: 'Same day service',
        gradient: 'from-purple-500 to-purple-600',
      },
      {
        icon: FileCheck,
        title: 'Transfer ya Jina',
        subtitle: 'Name Transfer',
        description: 'Quick ownership transfer',
        gradient: 'from-purple-600 to-purple-700',
      },
    ],
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchBrand, setSearchBrand] = useState('all');
  const [searchRegion, setSearchRegion] = useState('all');
  
  // Carousel APIs for auto-scroll
  const [api1, setApi1] = useState<CarouselApi>();
  const [api2, setApi2] = useState<CarouselApi>();
  const [api3, setApi3] = useState<CarouselApi>();
  const [api4, setApi4] = useState<CarouselApi>();

  // Auto-scroll effect for each carousel
  useEffect(() => {
    if (!api1) return;
    const interval = setInterval(() => {
      api1.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [api1]);

  useEffect(() => {
    if (!api2) return;
    const interval = setInterval(() => {
      api2.scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [api2]);

  useEffect(() => {
    if (!api3) return;
    const interval = setInterval(() => {
      api3.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [api3]);

  useEffect(() => {
    if (!api4) return;
    const interval = setInterval(() => {
      api4.scrollNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [api4]);

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
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
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

            {/* 4 Carousels Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <Carousel
                opts={{ loop: true }}
                setApi={setApi1}
                className="w-full"
              >
                <CarouselContent>
                  {carousels[0].items.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-card/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-border/50 h-full">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-3`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-display text-base font-bold text-card-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent text-xs font-semibold mb-1">
                          {item.subtitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <Carousel
                opts={{ loop: true }}
                setApi={setApi2}
                className="w-full"
              >
                <CarouselContent>
                  {carousels[1].items.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-card/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-border/50 h-full">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-3`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-display text-base font-bold text-card-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent text-xs font-semibold mb-1">
                          {item.subtitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <Carousel
                opts={{ loop: true }}
                setApi={setApi3}
                className="w-full"
              >
                <CarouselContent>
                  {carousels[2].items.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-card/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-border/50 h-full">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-3`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-display text-base font-bold text-card-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent text-xs font-semibold mb-1">
                          {item.subtitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <Carousel
                opts={{ loop: true }}
                setApi={setApi4}
                className="w-full"
              >
                <CarouselContent>
                  {carousels[3].items.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-card/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-border/50 h-full">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-3`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-display text-base font-bold text-card-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent text-xs font-semibold mb-1">
                          {item.subtitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-10 pt-2"
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
      </div>
    </section>
  );
}
