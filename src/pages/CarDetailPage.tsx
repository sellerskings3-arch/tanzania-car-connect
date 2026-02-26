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
  Car, 
  Fuel, 
  Gauge, 
  Calendar, 
  Settings, 
  Package, 
  Phone, 
  Mail,
  ArrowLeft,
  Loader2,
  Check,
  MapPin,
  Shield,
  Zap,
  Star,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading } = useCar(id!);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
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
            <h2 className="text-2xl font-bold mb-4">Car not found</h2>
            <Link to="/cars">
              <Button>Back to Cars</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
    { icon: Fuel, label: 'Fuel Type', value: car.fuel_type },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Package, label: 'Condition', value: car.condition },
    { icon: Car, label: 'Brand', value: car.brand },
  ];

  // Additional specs (only show if they exist)
  const additionalSpecs = [
    car.engine && { label: 'Engine', value: car.engine },
    car.engine_capacity && { label: 'Engine Capacity', value: car.engine_capacity },
    car.color && { label: 'Color', value: car.color },
    car.seating_capacity && { label: 'Seating Capacity', value: `${car.seating_capacity} seats` },
    car.country_of_import && { label: 'Imported From', value: car.country_of_import },
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main className="flex-1 py-6 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cars" className="hover:text-primary transition-colors">Cars</Link>
            <span>/</span>
            <span className="text-foreground">{car?.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden border-2 shadow-lg">
                <CardContent className="p-0">
                  {car.car_images && car.car_images.length > 0 ? (
                    <div className="relative">
                      {/* Main Image */}
                      <div className="aspect-video relative overflow-hidden bg-slate-900 group">
                        <img
                          src={car.car_images[selectedImageIndex].image_url}
                          alt={`${car.title} - Image ${selectedImageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Image Counter Badge */}
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                          {selectedImageIndex + 1} / {car.car_images.length}
                        </div>

                        {/* Navigation Arrows */}
                        {car.car_images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </>
                        )}

                        {/* Fullscreen Button */}
                        <button
                          onClick={() => setIsLightboxOpen(true)}
                          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Maximize2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Thumbnail Gallery */}
                      {car.car_images.length > 1 && (
                        <div className="p-4 bg-slate-50">
                          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                            {car.car_images.map((image, index) => (
                              <button
                                key={image.id}
                                onClick={() => setSelectedImageIndex(index)}
                                className={cn(
                                  "aspect-video relative overflow-hidden rounded-lg border-2 transition-all hover:scale-105 hover:shadow-md",
                                  selectedImageIndex === index
                                    ? "border-primary ring-2 ring-primary ring-offset-2 scale-105"
                                    : "border-slate-200 hover:border-primary/50"
                                )}
                              >
                                <img
                                  src={image.image_url}
                                  alt={`${car.title} - Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Car className="h-24 w-24 text-slate-400" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Specifications - Highlighted */}
              <Card className="border-2 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Key Specifications
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {specs.map((spec) => (
                      <div 
                        key={spec.label} 
                        className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border hover:shadow-md transition-shadow"
                      >
                        <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-sm">
                          <spec.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{spec.label}</p>
                          <p className="font-bold text-foreground mt-1">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {additionalSpecs.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Additional Details
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {additionalSpecs.map((spec: any) => (
                          <div key={spec.label} className="p-3 rounded-lg bg-slate-50 border">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{spec.label}</p>
                            <p className="font-semibold text-foreground mt-1">{spec.value}</p>
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
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Star className="h-6 w-6 text-amber-500" />
                      Features & Highlights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {parseFeatures(car.features).map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:shadow-sm transition-shadow"
                        >
                          <div className="mt-0.5 p-1 bg-green-500 rounded-full">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Description */}
              {car.description && (
                <Card className="border-2 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About This Vehicle</h2>
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
                {/* Price Card */}
                <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold mb-3 line-clamp-2">{car.title}</h1>
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Badge variant="secondary" className="text-sm">{car.brand}</Badge>
                        <Badge 
                          className={cn(
                            "text-sm",
                            car.condition === 'New' 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-blue-500 hover:bg-blue-600'
                          )}
                        >
                          {car.condition}
                        </Badge>
                        {car.status === 'available' && (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-sm">
                            Available
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Price</p>
                        <p className="text-3xl md:text-4xl font-bold text-primary">
                          {formatPrice(Number(car.price))}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Get In Touch</h3>
                      <p className="text-sm text-muted-foreground">
                        Contact us to schedule a viewing or get more information about this vehicle
                      </p>
                      
                      <div className="space-y-2">
                        <a href="tel:+255700000000" className="block">
                          <Button className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all" size="lg">
                            <Phone className="mr-2 h-5 w-5" />
                            Call Now
                          </Button>
                        </a>
                        
                        <a href={`https://wa.me/255700000000?text=Hi, I'm interested in ${car.title}`} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-all" size="lg">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            WhatsApp
                          </Button>
                        </a>

                        <a href={`mailto:info@kingssellers.com?subject=Inquiry about ${car.title}`} className="block">
                          <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 transition-all" size="lg">
                            <Mail className="mr-2 h-5 w-5" />
                            Email Us
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
                <Card className="border-2 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Verified Seller</p>
                          <p className="text-xs text-muted-foreground">Trusted by 1000+ customers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Quality Assured</p>
                          <p className="text-xs text-muted-foreground">Inspected & certified</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500 rounded-lg">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Best Price</p>
                          <p className="text-xs text-muted-foreground">Competitive pricing</p>
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
