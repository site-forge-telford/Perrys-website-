import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">EVASON BUILDING CONTRACTORS</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Building excellence across every project. Trusted construction and renovation
              specialists serving the West Midlands covering Birmingham, Telford and Wrekin, Cheshire, and more.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-copper">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Projects', 'Process', 'Testimonials', 'Book Now', 'Progress Report'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleNavClick(item === 'Book Now' ? 'booking' : item === 'Progress Report' ? 'contact' : item.toLowerCase())}
                      className="text-gray-300 hover:text-copper transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-copper">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Extensions & Additions</li>
              <li>Conversions & Renovations</li>
              <li>New Builds</li>
              <li>Kitchens & Bathrooms</li>
              <li>Structural Work</li>
              <li>Project Management</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-copper">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:07470288090"
                  className="flex items-center gap-2 text-gray-300 hover:text-copper transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>07470 288090</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:evasonrenovations@gmail.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-copper transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>evasonrenovations@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>The West Midlands covering Birmingham, Telford and Wrekin, Cheshire, and more</span>
              </li>
            </ul>
            <a
              href="https://www.checkatrade.com/trades/evasonbuildingcontractorltd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-copper hover:bg-copper/90 rounded-lg transition-colors text-white font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              View us on Checkatrade
            </a>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61570746944389"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-taupe hover:bg-copper transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-taupe hover:bg-copper transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-taupe hover:bg-copper transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Evason Building Contractors. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-copper transition-colors">Privacy Policy</button>
              <button className="hover:text-copper transition-colors">Terms of Service</button>
              <button
                onClick={() => handleNavClick('admin-login')}
                className="hover:text-copper transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <a
              href="https://www.site-forge.net/?fbclid=IwY2xjawOiu4VleHRuA2FlbQIxMABicmlkETAwTnBYOVVENUhGUmJQeHZNc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHgahNzyH5o1eBbxZHT9rszp0OGxMTrvZuiCySPfU4dsLvLHaIjSx9AOtSWCH_aem_vliAjFHIg49ATiIbqkSRHg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-copper transition-colors"
            >
              Created by SiteForge
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
