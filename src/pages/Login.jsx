import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
    const { user, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/account');
        }
    }, [user, navigate]);

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
            <Header />

            <main style={{
                paddingTop: '120px',
                paddingBottom: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Decor */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '40%',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(112, 228, 222, 0.1) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        maxWidth: '500px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '40px',
                        padding: '3.5rem',
                        backdropFilter: 'blur(20px)',
                        textAlign: 'center'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'rgba(112, 228, 222, 0.1)',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem',
                                color: 'var(--primary)',
                                border: '1px solid rgba(112, 228, 222, 0.2)'
                            }}>
                                <LogIn size={40} />
                            </div>

                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: 900,
                                marginBottom: '1rem',
                                letterSpacing: '-0.02em'
                            }}>
                                Welcome Back
                            </h1>
                            <p style={{
                                color: 'var(--text-dim)',
                                marginBottom: '3rem',
                                fontSize: '1.1rem',
                                lineHeight: '1.6'
                            }}>
                                Experience the future of advanced manufacturing. Sign in to access your dashboard and projects.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    background: '#fff',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(255,255,255,0.1)',
                                    marginBottom: '2rem'
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </motion.button>

                            <div style={{ marginTop: '2rem' }} />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;
