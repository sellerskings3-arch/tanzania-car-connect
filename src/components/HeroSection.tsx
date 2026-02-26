import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Shield, Car, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80',
    tagline: 'Tunatoa Mkopo wa Gari',
    title: 'Lipa Kidogo Kidogo',
    subtitle: 'Nunua gari lako kwa malipo ya awamu. Riba nafuu, mchakato rahisi.',
    cta: 'Angalia Magari',
    accent: 'from-blue-500/80 to-blue-900/90',
  },
  {
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400&q=80',
    tagline: 'Premium Selection',
    title: 'Magari Bora Tanzania',
    subtitle: 'Toyota, BMW, Mercedes-Benz na mengine. Magari yaliyokaguliwa na wataalamu.',
    cta: 'Tazama Sasa',
    accent: 'from-primary/80 to-primary/95',
  },
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80',
    tagline: 'Countrywide Delivery',
    title: 'Tunafika Kila Mkoa',
    subtitle: 'Dar es Salaam, Arusha, Dodoma, Mbeya, Mwanza — tupo karibu nawe.',
    cta: 'Chagua Mkoa',
    accent: 'from-emerald-700/80 to-emerald-900/90',
  },
  {
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1400&q=80',
    tagline: 'Trade-In Available',
    title: 'Badilisha Gari Lako',
    subtitle: 'Uza gari lako la zamani na upate jipya kwa bei nafuu. Mchakato wa haraka.',
    cta: 'Wasiliana Nasi',
    accent: 'from-amber-700/80 to-amber-900/90',
  },
];

const promoCards = [
  {
    icon: CreditCard,
    title: 'Mkopo wa Gari',
    description: 'Malipo ya awamu hadi miezi 60',
    color: 'bg-blue-500',
  },
  {
    icon: Shield,
    title: 'Bima Kamili',
    description: 'Comprehensive coverage included',
    color: 'bg-emerald-500',
  },
  {
    icon: Car,
    title: 'Magari 150+',
    description: 'Chaguo pana la magari bora',
    color: 'bg-amber-500',
  },
  {
    icon: CheckCircle,
    title: 'Yamekaguliwa',
    description: 'Inspected by certified mechanics',
    color: 'bg-purple-500',
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            {/* Left: Text & Search */}
            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentSlide}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-accent text-sm font-semibold tracking-wide uppercase">
                      {slide.tagline}
                    </span>
                  </div>

                  <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => navigate('/cars')}
                    className="group"
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </AnimatePresence>


              {/* Slide Indicators */}
              <div className="flex items-center gap-2 pt-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentSlide
                        ? 'w-10 bg-accent'
                        : 'w-4 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Promo Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-2 hidden lg:grid grid-cols-2 gap-3"
            >
              {promoCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 hover:bg-white/15 transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-10 mt-10 pt-8 border-t border-white/10"
          >
            {[
              { value: '150+', label: 'Magari Yanapatikana' },
              { value: '8', label: 'Mikoa' },
              { value: '500+', label: 'Magari Yameuzwa' },
              { value: '98%', label: 'Wateja Wameridhika' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
