import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  { icon: Shield, title: 'Uaminifu & Uwazi', description: 'Tunathibitisha kila tangazo na muuzaji ili kuhakikisha soko salama kwa wote.' },
  { icon: Users, title: 'Mteja Kwanza', description: 'Timu yetu imejitolea kukusaidia kupata gari bora kwa bei nzuri.' },
  { icon: MapPin, title: 'Ujuzi wa Ndani', description: 'Tukiwa katika mikoa 8+, tunaelewa soko la magari Tanzania vizuri.' },
  { icon: TrendingUp, title: 'Tunakua Kila Siku', description: 'Tunaboresha jukwaa letu kila mara ili kukuhudumia vizuri zaidi.' },
];

const milestones = [
  { year: '2020', event: 'Kings Sellers ilianzishwa Dar es Salaam' },
  { year: '2021', event: 'Tulipanuka hadi Arusha, Dodoma & Mbeya' },
  { year: '2022', event: 'Tumefikia lengo la magari 500+ yaliyouzwa' },
  { year: '2023', event: 'Tulizindua jukwaa la mtandaoni & huduma kote nchini' },
  { year: '2024', event: 'Tunahudumia mikoa 8+ kote Tanzania' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl md:text-5xl font-bold text-primary-foreground"
            >
              Kuhusu <span className="text-gradient-gold">Kings Sellers</span>
            </motion.h1>
            <p className="mt-3 text-primary-foreground/60 text-base md:text-lg max-w-2xl">
              Soko la magari linaloaminika Tanzania linalounganisha wanunuzi na magari bora kote nchini.
            </p>
          </div>
        </div>

        {/* Story */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Historia Yetu</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Kujenga Soko la Magari <span className="text-gradient-gold">Bora</span> Tanzania
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Kings Sellers ilianzishwa kwa lengo rahisi: kufanya ununuzi na uuzaji wa magari Tanzania kuwa wa uwazi, rahisi, na wa kuaminika.</p>
                  <p>Kilichoanza kama operesheni ndogo Dar es Salaam kimekua na kuwa jukwaa la kitaifa linalohudumia wanunuzi na wauzaji wa magari katika mikoa 8+. Tumesaidia mamia ya Watanzania kupata gari lao bora.</p>
                  <p>Timu yetu ya wataalamu wenye uzoefu inaelewa soko la magari la ndani na imejitolea kutoa uzoefu bora kwa kila mteja.</p>
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
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Maadili Yetu</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Tunasimamia <span className="text-gradient-gold">Nini</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-5 md:p-6 shadow-card border border-border/50 text-center"
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
        <section className="py-16 md:py-20 bg-gradient-navy text-center">
          <div className="container mx-auto px-4 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Tayari <span className="text-gradient-gold">Kuanza?</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Tazama magari yetu mapya au wasiliana na timu yetu leo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/cars">Tazama Magari <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="outline-light" size="lg" asChild>
                <Link to="/contact">Wasiliana Nasi</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
