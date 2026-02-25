import { Link } from 'react-router-dom';
import { Car } from '@/lib/types';
import { formatPrice } from '@/lib/mock-data';
import { Fuel, Gauge, Calendar, MapPin, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      to={`/cars/${car.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.images[0]}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`text-xs font-semibold px-2.5 py-1 ${
              car.status === 'Available'
                ? 'bg-emerald-500/90 text-white'
                : car.status === 'Reserved'
                ? 'bg-amber-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
          >
            {car.status}
          </Badge>
        </div>
        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
          />
        </button>
        {/* Price */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
          <p className="text-lg font-bold text-white font-display">{formatPrice(car.price)}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-display font-semibold text-card-foreground text-base leading-tight group-hover:text-gold transition-colors">
          {car.title}
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {car.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5" />
            {car.fuelType}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            {car.mileage.toLocaleString()} km
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {car.region}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Badge variant="secondary" className="text-xs">
            {car.transmission}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {car.condition}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
