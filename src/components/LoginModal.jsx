import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const { loginWithGoogle } = useAuth();

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            onClose(); // Close modal on success
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(5, 5, 8, 0.85)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '450px',
                                background: 'rgba(15, 15, 20, 0.95)',
                                border: '1px solid rgba(112, 228, 222, 0.2)',
                                borderRadius: '32px',
                                padding: '3rem 2.5rem',
                                position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(112, 228, 222, 0.15)',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Decor Glow */}
                            <div style={{
                                position: 'absolute',
                                top: '-20%',
                                left: '-20%',
                                width: '140%',
                                height: '140%',
                                background: 'radial-gradient(circle at 50% 50%, rgba(112, 228, 222, 0.05) 0%, transparent 70%)',
                                pointerEvents: 'none'
                            }} />

                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: 'none',
                                    color: '#fff',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: 'rgba(112, 228, 222, 0.1)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: 'var(--primary)',
                                    border: '1px solid rgba(112, 228, 222, 0.2)'
                                }}>
                                    <LogIn size={32} />
                                </div>

                                <h2 style={{
                                    fontSize: '2rem',
                                    fontWeight: 800,
                                    marginBottom: '0.75rem',
                                    letterSpacing: '-0.02em',
                                    color: '#fff'
                                }}>
                                    One Step Away
                                </h2>
                                <p style={{
                                    color: 'var(--text-dim)',
                                    marginBottom: '2.5rem',
                                    fontSize: '1rem',
                                    lineHeight: '1.6'
                                }}>
                                    Please sign in to add items to your cart and manage your premium downloads.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleGoogleLogin}
                                    style={{
                                        width: '100%',
                                        padding: '1.1rem',
                                        background: '#fff',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 25px rgba(255,255,255,0.1)',
                                        marginBottom: '1.5rem'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </motion.button>

                                <div style={{ marginTop: '1.5rem' }} />
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
