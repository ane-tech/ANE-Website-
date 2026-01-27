import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlaceholderPage from './pages/Placeholder';
import ModelDetail from './pages/ModelDetail';
import Payment from './pages/Payment';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import DesignPage from './pages/Design';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import IndustryPage from './pages/IndustryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Login from './pages/Login';
import ServicesSection from './components/ServicesSection';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Purchase & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Model Detail Page */}
          <Route path="/model/:id" element={<ModelDetail />} />

          {/* Design Page */}
          <Route path="/design" element={<DesignPage />} />

          {/* Portfolio Routes */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          {/* Portfolio & About */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesSection isFullPage={true} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />

          {/* Industry Routes */}
          <Route path="/industries/:industryType" element={<IndustryPage />} />

          {/* Service Detail Routes */}
          <Route path="/services/prototyping" element={<ServicesSection isFullPage={true} service="prototyping" />} />
          <Route path="/services/scalable-manufacturing" element={<ServicesSection isFullPage={true} service="scalable-manufacturing" />} />
          <Route path="/services/reverse-engineering" element={<ServicesSection isFullPage={true} service="reverse-engineering" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
