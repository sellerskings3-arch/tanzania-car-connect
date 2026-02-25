import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RegionGrid from '@/components/RegionGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import CarCard from '@/components/CarCard';
import { cars } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const featuredCars = cars.filter((c) => c.status === 'Available').slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />

        <WhyChooseUs />

        {/* Featured Cars */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
                >
                  Our Collection
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-3xl md:text-4xl font-bold text-foreground"
                >
                  Featured <span className="text-gradient-gold">Cars</span>
                </motion.h2>
                <p className="mt-2 text-muted-foreground">Handpicked vehicles from our collection</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:flex gap-1 text-accent hover:text-accent/80">
                <Link to="/cars">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Button variant="gold" asChild>
                <Link to="/cars">View All Cars <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <RegionGrid />

        {/* CTA */}
        <section className="py-24 bg-gradient-navy text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--gold) / 0.2) 0%, transparent 50%)' }} />
          <div className="relative container mx-auto px-4 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl font-bold text-primary-foreground"
            >
              Ready to Find Your <span className="text-gradient-gold">Dream Car?</span>
            </motion.h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto text-lg">
              Browse our collection or get in touch with our team for personalized assistance.
            </p>
            <div className="flex justify-center gap-4">
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
