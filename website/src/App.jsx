// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

// Layout Components
import Navbar from "./components/nav/nav";
import Footer from "./components/footer/footer";
import MobileBottomNav from "./components/nav/MobileBottomNav";
import SessionExpiryHandler from "./utils/sessionExpiry";

// Auth is handled via modals in the Navbar component

// Page Components
import EnhancedHomepage from "./components/home/home";
import EnhancedContact from "./components/contact/contact";
import MortgageCalculator from "./components/mortgage/morgage";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ListPropertyPage from "./components/properties/listwithus";
import PropertyValuationPage from "./components/properties/valuation";
import SellingGuidePage from "./components/properties/guide";
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
import Developments from "./components/about/developments";
import Industrial from "./components/properties/industrial";
import Commercial from "./components/properties/commercial";
import Development from "./components/properties/developments";
import SavedProperties from "./components/properties/SavedProperties";
import ToastContainer from "./components/ui/Toast";
import NetworkStatus from "./components/ui/NetworkStatus";

// Redux
import { checkAuth } from "./redux/slices/authSlice";
import { setStore } from "./utils/api";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer className="hidden lg:block" />
      <MobileBottomNav />
    </>
  );
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

  return (
    <Router>
      <ToastContainer />
      <NetworkStatus />
      <div className="century-gothic min-h-screen bg-neutral-50 ">
        <ScrollToTop />
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<EnhancedHomepage />} />
              <Route path="/sale" element={<Properties />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/guide" element={<SellingGuidePage />} />
              <Route path="/rent" element={<RentalProperties />} />
              <Route path="/list" element={<ListPropertyPage />} />
              <Route path="/valuation" element={<PropertyValuationPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/shared/:token" element={<PropertyDetail />} />
              <Route path="/saved" element={<SavedProperties />} />
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
              <Route path="/development" element={<Development />} />
              <Route path="/commercial" element={<Commercial />} />
              <Route path="/industrial" element={<Industrial />} />
            </Routes>
          </AnimatePresence>
        </Layout>
        <SessionExpiryHandler
          dispatch={dispatch}
          sessionExpired={sessionExpired}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Router>
  );
}

export default App;
