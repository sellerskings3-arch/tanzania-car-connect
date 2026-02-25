import { Shield, Award, MapPin, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Verified Sellers',
    description: 'Every dealer is thoroughly vetted to ensure you get a trustworthy experience.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'All listed vehicles undergo a quality check before being published.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Coverage',
    description: 'Cars available across 8+ regions in Tanzania, from Dar to Zanzibar.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is always ready to help you find your perfect vehicle.',
  },
];

export default function WhyChooseUs() {
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
            Why Kings Sellers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            The Trusted Way to <span className="text-gradient-gold">Buy Cars</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 text-center border border-border/50"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
