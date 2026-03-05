import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCar } from '@/hooks/useCars';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Car, Fuel, Gauge, Calendar, Settings, Package, Phone, Mail,
  Loader2, Check, MapPin, Shield, Zap, Star, MessageCircle,
  ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading } = useCar(id!);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    if (car?.car_images && car.car_images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % car.car_images.length);
    }
  };

  const prevImage = () => {
    if (car?.car_images && car.car_images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + car.car_images.length) % car.car_images.length);
    }
  };

  const parseFeatures = (featuresText: string) => {
    return featuresText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[✓➡️\-•]\s*/, '').trim());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Gari halijapatikana</h2>
            <Link to="/cars">
              <Button>Rudi kwenye Magari</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const specs = [
    { icon: Calendar, label: 'Mwaka', value: car.year },
    { icon: Gauge, label: 'Maili', value: `${car.mileage.toLocaleString()} km` },
    { icon: Fuel, label: 'Mafuta', value: car.fuel_type },
    { icon: Settings, label: 'Gia', value: car.transmission },
    { icon: Package, label: 'Hali', value: car.condition },
    { icon: Car, label: 'Aina', value: car.brand },
  ];

  const additionalSpecs = [
    car.engine && { label: 'Injini', value: car.engine },
    car.engine_capacity && { label: 'Ujazo wa Injini', value: car.engine_capacity },
    car.color && { label: 'Rangi', value: car.color },
    car.seating_capacity && { label: 'Viti', value: `Viti ${car.seating_capacity}` },
    car.country_of_import && { label: 'Imetoka', value: car.country_of_import },
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-4 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 md:mb-6 overflow-x-auto">
            <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap">Nyumbani</Link>
            <span>/</span>
            <Link to="/cars" className="hover:text-primary transition-colors whitespace-nowrap">Magari</Link>
            <span>/</span>
            <span className="text-foreground truncate">{car?.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden border-2 shadow-lg">
                <CardContent className="p-0">
                  {car.car_images && car.car_images.length > 0 ? (
                    <div className="relative">
                      <div className="aspect-video relative overflow-hidden bg-muted group">
                        <img
                          src={car.car_images[selectedImageIndex].image_url}
                          alt={`${car.title} - Picha ${selectedImageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                          {selectedImageIndex + 1} / {car.car_images.length}
                        </div>
                        {car.car_images.length > 1 && (
                          <>
                            <button onClick={prevImage} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card p-2 rounded-full shadow-lg transition-all">
                              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                            </button>
                            <button onClick={nextImage} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card p-2 rounded-full shadow-lg transition-all">
                              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                            </button>
                          </>
                        )}
                      </div>
                      {car.car_images.length > 1 && (
                        <div className="p-3 md:p-4 bg-muted/50">
                          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                            {car.car_images.map((image, index) => (
                              <button
                                key={image.id}
                                onClick={() => setSelectedImageIndex(index)}
                                className={cn(
                                  "aspect-video relative overflow-hidden rounded-lg border-2 transition-all hover:scale-105",
                                  selectedImageIndex === index
                                    ? "border-primary ring-2 ring-primary ring-offset-2 scale-105"
                                    : "border-border hover:border-primary/50"
                                )}
                              >
                                <img src={image.image_url} alt={`Picha ${index + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Car className="h-24 w-24 text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Specifications */}
              <Card className="border-2 shadow-md">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    Vipimo Muhimu
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border hover:shadow-md transition-shadow">
                        <div className="p-1.5 md:p-2 bg-primary rounded-lg shadow-sm">
                          <spec.icon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wide">{spec.label}</p>
                          <p className="font-bold text-foreground text-sm md:text-base mt-0.5">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {additionalSpecs.length > 0 && (
                    <>
                      <Separator className="my-4 md:my-6" />
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                        <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        Maelezo ya Ziada
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {additionalSpecs.map((spec: any) => (
                          <div key={spec.label} className="p-3 rounded-lg bg-muted/50 border">
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wide">{spec.label}</p>
                            <p className="font-semibold text-foreground text-sm md:text-base mt-0.5">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              {car.features && (
                <Card className="border-2 shadow-md">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                      <Star className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      Vipengele & Maalum
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {parseFeatures(car.features).map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10 hover:shadow-sm transition-shadow">
                          <div className="mt-0.5 p-1 bg-accent rounded-full">
                            <Check className="h-3 w-3 text-accent-foreground" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Description */}
              {car.description && (
                <Card className="border-2 shadow-md">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Kuhusu Gari Hili</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {car.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Price & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <Card className="border-2 shadow-xl bg-card">
                  <CardContent className="p-4 md:p-6 space-y-5 md:space-y-6">
                    <div>
                      <h1 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2">{car.title}</h1>
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Badge variant="secondary" className="text-sm">{car.brand}</Badge>
                        <Badge className={cn("text-sm", car.condition === 'New' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600')}>
                          {car.condition === 'New' ? 'Mpya' : 'Imetumika'}
                        </Badge>
                        {car.status === 'available' && (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-sm">Inapatikana</Badge>
                        )}
                      </div>
                      <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Bei</p>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                          {formatPrice(Number(car.price))}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-bold text-base md:text-lg">Wasiliana Nasi</h3>
                      <p className="text-sm text-muted-foreground">
                        Wasiliana nasi kupanga kutembelea au kupata maelezo zaidi kuhusu gari hili
                      </p>
                      
                      <div className="space-y-2">
                        <a href="tel:+255700000000" className="block">
                          <Button className="w-full h-11 md:h-12 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all" size="lg">
                            <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Piga Simu
                          </Button>
                        </a>
                        
                        <a href={`https://wa.me/255700000000?text=Habari, napenda gari ${car.title}`} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="outline" className="w-full h-11 md:h-12 text-sm md:text-base font-semibold border-2 hover:bg-accent/5 hover:border-accent hover:text-accent transition-all" size="lg">
                            <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            WhatsApp
                          </Button>
                        </a>

                        <a href={`mailto:info@kingssellers.com?subject=Kuhusu ${car.title}`} className="block">
                          <Button variant="outline" className="w-full h-11 md:h-12 text-sm md:text-base font-semibold border-2 transition-all" size="lg">
                            <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Barua Pepe
                          </Button>
                        </a>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="font-medium">+255 700 000 000</span>
                        </p>
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="font-medium">info@kingssellers.com</span>
                        </p>
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">Dar es Salaam, Tanzania</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <Card className="border-2 bg-accent/5">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Muuzaji Aliyethibitishwa</p>
                          <p className="text-xs text-muted-foreground">Tunaaminika na wateja 1000+</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Ubora Umethibitishwa</p>
                          <p className="text-xs text-muted-foreground">Limekaguliwa & kuthibitishwa</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500 rounded-lg">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Bei Bora</p>
                          <p className="text-xs text-muted-foreground">Bei za ushindani</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
