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
import Development from "./components/properties/developments";
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
      <div className="century-gothic min-h-screen bg-neutral-50 ">
        <style jsx>{`
          @font-face {
            font-family: "Gravesend Sans";
            src: url("./fonts/fonnts.com-Gravesend_Sans_Light.otf")
              format("opentype");
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "Gravesend Sans";
            src: url("./fonts/fonnts.com-Gravesend_Sans_Medium.otf")
              format("opentype");
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "Gravesend Sans";
            src: url("./fonts/fonnts.com-Gravesend_Sans_Bold.otf")
              format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }

          /* Century Gothic Font Face */
          @font-face {
            font-family: "Century Gothic Custom";
            src: url("./fonts/weezerfont.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "Gellix";
            src: url("./fonts/Gellix-Light.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Gellix";
            src: url("./fonts/Gellix-Regular.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }

          /* GravitaHUM Font Face */
          @font-face {
            font-family: "GravitaHUM";
            src: url("./fonts/gravita/GravitaHUM-Thin-BF657928839dbb0.otf")
              format("opentype");
            font-weight: 100;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("./fonts/gravita/GravitaHUMItalic-Thin-BF657928846675fc.otf")
              format("opentype");
            font-weight: 100;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-ExtraLight-BF657928834054d.otf")
              format("opentype");
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-ExtraLight-BF657928845454584.otf")
              format("opentype");
            font-weight: 200;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-Light-BF657928883617e7.otf")
              format("opentype");
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-Light-BF657928843d22e.otf")
              format("opentype");
            font-weight: 300;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-Regular-BF657928883558f8b.otf")
              format("opentype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-Regular-BF657928883913da.otf")
              format("opentype");
            font-weight: 400;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-Medium-BF657928826638d1.otf")
              format("opentype");
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-Medium-BF657928845f94f.otf")
              format("opentype");
            font-weight: 500;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-Bold-BF657928881d425d.otf")
              format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-Bold-BF657928845732a.otf")
              format("opentype");
            font-weight: 700;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-ExtraBold-BF657928822e711f.otf")
              format("opentype");
            font-weight: 800;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-ExtraBold-BF657928845bee6.otf")
              format("opentype");
            font-weight: 800;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-Black-BF657928175673.otf")
              format("opentype");
            font-weight: 900;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-Black-BF657928846664bc.otf")
              format("opentype");
            font-weight: 900;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUM-Hairline-BF657928833ebb5f.otf")
              format("opentype");
            font-weight: 100;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "GravitaHUM";
            src: url("/fonts/gravita/GravitaHUMItalic-Hairline-BF657928847167f.otf")
              format("opentype");
            font-weight: 100;
            font-style: italic;
            font-display: swap;
          }
          /* Font utility classes */
          .gravesend-sans {
            font-family: "Gravesend Sans", "Inter", "Segoe UI", Tahoma, Geneva,
              Verdana, sans-serif;
          }

          .roboto-font {
            font-family: "Roboto", "Inter", "Segoe UI", Tahoma, Geneva, Verdana,
              sans-serif;
          }

          .century-gothic {
            font-family: "Century Gothic Custom", "Century Gothic", "Arial",
              sans-serif;
          }

          .gellix-font {
            font-family: "Gellix", "Inter", "Segoe UI", Tahoma, Geneva, Verdana,
              sans-serif;
          }

          .gravita-font {
            font-family: "GravitaHUM", "Inter", "Segoe UI", Tahoma, Geneva,
              Verdana, sans-serif;
          }

          body {
            overflow-x: hidden;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
        `}</style>
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
            <Route path="/development" element={<Development />} />
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
