import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Check,
    Heart,
    Star,
    FileText,
    Settings,
    Maximize2,
    Sparkles,
    Plus,
    Minus,
    ShoppingCart,
    X,
    ArrowRight as ArrowRightIcon,
    Share2
} from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

const ModelDetailOverlay = ({ model, onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [selectedImg, setSelectedImg] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [showFullView, setShowFullView] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const primaryTeal = '#70e4de';

    const techSpecs = [
        { label: 'Complexity', value: 'High Detail' },
        { label: 'Recommended Infill', value: '15-20%' },
        { label: 'Layer Height', value: '0.05mm - 0.2mm' },
        { label: 'File Size', value: '45.2 MB' },
        { label: 'Dimensions', value: '120 x 85 x 140 mm' },
        { label: 'Print Time', value: '~14 Hours' }
    ];

    const mockGallery = [
        model.image,
        'https://images.unsplash.com/photo-1563206767-5b18f21dae90?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600'
    ];

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsWishlisted(favorites.some(fav => fav.id === model.id));

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === model.id);
        if (existingItem) {
            setQuantity(existingItem.quantity);
        }
    }, [model.id]);

    const updateCart = (newQty) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let updatedCart;
        if (newQty === 0) {
            updatedCart = cart.filter(item => item.id !== model.id);
        } else {
            const existingIndex = cart.findIndex(item => item.id === model.id);
            if (existingIndex > -1) {
                updatedCart = [...cart];
                updatedCart[existingIndex].quantity = newQty;
            } else {
                updatedCart = [...cart, { ...model, quantity: newQty }];
            }
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setQuantity(newQty);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const toggleWishlist = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let updatedFavorites;
        if (isWishlisted) {
            updatedFavorites = favorites.filter(fav => fav.id !== model.id);
        } else {
            updatedFavorites = [...favorites, model];
        }
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsWishlisted(!isWishlisted);
    };

    const handleShare = () => {
        const url = `${window.location.origin}/model/${model.id}`;
        if (navigator.share) {
            navigator.share({ title: model.name, url }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        if (quantity === 0) updateCart(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 5, 8, 0.85)',
                backdropFilter: 'blur(20px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                overflowY: 'auto'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                    background: '#050508',
                    width: '100%',
                    maxWidth: '1400px',
                    maxHeight: '90vh',
                    borderRadius: '40px',
                    border: '1px solid rgba(112, 228, 222, 0.2)',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                    position: 'relative',
                    overflowY: 'auto',
                    padding: '4rem 2rem'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '2rem',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)'; e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                    <X size={24} />
                </button>

                <div className="container" style={{ maxWidth: '100%', padding: '0 2rem' }}>
                    <div className="detail-grid">

                        {/* LEFT COLUMN: Visuals */}
                        <div className="visuals-column">
                            <motion.div className="main-stage">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImg}
                                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        className="img-frame"
                                    >
                                        <img src={mockGallery[selectedImg]} alt={model.name} />
                                        <button className="expand-trigger" onClick={() => setShowFullView(true)}>
                                            <Maximize2 size={20} />
                                        </button>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="gallery-thumbs">
                                    {mockGallery.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5, borderColor: primaryTeal }}
                                            onClick={() => setSelectedImg(i)}
                                            className={`thumb-item ${selectedImg === i ? 'active' : ''}`}
                                        >
                                            <img src={img} alt="" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="side-interactions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <button className="circle-btn" onClick={handleShare} style={{ borderColor: copied ? primaryTeal : 'rgba(255,255,255,0.08)', color: copied ? primaryTeal : '#fff' }}>
                                    {copied ? <Check size={20} /> : <Share2 size={20} />}
                                </button>
                                <button className="circle-btn" onClick={toggleWishlist} style={{ color: isWishlisted ? '#ff4757' : '#fff' }}>
                                    <Heart size={20} fill={isWishlisted ? '#ff4757' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Information */}
                        <div className="info-column">
                            <div className="header-meta">
                                <span className="cat-badge">{model.category}</span>
                                <div className="rating-pill">
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <span>{model.rating}</span>
                                </div>
                            </div>

                            <h1 className="model-name">{model.name}</h1>

                            <p className="model-brief">
                                Professional architectural asset precision-tuned for additive manufacturing.
                                Features internal reinforcement and validated print pathing.
                            </p>

                            <div className="integrated-dashboard">
                                {/* Technical Specs Card */}
                                <div className="dashboard-card technical" style={{ gridColumn: 'span 2' }}>
                                    <div className="card-label">PRINT SPECIFICATIONS</div>
                                    <div className="specs-masonry" style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '1.5rem 4rem',
                                        textAlign: 'left'
                                    }}>
                                        {techSpecs.map((spec, i) => (
                                            <div key={i} className="masonry-item" style={{
                                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                                paddingBottom: '0.75rem',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <span className="m-label">{spec.label}</span>
                                                <span className="m-val">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pricing Card */}
                                <div className="dashboard-card primary" style={{
                                    padding: '2.5rem 2rem 2.5rem 3.5rem',
                                    gridColumn: 'span 2',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: quantity > 0 ? '1.5rem' : '0'
                                }}>
                                    <div className="premium-price-row" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <div className="price-tag" style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#555566', letterSpacing: '0.15em', textTransform: 'uppercase' }}>PRICE</div>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.2rem', lineHeight: 1 }}>
                                                <span className="sym">₹</span>
                                                <span className="val">{model.price}</span>
                                            </div>
                                        </div>
                                        <div className="action-stack" style={{ marginLeft: 'auto' }}>
                                            {quantity === 0 ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.02, background: '#fff' }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="checkout-trigger"
                                                    onClick={handleAddToCart}
                                                >
                                                    <span>GET MODEL</span>
                                                    <ArrowRight size={18} />
                                                </motion.button>
                                            ) : (
                                                <div className="quantity-selector" style={{ margin: 0 }}>
                                                    <button onClick={() => updateCart(Math.max(0, quantity - 1))}><Minus size={18} /></button>
                                                    <span className="qty-val">{quantity}</span>
                                                    <button onClick={() => updateCart(quantity + 1)}><Plus size={18} /></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {quantity > 0 && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="view-cart-btn"
                                            onClick={() => navigate('/cart')}
                                            style={{ width: '100%', margin: 0 }}
                                        >
                                            <ShoppingCart size={18} /> VIEW CART
                                        </motion.button>
                                    )}
                                </div>


                                {/* Included Assets */}
                                <div className="dashboard-card bento-assets" style={{ gridColumn: 'span 2' }}>
                                    <div className="card-label-premium">
                                        <Sparkles size={14} style={{ color: primaryTeal }} />
                                        <span>TECHNICAL ASSETS INCLUDED</span>
                                    </div>
                                    <div className="assets-bento-grid">
                                        {[
                                            { icon: <FileText size={22} />, title: "High Res STL", desc: "Optimized printing path", accent: "#70e4de" },
                                            { icon: <Settings size={22} />, title: "STEP Files", desc: "Full parametric source", accent: "#a855f7" },
                                            { icon: <Check size={22} />, title: "Print Guide", desc: "Validated settings", accent: "#fbbf24" }
                                        ].map((asset, idx) => (
                                            <div key={idx} className="asset-bento-card" style={{ '--accent': asset.accent }}>
                                                <div className="holographic-shine"></div>
                                                <div className="asset-bento-content">
                                                    <div className="icon-bento-box">{asset.icon}</div>
                                                    <div className="asset-bento-text">
                                                        <h3>{asset.title}</h3>
                                                        <p>{asset.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="quality-bar-container">
                                                    <div className="quality-bar-fill" style={{ width: '100%', background: asset.accent }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .detail-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 6rem; align-items: start; }
                    .main-stage { position: relative; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 40px; padding: 2rem; backdrop-filter: blur(10px); }
                    .img-frame { position: relative; width: 100%; aspect-ratio: 1; border-radius: 30px; overflow: hidden; box-shadow: 0 50px 100px -40px rgba(0,0,0,0.8); }
                    .img-frame img { width: 100%; height: 100%; object-fit: cover; }
                    .expand-trigger { position: absolute; bottom: 1.5rem; right: 1.5rem; width: 50px; height: 50px; border-radius: 15px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                    .gallery-thumbs { display: flex; gap: 1.5rem; margin-top: 2rem; }
                    .thumb-item { width: 90px; height: 90px; border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; }
                    .thumb-item.active { border-color: ${primaryTeal}; }
                    .circle-btn { width: 54px; height: 54px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                    .header-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
                    .cat-badge { padding: 0.5rem 1rem; background: rgba(112,228,222,0.1); color: ${primaryTeal}; border-radius: 100px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; }
                    .rating-pill { display: flex; align-items: center; gap: 0.4rem; background: rgba(255,255,255,0.05); padding: 0.4rem 0.8rem; border-radius: 100px; font-size: 0.85rem; font-weight: 700; }
                    .model-name { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; font-family: 'Space Grotesk', sans-serif; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.04em; }
                    .model-brief { color: #8a8a9a; font-size: 0.95rem; line-height: 1.6; margin-bottom: 2.5rem; }
                    .integrated-dashboard { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                    .dashboard-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 1.5rem; position: relative; display: flex; flex-direction: column; }
                    .card-label { font-size: 0.7rem; font-weight: 900; color: #555566; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem; }
                    .price-tag { display: flex; align-items: flex-start; gap: 0.2rem; line-height: 1; }
                    .price-tag .sym { font-size: 1.25rem; font-weight: 700; color: ${primaryTeal}; margin-top: 0.2rem; }
                    .price-tag .val { font-size: 2.75rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.04em; }
                    .checkout-trigger { width: 240px; padding: 1.2rem; background: ${primaryTeal}; border: none; border-radius: 16px; color: #000; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem; cursor: pointer; flex-shrink: 0; }
                    .quantity-selector { display: flex; align-items: center; gap: 1.5rem; background: rgba(255,255,255,0.05); padding: 0.75rem 1.5rem; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); }
                    .quantity-selector button { background: none; border: none; color: ${primaryTeal}; cursor: pointer; }
                    .view-cart-btn { width: 100%; padding: 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; color: #fff; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 1rem; }
                    
                    /* Bento Asset Styling */
                    .bento-assets { padding: 0 !important; background: transparent !important; border: none !important; }
                    .card-label-premium { display: flex; align-items: center; gap: 0.6rem; font-size: 0.75rem; font-weight: 800; color: #fff; letter-spacing: 0.15em; margin-bottom: 1.5rem; padding-left: 0.25rem; opacity: 0.6; }
                    .assets-bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; width: 100%; }
                    .asset-bento-card { position: relative; padding: 1.5rem; border-radius: 24px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px) saturate(160%); overflow: hidden; transition: all 0.4s ease; }
                    .asset-bento-card:hover { border-color: var(--accent); background: rgba(255, 255, 255, 0.05); }
                    .holographic-shine { position: absolute; inset: -100%; background: linear-gradient(140deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%); pointer-events: none; transition: transform 0.8s ease; }
                    .asset-bento-card:hover .holographic-shine { transform: translate(50%, 50%); }
                    .icon-bento-box { width: 48px; height: 48px; border-radius: 16px; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 1.25rem; transition: all 0.3s ease; }
                    .asset-bento-card:hover .icon-bento-box { background: var(--accent); color: #000; }
                    .asset-bento-text h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem; }
                    .asset-bento-text p { font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); line-height: 1.5; }
                    .quality-bar-container { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: rgba(255,255,255,0.05); }
                    .quality-bar-fill { height: 100%; transform: scaleX(0); transform-origin: left; transition: transform 0.6s ease; }
                    .asset-bento-card:hover .quality-bar-fill { transform: scaleX(1); }
                    
                    .m-label { font-size: 0.65rem; color: #555566; font-weight: 800; text-transform: uppercase; }
                    .m-val { font-size: 0.85rem; color: #fff; font-weight: 600; white-space: nowrap; }

                    @media (max-width: 1024px) {
                        .detail-grid { grid-template-columns: 1fr; gap: 4rem; }
                        .integrated-dashboard { grid-template-columns: 1fr; }
                        .dashboard-card.primary { padding: 1.5rem 1.5rem 1.5rem 2rem !important; }
                        .checkout-trigger { width: auto; padding: 1rem 1.5rem; font-size: 0.85rem; }
                        .price-tag .val { font-size: 2.25rem; }
                    }
                `}</style>

            </motion.div>

            {/* Modals outside the primary content container */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

            <AnimatePresence>
                {showFullView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowFullView(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img src={mockGallery[selectedImg]} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '20px' }} alt="Full View" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ModelDetailOverlay;
