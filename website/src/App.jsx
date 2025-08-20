// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/nav/nav";
import EnhancedHomepage from "./components/home/home";
import EnhancedContact from "./components/contact/contact";
import MortgageCalculator from "./components/mortgage/morgage";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ListPropertyPage from "./components/properties/listwithus";
import PropertyValuationPage from "./components/properties/valuation";
import SellingGuidePage from "./components/properties/guide";
import Footer from "./components/footer/footer";
import Downloads from "./components/about/downloads";
import PropertyManagement from "./components/properties/management";
import Management from "./components/about/management";
import MarketAnalysis from "./components/properties/market";
import Consulting from "./components/properties/consulting";
import PropertySales from "./components/properties/sales";
import PropertyDashboard from "./components/dashboards/admin";
import AgentsPage from "./components/agents/agents";
import Properties from "./components/properties/properties";
import RentalProperties from "./components/properties/forrent";
import PropertyDetail from "./components/properties/details";
import OurStaff from "./components/about/staff";
import Founders from "./components/about/founder";
import CitySuburbs from "./components/neighborhood/suburbs";
import SuburbDetail from "./components/neighborhood/detail";
import CitiesOverview from "./components/neighborhood/neighborhood";
import AgentDashboard from "./components/dashboards/agent";
import { setStore } from "./utils/api";
import { useEffect } from "react";
import Developments from "./components/about/developments";
import { useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import SessionExpiryHandler from "./utils/sessionExpiry";
import { useDispatch } from "react-redux";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App({ store }) {
  const { sessionExpired, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  //useEffect(() => {
    // Set store reference for API interceptors
    //setStore(store);

    // Check authentication status on app load
    //dispatch(checkAuth());
  //}, [store, dispatch]);

  // Handle navigation (replace with your router navigation)
  const handleNavigation = (path, state = {}) => {
    // Replace this with your actual navigation logic
    // For React Router: navigate(path, { state });
    // For Next.js: router.push({ pathname: path, query: state });
    console.log("Navigate to:", path, "with state:", state);
    window.location.href = path;
  };
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<EnhancedHomepage />} />
            <Route path="/sale" element={<Properties />} />
            <Route path="/guide" element={<SellingGuidePage />} />
            <Route path="/rent" element={<RentalProperties />} />
            <Route path="/list" element={<ListPropertyPage />} />
            <Route path="/valuation" element={<PropertyValuationPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<EnhancedContact />} />
            <Route path="/management" element={<PropertyManagement />} />
            <Route path="/about/management" element={<Management />} />
            <Route path="/market" element={<MarketAnalysis />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/sales" element={<PropertySales />} />
            <Route path="/admin" element={<PropertyDashboard />} />
            <Route path="/mortgage" element={<MortgageCalculator />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/staff" element={<OurStaff />} />
            <Route path="/founders" element={<Founders />} />
            <Route path="/neighborhoods" element={<CitiesOverview />} />
            <Route path="/neighborhoods/:cityName" element={<CitySuburbs />} />
            <Route
              path="/neighborhoods/:cityName/:suburbName"
              element={<SuburbDetail />}
            />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/developments" element={<Developments />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <SessionExpiryHandler
          dispatch={dispatch}
          sessionExpired={sessionExpired}
          isAuthenticated={isAuthenticated}
          onNavigate={handleNavigation}
        />
      </div>
    </Router>
  );
}

export default App;
