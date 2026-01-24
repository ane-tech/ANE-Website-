import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

const Payment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const primaryTeal = '#70e4de';

    return (
        <div style={{ minHeight: '100vh', background: '#050508', color: '#fff' }}>
            <Header />
            <main style={{ paddingTop: '150px', paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '40px',
                            padding: '4rem',
                            textAlign: 'center',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'rgba(112,228,222,0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            color: primaryTeal
                        }}>
                            <CreditCard size={40} />
                        </div>

                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            fontFamily: "'Space Grotesk', sans-serif",
                            marginBottom: '1rem',
                            letterSpacing: '-0.04em'
                        }}>Secure Payment</h1>

                        <p style={{ color: '#8a8a9a', fontSize: '1.2rem', marginBottom: '3rem' }}>
                            You are just one step away from downloading your premium asset.
                        </p>

                        <div style={{
                            background: 'rgba(255,255,255,0.01)',
                            border: '1px solid rgba(255,255,255,0.03)',
                            borderRadius: '24px',
                            padding: '2rem',
                            marginBottom: '3rem',
                            textAlign: 'left'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <span style={{ color: '#6a6a7a' }}>Product</span>
                                <span style={{ fontWeight: 600 }}>Premium 3D Asset</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#6a6a7a' }}>License</span>
                                <span style={{ fontWeight: 600 }}>Standard Commercial</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: primaryTeal }}>₹50.00</span>
                            </div>
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '1.5rem',
                            background: primaryTeal,
                            border: 'none',
                            borderRadius: '20px',
                            color: '#000',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }}>
                            PROCEED TO CHECKOUT
                        </button>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555566', fontSize: '0.85rem' }}>
                                <ShieldCheck size={16} /> 256-bit SSL Secure
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555566', fontSize: '0.85rem' }}>
                                <CheckCircle size={16} /> Guaranteed Delivery
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Payment;
