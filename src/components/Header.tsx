import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-lg' : 'bg-primary/95 backdrop-blur-md'} border-b border-primary-foreground/10`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
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
              className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-accent'
                  : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5'
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+255700000000" className="flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">+255 700 000 000</span>
          </a>
          <Button variant="gold" size="sm" asChild>
            <Link to="/cars">Browse Cars</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary-foreground p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-accent bg-primary-foreground/10'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="gold" className="mt-3" asChild>
              <Link to="/cars">Browse Cars</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
