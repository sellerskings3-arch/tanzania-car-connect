import heroBg from '@/assets/hero-bg.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium car" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 text-gold text-sm font-medium">
            <MapPin className="w-4 h-4" />
            Tanzania's #1 Car Marketplace
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1]">
            Find Your <br />
            <span className="text-gradient-gold">Perfect Car</span>
          </h1>

          <p className="text-lg text-primary-foreground/70 max-w-lg leading-relaxed">
            Browse premium vehicles across Dar es Salaam, Arusha, Dodoma, Mbeya, Mwanza and more. Quality cars, trusted sellers.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="hero" size="lg" asChild>
              <Link to="/cars">
                <Search className="w-4 h-4 mr-1" />
                Browse Cars
              </Link>
            </Button>
            <Button variant="outline-light" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-primary-foreground/10 mt-8">
            {[
              { value: '150+', label: 'Cars Available' },
              { value: '8', label: 'Regions' },
              { value: '500+', label: 'Cars Sold' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-primary-foreground/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
