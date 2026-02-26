import { Link } from 'react-router-dom';
import { CarWithImages } from '@/lib/supabase';
import { Fuel, Gauge, Calendar, Heart, Car as CarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: CarWithImages;
  index?: number;
  layout?: 'grid' | 'list';
}

export default function CarCard({ car, index = 0, layout = 'grid' }: CarCardProps) {
  const [liked, setLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = car.car_images?.[0]?.image_url;

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
      >
        <Link
          to={`/cars/${car.id}`}
          className="group flex bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
        >
          <div className="relative w-64 flex-shrink-0 overflow-hidden">
            {mainImage ? (
              <img src={mainImage} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <CarIcon className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/90 text-white">
                {car.condition}
              </Badge>
            </div>
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-card-foreground text-lg group-hover:text-accent transition-colors">{car.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{car.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{car.year}</span>
                <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{car.fuel_type}</span>
                <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" />{car.mileage.toLocaleString()} km</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <p className="text-xl font-display font-bold text-gradient-gold">{formatPrice(Number(car.price))}</p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">{car.transmission}</Badge>
                <Badge variant="secondary" className="text-xs">{car.condition}</Badge>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        to={`/cars/${car.id}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {mainImage ? (
            <img src={mainImage} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <CarIcon className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/90 text-white">
              {car.condition}
            </Badge>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-sm"
          >
            <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
            <p className="text-xl font-bold text-white font-display">{formatPrice(Number(car.price))}</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-display font-semibold text-card-foreground text-base leading-tight group-hover:text-accent transition-colors">
            {car.title}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{car.year}</span>
            <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" />{car.fuel_type}</span>
            <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5" />{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-border/50">
            <Badge variant="secondary" className="text-xs">{car.transmission}</Badge>
            <Badge variant="secondary" className="text-xs">{car.condition}</Badge>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
