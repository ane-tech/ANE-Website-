import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Command, ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DesignPage = () => {
  return (
    <>
      <Header />
      <main style={pageStyle}>
        
        {/* --- HERO: ULTRA MINIMAL --- */}
        <section style={heroSection}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={monoTag}>[ DESIGN INTELLIGENCE ]</div>
            <h1 style={slimTitle}>The architecture of <br/> next-gen interfaces.</h1>
            <p style={dimSubtitle}>
              Engineering precision into every pixel. We build design systems 
              that scale with the speed of your ambition.
            </p>
          </motion.div>
        </section>

        {/* --- TERMINAL: FIXED SYNTAX --- */}
        <section style={terminalSection}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={terminalWindow}
          >
            <div style={terminalTop}>
              <div style={windowControls}>
                <span style={dot} />
                <span style={dot} />
                <span style={dot} />
              </div>
              <div style={terminalTitle}>ANE_CORE_SYSTEM // v.0.1</div>
            </div>
            
            <div style={terminalBody}>
              {/* Line 01 - Fixed syntax to avoid Babel parser error */}
              <div style={codeLine}>
                <span style={lineNum}>01</span> 
                <span style={cyan}>const</span> studio = AI.init({"{ style: 'minimal' }"})
              </div>
              <div style={codeLine}>
                <span style={lineNum}>02</span> studio.optimize_nodes()
              </div>
              <div style={codeLine}>
                <span style={lineNum}>03</span> <span style={gray}>// deploying secure architecture...</span>
              </div>
              
              <div style={terminalBlurOverlay}>
                <div style={lockIconCircle}>
                  <Shield size={18} color="#70e4de" />
                </div>
                <div style={terminalLockText}>LOCKED ALPHA TERMINAL</div>
                <div style={terminalSmallText}>ACCESS RESTRICTED TO PARTNER NODES</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- FEATURE GRID: SWISS STYLE --- */}
        <section style={gridSection}>
          <div style={miniGrid}>
            {features.map((f, i) => (
              <div key={i} style={miniCard}>
                <div style={cardHeader}>
                  <div style={iconWrapper}>{f.icon}</div>
                  <ArrowUpRight size={14} style={{ opacity: 0.3 }} />
                </div>
                <h4 style={cardTitle}>{f.title}</h4>
                <p style={cardText}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

/* --- STYLES: PRECISION ARCHITECTURE --- */

const pageStyle = {
  background: '#050505',
  color: '#f0f0f0',
  minHeight: '100vh',
  paddingTop: '120px',
  fontFamily: '"Inter", -apple-system, sans-serif',
  WebkitFontSmoothing: 'antialiased'
};

const heroSection = {
  padding: '4rem 2rem',
  textAlign: 'center'
};

const monoTag = {
  fontFamily: 'monospace',
  fontSize: '0.65rem',
  letterSpacing: '0.3em',
  color: '#70e4de',
  marginBottom: '1.5rem',
  opacity: 0.7
};

const slimTitle = {
  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
  fontWeight: 300,
  letterSpacing: '-0.04em',
  lineHeight: 1.1,
  marginBottom: '1.2rem',
  color: '#fff'
};

const dimSubtitle = {
  fontSize: '0.85rem',
  color: '#777',
  maxWidth: '380px',
  margin: '0 auto',
  lineHeight: 1.6,
  letterSpacing: '0.01em'
};

const terminalSection = {
  padding: '2rem',
  maxWidth: '760px',
  margin: '0 auto'
};

const terminalWindow = {
  background: '#080808',
  border: '1px solid #141414',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
};

const terminalTop = {
  background: '#0f0f0f',
  padding: '12px 20px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #141414'
};

const windowControls = { display: 'flex', gap: '8px' };
const dot = { width: '6px', height: '6px', borderRadius: '50%', background: '#222' };

const terminalTitle = {
  fontSize: '0.6rem',
  fontFamily: 'monospace',
  color: '#444',
  marginLeft: 'auto',
  letterSpacing: '1.5px'
};

const terminalBody = {
  padding: '2.5rem',
  position: 'relative',
  minHeight: '160px',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  lineHeight: 1.8
};

const codeLine = { marginBottom: '4px', color: '#555' };
const lineNum = { color: '#1a1a1a', marginRight: '20px' };
const cyan = { color: '#70e4de' };
const gray = { color: '#222' };

const terminalBlurOverlay = {
  position: 'absolute',
  inset: 0,
  backdropFilter: 'blur(10px)',
  background: 'rgba(5,5,5,0.75)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 5
};

const lockIconCircle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid rgba(112,228,222,0.2)',
  display: 'grid',
  placeItems: 'center',
  marginBottom: '1rem'
};

const terminalLockText = {
  fontSize: '0.7rem',
  letterSpacing: '2px',
  fontWeight: 600,
  color: '#fff'
};

const terminalSmallText = {
  fontSize: '0.55rem',
  color: '#555',
  marginTop: '6px',
  letterSpacing: '0.5px'
};

const gridSection = {
  padding: '4rem 2rem 10rem',
  maxWidth: '900px',
  margin: '0 auto'
};

const miniGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '1px',
  background: '#111', 
  border: '1px solid #111'
};

const miniCard = {
  background: '#050505',
  padding: '2.5rem',
  transition: 'all 0.3s ease'
};

const cardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '2.5rem'
};

const iconWrapper = { color: '#70e4de', opacity: 0.8 };

const cardTitle = {
  fontSize: '0.75rem',
  fontWeight: 600,
  marginBottom: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  color: '#fff'
};

const cardText = {
  fontSize: '0.8rem',
  color: '#666',
  lineHeight: 1.6,
  maxWidth: '220px'
};

const features = [
  { icon: <Command size={16}/>, title: 'Systems', desc: 'Atomic design frameworks built for high-scale environments.' },
  { icon: <Zap size={16}/>, title: 'Performance', desc: 'Optimized for 60fps interactions and zero layout shift.' },
  { icon: <Globe size={16}/>, title: 'Accessibility', desc: 'Compliant with WCAG 2.1 AA standards by default.' }
];

export default DesignPage;
