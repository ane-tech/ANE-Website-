import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, Users, Trophy, Rocket, ArrowRight, Layers, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
    const stats = [
        { label: 'Projects Completed', value: '150+', icon: <Trophy /> },
        { label: 'Industries Served', value: '5+', icon: <Target /> },
        { label: 'Print Efficiency', value: '99.9%', icon: <Zap /> },
        { label: 'Expert Engineers', value: '8+', icon: <Users /> },
    ];

    const values = [
        {
            title: "Unmatched Precision",
            desc: "Achieving tolerances up to 0.1mm with our industrial-grade SLS and SLA capabilities.",
            icon: <Shield size={24} />
        },
        {
            title: "Rapid Prototyping",
            desc: "From CAD to hand-held model in under 24 hours. We move at the speed of your ideas.",
            icon: <Zap size={24} />
        },
        {
            title: "Material Innovation",
            desc: "Access to over 50+ high-performance polymers, resins, and aerospace-grade metals.",
            icon: <Layers size={24} />
        }
    ];

    return (
        <div style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />

            {/* Premium Hero Section */}
            <section style={{
                paddingTop: '200px',
                paddingBottom: '100px',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 10% 20%, rgba(112, 228, 222, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(112, 228, 222, 0.05) 0%, transparent 50%)'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span style={{
                                color: 'var(--primary)',
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontSize: '0.85rem',
                                marginBottom: '1.5rem',
                                display: 'block'
                            }}>Engineering the Future</span>
                            <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
                                We Build the <span className="text-gradient">Impossible</span>.
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '3rem' }}>
                                ANE is a next-generation additive manufacturing hub. We blend cutting-edge 3D printing
                                technology with expert engineering to transform digital designs into reality.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative background grid */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(rgba(112, 228, 222, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.3,
                    zIndex: 1
                }} />
            </section>

            {/* Stats Grid */}
            <section style={{ padding: '60px 0', borderY: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="container">
                    <div className="grid-4 grid">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    borderRight: idx === 3 ? 'none' : '1px solid var(--glass-border)'
                                }}
                                className="stat-item"
                            >
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    {React.cloneElement(stat.icon, { size: 32 })}
                                </div>
                                <h2 style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'Space Grotesk', marginBottom: '0.5rem' }}>{stat.value}</h2>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Discovery Section - Simplified Design */}
            <section style={{ padding: '150px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'center' }} className="grid-responsive">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '1/1',
                                background: 'rgba(255, 255, 255, 0.01)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                perspective: '1000px'
                            }}>
                                {/* Holographic 3D Hex-Prism Design */}
                                <motion.div
                                    animate={{
                                        rotateY: [0, 360],
                                        rotateX: [0, 15, 0]
                                    }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        position: 'relative',
                                        width: '280px',
                                        height: '280px',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Rotating Wireframe Base */}
                                    {[0, 60, 120].map((deg) => (
                                        <div
                                            key={deg}
                                            style={{
                                                position: 'absolute',
                                                inset: '10px',
                                                border: '1px solid rgba(112, 228, 222, 0.1)',
                                                borderRadius: '50%',
                                                transform: `rotateY(${deg}deg) rotateX(90deg)`,
                                                transformStyle: 'preserve-3d'
                                            }}
                                        />
                                    ))}

                                    {/* Hexagonal Slices (Building the shape) */}
                                    {[-50, -30, -10, 10, 30, 50].map((z) => (
                                        <div
                                            key={z}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: `${140 - Math.abs(z)}px`,
                                                height: `${140 - Math.abs(z)}px`,
                                                background: 'rgba(112, 228, 222, 0.05)',
                                                border: '1px solid var(--primary)',
                                                transform: `translate(-50%, -50%) translateZ(${z}px) rotate(30deg)`,
                                                backdropFilter: 'blur(5px)',
                                                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                                                opacity: 1 - Math.abs(z) / 100
                                            }}
                                        />
                                    ))}

                                    {/* Internal Tech Node */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.4, 1, 0.4]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            width: '60px',
                                            height: '60px',
                                            background: 'var(--primary-glow)',
                                            borderRadius: '50%',
                                            transform: 'translate(-50%, -50%) translateZ(60px)',
                                            boxShadow: '0 0 40px var(--primary-glow)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 20
                                        }}
                                    >
                                        <div style={{ width: '4px', height: '40px', background: '#fff', opacity: 0.5, borderRadius: '2px' }} />
                                    </motion.div>

                                    {/* Scanning Orbit Effect */}
                                    <motion.div
                                        animate={{ rotateY: [0, 360] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            position: 'absolute',
                                            inset: '-30px',
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: 0,
                                            width: '8px',
                                            height: '8px',
                                            background: 'var(--primary)',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 15px var(--primary)',
                                            transform: 'translateZ(100px)'
                                        }} />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title">Bringing Your <span className="text-primary">3D Designs</span> to Life.</h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8 }}>
                                At ANE (Additive Network Engineering), we specialize in turning complex digital models
                                into high-precision physical parts. Our expertise in 3D printing ensures that every
                                layer is engineered for strength, accuracy, and performance.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                {[
                                    'Advanced Industrial 3D Printing',
                                    'Custom Additive Engineering',
                                    'Rapid Prototyping & Development',
                                    'Precision-Driven Layer Quality'
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <CheckCircle2 size={20} className="text-primary" />
                                        <span style={{ fontWeight: 500 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* New Core Values Design */}
            <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 className="section-title">Our Core <span className="text-primary">DNA</span></h2>
                        <p className="section-subtitle">How we maintain our edge in a rapidly evolving technological landscape.</p>
                    </div>

                    <div className="grid-3 grid">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                style={{
                                    padding: '3rem',
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    transition: 'all 0.3s ease'
                                }}
                                className="value-card-hover"
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(112, 228, 222, 0.1)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    marginBottom: '2rem'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>{value.title}</h3>
                                <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            <section style={{ padding: '150px 0' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(112, 228, 222, 0.1), rgba(112, 228, 222, 0.02))',
                        borderRadius: '40px',
                        border: '1px solid var(--glass-border)',
                        padding: '6rem 4rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Ready to engineer your <br /><span className="text-primary">next breakthrough?</span></h2>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }} className="grid-responsive">
                                <Link to="/contact" className="btn-primary" style={{ padding: '1.25rem 3.5rem' }}>
                                    Start Project <ArrowRight size={20} />
                                </Link>
                                <Link to="/portfolio" className="btn-secondary" style={{ padding: '1.25rem 3.5rem' }}>
                                    View Portfolio
                                </Link>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'var(--primary-glow)',
                            filter: 'blur(100px)',
                            borderRadius: '50%'
                        }} />
                    </div>
                </div>
            </section >

            <Footer />

            <style>{`
                .value-card-hover:hover {
                    border-color: var(--primary) !important;
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    background: rgba(112, 228, 222, 0.02) !important;
                }
                @media (max-width: 900px) {
                    .grid-responsive {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                    .stat-item {
                        border-right: none !important;
                        border-bottom: 1px solid var(--glass-border);
                    }
                    .hide-mobile {
                        display: none !important;
                    }
                }
            `}</style>
        </div >
    );
};

export default About;
