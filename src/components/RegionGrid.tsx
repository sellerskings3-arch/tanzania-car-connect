import { Link } from 'react-router-dom';
import { regions } from '@/lib/mock-data';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegionGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
          >
            Our Locations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Browse by <span className="text-gradient-gold">Region</span>
          </motion.h2>
          <p className="mt-3 text-muted-foreground">Find cars available in your Mkoa</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regions.map((region, i) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={`/cars?region=${encodeURIComponent(region.name)}`}
                className="group relative bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50 block"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-card-foreground">{region.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{region.carCount} cars</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
