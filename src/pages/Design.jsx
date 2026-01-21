import React from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DesignPage = () => {
    return (
        <>
            <Header />
            <main style={{
                minHeight: '100vh',
                paddingTop: '120px',
                background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 100%)'
            }}>
                <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100px',
                                height: '100px',
                                borderRadius: '24px',
                                background: 'linear-gradient(135deg, rgba(112, 228, 222, 0.2), rgba(112, 228, 222, 0.05))',
                                border: '1px solid rgba(112, 228, 222, 0.3)',
                                color: '#70e4de',
                                marginBottom: '2rem'
                            }}
                        >
                            <PenTool size={48} />
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                fontWeight: 700,
                                marginBottom: '1.5rem',
                                background: 'linear-gradient(135deg, #fff 0%, #70e4de 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Design Services
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                fontSize: '1.25rem',
                                color: '#8a8a9a',
                                maxWidth: '600px',
                                margin: '0 auto 2rem',
                                lineHeight: 1.7
                            }}
                        >
                            Our comprehensive design services are coming soon.We're preparing something amazing for you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1rem 2rem',
                                background: 'rgba(112, 228, 222, 0.1)',
                                border: '1px solid rgba(112, 228, 222, 0.2)',
                                borderRadius: '100px',
                                color: '#70e4de',
                                fontSize: '1rem'
                            }}
                        >
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#70e4de',
                                animation: 'pulse 2s infinite'
                            }} />
                            Coming Soon
                        </motion.div>
                    </motion.div>
                </div>

                <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
            </main>
            <Footer />
        </>
    );
};

export default DesignPage;
