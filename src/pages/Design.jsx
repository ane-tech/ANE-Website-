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
  AlertCircle,
  Eye
} from 'lucide-react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

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

const ModelViewer = ({ url }) => {
  const geom = useLoader(STLLoader, url);
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 40 }}>
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

      <Stage adjustCamera={false} intensity={0.6} environment="city" preset="rembrandt" shadows={false}>
        <Center top>
          <mesh geometry={geom} castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              color="#fcfcfc"
              metalness={0.1}
              roughness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Center>
      </Stage>

      <Grid
        infiniteGrid
        cellSize={1}
        cellThickness={1}
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#444"
        cellColor="#222"
        fadeDistance={40}
      />

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#ff3e3e', '#3fff3e', '#3e3eff']} labelColor="white" />
      </GizmoHelper>

      <OrbitControls makeDefault />
    </Canvas>
  );
};

const Terminal = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [stlUrl, setStlUrl] = useState(null); // For 3D model
  const [status, setStatus] = useState('idle'); // idle, uploading, generating, success, error, viewing
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const stlInputRef = useRef(null);

  const primaryTeal = '#70e4de';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStlUrl(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
      setStatus('idle');
    }
  };

  const handleStlUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setStlUrl(url);
      setPreview(null);
      setResult(url);
      setStatus('viewing');
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
      setStlUrl(url);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setStlUrl(null);
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
          <div style={{ display: 'grid', gridTemplateColumns: preview || stlUrl ? '1fr 1.1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left Column: Visual Area */}
            <div style={styles.visualColumn}>
              <div
                style={styles.previewBox}
                onClick={() => status === 'idle' && !stlUrl && fileInputRef.current.click()}
              >
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                <input type="file" ref={stlInputRef} hidden accept=".stl" onChange={handleStlUpload} />

                <AnimatePresence mode="wait">
                  {status === 'idle' && !preview && !stlUrl ? (
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
                  ) : stlUrl ? (
                    <motion.div
                      key="viewer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                      <ModelViewer url={stlUrl} />
                      <div style={styles.viewerHint}>
                        <Box size={14} /> Click & drag to rotate
                      </div>
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

              {(preview || stlUrl) && (status === 'idle' || status === 'viewing') && (
                <div style={styles.buttonRow}>
                  {preview && (
                    <button onClick={handleGenerate} style={styles.magicBtn}>
                      Start 3D Generation
                    </button>
                  )}
                  {stlUrl && (
                    <a href={stlUrl} download="model.stl" style={{ ...styles.magicBtn, textDecoration: 'none' }}>
                      <Download size={18} /> Download STL
                    </a>
                  )}
                  <button onClick={reset} style={styles.resetBtnIcon}>
                    <RefreshCcw size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Interaction/Info */}
            <div style={styles.infoColumn}>
              {preview || stlUrl ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={styles.studioHeader}>
                    <Box size={20} color={primaryTeal} />
                    <span style={styles.studioBadge}>{stlUrl && !file ? '3D PREVIEWER' : 'CREATIVE STUDIO'}</span>
                  </div>

                  <div style={styles.stepGrid}>
                    {[
                      { id: 'uploading', label: '1. Analyzing Image', desc: 'Detecting your object\'s shape' },
                      { id: 'generating', label: '2. Building 3D Model', desc: 'Creating the digital structure' },
                      { id: 'finalizing', label: '3. Final Smoothing', desc: 'Polishing your model for printing' }
                    ].map((step, idx) => {
                      const isActive = (status === step.id) || (status === 'uploading' && idx === 0) || (status === 'generating' && idx === 1);
                      const isDone = (status === 'success' || status === 'viewing') || (status === 'generating' && idx === 0);

                      return (
                        <div key={idx} style={{
                          ...styles.stepCard,
                          borderColor: isActive ? primaryTeal : isDone ? '#22c55e' : 'rgba(255,255,255,0.05)',
                          background: isActive ? 'rgba(112, 228, 222, 0.03)' : 'transparent',
                          opacity: isDone || isActive ? 1 : 0.4
                        }}>
                          <div style={{ ...styles.stepLabel, color: isActive ? primaryTeal : isDone ? '#22c55e' : '#fff' }}>
                            {step.label}
                          </div>
                          <div style={styles.stepDesc}>{step.desc}</div>
                          {isActive && <motion.div layoutId="activeStep" style={styles.activeIndicator} />}
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
                  <button
                    onClick={() => fileInputRef.current.click()}
                    style={styles.selectImageBtn}
                  >
                    <ImageIcon size={18} /> Choose Project Image
                  </button>

                  <button
                    onClick={() => stlInputRef.current.click()}
                    style={{ ...styles.selectImageBtn, background: 'transparent', marginTop: '-1.5rem' }}
                  >
                    <Box size={18} /> View Existing STL
                  </button>

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
  studioHeader: { display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2.5rem' },
  studioBadge: { fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', color: '#70e4de', opacity: 0.8 },

  stepGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  stepCard: {
    padding: '1.5rem',
    borderRadius: 20,
    border: '1px solid',
    position: 'relative',
    transition: 'all 0.5s ease'
  },
  activeIndicator: {
    position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3,
    background: '#70e4de', borderRadius: '0 4px 4px 0',
    boxShadow: '0 0 15px #70e4de'
  },
  stepLabel: { fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.2rem' },
  stepDesc: { fontSize: '0.85rem', color: '#666' },

  selectImageBtn: {
    padding: '1.2rem 2.5rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 100,
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    cursor: 'pointer',
    marginBottom: '2.5rem',
    transition: 'all 0.3s ease'
  },

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

  emptyStateContainer: { padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  emptyTitle: { fontSize: '2.5rem', fontWeight: 100, marginBottom: '1.5rem', color: '#fff' },
  emptyDesc: { fontSize: '1rem', color: '#777', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '400px' },
  tagRow: { display: 'flex', gap: '0.8rem', justifyContent: 'center' },
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
  },

  viewerHint: {
    position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.6)', padding: '0.6rem 1.2rem', borderRadius: 100,
    fontSize: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem',
    backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
    pointerEvents: 'none'
  }
};
