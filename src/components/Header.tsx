import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Car, Menu, X, Phone, User, LogOut, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { brands, regions } from '@/lib/mock-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Nyumbani', to: '/' },
  { label: 'Magari', to: '/cars' },
  { label: 'Kuhusu Sisi', to: '/about' },
  { label: 'Wasiliana', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchBrand, setSearchBrand] = useState('all');
  const [searchRegion, setSearchRegion] = useState('all');
  const [searchTransmission, setSearchTransmission] = useState('all');
  const [searchMinPrice, setSearchMinPrice] = useState('');
  const [searchMaxPrice, setSearchMaxPrice] = useState('');
  const [searchMinYear, setSearchMinYear] = useState('');
  const [searchMaxYear, setSearchMaxYear] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchRegion !== 'all') params.set('region', searchRegion);
    if (searchBrand !== 'all') params.set('brand', searchBrand);
    if (searchTransmission !== 'all') params.set('transmission', searchTransmission);
    if (searchMinPrice) params.set('minPrice', searchMinPrice);
    if (searchMaxPrice) params.set('maxPrice', searchMaxPrice);
    if (searchMinYear) params.set('minYear', searchMinYear);
    if (searchMaxYear) params.set('maxYear', searchMaxYear);
    navigate(`/cars?${params.toString()}`);
    setSearchOpen(false);
  };

  const resetSearch = () => {
    setSearchBrand('all');
    setSearchRegion('all');
    setSearchTransmission('all');
    setSearchMinPrice('');
    setSearchMaxPrice('');
    setSearchMinYear('');
    setSearchMaxYear('');
  };

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

        {/* CTA + Search */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary-foreground/70 hover:text-accent hover:bg-primary-foreground/5 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Tafuta</span>
          </button>

          <a href="tel:+255700000000" className="flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">+255 700 000 000</span>
          </a>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Akaunti</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Akaunti Yangu</span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard" className="cursor-pointer">Dashibodi</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Toka
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Ingia</Link>
              </Button>
              <Button variant="gold" size="sm" asChild>
                <Link to="/signup">Jisajili</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="text-primary-foreground p-1"
            onClick={() => { setSearchOpen(!searchOpen); setMobileOpen(false); }}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="text-primary-foreground p-1"
            onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false); }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      {searchOpen && (
        <div className="bg-primary border-t border-primary-foreground/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Aina ya Gari</label>
                <div className="relative">
                  <select value={searchBrand} onChange={(e) => setSearchBrand(e.target.value)} className="w-full h-10 px-3 pr-8 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-sm text-primary-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-accent focus:outline-none">
                    <option value="all" className="text-foreground">Aina Zote</option>
                    {brands.map((b) => <option key={b} value={b} className="text-foreground">{b}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Mkoa</label>
                <div className="relative">
                  <select value={searchRegion} onChange={(e) => setSearchRegion(e.target.value)} className="w-full h-10 px-3 pr-8 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-sm text-primary-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-accent focus:outline-none">
                    <option value="all" className="text-foreground">Mikoa Yote</option>
                    {regions.map((r) => <option key={r.id} value={r.name} className="text-foreground">{r.name}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Gia</label>
                <div className="relative">
                  <select value={searchTransmission} onChange={(e) => setSearchTransmission(e.target.value)} className="w-full h-10 px-3 pr-8 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-sm text-primary-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-accent focus:outline-none">
                    <option value="all" className="text-foreground">Zote</option>
                    <option value="Manual" className="text-foreground">Manual</option>
                    <option value="Automatic" className="text-foreground">Automatic</option>
                    <option value="CVT" className="text-foreground">CVT</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Bei ya Chini</label>
                <Input type="number" placeholder="Mfano: 5,000,000" value={searchMinPrice} onChange={(e) => setSearchMinPrice(e.target.value)} className="h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Bei ya Juu</label>
                <Input type="number" placeholder="Mfano: 50,000,000" value={searchMaxPrice} onChange={(e) => setSearchMaxPrice(e.target.value)} className="h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Mwaka (Tangu)</label>
                <Input type="number" placeholder="Mfano: 2015" value={searchMinYear} onChange={(e) => setSearchMinYear(e.target.value)} className="h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">Mwaka (Hadi)</label>
                <Input type="number" placeholder="Mfano: 2024" value={searchMaxYear} onChange={(e) => setSearchMaxYear(e.target.value)} className="h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30" />
              </div>
              <Button variant="gold" className="h-10" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Tafuta
              </Button>
              <Button variant="ghost" className="h-10 text-primary-foreground/60" onClick={resetSearch}>
                Futa
              </Button>
            </div>
          </div>
        </div>
      )}

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
            
            {user ? (
              <div className="mt-3 pt-3 border-t border-primary-foreground/10">
                <div className="px-4 py-2 text-xs text-primary-foreground/60">{user.email}</div>
                <Link to="/admin/dashboard">
                  <Button variant="outline" className="w-full mb-2">Dashibodi</Button>
                </Link>
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Toka
                </Button>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-primary-foreground/10 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Ingia</Link>
                </Button>
                <Button variant="gold" className="w-full" asChild>
                  <Link to="/signup">Jisajili</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
