import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Services', path: 'services' },
    { name: 'Projects', path: 'projects' },
    { name: 'Process', path: 'process' },
    { name: 'Testimonials', path: 'testimonials' },
    { name: 'Book Now', path: 'booking' },
    { name: 'Progress Report', path: 'contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <span className={`text-xl md:text-2xl font-bold transition-colors ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}>
              EVASON BUILDING CONTRACTORS
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.path
                    ? 'text-copper'
                    : isScrolled
                    ? 'text-charcoal hover:text-copper'
                    : 'text-white hover:text-copper'
                }`}
              >
                {item.name}
              </button>
            ))}
            <a
              href="tel:07470288090"
              className="flex items-center gap-2 bg-copper text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all hover:shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">07470 288090</span>
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-lg shadow-medium p-6 animate-slide-up">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left text-base font-medium transition-colors ${
                    currentPage === item.path
                      ? 'text-copper'
                      : 'text-charcoal hover:text-copper'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <a
                href="tel:07470288090"
                className="flex items-center justify-center gap-2 bg-copper text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all mt-4"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">07470 288090</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
