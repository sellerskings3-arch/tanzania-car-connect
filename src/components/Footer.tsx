import { Link } from 'react-router-dom';
import { Car, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <Car className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Kings <span className="text-gradient-gold">Sellers</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Soko la magari linaloaminika Tanzania. Magari bora katika mikoa yote, tunaaminika na maelfu ya wateja.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-accent">Viungo vya Haraka</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              {[
                { to: '/cars', label: 'Tazama Magari' },
                { to: '/about', label: 'Kuhusu Sisi' },
                { to: '/contact', label: 'Wasiliana' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to} className="hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-accent">Mikoa Yetu</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              {['Dar es Salaam', 'Arusha', 'Dodoma', 'Mbeya', 'Mwanza'].map((r) => (
                <li key={r}>
                  <Link to={`/cars?region=${encodeURIComponent(r)}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <MapPin className="w-3 h-3 text-accent/60" />
                    {r}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-accent">Wasiliana Nasi</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent/60" />
                +255 700 000 000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent/60" />
                info@kingssellers.co.tz
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-accent/60" />
                Dar es Salaam, Tanzania
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Kings Sellers. Haki zote zimehifadhiwa.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-foreground transition-colors">Sera ya Faragha</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Masharti ya Huduma</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
