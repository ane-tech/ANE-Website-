import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PlaceholderPage = ({ title, description }) => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#050508' }}>
            <Header />

            <section style={{
                paddingTop: '140px',
                paddingBottom: '100px',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Effects */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(112, 228, 222, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
                    >
                        {/* Back Button */}
                        <button
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
                                marginBottom: '2rem',
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
                            Go Back
                        </button>

                        {/* Page Title */}
                        <h1 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            {title}
                        </h1>

                        <p style={{
                            color: '#8a8a9a',
                            fontSize: '1.15rem',
                            lineHeight: 1.8,
                            marginBottom: '3rem'
                        }}>
                            {description || `Detailed content for ${title} is coming soon. We're working hard to bring you comprehensive information about our ${title.toLowerCase()} services.`}
                        </p>

                        {/* Placeholder Visual */}
                        <div style={{
                            padding: '4rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '24px',
                            border: '1px dashed rgba(255,255,255,0.1)',
                            marginBottom: '3rem'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto 1.5rem',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, rgba(112, 228, 222, 0.2), rgba(112, 228, 222, 0.05))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem'
                            }}>
                                🚀
                            </div>
                            <p style={{ color: '#8a8a9a', fontSize: '0.95rem' }}>
                                This page is under construction
                            </p>
                        </div>

                        {/* CTA */}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/" className="btn-primary">
                                Return Home
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PlaceholderPage;
