import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';

const Cart = () => {
    const navigate = useNavigate();
    const primaryTeal = '#70e4de';

    // Mock cart data
    const [cartItems, setCartItems] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(storedCart);
        window.scrollTo(0, 0);
    }, []);

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        const updated = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        );
        localStorage.setItem('cart', JSON.stringify(updated));
        setCartItems(updated);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updated));
        setCartItems(updated);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050508', color: '#fff' }}>
            <Header />
            <main style={{ paddingTop: '150px', paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>

                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: 800,
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: '-0.04em',
                            marginBottom: '1rem'
                        }}>Your Creative Lab</h1>
                        <p style={{ color: '#6a6a7a', fontSize: '1.1rem' }}>Review your selected assets before processing the secure order.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: cartItems.length > 0 ? '1fr 380px' : '1fr', gap: '3rem' }}>

                        {/* Items List */}
                        <div className="cart-items">
                            <AnimatePresence mode="popLayout">
                                {cartItems.length > 0 ? cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        style={{
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '24px',
                                            padding: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '2rem',
                                            marginBottom: '1.5rem'
                                        }}
                                    >
                                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '16px', objectFit: 'cover' }} />

                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.name}</h3>
                                            <div style={{ color: primaryTeal, fontWeight: 700 }}>₹{item.price.toLocaleString()}</div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                background: 'rgba(255,255,255,0.05)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '100px',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{ background: 'none', border: 'none', color: primaryTeal, cursor: 'pointer', display: 'flex' }}
                                                >-</button>
                                                <span style={{ fontSize: '1.1rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{ background: 'none', border: 'none', color: primaryTeal, cursor: 'pointer', display: 'flex' }}
                                                >+</button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                style={{ background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer', padding: '0.5rem' }}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ textAlign: 'center', padding: '5rem 0' }}
                                    >
                                        <div style={{ color: '#333', marginBottom: '2rem' }}><ShoppingBag size={80} strokeWidth={1} /></div>
                                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Cart is currently empty</h2>
                                        <button
                                            onClick={() => navigate('/')}
                                            style={{ color: primaryTeal, background: 'none', border: 'none', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}
                                        >
                                            Return to Explorer
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        {cartItems.length > 0 && (
                            <div className="cart-summary">
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '35px',
                                    padding: '2.5rem',
                                    position: 'sticky',
                                    top: '120px'
                                }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Order Summary</h2>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#8a8a9a' }}>
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#8a8a9a' }}>
                                        <span>Processing</span>
                                        <span>Free</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '2rem',
                                        paddingTop: '2rem',
                                        borderTop: '1px solid rgba(255,255,255,0.1)',
                                        marginBottom: '3rem'
                                    }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: primaryTeal }}>₹{subtotal.toLocaleString()}</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (!user) {
                                                setShowLoginModal(true);
                                            } else {
                                                navigate('/payment');
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '1.5rem',
                                            background: primaryTeal,
                                            border: 'none',
                                            borderRadius: '20px',
                                            color: '#000',
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '1rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        PLACE ORDER <ArrowRight size={18} />
                                    </button>

                                    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#555566' }}>
                                            <ShieldCheck size={16} /> <span>256-bit Secure Encryption</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#555566' }}>
                                            <CreditCard size={16} /> <span>All major payment methods</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
            <Footer />
        </div>
    );
};

export default Cart;
