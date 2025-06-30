// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">House of Stone</h3>
            <p className="text-stone-400">
              Luxury real estate solutions for discerning clients.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-stone-400">
                <Link to="/sales">Property Sales</Link>
              </li>
              <li className="text-stone-400">
                <Link to="/management">Property Management</Link>
              </li>
              <li className="text-stone-400">
                <Link to="/consulting">Property Consulting</Link>
              </li>
              <li className="text-stone-400">
                <Link to="/market">Market Analysis</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-stone-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-stone-800 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
              />
              <button
                type="submit"
                className="w-full bg-stone-700 px-4 py-2 rounded-lg hover:bg-stone-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} House of Stone. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
