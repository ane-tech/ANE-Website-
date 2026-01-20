import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingTop: '100px',
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(112, 228, 222, 0.15), transparent)'
        }}>
            {/* Animated Background Orbs */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(112, 228, 222, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(77, 182, 176, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'float 10s ease-in-out infinite reverse',
                zIndex: 0
            }} />

            {/* Grid Pattern Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(112, 228, 222, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(112, 228, 222, 0.03) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
                opacity: 0.5,
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(112, 228, 222, 0.1)',
                            border: '1px solid rgba(112, 228, 222, 0.2)',
                            borderRadius: '50px',
                            marginBottom: '2rem',
                            fontSize: '0.85rem',
                            color: '#70e4de'
                        }}
                    >
                        <Sparkles size={16} />
                        Next-Gen Additive Manufacturing
                    </motion.div>

                    {/* Main Heading */}
                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.03em'
                    }}>
                        Where Ideas Take
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #70e4de 0%, #fff 50%, #70e4de 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'gradient-shift 4s linear infinite'
                        }}>Physical Form</span>
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: '#8a8a9a',
                        maxWidth: '650px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.8
                    }}>
                        ANE delivers precision 3D printing solutions that transform your digital
                        concepts into high-quality physical products—from rapid prototypes to
                        production-scale manufacturing.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="#models" className="btn-primary">
                            Explore Models
                            <ArrowRight size={18} />
                        </a>
                        <a href="/portfolio" className="btn-secondary">
                            <Play size={16} fill="currentColor" />
                            View Portfolio
                        </a>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                        marginTop: '5rem',
                        padding: '2.5rem 3rem',
                        background: 'rgba(13, 13, 18, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '24px',
                        maxWidth: '900px',
                        margin: '5rem auto 0',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem',
                        textAlign: 'center'
                    }}>
                        {[
                            { value: '500+', label: 'Projects Completed', sub: 'Since 2018' },
                            { value: '0.01mm', label: 'Precision Accuracy', sub: 'Industry Leading' },
                            { value: '24h', label: 'Rapid Turnaround', sub: 'Express Service' }
                        ].map((stat, i) => (
                            <div key={i} style={{
                                padding: '0.5rem',
                                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                            }}>
                                <div style={{
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 700,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    background: 'linear-gradient(135deg, #70e4de, #fff)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: '0.5rem'
                                }}>{stat.value}</div>
                                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{stat.label}</div>
                                <div style={{ fontSize: '0.8rem', color: '#8a8a9a' }}>{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <span style={{ fontSize: '0.75rem', color: '#8a8a9a', letterSpacing: '0.1em' }}>SCROLL</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        width: '24px',
                        height: '40px',
                        border: '2px solid rgba(112, 228, 222, 0.3)',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '8px'
                    }}
                >
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: '#70e4de',
                        borderRadius: '2px'
                    }} />
                </motion.div>
            </motion.div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 768px) {
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.5rem !important; }
          .stats-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
