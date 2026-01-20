import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Filter, Search, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModelList = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('All');
    const loader = useRef(null);

    const categories = ['All', 'Healthcare', 'Art', 'Education', 'Electronics'];

    const initialModels = [
        { id: 1, name: 'Anatomical Heart Model', price: 25, image: 'https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=400', category: 'Healthcare', downloads: 1240 },
        { id: 2, name: 'Cyberpunk Helmet v2', price: 45, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400', category: 'Electronics', downloads: 890 },
        { id: 3, name: 'Low Poly Earth Globe', price: 15, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400', category: 'Education', downloads: 2100 },
        { id: 4, name: 'Greek Bust Sculpture', price: 35, image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400', category: 'Art', downloads: 756 },
        { id: 5, name: 'Drone Frame Pro', price: 50, image: 'https://images.unsplash.com/photo-1522273503825-67484a4538aa?auto=format&fit=crop&q=80&w=400', category: 'Electronics', downloads: 432 },
        { id: 6, name: 'Modern Vase Collection', price: 20, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400', category: 'Art', downloads: 1567 },
        { id: 7, name: 'Spine Vertebrae Set', price: 30, image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400', category: 'Healthcare', downloads: 678 },
        { id: 8, name: 'Molecular Structure Kit', price: 22, image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=400', category: 'Education', downloads: 1890 },
    ];

    const fetchMoreModels = () => {
        if (loading) return;
        setLoading(true);

        setTimeout(() => {
            const moreModels = initialModels.map((m, i) => ({
                ...m,
                id: m.id + models.length + i,
                downloads: Math.floor(Math.random() * 2000) + 100
            }));
            setModels(prev => [...prev, ...moreModels]);
            setLoading(false);

            if (page >= 3) {
                setHasMore(false);
            } else {
                setPage(p => p + 1);
            }
        }, 1200);
    };

    useEffect(() => {
        fetchMoreModels();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                fetchMoreModels();
            }
        }, { threshold: 0.1 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [loader, hasMore, loading]);

    const filteredModels = activeFilter === 'All'
        ? models
        : models.filter(m => m.category === activeFilter);

    return (
        <section id="models" style={{
            padding: '8rem 0',
            background: '#050508',
            position: 'relative'
        }}>
            {/* Top Border Gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(112, 228, 222, 0.3), transparent)'
            }} />

            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.4rem 1rem',
                                background: 'rgba(112, 228, 222, 0.1)',
                                border: '1px solid rgba(112, 228, 222, 0.2)',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                color: '#70e4de',
                                marginBottom: '1.5rem'
                            }}>
                                <Layers size={14} />
                                3D MODEL LIBRARY
                            </span>
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em'
                            }}>
                                Premium Print-Ready
                                <span style={{
                                    background: 'linear-gradient(135deg, #70e4de, #fff)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}> Models</span>
                            </h2>
                        </div>

                        {/* Search */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1.25rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '12px',
                                minWidth: '240px'
                            }}>
                                <Search size={18} style={{ color: '#8a8a9a' }} />
                                <input
                                    type="text"
                                    placeholder="Search models..."
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        width: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    border: '1px solid',
                                    borderColor: activeFilter === cat ? '#70e4de' : 'rgba(255,255,255,0.1)',
                                    background: activeFilter === cat ? 'rgba(112, 228, 222, 0.15)' : 'transparent',
                                    color: activeFilter === cat ? '#70e4de' : '#8a8a9a',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Models Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {filteredModels.map((model, idx) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (idx % 8) * 0.05, duration: 0.5 }}
                        >
                            <Link
                                to={`/model/${model.id}`}
                                state={{ model }}
                                style={{ display: 'block' }}
                            >
                                <div
                                    style={{
                                        background: '#0d0d12',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer'
                                    }}
                                    className="model-card"
                                >
                                    {/* Image Container */}
                                    <div style={{
                                        position: 'relative',
                                        aspectRatio: '1',
                                        overflow: 'hidden',
                                        background: '#141419'
                                    }}>
                                        <img
                                            src={model.image}
                                            alt={model.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.6s ease'
                                            }}
                                            className="model-img"
                                        />

                                        {/* Hover Overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            paddingBottom: '1.5rem'
                                        }} className="model-overlay">
                                            <span style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: '#70e4de',
                                                fontSize: '0.9rem',
                                                fontWeight: 600
                                            }}>
                                                View Details <ArrowUpRight size={16} />
                                            </span>
                                        </div>

                                        {/* Category Badge */}
                                        <span style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                            padding: '0.35rem 0.75rem',
                                            background: 'rgba(0,0,0,0.6)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            color: '#70e4de'
                                        }}>
                                            {model.category}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h3 style={{
                                                fontSize: '1.05rem',
                                                fontWeight: 600,
                                                lineHeight: 1.3,
                                                flex: 1,
                                                color: '#fff'
                                            }}>{model.name}</h3>
                                            <span style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                color: '#70e4de',
                                                marginLeft: '1rem'
                                            }}>${model.price}</span>
                                        </div>
                                        <p style={{
                                            fontSize: '0.8rem',
                                            color: '#8a8a9a'
                                        }}>{model.downloads.toLocaleString()} downloads</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Loader */}
                <div ref={loader} style={{ padding: '4rem 0', textAlign: 'center' }}>
                    {hasMore ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                border: '3px solid rgba(112, 228, 222, 0.2)',
                                borderTopColor: '#70e4de',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                            <p style={{ color: '#8a8a9a', fontSize: '0.9rem' }}>Loading more models...</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem 2rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '50px',
                            color: '#8a8a9a',
                            fontSize: '0.9rem'
                        }}>
                            <Box size={18} />
                            You've explored our entire collection
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .model-card:hover {
          transform: translateY(-8px);
          border-color: rgba(112, 228, 222, 0.2) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .model-card:hover .model-img {
          transform: scale(1.1);
        }
        .model-card:hover .model-overlay {
          opacity: 1 !important;
        }
      `}</style>
        </section>
    );
};

export default ModelList;
