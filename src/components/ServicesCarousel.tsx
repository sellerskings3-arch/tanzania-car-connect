import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CreditCard, Shield, Wrench, FileCheck } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: CreditCard,
    title: 'Tunatoa Mkopo',
    subtitle: 'Mkopo wa Gari Unapatikana',
    description: 'Pata mkopo wa gari lako la ndoto. Tunafanya kazi na benki na taasisi za fedha ili kukusaidia kupata mkopo wa bei nzuri. Malipo ya awamu kwa miezi 12-60.',
    features: ['Riba ya chini', 'Malipo ya awamu', 'Hakuna ada za ziada', 'Utaratibu rahisi'],
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-500/10 to-blue-600/10',
  },
  {
    id: 2,
    icon: Shield,
    title: 'Bima ya Gari',
    subtitle: 'Bima Kamili ya Kina',
    description: 'Tunakusaidia kupata bima bora kwa gari lako. Ushirikiano na kampuni za bima zinazotambulika nchini kote.',
    features: ['Bima kamili', 'Bei nafuu', 'Huduma ya haraka', 'Malipo rahisi'],
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-500/10 to-green-600/10',
  },
  {
    id: 3,
    icon: Wrench,
    title: 'Huduma ya Matengenezo',
    subtitle: 'Matengenezo na Huduma',
    description: 'Garaji zetu za kuaminika zinakusaidia kutunza gari lako vizuri. Fundi stadi na vifaa vya kisasa.',
    features: ['Fundi wataalam', 'Vipuri halisi', 'Bei za haki', 'Huduma ya haraka'],
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-500/10 to-orange-600/10',
  },
  {
    id: 4,
    icon: FileCheck,
    title: 'Usajili wa Gari',
    subtitle: 'Huduma za Usajili',
    description: 'Tunakusaidia na usajili wa gari, transfer of ownership, na nyaraka zote muhimu. Huduma ya haraka na ya kuaminika.',
    features: ['Usajili wa haraka', 'Transfer ya jina', 'Leseni za gari', 'Ushauri wa bure'],
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-500/10 to-purple-600/10',
  },
];

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextService();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextService = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToService = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  const currentService = services[currentIndex];

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
          >
            Huduma Zetu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Zaidi ya Kuuza <span className="text-gradient-gold">Magari</span>
          </motion.h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tunakupa huduma kamili kutoka ununuzi hadi matengenezo
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[500px] sm:min-h-[450px] md:min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className={`bg-gradient-to-br ${currentService.bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-border/50 relative overflow-hidden h-full`}>
                  <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 opacity-10">
                    <currentService.icon className="w-full h-full" />
                  </div>

                  <div className="relative">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                      <div>
                        <div className={`w-16 md:w-20 h-16 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${currentService.gradient} flex items-center justify-center shadow-xl mb-4 md:mb-6`}>
                          <currentService.icon className="w-8 md:w-10 h-8 md:h-10 text-white" />
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                          {currentService.title}
                        </h3>
                        <p className="text-accent font-semibold mb-3 md:mb-4">{currentService.subtitle}</p>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-lg">
                          {currentService.description}
                        </p>
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        {currentService.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-border/30"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${currentService.gradient}`} />
                            <span className="text-card-foreground font-medium text-sm md:text-base">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
            <button
              onClick={prevService}
              className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-card hover:bg-accent/20 border border-border/50 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Huduma iliyopita"
            >
              <ChevronLeft className="w-5 md:w-6 h-5 md:h-6 text-foreground" />
            </button>

            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToService(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === index ? 'w-10 bg-accent' : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Nenda huduma ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextService}
              className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-card hover:bg-accent/20 border border-border/50 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Huduma inayofuata"
            >
              <ChevronRight className="w-5 md:w-6 h-5 md:h-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
