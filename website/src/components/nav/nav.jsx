import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Building2, Users, Handshake, TrendingUpDown, PhoneCall, Mail, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/properties', label: 'Properties', icon: Building2 },
    { path: '/about', label: 'About', icon: Users },
    { path: '/consulting', label: 'Consulting', icon: Handshake },
    { path: '/market', label: 'Market Analysis', icon: TrendingUpDown },
    { path: '/contact', label: 'Contact', icon: PhoneCall },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="w-full bg-stone-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+263772329569" className="flex items-center hover:text-stone-300">
              <Phone className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">+263 772 329 569</span>
            </a>
            <a href="mailto:info@hsp.co.zw" className="flex items-center hover:text-stone-300">
              <Mail className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">info@hsp.co.zw</span>
            </a>
          </div>
          <div className="text-xs hidden md:block">
            Suite 2, First Floor Ballantyne Park Shopping Centre, Harare
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="sticky top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                {/* Replace with actual logo image */}
                <img 
                  src="/logo.png" 
                  alt="House of Stone Properties" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}  
                />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-stone-900 border-b-2 border-amber-800'
                        : 'text-stone-600 hover:text-amber-800'
                    } flex items-center space-x-1`
                  }
                >
                  <link.icon className="w-4 h-4 mr-1" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center text-stone-600 hover:text-amber-800"
                aria-label="Toggle menu"
              >
                <span className="mr-2 text-sm font-medium">Menu</span>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-amber-800 text-white'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-amber-800'
                    } space-x-2`
                  }
                >
                  <link.icon className="w-5 h-5 mr-2" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;