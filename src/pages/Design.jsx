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
  Eye,
  X as CloseIcon
} from 'lucide-react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelList from '../components/ModelList';

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
        <ModelList />
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
    <Canvas
      shadows
      camera={{ position: [5, 5, 5], fov: 40 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.8} />
      <spotLight position={[15, 15, 15]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Stage adjustCamera intensity={0.6} environment="city" preset="rembrandt" shadows={false}>
        <Center top>
          <mesh geometry={geom} castShadow receiveShadow>
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.1}
              roughness={0.4}
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

      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
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
  const unifiedInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const primaryTeal = '#70e4de';

  const handleImageUpload = (e) => {
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
      setFile(null);
      setResult(url);
      setStatus('viewing_full');
    }
  };

  const handleUnifiedUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.name.toLowerCase().endsWith('.stl')) {
      const url = URL.createObjectURL(selectedFile);
      setStlUrl(url);
      setPreview(null);
      setFile(null);
      setResult(url);
      setStatus('viewing_full');
    } else {
      setFile(selectedFile);
      setStlUrl(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
      setStatus('idle');
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    setStatus('uploading');
    setProgress(5);

    // Setup cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          // Smart decelerating progress:
          // Fast at first (0-70), slow in the middle (70-90), 
          // and extremely slow at the end (90-99.5) to keep it alive
          if (prev < 70) return prev + Math.random() * 2;
          if (prev < 90) return prev + Math.random() * 0.5;
          if (prev < 99.5) return prev + 0.01; // Constant tiny movement to show "Keep-Alive"
          return prev;
        });
      }, 800);

      const AI_URL = "https://ane-web-ane-ai-service.hf.space/generate-3d";

      const response = await fetch(AI_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        keepalive: true // Browser hint to keep connection stable
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        let errorMsg = "Generation failed";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          const text = await response.text();
          errorMsg = text.substring(0, 100) || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setProgress(100);
      setResult(url);
      setStlUrl(url);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Generation cancelled by user');
      } else {
        console.error(err);
        setStatus('error');
      }
    }
  };

  const cancelGenerate = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    reset();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setStlUrl(null);
    setStatus('idle');
    setProgress(0);
    setResult(null);
  };

  const isFullView = status === 'viewing_full';

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

        <div style={styles.studioContent}>
          {/* Isolated Inputs to prevent double triggering */}
          <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
          <input type="file" ref={stlInputRef} hidden accept=".stl" onChange={handleStlUpload} />
          <input type="file" ref={unifiedInputRef} hidden accept="image/*,.stl" onChange={handleUnifiedUpload} />

          <AnimatePresence mode="wait">
            {isFullView ? (
              <motion.div
                key="full-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                style={styles.fullViewerArea}
              >
                {/* Header with Cancel */}
                <div style={styles.viewerHeader}>
                  <div style={styles.studioHeader}>
                    <Box size={20} color={primaryTeal} />
                    <span style={styles.studioBadge}>{file ? 'GENERATED MESH' : '3D PREVIEWER'}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setStatus(file ? 'success' : 'idle'); }} style={styles.cancelBtn}>
                    <CloseIcon size={24} />
                  </button>
                </div>

                {/* Main 3D Stage */}
                <div style={styles.mainViewerContainer}>
                  <ModelViewer url={stlUrl} />

                  {/* Footer Controls for Generated Models */}
                  {file && (
                    <div style={styles.viewerFooterControls}>
                      <a href={result} download="model.stl" style={styles.downloadBtn}>
                        <Download size={18} /> Download STL
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1.1fr' : '1fr', gap: '4rem', alignItems: 'center' }}
              >
                {/* Left Column: Visual Area */}
                <div style={styles.visualColumn}>
                  <div
                    style={styles.previewBox}
                    onClick={(e) => {
                      if (status === 'idle') {
                        e.stopPropagation();
                        unifiedInputRef.current.click();
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {status === 'idle' && !preview ? (
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
                          <h3 style={styles.uploadTitle}>Choose an Asset</h3>
                          <p style={styles.uploadSubt}>Select an Image or STL file to begin</p>
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

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '220px', marginTop: '1.5rem' }}>
                            <a href={result} download="model.stl" style={{ ...styles.downloadBtn, width: '100%', justifyContent: 'center' }}>
                              <Download size={18} /> Download STL
                            </a>
                            <button onClick={() => setStatus('viewing_full')} style={{ ...styles.view3dBtn, width: '100%' }}>
                              <Eye size={18} /> View 3D Model
                            </button>
                            <button onClick={reset} style={styles.reloadThinBtn}>
                              <RefreshCcw size={16} /> Reload Studio
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

                      <div style={styles.stepGrid}>
                        {[
                          { label: '1. Analyzing Image', desc: 'Detecting your object\'s shape', threshold: 0 },
                          { label: '2. Building 3D Model', desc: 'Creating the digital structure', threshold: 65 },
                          { label: '3. Final Smoothing', desc: 'Polishing your model for printing', threshold: 90 }
                        ].map((step, idx) => {
                          const isWorking = status === 'uploading' || status === 'generating';
                          const isDone = status === 'success' || (idx === 0 && progress > 65) || (idx === 1 && progress > 90);
                          const isActive = isWorking && !isDone && (
                            (idx === 0 && progress <= 65) ||
                            (idx === 1 && progress > 65 && progress <= 90) ||
                            (idx === 2 && progress > 90)
                          );

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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ color: primaryTeal, fontWeight: 700 }}>
                                {progress < 30 ? 'Uploading Visuals...' :
                                  progress < 70 ? 'Building Geometry...' :
                                    progress < 95 ? 'Polishing Surface...' :
                                      'Finalizing STL File...'}
                              </span>
                              <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                                {progress > 98 ? 'Almost there! Optimizing mesh...' : 'This may take up to 2 minutes'}
                              </span>
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 200 }}>{Math.round(progress)}%</span>
                          </div>

                          <div style={styles.progressBarBg}>
                            <motion.div
                              animate={{ width: `${progress}%` }}
                              style={styles.progressBarFill}
                            />
                          </div>

                          <button onClick={cancelGenerate} style={styles.cancelGenBtn}>
                            <CloseIcon size={14} /> Cancel Generation
                          </button>
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
                      <div style={styles.emptyButtonRow}>
                        <button
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
                          style={styles.selectImageBtn}
                        >
                          <ImageIcon size={18} /> Choose Project Image
                        </button>

                        <button
                          onClick={(e) => { e.stopPropagation(); stlInputRef.current.click(); }}
                          style={{ ...styles.selectImageBtn, background: primaryTeal, color: '#000', border: 'none' }}
                        >
                          <Box size={18} /> View Existing STL
                        </button>
                      </div>

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
              </motion.div>
            )}
          </AnimatePresence>
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
          whileHover={{
            y: -20,
            borderColor: '#70e4de80',
            boxShadow: '0 30px 60px -20px rgba(112, 228, 222, 0.2)'
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={styles.card}
        >
          {/* background grid */}
          <motion.div
            style={styles.scanGrid}
            whileHover={{ opacity: 0.5, scale: 1.1 }}
          />

          {/* top */}
          <div style={styles.cardTop}>
            <motion.div
              style={styles.iconWrap}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon size={22} />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, color: '#70e4de' }}
              style={{ cursor: 'pointer', display: 'flex' }}
            >
              <ArrowUpRight size={18} style={{ opacity: 0.5 }} />
            </motion.div>
          </div>

          {/* middle */}
          <div style={styles.cardMiddle}>
            <motion.h3
              style={styles.cardTitle}
              whileHover={{ color: '#70e4de' }}
            >
              {title}
            </motion.h3>
            <p style={styles.cardText}>{desc}</p>
          </div>

          {/* bottom */}
          <motion.div
            style={styles.cardBottom}
            whileHover={{ scale: 1.05, opacity: 1 }}
          >
            <Activity size={14} />
            <span>{status}</span>
          </motion.div>
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
    justifyContent: 'space-between',
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
    overflow: 'hidden',
    cursor: 'default'
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
  cardTitle: { fontSize: '0.85rem', letterSpacing: 2, marginBottom: '1.5rem', transition: 'color 0.3s ease' },
  cardText: { fontSize: '1rem', color: '#8a8a8a', lineHeight: 1.8 },

  cardBottom: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.75rem',
    letterSpacing: '1.5px',
    color: '#70e4de',
    opacity: 0.75,
    transition: 'all 0.3s ease'
  },

  viewerHint: {
    position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.6)', padding: '0.6rem 1.2rem', borderRadius: 100,
    fontSize: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem',
    backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
    pointerEvents: 'none'
  },

  fullViewerArea: { position: 'relative', width: '100%', height: '650px', display: 'flex', flexDirection: 'column' },
  viewerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  mainViewerContainer: { flex: 1, position: 'relative', background: 'rgba(0,0,0,0.2)', borderRadius: 32, overflow: 'hidden' },
  cancelBtn: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease' },
  viewerFooterControls: { position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 },

  view3dBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
    color: '#fff', padding: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.8rem',
    justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease'
  },
  reloadThinBtn: {
    background: 'transparent', border: 'none', color: '#666', fontSize: '0.8rem',
    display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', cursor: 'pointer', marginTop: '0.5rem'
  },

  emptyButtonRow: { display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' },

  cancelGenBtn: {
    marginTop: '1.5rem', width: '100%', padding: '0.8rem', borderRadius: 12,
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    color: '#999', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
    transition: 'all 0.3s ease'
  }
};
