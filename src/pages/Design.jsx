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
    icon: Sparkles,
    title: 'Instant 3D Creation',
    desc: 'Upload any image and watch our AI turn it into a 3D model in seconds. ANE is designed to make 3D design as easy as taking a photo.',
    status: 'READY'
  },
  {
    icon: Box,
    title: 'Built for 3D Printing',
    desc: 'Every model is created as an STL file that you can download and print immediately. No extra software or experience required.',
    status: 'OPTIMIZED'
  },
  {
    icon: Shield,
    title: 'Clean & Smooth Models',
    desc: 'Our system automatically cleans your models by removing rough edges and floating artifacts, giving you a perfect result every time.',
    status: 'STABLE'
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
      <span style={styles.monoTag}>[ ANE_GEN_01 ]</span>

      <h1 style={styles.title}>
        Intelligence in Every <br /> Three Dimensions.
      </h1>

      <p style={styles.subtitle}>
        The next evolution of digital asset creation. Transform flat inspiration into print-ready reality with our neural processing engine.
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
    <section style={styles.studioWrap}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={styles.studioContainer}
      >
        <div style={styles.studioBlur} />

        {/* Main Content Area */}
        <div style={styles.studioContent}>
          <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1.1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left Column: Visual Area */}
            <div style={styles.visualColumn}>
              <div
                style={styles.previewBox}
                onClick={() => status === 'idle' && fileInputRef.current.click()}
              >
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />

                <AnimatePresence mode="wait">
                  {!preview ? (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      style={styles.uploadState}
                    >
                      <div style={styles.uploadIconCircle}>
                        <Upload size={32} />
                      </div>
                      <h3 style={styles.uploadTitle}>Choose an image</h3>
                      <p style={styles.uploadSubt}>Drag & drop or click to browse</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="image"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ width: '100%', height: '100%', padding: '2rem' }}
                    >
                      <img src={preview} alt="Input" style={styles.mainImage} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status Overlays */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.successOverlay}>
                      <div style={styles.successIcon}>
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Model Ready</h4>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <a href={result} download="model.stl" style={styles.downloadBtn}>
                          <Download size={18} /> Get STL
                        </a>
                        <button onClick={reset} style={styles.resetBtnSmall}>
                          <RefreshCcw size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {preview && status === 'idle' && (
                <div style={styles.buttonRow}>
                  <button onClick={handleGenerate} style={styles.magicBtn}>
                    Start 3D Generation
                  </button>
                  <button onClick={reset} style={styles.resetBtnIcon}>
                    <RefreshCcw size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Interaction/Info */}
            <div style={styles.infoColumn}>
              {preview ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={styles.studioHeader}>
                    <Box size={20} color={primaryTeal} />
                    <span style={styles.studioBadge}>CREATIVE STUDIO</span>
                  </div>

                  <div style={styles.stepContainer}>
                    <div style={styles.stepVerticalLine} />
                    {[
                      { id: 'uploading', label: 'Analyzing Silhouette', desc: 'Our AI is tracing the edges and volume' },
                      { id: 'generating', label: 'Synthesizing Mesh', desc: 'Crafting high-precision 3D geometry' },
                      { id: 'finalizing', label: 'Final Polish', desc: 'Smoothing surfaces and optimizing for print' }
                    ].map((step, idx) => {
                      const isActive = (status === step.id) || (status === 'uploading' && idx === 0) || (status === 'generating' && idx === 1);
                      const isDone = status === 'success' || (status === 'generating' && idx === 0);

                      return (
                        <div key={idx} style={{ ...styles.stepItem, opacity: isDone || isActive ? 1 : 0.4 }}>
                          <div style={{
                            ...styles.stepNumber,
                            background: isDone ? '#22c55e' : isActive ? primaryTeal : 'rgba(255,255,255,0.08)',
                            color: isDone || isActive ? '#000' : 'rgba(255,255,255,0.4)',
                            zIndex: 2
                          }}>
                            {isDone ? <CheckCircle2 size={12} /> : idx + 1}
                          </div>
                          <div>
                            <div style={{ ...styles.stepLabel, color: isActive ? primaryTeal : '#fff' }}>{step.label}</div>
                            <div style={styles.stepDesc}>{step.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {(status === 'uploading' || status === 'generating') && (
                    <div style={styles.progressSection}>
                      <div style={styles.progressText}>
                        <span style={{ color: primaryTeal, fontWeight: 700 }}>AI is working...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div style={styles.progressBarBg}>
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          style={styles.progressBarFill}
                        />
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={styles.errorCard}>
                      <AlertCircle size={20} />
                      <div>
                        <div style={{ fontWeight: 600 }}>Connection Interrupted</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Please check your internet and try again</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div style={styles.emptyStateContainer}>
                  <h2 style={styles.emptyTitle}>Create without limits.</h2>
                  <p style={styles.emptyDesc}>
                    Turn your creative visions into physical reality. ANE uses advanced neural networks to build your 3D assets instantly.
                  </p>
                  <div style={styles.tagRow}>
                    <span style={styles.tag}>STL Format</span>
                    <span style={styles.tag}>3D Print Ready</span>
                    <span style={styles.tag}>AI Powered</span>
                  </div>
                </div>
              )}
            </div>
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

  hero: { padding: '8rem 2rem', textAlign: 'center' },
  monoTag: { fontFamily: 'monospace', fontSize: 11, letterSpacing: 8, color: '#70e4de', opacity: 0.6, marginBottom: '2rem', display: 'block' },
  title: { fontSize: 'clamp(2.8rem, 6vw, 4.4rem)', fontWeight: 200, margin: '1.5rem 0', lineHeight: 1.1, letterSpacing: '-1px' },
  subtitle: { fontSize: 18, color: '#999', maxWidth: 600, margin: '0 auto', lineHeight: 1.8, fontWeight: 300 },

  studioWrap: { padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto' },
  studioContainer: {
    background: 'rgba(15, 15, 18, 0.4)',
    backdropFilter: 'blur(40px)',
    borderRadius: 40,
    border: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
  },
  studioBlur: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '50%',
    height: '60%',
    background: 'radial-gradient(circle, rgba(112,228,222,0.08) 0%, transparent 70%)',
    pointerEvents: 'none'
  },
  studioContent: { padding: '4rem', position: 'relative', zIndex: 1 },

  visualColumn: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  previewBox: {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: 32,
    border: '2px dashed rgba(255,255,255,0.05)',
    height: 480,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s ease'
  },
  mainImage: { width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' },

  uploadState: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  uploadIconCircle: {
    width: 80, height: 80, borderRadius: '50%', background: 'rgba(112, 228, 222, 0.05)',
    display: 'grid', placeItems: 'center', color: '#70e4de', marginBottom: '1.5rem',
    border: '1px solid rgba(112, 228, 222, 0.2)'
  },
  uploadTitle: { fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' },
  uploadSubt: { fontSize: '0.9rem', color: '#666' },

  buttonRow: { display: 'flex', gap: '1rem' },
  magicBtn: {
    flex: 1,
    padding: '1.2rem',
    background: 'linear-gradient(135deg, #70e4de 0%, #4facfe 100%)',
    border: 'none',
    borderRadius: 20,
    color: '#000',
    fontSize: '0.95rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    cursor: 'pointer',
    boxShadow: '0 15px 30px -5px rgba(112,228,222,0.3)',
    transition: 'all 0.3s ease'
  },
  resetBtnIcon: {
    width: 60, height: 60, borderRadius: 20, background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer',
    display: 'grid', placeItems: 'center', transition: 'all 0.3s ease'
  },

  infoColumn: { height: '100%', position: 'relative' },
  studioHeader: { display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3.5rem' },
  studioBadge: { fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', color: '#70e4de', opacity: 0.8 },

  stepContainer: { display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' },
  stepVerticalLine: {
    position: 'absolute', left: 16, top: 0, bottom: 0, width: 2,
    background: 'linear-gradient(180deg, rgba(112,228,222,0.2) 0%, rgba(255,255,255,0.05) 100%)',
    zIndex: 1
  },
  stepItem: { display: 'flex', gap: '2.5rem', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' },
  stepNumber: {
    width: 34, height: 34, borderRadius: 12, display: 'grid', placeItems: 'center',
    fontSize: '0.8rem', fontWeight: 900, transition: 'all 0.4s ease',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  stepLabel: { fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.3rem' },
  stepDesc: { fontSize: '0.85rem', color: '#666', lineHeight: 1.5 },

  progressSection: { marginTop: '2rem', padding: '1.5rem', background: 'rgba(112,228,222,0.03)', borderRadius: 20 },
  progressText: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1rem' },
  progressBarBg: { height: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', background: '#70e4de', boxShadow: '0 0 20px rgba(112,228,222,0.5)' },

  successOverlay: {
    position: 'absolute', inset: 0, background: 'rgba(5,5,10,0.8)', backdropFilter: 'blur(20px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10
  },
  successIcon: { color: '#22c55e', marginBottom: '1.5rem' },
  downloadBtn: {
    padding: '1rem 2rem', background: '#fff', color: '#000', borderRadius: 16,
    fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'flex',
    alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease'
  },
  resetBtnSmall: {
    width: 50, height: 50, borderRadius: 16, background: 'rgba(255,255,255,0.1)',
    border: 'none', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center'
  },

  emptyStateContainer: { padding: '2rem 0' },
  emptyTitle: { fontSize: '2.5rem', fontWeight: 100, marginBottom: '1.5rem', color: '#fff' },
  emptyDesc: { fontSize: '1rem', color: '#777', lineHeight: 1.8, marginBottom: '2.5rem' },
  tagRow: { display: 'flex', gap: '0.8rem' },
  tag: {
    padding: '0.6rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 100, fontSize: '0.75rem', fontWeight: 600, color: '#aaa'
  },

  errorCard: {
    marginTop: '2rem', padding: '1.5rem', background: 'rgba(239,68,68,0.05)',
    border: '1px solid rgba(239,68,68,0.1)', borderRadius: 20, color: '#ef4444',
    display: 'flex', gap: '1rem', alignItems: 'center'
  },

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
