import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Sparkles, Cpu, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ================= ANIMATIONS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: 'easeOut' }
  })
};

const DesignPage = () => {
  return (
    <>
      <Header />

      <main
        style={{
          minHeight: '100vh',
          paddingTop: '120px',
          background:
            'radial-gradient(circle at 20% 10%, rgba(112,228,222,0.12), transparent 45%), linear-gradient(180deg,#050508,#0a0a0f)'
        }}
      >
        {/* ================= HERO ================= */}
        <section className="container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={heroIcon}>
              <PenTool size={46} />
            </div>

            <h1 style={heroTitle}>Design Services</h1>

            <p style={heroSubtitle}>
              Human-centered design today.
              <br />
              AI-powered creativity tomorrow.
            </p>

            <div style={badge}>
              <span className="pulse-dot" />
              AI Design Assistant Launching Soon
            </div>
          </motion.div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="container" style={{ padding: '3rem 2rem' }}>
          <div style={grid}>
            {features.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={featureCard}
              >
                <div style={{ color: '#70e4de', marginBottom: 14 }}>
                  {item.icon}
                </div>
                <h3 style={featureTitle}>{item.title}</h3>
                <p style={featureDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= CHATGPT-LIKE AI INTERFACE ================= */}
        <section className="container" style={{ padding: '5rem 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={chatWrapper}
          >
            {/* Header */}
            <div style={chatHeader}>
              <Cpu size={18} />
              <span>ANE AI · Design Assistant</span>
              <span style={lockedTag}>LOCKED</span>
            </div>

            {/* Chat Body */}
            <div style={chatBody}>
              {/* User */}
              <div style={{ ...chatBubble, ...userBubble }}>
                Design a modern landing page for an AI startup.
              </div>

              {/* AI */}
              <div style={{ ...chatBubble, ...aiBubble }}>
                I’ll generate a dark-theme layout with glassmorphism,
                responsive sections, and an AI-focused visual identity.
              </div>

              {/* Typing */}
              <div style={{ ...chatBubble, ...aiBubble, opacity: 0.6 }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>

            {/* Overlay Lock */}
            <div style={chatOverlay}>
              <Lock size={44} color="#70e4de" />
              <h3 style={{ marginTop: 12, color: '#fff' }}>
                AI Chat Coming Soon
              </h3>
              <p style={{ maxWidth: 420, color: '#9a9ab0', textAlign: 'center' }}>
                This ChatGPT-style design assistant will unlock with
                live AI intelligence.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= GLOBAL STYLES ================= */}
        <style>{`
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #70e4de;
            animation: pulse 1.6s infinite;
          }

          @keyframes pulse {
            0%,100% { opacity: 1; }
            50% { opacity: 0.35; }
          }

          .typing-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-right: 4px;
            border-radius: 50%;
            background: #70e4de;
            animation: blink 1.4s infinite both;
          }

          .typing-dot:nth-child(2) { animation-delay: .2s; }
          .typing-dot:nth-child(3) { animation-delay: .4s; }

          @keyframes blink {
            0% { opacity: .2; }
            20% { opacity: 1; }
            100% { opacity: .2; }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
};

/* ================= STYLE OBJECTS ================= */

const heroIcon = {
  width: 100,
  height: 100,
  margin: '0 auto 2rem',
  borderRadius: 26,
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(112,228,222,0.14)',
  border: '1px solid rgba(112,228,222,0.35)',
  color: '#70e4de'
};

const heroTitle = {
  fontSize: 'clamp(3rem,6vw,4.5rem)',
  fontWeight: 800,
  marginBottom: '1.25rem',
  background: 'linear-gradient(135deg,#fff,#70e4de)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};

const heroSubtitle = {
  maxWidth: 680,
  margin: '0 auto',
  fontSize: '1.25rem',
  color: '#9a9ab0',
  lineHeight: 1.7
};

const badge = {
  marginTop: '2.5rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '0.8rem 1.8rem',
  borderRadius: 999,
  background: 'rgba(112,228,222,0.12)',
  border: '1px solid rgba(112,228,222,0.25)',
  color: '#70e4de'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))',
  gap: '2.5rem'
};

const featureCard = {
  padding: '2.4rem',
  borderRadius: 22,
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)'
};

const featureTitle = { color: '#fff', marginBottom: 10 };
const featureDesc = { color: '#9a9ab0', lineHeight: 1.65 };

/* ===== ChatGPT-style UI ===== */

const chatWrapper = {
  position: 'relative',
  maxWidth: 900,
  margin: '0 auto',
  borderRadius: 24,
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(14px)'
};

const chatHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '1rem 1.5rem',
  background: 'rgba(0,0,0,0.45)',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  color: '#e5e5e5',
  fontSize: '.95rem'
};

const lockedTag = {
  marginLeft: 'auto',
  fontSize: '.7rem',
  padding: '0.2rem 0.6rem',
  borderRadius: 999,
  background: 'rgba(112,228,222,0.15)',
  color: '#70e4de'
};

const chatBody = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem'
};

const chatBubble = {
  maxWidth: '70%',
  padding: '0.9rem 1.2rem',
  borderRadius: 16,
  fontSize: '.95rem',
  lineHeight: 1.6
};

const userBubble = {
  alignSelf: 'flex-end',
  background: '#70e4de',
  color: '#000'
};

const aiBubble = {
  alignSelf: 'flex-start',
  background: 'rgba(255,255,255,0.08)',
  color: '#e5e5e5'
};

const chatOverlay = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(5,5,8,0.78)',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  padding: '2rem'
};

/* ================= DATA ================= */

const features = [
  {
    icon: <Sparkles size={22} />,
    title: 'Creative Design',
    desc: 'High-impact branding, UI/UX, and visual identity systems.'
  },
  {
    icon: <Cpu size={22} />,
    title: 'AI-Assisted Workflow',
    desc: 'Design intelligence enhanced through automation and data.'
  },
  {
    icon: <PenTool size={22} />,
    title: 'Pixel-Perfect Execution',
    desc: 'Precision layouts built for scalability and performance.'
  }
];

export default DesignPage;
    