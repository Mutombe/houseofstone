// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/nav/nav';
import EnhancedHomepage from './components/home/home';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import PropertyManagement from './components/properties/management';
import MarketAnalysis from './components/properties/market';
import Consulting from './components/properties/consulting';
import PropertySales from './components/properties/sales';
import PropertyDashboard from './components/dashboards/admin';
import Properties from './components/properties/properties';
import PropertyDetail from './components/properties/details';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<EnhancedHomepage />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/management" element={<PropertyManagement />} />
            <Route path="/market" element={<MarketAnalysis />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/sales" element={<PropertySales />} />
            <Route path="/admin" element={<PropertyDashboard />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;