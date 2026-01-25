import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    Download,
    Check,
    ShieldCheck,
    Zap,
    Share2,
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
    Cpu,
    Layers,
    Ruler,
    Clock
} from 'lucide-react';

const ModelDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const model = location.state?.model;
    const [selectedImg, setSelectedImg] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [showFullView, setShowFullView] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const user = { name: 'Demo User' }; // Mock user
    const primaryTeal = '#70e4de';

    const defaultModel = {
        id: id,
        name: 'Premium 3D Model',
        price: 2500,
        category: 'General',
        downloads: 1000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    };

    const displayModel = model || defaultModel;

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsWishlisted(favorites.some(fav => fav.id === displayModel.id));

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === displayModel.id);
        if (existingItem) {
            setQuantity(existingItem.quantity);
        }
    }, [displayModel.id]);

    const updateCart = (newQty) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let updatedCart;
        if (newQty === 0) {
            updatedCart = cart.filter(item => item.id !== displayModel.id);
        } else {
            const existingIndex = cart.findIndex(item => item.id === displayModel.id);
            if (existingIndex > -1) {
                updatedCart = [...cart];
                updatedCart[existingIndex].quantity = newQty;
            } else {
                updatedCart = [...cart, { ...displayModel, quantity: newQty }];
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
            updatedFavorites = favorites.filter(fav => fav.id !== displayModel.id);
        } else {
            updatedFavorites = [...favorites, displayModel];
        }
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsWishlisted(!isWishlisted);
    };

    const handleShare = () => {
        const url = window.location.href;
        const text = `Check out this amazing 3D model: ${displayModel.name}`;

        if (navigator.share) {
            navigator.share({ title: displayModel.name, text, url })
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const techSpecs = [
        { icon: <Cpu size={20} />, label: 'Complexity', value: 'High Detail', color: '#70e4de' },
        { icon: <Layers size={20} />, label: 'Infill', value: '15-20%', color: '#a855f7' },
        { icon: <Ruler size={20} />, label: 'Layer Height', value: '0.05-0.2mm', color: '#fbbf24' },
        { icon: <FileText size={20} />, label: 'File Size', value: '45.2 MB', color: '#ef4444' },
        { icon: <Ruler size={20} />, label: 'Dimensions', value: '120×85×140mm', color: '#3b82f6' },
        { icon: <Clock size={20} />, label: 'Print Time', value: '~14 Hours', color: '#10b981' }
    ];

    const mockGallery = [
        displayModel.image,
        'https://images.unsplash.com/photo-1563206767-5b18f21dae90?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600'
    ];

    const handleAddToCart = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        if (quantity === 0) updateCart(1);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050508', color: '#fff', overflowX: 'hidden' }}>
            <section style={{
                paddingTop: '160px',
                paddingBottom: '120px',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 50% -20%, rgba(112, 228, 222, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="container">
                    <div className="detail-grid">

                        {/* LEFT COLUMN: Visuals */}
                        <div className="visuals-column">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="main-stage"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImg}
                                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.5 }}
                                        className="img-frame"
                                    >
                                        <img src={mockGallery[selectedImg]} alt={displayModel.name} />
                                        <button className="expand-trigger" onClick={(e) => { e.stopPropagation(); setShowFullView(true); }}>
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

                            <div className="side-interactions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', position: 'relative' }}>
                                <button
                                    className="circle-btn"
                                    onClick={handleShare}
                                    style={{
                                        position: 'relative',
                                        borderColor: copied ? primaryTeal : 'rgba(255,255,255,0.08)',
                                        color: copied ? primaryTeal : '#fff'
                                    }}
                                >
                                    {copied ? <Check size={20} /> : <Share2 size={20} />}
                                    <AnimatePresence>
                                        {copied && (
                                            <motion.span
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '100%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    background: 'rgba(112, 228, 222, 0.9)',
                                                    color: '#000',
                                                    padding: '4px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 700,
                                                    marginBottom: '10px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                LINK COPIED
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>

                                <button
                                    className="circle-btn"
                                    onClick={toggleWishlist}
                                    style={{ color: isWishlisted ? '#ff4757' : '#fff' }}
                                >
                                    <Heart size={20} fill={isWishlisted ? '#ff4757' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Information */}
                        <div className="info-column">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="header-meta">
                                    <span className="cat-badge">{displayModel.category}</span>
                                    <div className="rating-pill">
                                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                        <span>{displayModel.rating}</span>
                                    </div>
                                </div>

                                <h1 className="model-name">{displayModel.name}</h1>

                                <p className="model-brief">
                                    Professional architectural asset precision-tuned for additive manufacturing.
                                    Features internal reinforcement and validated print pathing.
                                </p>

                                <div className="integrated-dashboard">
                                    {/* Price & Action Section - Now at Top */}
                                    <div className="price-action-section" style={{
                                        padding: '2.5rem 2rem 2.5rem 3.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: quantity > 0 ? '1.5rem' : '0'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <div className="price-container" style={{ marginRight: 'auto' }}>
                                                <div className="price-label">Price</div>
                                                <div className="price-tag">
                                                    <span className="sym">₹</span>
                                                    <span className="val">{displayModel.price}</span>
                                                </div>
                                            </div>

                                            <div className="action-container" style={{ marginLeft: 'auto' }}>
                                                {quantity === 0 ? (
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="get-model-btn"
                                                        onClick={handleAddToCart}
                                                    >
                                                        <span>GET MODEL</span>
                                                        <ArrowRight size={18} />
                                                    </motion.button>
                                                ) : (
                                                    <div className="quantity-selector-new">
                                                        <button onClick={() => updateCart(Math.max(0, quantity - 1))}>
                                                            <Minus size={18} />
                                                        </button>
                                                        <span className="qty-val">{quantity}</span>
                                                        <button onClick={() => updateCart(quantity + 1)}>
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {quantity > 0 && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="view-cart-btn-new"
                                                onClick={() => navigate('/cart')}
                                                style={{ width: '100%', justifyContent: 'center' }}
                                            >
                                                <ShoppingCart size={18} />
                                                VIEW CART
                                            </motion.button>
                                        )}
                                    </div>

                                    {/* Redesigned Print Specifications */}
                                    <div className="specs-section">
                                        <div className="specs-header">
                                            <Sparkles size={16} style={{ color: primaryTeal }} />
                                            <span>PRINT SPECIFICATIONS</span>
                                        </div>

                                        <div className="specs-grid">
                                            {techSpecs.map((spec, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="spec-card"
                                                    style={{ '--spec-color': spec.color }}
                                                >
                                                    <div className="spec-icon" style={{ color: spec.color }}>
                                                        {spec.icon}
                                                    </div>
                                                    <div className="spec-content">
                                                        <div className="spec-label">{spec.label}</div>
                                                        <div className="spec-value">{spec.value}</div>
                                                    </div>
                                                    <div className="spec-glow" style={{ background: spec.color }}></div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technical Assets */}
                                    <div className="assets-section">
                                        <div className="specs-header">
                                            <FileText size={16} style={{ color: primaryTeal }} />
                                            <span>TECHNICAL ASSETS INCLUDED</span>
                                        </div>
                                        <div className="assets-bento-grid">
                                            {[
                                                { icon: <FileText size={22} />, title: "High Res STL", desc: "Optimized printing path", accent: "#70e4de", delay: 0 },
                                                { icon: <Settings size={22} />, title: "STEP Files", desc: "Full parametric source", accent: "#a855f7", delay: 0.1 },
                                                { icon: <Check size={22} />, title: "Print Guide", desc: "Validated settings", accent: "#fbbf24", delay: 0.2 }
                                            ].map((asset, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    transition={{ delay: asset.delay + 0.3, duration: 0.5, ease: "easeOut" }}
                                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                                    className="asset-bento-card"
                                                    style={{ '--accent': asset.accent }}
                                                >
                                                    <div className="holographic-shine"></div>
                                                    <div className="asset-bento-content">
                                                        <motion.div
                                                            className="icon-bento-box"
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                        >
                                                            {asset.icon}
                                                            <div className="icon-bento-glow"></div>
                                                        </motion.div>
                                                        <div className="asset-bento-text">
                                                            <h3>{asset.title}</h3>
                                                            <p>{asset.desc}</p>
                                                        </div>
                                                    </div>
                                                    <div className="quality-bar-container">
                                                        <div className="quality-bar-fill" style={{ width: '100%', background: asset.accent }}></div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full View Modal */}
            <AnimatePresence>
                {showFullView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowFullView(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.98)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <button
                            onClick={() => setShowFullView(false)}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: '#fff',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <X size={32} />
                        </button>

                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImg((selectedImg - 1 + mockGallery.length) % mockGallery.length); }}
                                style={{
                                    position: 'absolute',
                                    left: '2rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    color: '#fff',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ArrowRight size={32} style={{ transform: 'rotate(180deg)' }} />
                            </button>

                            <motion.img
                                key={selectedImg}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={mockGallery[selectedImg]}
                                alt="Full View"
                                style={{
                                    maxWidth: '90%',
                                    maxHeight: '90%',
                                    objectFit: 'contain',
                                    borderRadius: '20px',
                                    boxShadow: '0 50px 100px rgba(0,0,0,0.8)'
                                }}
                            />

                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImg((selectedImg + 1) % mockGallery.length); }}
                                style={{
                                    position: 'absolute',
                                    right: '2rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    color: '#fff',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ArrowRight size={32} />
                            </button>

                            <div style={{
                                position: 'absolute',
                                bottom: '2rem',
                                display: 'flex',
                                gap: '1rem'
                            }}>
                                {mockGallery.map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: selectedImg === i ? '#fff' : 'rgba(255,255,255,0.2)',
                                            transition: 'all 0.3s'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .detail-grid {
                    display: grid;
                    grid-template-columns: 1.15fr 1fr;
                    gap: 6rem;
                    align-items: start;
                }

                /* Visuals */
                .main-stage {
                    position: relative;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 40px;
                    padding: 2rem;
                    backdrop-filter: blur(10px);
                }

                .img-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 30px;
                    overflow: hidden;
                    box-shadow: 0 50px 100px -40px rgba(0,0,0,0.8);
                }

                .img-frame img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .expand-trigger {
                    position: absolute;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 15px;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .gallery-thumbs {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .thumb-item {
                    width: 90px;
                    height: 90px;
                    border-radius: 18px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .thumb-item.active {
                    border-color: ${primaryTeal};
                    box-shadow: 0 10px 20px -5px ${primaryTeal}40;
                }

                .circle-btn {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .circle-btn:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                }

                /* Header */
                .header-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .cat-badge {
                    padding: 0.5rem 1rem;
                    background: rgba(112,228,222,0.1);
                    color: ${primaryTeal};
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                }

                .rating-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.4rem 0.8rem;
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 700;
                }

                .model-name {
                    font-size: clamp(2rem, 4vw, 2.75rem);
                    font-weight: 800;
                    font-family: 'Space Grotesk', sans-serif;
                    line-height: 1.1;
                    margin-bottom: 1rem;
                    letter-spacing: -0.04em;
                }

                .model-brief {
                    color: #8a8a9a;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .integrated-dashboard {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                /* Price & Action Section */
                .price-action-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(135deg, rgba(112, 228, 222, 0.08) 0%, rgba(255,255,255,0.02) 100%);
                    border: 1px solid rgba(112, 228, 222, 0.15);
                    border-radius: 30px;
                    gap: 2rem;
                }

                .price-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .price-label {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #555566;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                .price-tag {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.3rem;
                    line-height: 1;
                }

                .price-tag .sym {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: ${primaryTeal};
                    margin-top: 0.3rem;
                }

                .price-tag .val {
                    font-size: 3.5rem;
                    font-weight: 800;
                    font-family: 'Space Grotesk', sans-serif;
                    letter-spacing: -0.04em;
                }

                .action-container {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .get-model-btn {
                    padding: 1.4rem 3.5rem;
                    background: ${primaryTeal};
                    border: none;
                    border-radius: 20px;
                    color: #000;
                    font-weight: 800;
                    font-size: 1.05rem;
                    letter-spacing: 0.08em;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    box-shadow: 0 20px 40px ${primaryTeal}30;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .get-model-btn:hover {
                    background: #fff;
                    transform: translateY(-2px);
                    box-shadow: 0 25px 50px ${primaryTeal}40;
                }

                .quantity-selector-new {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.9rem 1.8rem;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .quantity-selector-new button {
                    background: none;
                    border: none;
                    color: ${primaryTeal};
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .quantity-selector-new button:hover {
                    transform: scale(1.2);
                }

                .qty-val {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #fff;
                    min-width: 30px;
                    text-align: center;
                }

                .view-cart-btn-new {
                    padding: 1.25rem 2rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 18px;
                    color: #fff;
                    font-weight: 800;
                    font-size: 0.95rem;
                    letter-spacing: 0.08em;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    transition: all 0.3s;
                    white-space: nowrap;
                }

                .view-cart-btn-new:hover {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                }

                /* Specs Section - New Design */
                .specs-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .specs-header {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: 0.15em;
                    opacity: 0.7;
                }

                .specs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1.25rem;
                }

                .spec-card {
                    position: relative;
                    padding: 1.5rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    transition: all 0.4s ease;
                    overflow: hidden;
                }

                .spec-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: var(--spec-color);
                    transform: translateY(-4px);
                }

                .spec-card:hover .spec-glow {
                    opacity: 0.15;
                }

                .spec-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background: rgba(0,0,0,0.4);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .spec-card:hover .spec-icon {
                    background: var(--spec-color);
                    color: #000 !important;
                    transform: scale(1.1) rotate(5deg);
                }

                .spec-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .spec-label {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .spec-value {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.02em;
                }

                .spec-glow {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                /* Assets Section */
                .assets-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .assets-bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                }

                .asset-bento-card {
                    position: relative;
                    padding: 1.5rem;
                    border-radius: 24px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(15px) saturate(160%);
                    overflow: hidden;
                    transition: border-color 0.4s ease, background 0.4s ease;
                }

                .asset-bento-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--accent);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .holographic-shine {
                    position: absolute;
                    top: -100%;
                    left: -100%;
                    width: 300%;
                    height: 300%;
                    background: linear-gradient(
                        140deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.05) 45%,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 55%,
                        transparent 70%
                    );
                    transform: rotate(0deg);
                    pointer-events: none;
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .asset-bento-card:hover .holographic-shine {
                    transform: rotate(25deg) translate(20%, 20%);
                }

                .asset-bento-content {
                    position: relative;
                    z-index: 2;
                }

                .icon-bento-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 16px;
                    background: rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent);
                    margin-bottom: 1.25rem;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .asset-bento-card:hover .icon-bento-box {
                    background: var(--accent);
                    color: #000;
                    border-color: var(--accent);
                    box-shadow: 0 0 20px var(--accent);
                }

                .icon-bento-glow {
                    position: absolute;
                    inset: -2px;
                    background: var(--accent);
                    opacity: 0;
                    filter: blur(8px);
                    border-radius: 18px;
                    transition: opacity 0.3s ease;
                }

                .asset-bento-card:hover .icon-bento-glow {
                    opacity: 0.2;
                }

                .asset-bento-text h3 {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 0.4rem;
                    letter-spacing: -0.01em;
                }

                .asset-bento-text p {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.5;
                    font-weight: 500;
                }

                .quality-bar-container {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.05);
                }

                .quality-bar-fill {
                    height: 100%;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .asset-bento-card:hover .quality-bar-fill {
                    transform: scaleX(1);
                }

                @media (max-width: 1200px) {
                    .price-tag .val { font-size: 3rem; }
                }

                @media (max-width: 768px) {
                    .detail-grid { 
                        grid-template-columns: 1fr; 
                        gap: 4rem; 
                    }
                    
                    .price-action-section {
                        padding: 1.5rem 1.5rem 1.5rem 2rem !important;
                        gap: 1rem;
                    }

                    .get-model-btn,
                    .view-cart-btn-new {
                        padding: 1rem 1.5rem;
                        font-size: 0.9rem;
                    }
                    
                    .specs-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .assets-bento-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ModelDetail;