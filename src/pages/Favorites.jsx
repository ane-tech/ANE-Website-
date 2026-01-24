import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const primaryTeal = '#70e4de';

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
        window.scrollTo(0, 0);
    }, []);

    const removeFavorite = (id) => {
        const updated = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updated));
        setFavorites(updated);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050508', color: '#fff' }}>
            <Header />
            <main style={{ paddingTop: '150px', paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: 800,
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: '-0.04em',
                            marginBottom: '1rem'
                        }}>Your Wishlist</h1>
                        <p style={{ color: '#6a6a7a', fontSize: '1.1rem' }}>A curated collection of your most-loved premium assets.</p>
                    </div>

                    {favorites.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            <AnimatePresence>
                                {favorites.map((model) => (
                                    <motion.div
                                        key={model.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="fav-card"
                                        style={{
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '30px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                                            <img
                                                src={model.image}
                                                alt={model.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '1.5rem',
                                                right: '1.5rem',
                                                display: 'flex',
                                                gap: '0.75rem'
                                            }}>
                                                <button
                                                    onClick={() => removeFavorite(model.id)}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '12px',
                                                        background: 'rgba(255, 71, 87, 0.15)',
                                                        color: '#ff4757',
                                                        border: '1px solid rgba(255, 71, 87, 0.2)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ padding: '2rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '1.5rem'
                                            }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>{model.name}</h3>
                                                    <span style={{ fontSize: '0.75rem', color: '#6a6a7a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{model.category}</span>
                                                </div>
                                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: primaryTeal }}>₹{model.price}</div>
                                            </div>

                                            <button
                                                onClick={() => navigate(`/model/${model.id}`, { state: { model } })}
                                                style={{
                                                    width: '100%',
                                                    padding: '1.2rem',
                                                    background: 'rgba(112, 228, 222, 0.1)',
                                                    border: '1px solid rgba(112, 228, 222, 0.2)',
                                                    borderRadius: '16px',
                                                    color: primaryTeal,
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.75rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s'
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.background = primaryTeal;
                                                    e.currentTarget.style.color = '#000';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
                                                    e.currentTarget.style.color = primaryTeal;
                                                }}
                                            >
                                                VIEW DETAIL <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                            <div style={{ color: '#1a1a1a', marginBottom: '2rem' }}><Heart size={100} strokeWidth={1} /></div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Your heart is currently leading you elsewhere</h2>
                            <p style={{ color: '#6a6a7a', marginBottom: '3rem' }}>Explore our catalog and save the pieces that inspire you.</p>
                            <button
                                onClick={() => navigate('/design')}
                                style={{
                                    padding: '1.2rem 3rem',
                                    background: primaryTeal,
                                    border: 'none',
                                    borderRadius: '100px',
                                    color: '#000',
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: `0 20px 40px ${primaryTeal}30`
                                }}
                            >
                                START EXPLORING
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Favorites;
