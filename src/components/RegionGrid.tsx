import { Link } from 'react-router-dom';
import { regions } from '@/lib/mock-data';
import { MapPin, ArrowRight } from 'lucide-react';

export default function RegionGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Browse by <span className="text-gradient-gold">Region</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Find cars available in your Mkoa</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regions.map((region, i) => (
            <Link
              key={region.id}
              to={`/cars?region=${encodeURIComponent(region.name)}`}
              className="group relative bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold/10 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-card-foreground text-sm">{region.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{region.carCount} cars</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
