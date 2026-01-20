import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Box, Layers, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ModelDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const model = location.state?.model;

    // Fallback if no model data passed
    const defaultModel = {
        id: id,
        name: 'Premium 3D Model',
        price: 25,
        category: 'General',
        downloads: 1000,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    };

    const displayModel = model || defaultModel;

    const features = [
        'High-resolution mesh optimized for FDM/SLA printing',
        'Multiple file formats included (STL, OBJ, 3MF)',
        'Pre-supported version available',
        'Tested print settings documentation',
        'Commercial license included'
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#050508' }}>
            <Header />

            <section style={{
                paddingTop: '120px',
                paddingBottom: '80px',
                minHeight: '100vh'
            }}>
                <div className="container">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.6rem 1.25rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '50px',
                            color: '#8a8a9a',
                            fontSize: '0.85rem',
                            marginBottom: '2.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)';
                            e.currentTarget.style.color = '#70e4de';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = '#8a8a9a';
                        }}
                    >
                        <ArrowLeft size={16} />
                        Back to Models
                    </motion.button>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'start'
                    }} className="model-detail-grid">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div style={{
                                borderRadius: '24px',
                                overflow: 'hidden',
                                background: '#0d0d12',
                                border: '1px solid rgba(255,255,255,0.06)'
                            }}>
                                <img
                                    src={displayModel.image}
                                    alt={displayModel.name}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '1',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            {/* Thumbnail Strip */}
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                marginTop: '1rem'
                            }}>
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            flex: 1,
                                            aspectRatio: '1',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: i === 0 ? '2px solid #70e4de' : '1px solid rgba(255,255,255,0.08)',
                                            opacity: i === 0 ? 1 : 0.5,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <img
                                            src={displayModel.image}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Details Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {/* Category Badge */}
                            <span style={{
                                display: 'inline-block',
                                padding: '0.4rem 1rem',
                                background: 'rgba(112, 228, 222, 0.1)',
                                border: '1px solid rgba(112, 228, 222, 0.2)',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                color: '#70e4de',
                                marginBottom: '1.5rem'
                            }}>
                                {displayModel.category}
                            </span>

                            {/* Title */}
                            <h1 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 700,
                                marginBottom: '1rem',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2
                            }}>
                                {displayModel.name}
                            </h1>

                            {/* Stats */}
                            <div style={{
                                display: 'flex',
                                gap: '2rem',
                                marginBottom: '2rem',
                                paddingBottom: '2rem',
                                borderBottom: '1px solid rgba(255,255,255,0.08)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8a8a9a' }}>
                                    <Download size={18} />
                                    <span>{displayModel.downloads?.toLocaleString()} downloads</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8a8a9a' }}>
                                    <Layers size={18} />
                                    <span>Print-ready files</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p style={{
                                color: '#8a8a9a',
                                fontSize: '1.05rem',
                                lineHeight: 1.8,
                                marginBottom: '2rem'
                            }}>
                                This premium 3D model is fully optimized for both FDM and resin printing.
                                It comes with pre-configured print settings and multiple file formats to ensure
                                the best results on your specific printer.
                            </p>

                            {/* Features */}
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: '#fff'
                                }}>What's Included:</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {features.map((feature, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            color: '#e0e0e0',
                                            fontSize: '0.95rem'
                                        }}>
                                            <span style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: 'rgba(112, 228, 222, 0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Check size={12} color="#70e4de" />
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price & CTA */}
                            <div style={{
                                padding: '2rem',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.06)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1.5rem'
                                }}>
                                    <span style={{ color: '#8a8a9a', fontSize: '0.9rem' }}>Price</span>
                                    <span style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 700,
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        color: '#70e4de'
                                    }}>${displayModel.price}</span>
                                </div>

                                <button className="btn-primary" style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Download size={20} />
                                    Purchase & Download
                                </button>

                                <p style={{
                                    textAlign: 'center',
                                    color: '#8a8a9a',
                                    fontSize: '0.8rem',
                                    marginTop: '1rem'
                                }}>
                                    Instant download • Lifetime access • Commercial use allowed
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
        @media (max-width: 900px) {
          .model-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
        </div>
    );
};

export default ModelDetail;
