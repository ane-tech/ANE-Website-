'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Globe,
  Command,
  ArrowUpRight,
  Activity
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

/* ================= DATA ================= */

const FEATURES = [
  {
    icon: Command,
    title: 'SYSTEMS',
    desc: 'Atomic design frameworks engineered for high-scale, mission-critical environments. Built with modularity, long-term maintainability, and enterprise-grade reliability at the core.',
    status: 'STABLE'
  },
  {
    icon: Zap,
    title: 'PERFORMANCE',
    desc: 'Optimized rendering pipelines delivering consistent 60fps interactions, intelligent resource management, and zero cumulative layout shift across devices.',
    status: 'OPTIMIZED'
  },
  {
    icon: Globe,
    title: 'ACCESSIBILITY',
    desc: 'Inclusive by design. Fully compliant with WCAG standards, ensuring usability, clarity, and accessibility for every user worldwide.',
    status: 'COMPLIANT'
  }
];

/* ================= PAGE ================= */

function DesignPage() {
  return (
    <>
      <Header />

      <main style={styles.page}>
        <Hero />
        <Terminal />
        <FeatureGrid />
      </main>

      <Footer />
    </>
  );
}

export default memo(DesignPage);

/* ================= HERO ================= */

const Hero = memo(() => (
  <section style={styles.hero}>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span style={styles.monoTag}>[ DESIGN INTELLIGENCE ]</span>

      <h1 style={styles.title}>
        The architecture of <br /> next-gen interfaces.
      </h1>

      <p style={styles.subtitle}>
        Engineering precision into every pixel. Designing systems that scale with ambition.
      </p>
    </motion.div>
  </section>
));

/* ================= TERMINAL ================= */

const Terminal = memo(() => (
  <section style={styles.terminalWrap}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={styles.terminal}
    >
      <header style={styles.terminalTop}>
        <div style={styles.dots}>
          <span style={styles.dot} />
          <span style={styles.dot} />
          <span style={styles.dot} />
        </div>
        <span style={styles.terminalTitle}>ANE_CORE_SYSTEM // v0.1</span>
      </header>

      <div style={styles.terminalBody}>
        <div style={styles.codeLine}>
          <span style={styles.lineNum}>01</span>
          <span style={styles.cyan}>const</span> studio = AI.init({'{ style: minimal }'})
        </div>
        <div style={styles.codeLine}>
          <span style={styles.lineNum}>02</span>
          studio.optimize_nodes()
        </div>
        <div style={styles.codeLine}>
          <span style={styles.lineNum}>03</span>
          <span style={styles.gray}>// deploying secure architecture...</span>
        </div>

        <div style={styles.lockOverlay}>
          <div style={styles.lockCircle}>
            <Shield size={18} color="#70e4de" />
          </div>
          <span style={styles.lockText}>LOCKED ALPHA TERMINAL</span>
          <span style={styles.lockSubText}>ACCESS RESTRICTED</span>
        </div>
      </div>
    </motion.div>
  </section>
));

/* ================= FEATURE SECTIONS (BIG) ================= */

const FeatureGrid = memo(() => (
  <section style={styles.gridSection}>
    <div style={styles.grid}>
      {FEATURES.map(({ icon: Icon, title, desc, status }) => (
        <motion.article
          key={title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={styles.card}
        >
          {/* background grid */}
          <div style={styles.scanGrid} />

          {/* top */}
          <div style={styles.cardTop}>
            <div style={styles.iconWrap}>
              <Icon size={22} />
            </div>
            <ArrowUpRight size={18} style={{ opacity: 0.25 }} />
          </div>

          {/* middle */}
          <div style={styles.cardMiddle}>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardText}>{desc}</p>
          </div>

          {/* bottom */}
          <div style={styles.cardBottom}>
            <Activity size={14} />
            <span>{status}</span>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
));

/* ================= STYLES ================= */

const styles = {
  page: {
    background: '#050505',
    color: '#fff',
    minHeight: '100vh',
    paddingTop: 120,
    fontFamily: '"Inter", system-ui, sans-serif',
    backgroundImage:
      'radial-gradient(circle at 50% -10%, rgba(112,228,222,0.07), transparent 45%)'
  },

  hero: { padding: '6rem 2rem', textAlign: 'center' },
  monoTag: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 6, color: '#70e4de', opacity: 0.7 },
  title: { fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 300, margin: '1.6rem 0' },
  subtitle: { fontSize: 16, color: '#777', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 },

  terminalWrap: { padding: '2rem', maxWidth: 820, margin: '0 auto' },
  terminal: { background: '#080808', borderRadius: 18, border: '1px solid #141414', overflow: 'hidden' },
  terminalTop: { padding: 14, display: 'flex', alignItems: 'center', borderBottom: '1px solid #141414' },
  dots: { display: 'flex', gap: 8 },
  dot: { width: 6, height: 6, borderRadius: '50%', background: '#222' },
  terminalTitle: { marginLeft: 'auto', fontSize: 10, color: '#444', letterSpacing: 2 },
  terminalBody: { padding: '3rem', position: 'relative', fontFamily: 'monospace', fontSize: 12 },
  codeLine: { marginBottom: 8, color: '#555' },
  lineNum: { color: '#222', marginRight: 20 },
  cyan: { color: '#70e4de' },
  gray: { color: '#333' },

  lockOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(5,5,5,0.85)',
    backdropFilter: 'blur(10px)',
    display: 'grid',
    placeItems: 'center'
  },
  lockCircle: { width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(112,228,222,0.3)', display: 'grid', placeItems: 'center' },
  lockText: { fontSize: 11, letterSpacing: 2 },
  lockSubText: { fontSize: 9, color: '#555' },

  gridSection: { padding: '8rem 2rem 12rem', maxWidth: 1400, margin: '0 auto' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem'
  },

  card: {
    position: 'relative',
    minHeight: 460,
    padding: '3.5rem',
    borderRadius: 28,
    background: 'rgba(12,12,12,0.92)',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  scanGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(112,228,222,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(112,228,222,0.03) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    opacity: 0.25,
    pointerEvents: 'none'
  },

  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    background: 'rgba(112,228,222,0.14)',
    color: '#70e4de',
    display: 'grid',
    placeItems: 'center'
  },

  cardMiddle: { marginTop: '3rem' },
  cardTitle: { fontSize: '0.85rem', letterSpacing: 2, marginBottom: '1.5rem' },
  cardText: { fontSize: '1rem', color: '#8a8a8a', lineHeight: 1.8 },

  cardBottom: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.75rem',
    letterSpacing: '1.5px',
    color: '#70e4de',
    opacity: 0.75
  }
};
