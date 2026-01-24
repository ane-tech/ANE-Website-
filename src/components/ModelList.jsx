import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Search, Layers, ArrowUpRight, Sparkles, Download, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModelList = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const searchRef = useRef(null);
    const loader = useRef(null);

    const categories = ['All', 'Healthcare', 'Art', 'Education', 'Electronics'];
    const primaryTeal = '#70e4de';

    const getFilterColor = (category) => {
        const colors = {
            'Healthcare': '#ff6b6b',
            'Art': '#a855f7',
            'Education': '#f59e0b',
            'Electronics': '#3b82f6',
            'All': '#70e4de'
        };
        return colors[category] || '#70e4de';
    };

    const initialModels = [
        { id: 1, name: 'Anatomical Heart v2', price: 29, image: 'https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=400', category: 'Healthcare' },
        { id: 2, name: 'Cyberpunk Helmet', price: 89, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400', category: 'Electronics' },
        { id: 3, name: 'Low Poly Globe', price: 19, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400', category: 'Education' },
        { id: 4, name: 'Greek Bust Sculpture', price: 120, image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400', category: 'Art' },
        { id: 5, name: 'Precision Drone Frame', price: 45, image: 'https://images.unsplash.com/photo-1522273503825-67484a4538aa?auto=format&fit=crop&q=80&w=400', category: 'Electronics' },
        { id: 6, name: 'Minimalist Vase', price: 24, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400', category: 'Art' },
        { id: 7, name: 'Lumber Spine Model', price: 150, image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400', category: 'Healthcare' },
        { id: 8, name: 'Molecule Structure kit', price: 34, image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=400', category: 'Education' },
        { id: 9, name: 'Mechanical Gears Set', price: 42, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400', category: 'Electronics' },
        { id: 10, name: 'T-Rex Skull Prototype', price: 199, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400', category: 'Art' },
        { id: 11, name: 'Bionic Hand Assembly', price: 250, image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=400', category: 'Healthcare' },
        { id: 12, name: 'Solar System Display', price: 55, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400', category: 'Education' }
    ];

    const fetchMoreModels = () => {
        if (loading || !hasMore) return;
        setLoading(true);

        setTimeout(() => {
            // Shuffle and slightly modify properties to avoid looking like duplicates
            const shuffled = [...initialModels].sort(() => Math.random() - 0.5);
            const moreModels = shuffled.map((m, i) => ({
                ...m,
                id: `${m.id}-p${page}-${i}-${Math.random().toString(36).substr(2, 5)}`,
                name: `${m.name}${page > 1 ? ' ' + String.fromCharCode(64 + page) : ''}`,
                price: m.price + Math.floor(Math.random() * 10 - 5), // Slight price variation
                downloads: Math.floor(Math.random() * 5000) + 100,
                rating: (() => {
                    const r = Math.random();
                    if (r < 0.1) return (Math.random() * 1.5 + 0.5).toFixed(1); // ~10% are below 2.0
                    if (r < 0.3) return (Math.random() * 2.5 + 2.0).toFixed(1); // ~20% are between 2.0 and 4.5
                    return (Math.random() * 0.5 + 4.5).toFixed(1); // Majority are high quality (4.5+)
                })()
            }));

            setModels(prev => [...prev, ...moreModels]);
            setLoading(false);

            if (page >= 4) {
                setHasMore(false);
            } else {
                setPage(p => p + 1);
            }
        }, 1200);
    };

    // Only rely on the IntersectionObserver to fetch the first batch and subsequent batches
    // This prevents double-fetching on mount if the loader is visible
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                fetchMoreModels();
            }
        }, { threshold: 0.1, rootMargin: '100px' });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [loader, hasMore, loading, page]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchRef.current?.focus();
            }
            if (e.key === '/') {
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    searchRef.current?.focus();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredModels = models.filter(m => {
        const matchesFilter = activeFilter === 'All' || m.category === activeFilter;
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <section id="models" style={{
            padding: '8rem 0',
            background: 'linear-gradient(180deg, #050508 0%, #08080c 50%, #050508 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(112,228,222,0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1.25rem',
                            background: 'linear-gradient(135deg, rgba(112,228,222,0.15), rgba(112,228,222,0.05))',
                            border: '1px solid rgba(112,228,222,0.25)',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            color: '#70e4de',
                            marginBottom: '1.5rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em'
                        }}
                    >
                        <Sparkles size={14} />
                        3D MODEL LIBRARY
                    </motion.div>

                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Premium Print-Ready{' '}
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, rgba(112,228,222,0.15), rgba(112,228,222,0.05))',
                            padding: '0.15rem 1rem',
                            color: '#70e4de',
                            marginLeft: '0.25rem'
                        }}>
                            Models
                        </span>
                    </h2>

                    <p style={{
                        color: '#6a6a7a',
                        fontSize: '1.1rem',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Explore our curated collection of high-quality 3D models ready for printing
                    </p>
                </motion.div>

                {/* Filters & Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}
                >
                    {/* Category Filters */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => {
                            const catColor = getFilterColor(cat);
                            return (
                                <motion.button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    whileHover={{
                                        y: -4,
                                        backgroundColor: activeFilter === cat ? `${catColor}35` : 'rgba(255,255,255,0.08)',
                                        borderColor: activeFilter === cat ? `${catColor}60` : `${catColor}40`,
                                        color: activeFilter === cat ? catColor : '#fff',
                                        boxShadow: `0 10px 20px -10px ${catColor}40`
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '0.65rem 1.5rem',
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        background: activeFilter === cat
                                            ? `linear-gradient(135deg, ${catColor}25, ${catColor}15)`
                                            : 'rgba(255,255,255,0.03)',
                                        color: activeFilter === cat ? catColor : '#6a6a7a',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: `1px solid ${activeFilter === cat ? catColor + '40' : 'rgba(255,255,255,0.05)'}`,
                                        letterSpacing: '0.02em'
                                    }}
                                >
                                    {activeFilter === cat && (
                                        <motion.span
                                            layoutId="activeTab"
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '25%',
                                                width: '50%',
                                                height: '2px',
                                                background: catColor,
                                                borderRadius: '2px'
                                            }}
                                        />
                                    )}
                                    {cat}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Search */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1.25rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isSearchFocused ? primaryTeal + '60' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '14px',
                        minWidth: '280px',
                        transition: 'all 0.3s ease',
                        boxShadow: isSearchFocused ? `0 0 20px ${primaryTeal}15` : 'none'
                    }}>
                        <Search size={18} style={{ color: '#6a6a7a' }} />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Press '/' to search..."
                            value={searchQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                color: '#fff',
                                fontSize: '0.95rem',
                                width: '100%'
                            }}
                        />
                        {searchQuery && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setSearchQuery('')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6a6a7a',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px'
                                }}
                            >
                                <X size={16} />
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginBottom: '2.5rem',
                            color: '#8a8a9a',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0 0.5rem'
                        }}
                    >
                        <Sparkles size={16} style={{ color: primaryTeal }} />
                        <span>
                            Displaying <strong style={{ color: '#fff' }}>{filteredModels.length}</strong> {filteredModels.length === 1 ? 'result' : 'results'} matching your search
                        </span>
                    </motion.div>
                )}

                {/* Models Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredModels.map((model, idx) => {
                            const isHovered = hoveredId === model.id;
                            return (
                                <motion.div
                                    key={`${model.id}-${idx}`}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: (idx % 12) * 0.02 }}
                                    onMouseEnter={() => setHoveredId(model.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <Link
                                        to={`/model/${model.id}`}
                                        state={{ model }}
                                        style={{ display: 'block' }}
                                    >
                                        <div
                                            style={{
                                                background: '#0a0a0f',
                                                borderRadius: '28px',
                                                overflow: 'hidden',
                                                border: `1px solid ${hoveredId === model.id ? primaryTeal + '80' : primaryTeal + '30'}`,
                                                transition: 'all 0.5s ease',
                                                transform: hoveredId === model.id ? 'translateY(-10px)' : 'translateY(0)',
                                                boxShadow: hoveredId === model.id
                                                    ? `0 30px 60px -12px ${primaryTeal}20`
                                                    : '0 10px 40px -20px rgba(0,0,0,0.5)',
                                                aspectRatio: '3/4',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            {/* Top Section: Full Image */}
                                            <div style={{
                                                flex: 1,
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                <img
                                                    src={model.image}
                                                    alt={model.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        filter: isHovered ? 'brightness(0.9) saturate(1.2)' : 'brightness(0.85) saturate(1.1)',
                                                        transition: 'all 0.6s ease',
                                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                                                    }}
                                                />

                                                {/* Floating Price Tag */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '1.25rem',
                                                    right: '1.25rem',
                                                    padding: '0.6rem 1rem',
                                                    background: 'rgba(5, 5, 8, 0.6)',
                                                    backdropFilter: 'blur(12px)',
                                                    border: `1px solid ${primaryTeal}40`,
                                                    borderRadius: '12px',
                                                    color: primaryTeal,
                                                    fontSize: '1.2rem',
                                                    fontWeight: 800,
                                                    zIndex: 10,
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                                }}>
                                                    ₹{model.price}
                                                </div>
                                            </div>

                                            {/* Bottom Section: Info Panel */}
                                            <div style={{
                                                background: 'rgba(15, 15, 20, 0.95)',
                                                backdropFilter: 'blur(20px)',
                                                padding: '1.5rem',
                                                borderTop: '1px solid rgba(255,255,255,0.05)',
                                                position: 'relative'
                                            }}>
                                                {/* Category & Rating Row */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '0.75rem'
                                                }}>
                                                    <span style={{
                                                        fontSize: '0.65rem',
                                                        fontWeight: 800,
                                                        color: primaryTeal,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        padding: '0.4rem 1rem',
                                                        background: 'rgba(112,228,222,0.1)',
                                                        border: `1px solid ${primaryTeal}30`,
                                                        borderRadius: '50px',
                                                        display: 'inline-flex',
                                                        alignItems: 'center'
                                                    }}>
                                                        {model.category}
                                                    </span>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        color: model.rating >= 4.5 ? '#22c55e' : model.rating >= 3.5 ? '#fbbf24' : '#ef4444',
                                                        background: model.rating >= 4.5 ? 'rgba(34,197,94,0.1)' : model.rating >= 3.5 ? 'rgba(251,191,36,0.1)' : 'rgba(239,68,68,0.1)',
                                                        padding: '0.3rem 0.6rem',
                                                        borderRadius: '8px',
                                                        border: `1px solid ${model.rating >= 4.5 ? 'rgba(34,197,94,0.2)' : model.rating >= 3.5 ? 'rgba(251,191,36,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700
                                                    }}>
                                                        ★ {model.rating}
                                                    </div>
                                                </div>

                                                {/* Name */}
                                                <h3 style={{
                                                    fontSize: '1.15rem',
                                                    fontWeight: 700,
                                                    color: '#fff',
                                                    lineHeight: 1.3,
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                    marginBottom: '1.5rem',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {model.name}
                                                </h3>

                                                {/* Expanded Content - Now Always Visible */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    paddingTop: '1rem',
                                                    borderTop: '1px solid rgba(255,255,255,0.05)'
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        color: '#8a8a9a',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        <Download size={14} />
                                                        {model.downloads.toLocaleString()} sales
                                                    </div>

                                                    <div style={{
                                                        padding: '0.5rem 1rem',
                                                        background: isHovered ? '#fff' : primaryTeal,
                                                        borderRadius: '10px',
                                                        color: '#000',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.4rem',
                                                        transition: 'all 0.3s ease'
                                                    }}>
                                                        VIEW DETAILS <ArrowUpRight size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                        {filteredModels.length === 0 && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    gridColumn: '1 / -1',
                                    padding: '6rem 0',
                                    textAlign: 'center'
                                }}
                            >
                                <Box size={40} style={{ color: '#32323a', marginBottom: '1.5rem', margin: '0 auto' }} />
                                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>No models found</h3>
                                <p style={{ color: '#6a6a7a', marginBottom: '2rem' }}>Adjust your search or category filter.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                                    style={{
                                        padding: '0.75rem 2rem',
                                        background: primaryTeal,
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#000',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Reset Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Loader */}
                <div ref={loader} style={{ padding: '4rem 0', textAlign: 'center' }}>
                    {hasMore ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                        >
                            <div className="loader-ring" />
                            <p style={{ color: '#6a6a7a', fontSize: '0.9rem' }}>Discovering more models...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1rem 2rem',
                                background: 'rgba(112,228,222,0.05)',
                                border: '1px solid rgba(112,228,222,0.15)',
                                borderRadius: '14px',
                                color: '#70e4de',
                                fontSize: '0.9rem'
                            }}
                        >
                            <Layers size={18} />
                            You've explored our entire collection
                        </motion.div>
                    )}
                </div>
            </div>

            <style>{`
                .loader-ring {
                    width: 48px;
                    height: 48px;
                    border: 3px solid rgba(112,228,222,0.1);
                    border-top-color: #70e4de;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default ModelList;
