import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
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
    X
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ModelDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const model = location.state?.model;
    const [selectedImg, setSelectedImg] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [showFullView, setShowFullView] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const primaryTeal = '#70e4de';

    // Fallback if no model data passed
    const defaultModel = {
        id: id,
        name: 'Premium 3D Model',
        price: 2500, // Adjusted for Rupees
        category: 'General',
        downloads: 1000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    };

    const displayModel = model || defaultModel;

    // Handle Wishlist persistence
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsWishlisted(favorites.some(fav => fav.id === displayModel.id));

        // Sync quantity from cart
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

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Check out this amazing 3D model: ${displayModel.name}`;

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
            case 'native':
                if (navigator.share) {
                    navigator.share({ title: displayModel.name, text, url });
                }
                break;
            default:
                break;
        }
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const techSpecs = [
        { label: 'Complexity', value: 'High Detail' },
        { label: 'Recommended Infill', value: '15-20%' },
        { label: 'Layer Height', value: '0.05mm - 0.2mm' },
        { label: 'File Size', value: '45.2 MB' },
        { label: 'Dimensions', value: '120 x 85 x 140 mm' },
        { label: 'Print Time', value: '~14 Hours' }
    ];

    const mockGallery = [
        displayModel.image,
        'https://images.unsplash.com/photo-1563206767-5b18f21dae90?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600'
    ];

    const handleAddToCart = () => {
        if (quantity === 0) updateCart(1);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050508', color: '#fff', overflowX: 'hidden' }}>
            <Header />

            <section style={{
                paddingTop: '160px',
                paddingBottom: '120px',
                position: 'relative'
            }}>
                {/* Visual Background Elements */}
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

                                {/* Gallery Navigation */}
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
                                <button className="circle-btn" onClick={() => setShowShareMenu(!showShareMenu)}>
                                    <Share2 size={20} />
                                </button>

                                <AnimatePresence>
                                    {showShareMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                            style={{
                                                position: 'absolute',
                                                bottom: '70px',
                                                left: 0,
                                                background: 'rgba(20, 20, 25, 0.95)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '16px',
                                                padding: '0.75rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem',
                                                zIndex: 100,
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            <button className="share-menu-item" onClick={() => { handleShare('twitter'); setShowShareMenu(false); }}>Twitter</button>
                                            <button className="share-menu-item" onClick={() => { handleShare('whatsapp'); setShowShareMenu(false); }}>WhatsApp</button>
                                            <button className="share-menu-item" onClick={() => { handleShare('copy'); setShowShareMenu(false); }}>
                                                {copied ? 'Copied!' : 'Copy Link'}
                                            </button>
                                            {navigator.share && (
                                                <button className="share-menu-item" onClick={() => { handleShare('native'); setShowShareMenu(false); }}>More Options...</button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    className="circle-btn"
                                    onClick={toggleWishlist}
                                    style={{ color: isWishlisted ? '#ff4757' : '#fff' }}
                                >
                                    <Heart size={20} fill={isWishlisted ? '#ff4757' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Information / Bento Dashboard */}
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
                                    {/* Primary Action Card */}
                                    <div className="dashboard-card primary">
                                        <div className="card-inner">
                                            <div className="price-info">
                                                <div className="price-tag">
                                                    <span className="sym">₹</span>
                                                    <span className="val">{displayModel.price}</span>
                                                </div>
                                            </div>

                                            <div className="action-stack">
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
                                                    <div className="quantity-selector">
                                                        <button onClick={() => updateCart(Math.max(0, quantity - 1))}><Minus size={18} /></button>
                                                        <span className="qty-val">{quantity}</span>
                                                        <button onClick={() => updateCart(quantity + 1)}><Plus size={18} /></button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {quantity > 0 && (
                                                <motion.button
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="view-cart-btn"
                                                    onClick={() => navigate('/cart')}
                                                >
                                                    <ShoppingCart size={18} />
                                                    VIEW CART
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Features Card - Redesigned to look more full */}
                                    <div className="dashboard-card features">
                                        <div className="card-label">INCLUDED ASSETS</div>
                                        <div className="assets-grid-enhanced">
                                            <div className="asset-card">
                                                <div className="asset-icon-box"><FileText size={20} /></div>
                                                <div className="asset-info-box">
                                                    <span className="asset-title">High Res STLs</span>
                                                    <span className="asset-subtitle">Precision Geometry</span>
                                                </div>
                                            </div>
                                            <div className="asset-card">
                                                <div className="asset-icon-box"><Settings size={20} /></div>
                                                <div className="asset-info-box">
                                                    <span className="asset-title">Step Files</span>
                                                    <span className="asset-subtitle">Parametric Data</span>
                                                </div>
                                            </div>
                                            <div className="asset-card">
                                                <div className="asset-icon-box"><Check size={20} /></div>
                                                <div className="asset-info-box">
                                                    <span className="asset-title">Documentation</span>
                                                    <span className="asset-subtitle">Print Guides</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Technical Specs Card */}
                                    <div className="dashboard-card technical">
                                        <div className="card-label">PRINT SPECIFICATIONS</div>
                                        <div className="specs-masonry">
                                            {techSpecs.map((spec, i) => (
                                                <div key={i} className="masonry-item">
                                                    <span className="m-label">{spec.label}</span>
                                                    <span className="m-val">{spec.value}</span>
                                                </div>
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

            <Footer />

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

                .share-menu-item {
                    padding: 0.8rem 1.5rem;
                    background: transparent;
                    border: none;
                    color: #fff;
                    font-size: 0.9rem;
                    font-weight: 500;
                    text-align: left;
                    cursor: pointer;
                    border-radius: 10px;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .share-menu-item:hover {
                    background: rgba(112, 228, 222, 0.1);
                    color: ${primaryTeal};
                }

                /* Dashboard */
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
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-weight: 800;
                    font-family: 'Space Grotesk', sans-serif;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.04em;
                }

                .model-brief {
                    color: #8a8a9a;
                    font-size: 1.1rem;
                    line-height: 1.7;
                    margin-bottom: 3.5rem;
                }

                .integrated-dashboard {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .dashboard-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 35px;
                    padding: 2.25rem;
                    transition: border-color 0.3s;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }

                .dashboard-card.features, .dashboard-card.technical {
                    align-items: center;
                    text-align: center;
                }

                .dashboard-card:hover { border-color: rgba(112,228,222,0.25); }

                .dashboard-card.primary {
                    grid-column: span 2;
                    background: linear-gradient(135deg, rgba(112, 228, 222, 0.08) 0%, rgba(255,255,255,0) 100%);
                    padding: 2.5rem;
                }

                .card-inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 3rem;
                }

                .price-tag {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.2rem;
                    line-height: 1;
                }

                .price-tag .sym { font-size: 1.5rem; font-weight: 700; color: ${primaryTeal}; margin-top: 0.6rem; }
                .price-tag .val { font-size: 4.5rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.04em; }

                .checkout-trigger {
                    width: 280px;
                    padding: 1.5rem;
                    background: ${primaryTeal};
                    border: none;
                    border-radius: 20px;
                    color: #000;
                    font-weight: 800;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    cursor: pointer;
                    box-shadow: 0 20px 40px ${primaryTeal}25;
                }

                .quantity-selector {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.75rem 1.5rem;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .quantity-selector button {
                    background: none;
                    border: none;
                    color: ${primaryTeal};
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .quantity-selector button:hover { transform: scale(1.2); }

                .qty-val { font-size: 1.25rem; font-weight: 800; color: #fff; min-width: 20px; text-align: center; }

                .view-cart-btn {
                    width: 100%;
                    margin-top: 2rem;
                    padding: 1.25rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 18px;
                    color: #fff;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    transition: all 0.3s;
                }

                .view-cart-btn:hover { background: #fff; color: #000; border-color: #fff; }

                .card-label {
                    font-size: 0.7rem;
                    font-weight: 900;
                    color: #555566;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                }

                /* Enhanced Assets Grid */
                .assets-grid-enhanced {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    width: 100%;
                }

                .asset-card {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 1rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                    transition: all 0.3s;
                }

                .asset-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(112, 228, 222, 0.2); }

                .asset-icon-box {
                    width: 44px;
                    height: 44px;
                    background: rgba(112, 228, 222, 0.1);
                    color: ${primaryTeal};
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .asset-info-box { display: flex; flex-direction: column; gap: 0.1rem; }
                .asset-title { font-size: 0.95rem; font-weight: 700; color: #fff; }
                .asset-subtitle { font-size: 0.75rem; color: #6a6a7a; font-weight: 500; }

                .specs-masonry {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    width: 100%;
                }

                .masonry-item { 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between;
                    gap: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }
                .m-label { font-size: 0.7rem; color: #555566; font-weight: 800; text-transform: uppercase; }
                .m-val { font-size: 0.95rem; color: #fff; font-weight: 600; white-space: nowrap; }

                @media (max-width: 1200px) {
                    .price-tag .val { font-size: 3.5rem; }
                    .checkout-trigger { width: 100%; }
                    .card-inner { flex-direction: column; align-items: flex-start; gap: 2.5rem; }
                }

                @media (max-width: 768px) {
                    .detail-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .integrated-dashboard { grid-template-columns: 1fr; }
                    .dashboard-card.primary { grid-column: span 1; }
                }
            `}</style>
        </div>
    );
};

export default ModelDetail;
