import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RegionGrid from '@/components/RegionGrid';
import CarCard from '@/components/CarCard';
import { cars } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredCars = cars.filter((c) => c.status === 'Available').slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />

        {/* Featured Cars */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Featured <span className="text-gradient-gold">Cars</span>
                </h2>
                <p className="mt-2 text-muted-foreground">Handpicked vehicles from our collection</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:flex">
                <Link to="/cars">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="gold" asChild>
                <Link to="/cars">View All Cars <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <RegionGrid />

        {/* CTA */}
        <section className="py-20 bg-gradient-navy text-center">
          <div className="container mx-auto px-4 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Find Your <span className="text-gradient-gold">Dream Car?</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Browse our collection or get in touch with our team for personalized assistance.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/cars">Browse Now</Link>
              </Button>
              <Button variant="outline-light" size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
