import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  { icon: Shield, title: 'Trust & Transparency', description: 'We verify every listing and seller to ensure a safe marketplace for all.' },
  { icon: Users, title: 'Customer First', description: 'Our team is dedicated to helping you find the perfect car at the best price.' },
  { icon: MapPin, title: 'Local Expertise', description: 'With presence across 8+ regions, we understand the Tanzanian car market.' },
  { icon: TrendingUp, title: 'Growth Driven', description: 'We continuously improve our platform to serve you better every day.' },
];

const milestones = [
  { year: '2020', event: 'Kings Sellers founded in Dar es Salaam' },
  { year: '2021', event: 'Expanded to Arusha, Dodoma & Mbeya' },
  { year: '2022', event: 'Reached 500+ cars sold milestone' },
  { year: '2023', event: 'Launched online platform & nationwide coverage' },
  { year: '2024', event: 'Serving 8+ regions across Tanzania' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl md:text-5xl font-bold text-primary-foreground"
            >
              About <span className="text-gradient-gold">Kings Sellers</span>
            </motion.h1>
            <p className="mt-3 text-primary-foreground/60 text-lg max-w-2xl">
              Tanzania's trusted car marketplace connecting buyers with quality vehicles across the nation.
            </p>
          </div>
        </div>

        {/* Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Building Tanzania's <span className="text-gradient-gold">Premier</span> Car Marketplace
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Kings Sellers was founded with a simple mission: to make buying and selling cars in Tanzania transparent, easy, and trustworthy.</p>
                  <p>What started as a small operation in Dar es Salaam has grown into a nationwide platform serving car buyers and sellers across 8+ regions. We've helped hundreds of Tanzanians find their perfect vehicle.</p>
                  <p>Our team of experienced professionals understands the local car market and is committed to providing an exceptional experience for every customer.</p>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-0"
              >
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-accent">{m.year}</span>
                      </div>
                      {i < milestones.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                    </div>
                    <p className="text-foreground pt-2.5 text-sm">{m.event}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Our Values</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                What We <span className="text-gradient-gold">Stand For</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <v.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-card-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-navy text-center">
          <div className="container mx-auto px-4 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to <span className="text-gradient-gold">Get Started?</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Browse our latest inventory or reach out to our team today.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/cars">Browse Cars <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="outline-light" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
