import { Shield, Award, MapPin, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Wauzaji Waliothibitishwa',
    description: 'Kila muuzaji anachunguzwa kwa makini ili kukuhakikishia uzoefu wa kuaminika.',
  },
  {
    icon: Award,
    title: 'Dhamana ya Ubora',
    description: 'Magari yote yanakaguliwa kabla ya kutangazwa kwenye jukwaa letu.',
  },
  {
    icon: MapPin,
    title: 'Tupo Kote Nchini',
    description: 'Magari yanapatikana katika mikoa 8+ Tanzania, kutoka Dar hadi Zanzibar.',
  },
  {
    icon: Headphones,
    title: 'Msaada 24/7',
    description: 'Timu yetu iko tayari kukusaidia kupata gari lako bora wakati wowote.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
          >
            Kwa Nini Kings Sellers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Njia ya Kuaminika <span className="text-gradient-gold">Kununua Magari</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-card rounded-2xl p-5 md:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 text-center border border-border/50"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-accent/20 transition-colors">
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
