import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlaceholderPage from './pages/Placeholder';
import ModelDetail from './pages/ModelDetail';
import Payment from './pages/Payment';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import DesignPage from './pages/Design';

function App() {
  return (
    <Router>
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

        {/* Portfolio & About */}
        <Route path="/portfolio" element={<PlaceholderPage title="Our Portfolio" description="Explore our extensive collection of 3D printing projects across various industries. From intricate medical models to stunning art pieces." />} />
        <Route path="/about" element={<PlaceholderPage title="About ANE" description="Learn about our journey in revolutionizing additive manufacturing and our commitment to pushing the boundaries of what's possible with 3D printing." />} />
        <Route path="/contact" element={<PlaceholderPage title="Get in Touch" description="Ready to bring your ideas to life? Contact our team for a consultation and discover how ANE can transform your concepts into reality." />} />

        {/* Industry Routes */}
        <Route path="/industries/healthcare" element={<PlaceholderPage title="Healthcare Solutions" description="Precision medical models, custom prosthetics, surgical guides, and anatomical replicas engineered for healthcare professionals." />} />
        <Route path="/industries/art-sculpture" element={<PlaceholderPage title="Art & Sculpture" description="Transform digital art into physical masterpieces. We specialize in museum-quality reproductions and contemporary art pieces." />} />
        <Route path="/industries/education" element={<PlaceholderPage title="Educational Solutions" description="Interactive learning models, scientific demonstrations, and educational kits designed to enhance hands-on learning experiences." />} />
        <Route path="/industries/electronics" element={<PlaceholderPage title="Electronics Prototyping" description="Rapid prototyping of enclosures, heat sinks, custom components, and functional prototypes for the electronics industry." />} />

        {/* Service Routes */}
        <Route path="/services/prototyping" element={<PlaceholderPage title="Rapid Prototyping" description="Transform your concepts into tangible prototypes within 24 hours. Perfect for design validation and iterative development." />} />
        <Route path="/services/scalable-manufacturing" element={<PlaceholderPage title="Scalable Manufacturing" description="From prototype to production. Our scalable solutions grow with your needs, maintaining quality at every volume." />} />
        <Route path="/services/reverse-engineering" element={<PlaceholderPage title="Reverse Engineering" description="Digitize existing parts and create precise replicas. Perfect for legacy components and discontinued products." />} />
      </Routes>
    </Router>
  );
}

export default App;
