import { Link } from 'react-router-dom';
import { Car, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Car className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Kings <span className="text-gradient-gold">Sellers</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Tanzania's premier car marketplace. Quality vehicles across all regions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/cars" className="hover:text-gold transition-colors">Browse Cars</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Our Regions</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {['Dar es Salaam', 'Arusha', 'Dodoma', 'Mbeya', 'Mwanza'].map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-gold/60" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold/60" />
                +255 700 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold/60" />
                info@kingssellers.co.tz
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold/60" />
                Dar es Salaam, Tanzania
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Kings Sellers. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
