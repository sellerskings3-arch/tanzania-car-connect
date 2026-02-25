import { useParams, Link } from 'react-router-dom';
import { cars, formatPriceFull } from '@/lib/mock-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
  Calendar, Fuel, Gauge, MapPin, Car, Settings, Heart,
  Phone, MessageCircle, ChevronLeft, ChevronRight, ArrowLeft,
} from 'lucide-react';

export default function CarDetailPage() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-display text-2xl font-bold">Car Not Found</h1>
            <Button variant="gold" asChild><Link to="/cars">Browse Cars</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const similarCars = cars.filter((c) => c.id !== car.id && c.brand === car.brand && c.status === 'Available').slice(0, 3);
  if (similarCars.length < 3) {
    const extras = cars.filter((c) => c.id !== car.id && c.brand !== car.brand && c.status === 'Available').slice(0, 3 - similarCars.length);
    similarCars.push(...extras);
  }

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Car, label: 'Brand', value: car.brand },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel', value: car.fuelType },
    { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
    { icon: MapPin, label: 'Region', value: car.region },
  ];

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${car.title} (${formatPriceFull(car.price)}) listed on Kings Sellers.`);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Breadcrumb */}
        <div className="bg-primary py-4">
          <div className="container mx-auto px-4">
            <Link to="/cars" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Cars
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Image Gallery - 3 cols */}
            <div className="lg:col-span-3 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-card shadow-card">
                <img
                  src={car.images[activeImage]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((p) => (p === 0 ? car.images.length - 1 : p - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage((p) => (p === car.images.length - 1 ? 0 : p + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details - 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge
                      className={`text-xs mb-2 ${
                        car.status === 'Available' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                      }`}
                    >
                      {car.status}
                    </Badge>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{car.title}</h1>
                  </div>
                  <button onClick={() => setLiked(!liked)} className="p-2">
                    <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                  </button>
                </div>
                <p className="text-3xl font-display font-bold text-gradient-gold mt-2">
                  {formatPriceFull(car.price)}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-card rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <spec.icon className="w-4 h-4 text-gold" />
                      <span className="text-xs uppercase tracking-wider">{spec.label}</span>
                    </div>
                    <p className="font-semibold text-sm text-card-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-display font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{car.description}</p>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <a href={`https://wa.me/255700000000?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="tel:+255700000000">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Seller
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Similar Cars */}
          {similarCars.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Similar <span className="text-gradient-gold">Cars</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similarCars.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
