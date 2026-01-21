import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Cpu, Heart, Palette, GraduationCap, Box, Layers, Copy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const services = [
    { name: 'Prototyping', description: 'Rapid concept validation', icon: <Box size={20} />, path: '/services/prototyping' },
    { name: 'Scalable Manufacturing', description: 'Production at any volume', icon: <Layers size={20} />, path: '/services/scalable-manufacturing' },
    { name: 'Reverse Engineering', description: 'Digital replication services', icon: <Copy size={20} />, path: '/services/reverse-engineering' },
  ];



  const industries = [
    { name: 'Healthcare', description: 'Medical-grade solutions', icon: <Heart size={20} />, path: '/industries/healthcare' },
    { name: 'Art & Sculpture', description: 'Creative masterpieces', icon: <Palette size={20} />, path: '/industries/art-sculpture' },
    { name: 'Education', description: 'Learning tools & models', icon: <GraduationCap size={20} />, path: '/industries/education' },
    { name: 'Electronics', description: 'Precision components', icon: <Cpu size={20} />, path: '/industries/electronics' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#70e4de' }}>ANE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {/* Services Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              color: activeDropdown === 'services' || location.pathname.startsWith('/services') ? '#70e4de' : '#fff',
              background: activeDropdown === 'services' || location.pathname.startsWith('/services') ? 'rgba(112, 228, 222, 0.1)' : 'transparent',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontWeight: 500
            }}>
              Services
              <ChevronDown size={16} style={{
                transition: 'transform 0.3s ease',
                transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)'
              }} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '320px',
                    background: 'rgba(13, 13, 18, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '0.75rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  {services.map((item) => (
                    <Link key={item.name} to={item.path} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
                    }} onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                    }}>
                      <span style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(112, 228, 222, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#70e4de'
                      }}>{item.icon}</span>
                      <div>
                        <span style={{ fontWeight: 600, display: 'block', fontSize: '0.95rem' }}>{item.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#8a8a9a' }}>{item.description}</span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Design Link */}
          <Link to="/design" style={{
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            color: location.pathname === '/design' ? '#70e4de' : '#fff',
            background: location.pathname === '/design' ? 'rgba(112, 228, 222, 0.1)' : 'transparent'
          }} onMouseEnter={e => {
            e.currentTarget.style.color = '#70e4de';
            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
          }} onMouseLeave={e => {
            if (location.pathname !== '/design') {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'transparent';
            }
          }}>Design</Link>

          {/* Industries Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('industries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              color: activeDropdown === 'industries' || location.pathname.startsWith('/industries') ? '#70e4de' : '#fff',
              background: activeDropdown === 'industries' || location.pathname.startsWith('/industries') ? 'rgba(112, 228, 222, 0.1)' : 'transparent',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontWeight: 500
            }}>
              Industries
              <ChevronDown size={16} style={{
                transition: 'transform 0.3s ease',
                transform: activeDropdown === 'industries' ? 'rotate(180deg)' : 'rotate(0)'
              }} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'industries' && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '320px',
                    background: 'rgba(13, 13, 18, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '0.75rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  {industries.map((item) => (
                    <Link key={item.name} to={item.path} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
                    }} onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                    }}>
                      <span style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(112, 228, 222, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#70e4de'
                      }}>{item.icon}</span>
                      <div>
                        <span style={{ fontWeight: 600, display: 'block', fontSize: '0.95rem' }}>{item.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#8a8a9a' }}>{item.description}</span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/portfolio" style={{
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            color: location.pathname === '/portfolio' ? '#70e4de' : '#fff',
            background: location.pathname === '/portfolio' ? 'rgba(112, 228, 222, 0.1)' : 'transparent'
          }} onMouseEnter={e => {
            e.currentTarget.style.color = '#70e4de';
            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
          }} onMouseLeave={e => {
            if (location.pathname !== '/portfolio') {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'transparent';
            }
          }}>Portfolio</Link>

          <Link to="/about" style={{
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            color: location.pathname === '/about' ? '#70e4de' : '#fff',
            background: location.pathname === '/about' ? 'rgba(112, 228, 222, 0.1)' : 'transparent'
          }} onMouseEnter={e => {
            e.currentTarget.style.color = '#70e4de';
            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
          }} onMouseLeave={e => {
            if (location.pathname !== '/about') {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'transparent';
            }
          }}>About</Link>

          <Link to="/contact" className="btn-primary" style={{
            marginLeft: '0.5rem',
            padding: '0.7rem 1.5rem',
            fontSize: '0.9rem'
          }}>Contact Us</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-toggle"
          style={{
            display: 'none',
            padding: '0.5rem',
            borderRadius: '10px',
            background: isOpen ? 'rgba(112, 228, 222, 0.1)' : 'transparent',
            color: '#70e4de',
            transition: 'all 0.3s ease'
          }}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
            style={{
              display: 'none',
              background: 'rgba(5, 5, 8, 0.98)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '1.5rem 2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.75rem', display: 'block' }}>SERVICES</span>
                {services.map(item => (
                  <Link key={item.name} to={item.path} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '1rem'
                  }}>
                    <span style={{ color: '#70e4de' }}>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8a8a9a', letterSpacing: '0.1em', marginBottom: '0.75rem', display: 'block' }}>INDUSTRIES</span>
                {industries.map(item => (
                  <Link key={item.name} to={item.path} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '1rem'
                  }}>
                    <span style={{ color: '#70e4de' }}>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link to="/design" style={{ display: 'block', padding: '0.75rem 0', fontSize: '1rem', fontWeight: 500 }}>Design</Link>
              <Link to="/portfolio" style={{ display: 'block', padding: '0.75rem 0', fontSize: '1rem', fontWeight: 500 }}>Portfolio</Link>
              <Link to="/about" style={{ display: 'block', padding: '0.75rem 0', fontSize: '1rem', fontWeight: 500 }}>About Us</Link>
              <Link to="/contact" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', padding: '1rem' }}>Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .mobile-nav { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
