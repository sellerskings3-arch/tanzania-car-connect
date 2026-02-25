import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Car, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Cars', to: '/cars' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
            <Car className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
            Kings <span className="text-gradient-gold">Sellers</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-gold bg-primary-foreground/10'
                  : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+255700000000" className="flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
            <Phone className="w-4 h-4" />
            +255 700 000 000
          </a>
          <Button variant="gold" size="sm" asChild>
            <Link to="/cars">Browse Cars</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-gold bg-primary-foreground/10'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="gold" className="mt-3" asChild>
              <Link to="/cars" onClick={() => setMobileOpen(false)}>Browse Cars</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
