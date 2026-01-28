'use client';

import React, { memo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Zap,
  Globe,
  Command,
  ArrowUpRight,
  Activity,
  Upload,
  Sparkles,
  Download,
  RefreshCcw,
  Image as ImageIcon,
  Box,
  CheckCircle2,
  AlertCircle
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

/* ================= TERMINAL (GENERATOR) ================= */

const Terminal = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, generating, success, error
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const primaryTeal = '#70e4de';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
      setStatus('idle');
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    setStatus('uploading');
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 95) return prev + Math.random() * 2;
          return prev;
        });
      }, 1500);

      // We call the AI service DIRECTLY from the browser to bypass Vercel's 10s timeout
      const AI_URL = "https://ane-web-ane-ai-service.hf.space/generate-3d";

      const response = await fetch(AI_URL, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Generation failed: ${errorText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setResult(url);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setProgress(0);
    setResult(null);
  };

  return (
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
          <div className="generator-grid" style={{ display: 'grid', gridTemplateColumns: preview ? '1.2fr 1fr' : '1fr', gap: '2.5rem' }}>

            {/* Left: Input/Preview */}
            <div>
              <div
                onClick={() => status === 'idle' && fileInputRef.current.click()}
                style={{
                  border: `1px dashed ${preview ? 'rgba(112, 228, 222, 0.2)' : 'rgba(112, 228, 222, 0.4)'}`,
                  borderRadius: '24px',
                  height: preview ? '320px' : '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: status === 'idle' ? 'pointer' : 'default',
                  transition: 'all 0.4s',
                  background: preview ? 'rgba(255,255,255,0.01)' : 'rgba(112, 228, 222, 0.02)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />

                {preview ? (
                  <img src={preview} alt="Upload Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }} />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: primaryTeal, marginBottom: '1.5rem', opacity: 0.6 }}>
                      <Upload size={40} style={{ margin: '0 auto' }} />
                    </div>
                    <h3 style={{ fontSize: '1rem', letterSpacing: '2px', fontWeight: 600, marginBottom: '0.5rem' }}>DRAG ASSET HERE</h3>
                    <p style={{ color: '#444', fontSize: '0.8rem', fontWeight: 500 }}>NEURAL ENGINE v0.1 | STATUS: READY</p>
                  </div>
                )}

                {/* Success Overlay */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={styles.lockOverlay}
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: primaryTeal, marginBottom: '1.5rem' }}>
                        <CheckCircle2 size={48} />
                      </motion.div>
                      <span style={styles.lockText}>MESH GENERATION COMPLETE</span>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <a href={result} download="model.stl" style={styles.actionBtn}>
                          <Download size={16} /> DOWNLOAD STL
                        </a>
                        <button onClick={reset} style={{ ...styles.actionBtn, background: 'rgba(255,255,255,0.1)' }}>
                          <RefreshCcw size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                {!preview ? (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    style={styles.terminalBtn}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
                      e.currentTarget.style.borderColor = '#70e4de';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = '#222';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <ImageIcon size={16} /> CLICK TO UPLOAD IMAGE (PNG, JPG)
                  </button>
                ) : (
                  status === 'idle' && (
                    <>
                      <button onClick={handleGenerate} style={{ ...styles.terminalBtn, background: primaryTeal, color: '#000' }}>
                        <Sparkles size={16} /> EXECUTE: GENERATE_3D
                      </button>
                      <button onClick={reset} style={{ ...styles.terminalBtn, width: '60px', flex: 'none' }}>
                        <RefreshCcw size={16} />
                      </button>
                    </>
                  )
                )}
              </div>
            </div>

            {/* Right: Processing Steps */}
            {preview && (
              <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
                  <Box size={18} color={primaryTeal} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', color: primaryTeal }}>LOG_STREAM</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { id: 'uploading', label: 'DEPTH_MAP_ANALYSIS', desc: 'Analyzing geometric nodes' },
                    { id: 'generating', label: 'NEURAL_MESH_EXTRACTION', desc: 'TripoSR engine pulse' },
                    { id: 'finalizing', label: 'OBJ_EXPORT_FINAL', desc: 'Packing vertex data' }
                  ].map((step, idx) => {
                    const isActive = (status === step.id) || (status === 'uploading' && idx === 0) || (status === 'generating' && idx === 1);
                    const isDone = status === 'success' || (status === 'generating' && idx === 0);

                    return (
                      <div key={step.id} style={{ display: 'flex', gap: '1.2rem', opacity: isDone || isActive ? 1 : 0.2 }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: `1px solid ${isDone ? '#22c55e' : isActive ? primaryTeal : '#222'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isDone ? '#22c55e' : isActive ? primaryTeal : '#222',
                          fontSize: '10px',
                          fontFamily: 'monospace'
                        }}>
                          {isDone ? <CheckCircle2 size={12} /> : idx + 1}
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', marginBottom: '4px' }}>{step.label}</div>
                          <div style={{ fontSize: '10px', color: '#444', fontFamily: 'monospace' }}>{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}

                  {(status === 'uploading' || status === 'generating') && (
                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'monospace', marginBottom: '8px' }}>
                        <span>COMPILING_MESH...</span>
                        <span style={{ color: primaryTeal }}>{Math.round(progress)}%</span>
                      </div>
                      <div style={{ height: '2px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          style={{ height: '100%', background: primaryTeal, boxShadow: `0 0 10px ${primaryTeal}` }}
                        />
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div style={{ marginTop: 'auto', border: '1px solid rgba(239,68,68,0.2)', padding: '1rem', borderRadius: '12px', background: 'rgba(239,68,68,0.05)', display: 'flex', gap: '0.8rem' }}>
                      <AlertCircle size={16} color="#ef4444" />
                      <div style={{ color: '#ef4444', fontSize: '10px', fontFamily: 'monospace' }}>
                        ERROR_ACCESS_REJECTED: ENGINE_TIMED_OUT
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </section>
  );
};

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

  terminalWrap: { padding: '2rem', maxWidth: 1000, margin: '0 auto' },
  terminal: { background: '#080808', borderRadius: 28, border: '1px solid #141414', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' },
  terminalTop: { padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #141414', background: '#0a0a0a' },
  dots: { display: 'flex', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' },
  terminalTitle: { marginLeft: 'auto', fontSize: 10, color: '#444', letterSpacing: 2, fontWeight: 700 },
  terminalBody: { padding: '3rem', position: 'relative' },

  terminalBtn: {
    flex: 1,
    padding: '1rem',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid #222',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 800,
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },

  actionBtn: {
    padding: '0.8rem 1.5rem',
    background: '#70e4de',
    color: '#000',
    borderRadius: '10px',
    fontWeight: 900,
    fontSize: '0.7rem',
    letterSpacing: '1px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem'
  },

  lockOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(5,5,5,0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
  lockText: { fontSize: 11, letterSpacing: 2, fontWeight: 900, color: '#fff' },

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
