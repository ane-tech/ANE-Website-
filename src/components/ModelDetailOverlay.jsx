import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
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

    const [fullModel, setFullModel] = useState(model);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const techSpecs = [
        { label: 'Complexity', value: 'High Detail' },
        { label: 'Recommended Infill', value: '15-20%' },
        { label: 'Layer Height', value: '0.05mm - 0.2mm' },
        { label: 'File Size', value: '45.2 MB' },
        { label: 'Dimensions', value: '120 x 85 x 140 mm' },
        { label: 'Print Time', value: '~14 Hours' }
    ];



    useLayoutEffect(() => {
        // Handle scrollbar shift to prevent horizontal jump
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';

        return () => {
            // Restore body scroll and padding when overlay is closed
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            // Check if it's a Thingiverse ID (usually numeric or specific format, assuming numeric for now or just check if it's missing details)
            if (model.id && !model.images && !model.mock) {
                setLoadingDetails(true);
                try {
                    // Strip the "p1-0-" suffix logic if it exists from the list view ID generation
                    const realId = String(model.id).split('-')[0];

                    const response = await fetch(`http://localhost:5000/api/models/${realId}`);
                    if (response.ok) {
                        const details = await response.json();
                        setFullModel(prev => ({ ...prev, ...details }));
                    }
                } catch (err) {
                    console.error("Failed to load details", err);
                } finally {
                    setLoadingDetails(false);
                }
            }
        };
        fetchDetails();

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsWishlisted(favorites.some(fav => fav.id === model.id));

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === model.id);
        if (existingItem) {
            setQuantity(existingItem.quantity);
        }
    }, [model.id]);

    const galleryImages = fullModel.images && fullModel.images.length > 0 ? fullModel.images : [fullModel.image || fullModel.thumbnail];

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

    const refineDescription = (html) => {
        if (!html) return null;
        // Strip HTML tags
        let text = html.replace(/<[^>]*>?/gm, ' ');
        // Remove common redundant labels
        text = text.replace(/Summary/gi, '')
            .replace(/Overview/gi, '')
            .replace(/Description/gi, '')
            .replace(/[:\-]/g, ' ')
            .trim();

        // Split into sentences and filter out very short junk
        const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 20);

        // Take the top meaningful content
        return sentences.slice(0, 4).map(s => s.charAt(0).toUpperCase() + s.slice(1) + '.');
    };

    const formattedDesc = refineDescription(fullModel.description);

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

    const handleWhatsAppOrder = () => {
        const phoneNumber = "918235438812"; // Your WhatsApp Number
        const message = `   *NEW ORDER FROM ANE WEBSITE* 
*Model Name:* ${fullModel.name}
 *Category:* ${fullModel.category} 
*Quantity:* ${quantity || 1} 
                                  *Preview:* ${fullModel.image || (fullModel.images && fullModel.images[0])} 

Please confirm the order and provide further details.`;

        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
    };

    const modalContent = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(2, 2, 4, 0.95)',
                backdropFilter: 'blur(15px)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '5vh 2rem',
                overflowY: 'auto',
                scrollbarGutter: 'stable', // Prevents horizontal jump when scrollbar appears
                scrollBehavior: 'auto'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: '#050508',
                    width: '100%',
                    maxWidth: '1300px',
                    borderRadius: '32px',
                    border: '1px solid rgba(112, 228, 222, 0.15)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
                    position: 'relative',
                    padding: '3rem',
                    marginBottom: '5vh',
                    display: 'flex',
                    flexDirection: 'column'
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
                                        key={galleryImages[selectedImg]} // Use URL as key for smooth cross-fades
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="img-frame"
                                    >
                                        <img src={galleryImages[selectedImg]} alt={fullModel.name} />
                                        <button className="expand-trigger" onClick={() => setShowFullView(true)}>
                                            <Maximize2 size={20} />
                                        </button>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="gallery-tray-container" style={{ marginTop: '2.5rem', position: 'relative' }}>
                                    <div className="gallery-thumbs">
                                        {galleryImages.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -4, borderColor: primaryTeal }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedImg(i)}
                                                className={`thumb-item ${selectedImg === i ? 'active' : ''}`}
                                            >
                                                <img src={img} alt="" />
                                                <div className="thumb-overlay"></div>
                                            </motion.div>
                                        ))}
                                    </div>
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
                                <div className="rating-pill">
                                    <ShoppingCart size={14} color={primaryTeal} />
                                    <span>{(fullModel.sales || model.sales || 0).toLocaleString()} Sales</span>
                                </div>
                            </div>

                            <h1 className="model-name">{fullModel.name}</h1>

                            <div className="description-master-container">
                                <div className="description-accent-line"></div>
                                <div className="description-content" style={{
                                    minHeight: '100px',
                                    maxHeight: '280px',
                                    overflowY: 'auto',
                                    paddingRight: '1.5rem',
                                    scrollPaddingBottom: '2rem'
                                }}>
                                    {loadingDetails ? (
                                        <div className="description-loading">
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="skeleton-text" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} className="skeleton-text short" />
                                        </div>
                                    ) : (
                                        <div className="refined-description-grid">
                                            <div className="refinement-section">
                                                <h4 className="refinement-title">PROPERTY OVERVIEW</h4>
                                                <p className="premium-intro-text">
                                                    An expertly crafted <span style={{ color: primaryTeal }}>{fullModel.name}</span> asset, specifically curated for our <span style={{ color: primaryTeal }}>{fullModel.category}</span> elite collection.
                                                </p>
                                            </div>

                                            {formattedDesc && formattedDesc.length > 0 ? (
                                                <div className="refinement-section">
                                                    <h4 className="refinement-title">TECHNICAL INSIGHTS</h4>
                                                    <div className="organized-sentences">
                                                        {formattedDesc.map((sentence, idx) => (
                                                            <motion.p
                                                                key={idx}
                                                                initial={{ opacity: 0, x: 10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.1 * idx }}
                                                                className="refined-sentence"
                                                            >
                                                                {sentence}
                                                            </motion.p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="refinement-section">
                                                    <h4 className="refinement-title">MODEL PROFILE</h4>
                                                    <p className="description-placeholder-text">
                                                        The technical profile for {fullModel.name} is currently being synchronized. This asset features optimized mesh topology for professional-grade digital manufacturing.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="integrated-dashboard">
                                {/* Technical Specs Card - Hide for Thinkiverse */}
                                {fullModel.category !== 'Thinkiverse' && (
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
                                )}

                                {/* Pricing Card */}
                                <div className="dashboard-card primary" style={{
                                    padding: '2.5rem 2rem 2.5rem 3.5rem',
                                    gridColumn: 'span 2',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: quantity > 0 ? '1.5rem' : '0'
                                }}>
                                    <div className="premium-price-row" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {/* Only show price if NOT Thinkiverse */}
                                        {fullModel.category !== 'Thinkiverse' && (
                                            <div className="price-tag" style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#555566', letterSpacing: '0.15em', textTransform: 'uppercase' }}>PRICE</div>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.2rem', lineHeight: 1 }}>
                                                    <span className="sym">₹</span>
                                                    <span className="val">{fullModel.price === 0 ? 'Free' : fullModel.price}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="action-stack" style={{
                                            marginLeft: fullModel.category === 'Thinkiverse' ? '0' : 'auto',
                                            width: fullModel.category === 'Thinkiverse' ? '100%' : 'auto',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            {quantity === 0 ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.02, background: '#fff' }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="checkout-trigger"
                                                    onClick={handleAddToCart}
                                                    style={{ width: fullModel.category === 'Thinkiverse' ? '100%' : 'auto' }}
                                                >
                                                    <span>GET MODEL</span>
                                                    <ArrowRightIcon size={18} />
                                                </motion.button>
                                            ) : (
                                                <div className="quantity-selector" style={{ margin: '0 auto', width: '100%', justifyContent: 'center' }}>
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
                                            onClick={fullModel.category === 'Thinkiverse' ? handleWhatsAppOrder : () => navigate('/cart')}
                                            style={{
                                                width: '100%',
                                                margin: 0,
                                                background: fullModel.category === 'Thinkiverse' ? `rgba(112,228,222,0.1)` : 'rgba(255,255,255,0.03)',
                                                borderColor: fullModel.category === 'Thinkiverse' ? primaryTeal : 'rgba(255,255,255,0.08)',
                                                color: fullModel.category === 'Thinkiverse' ? primaryTeal : '#fff'
                                            }}
                                        >
                                            {fullModel.category === 'Thinkiverse' ? (
                                                <><Share2 size={18} /> ORDER VIA WHATSAPP</>
                                            ) : (
                                                <><ShoppingCart size={18} /> VIEW CART</>
                                            )}
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
                    .detail-grid { 
                        display: grid; 
                        grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); 
                        gap: 6rem; 
                        align-items: start; 
                        width: 100%;
                    }
                    .main-stage { 
                        position: relative; 
                        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%);
                        border: 1px solid rgba(255,255,255,0.05); 
                        border-radius: 40px; 
                        padding: 1.5rem; 
                        backdrop-filter: blur(10px);
                        width: 100%;
                        max-width: 100%;
                    }
                    .img-frame { 
                        position: relative; 
                        width: 100%; 
                        aspect-ratio: 4 / 3; /* Matches Thingiverse native ratio (628x472) */
                        border-radius: 20px; 
                        overflow: hidden; 
                        background: rgba(0,0,0,0.6);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: inset 0 0 40px rgba(0,0,0,0.5);
                    }
                    .img-frame img { 
                        width: 100%; 
                        height: 100%; 
                        object-fit: cover; /* Fill card exactly */
                        image-rendering: auto; /* Smoothest for photography */
                        display: block;
                        background: #000;
                    }
                    .expand-trigger { position: absolute; bottom: 1rem; right: 1rem; width: 44px; height: 44px; border-radius: 12px; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; z-index: 5; }
                    .expand-trigger:hover { background: ${primaryTeal}; color: #000; }
                    
                    .gallery-thumbs { 
                        display: flex; 
                        gap: 1rem; 
                        overflow-x: auto; 
                        padding-bottom: 0.75rem;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: thin;
                        scrollbar-color: ${primaryTeal}20 transparent;
                    }
                    .gallery-thumbs::-webkit-scrollbar { height: 4px; }
                    .gallery-thumbs::-webkit-scrollbar-track { background: transparent; }
                    .gallery-thumbs::-webkit-scrollbar-thumb { background: rgba(112, 228, 222, 0.1); border-radius: 10px; }
                    
                    .thumb-item { 
                        flex: 0 0 84px; 
                        height: 84px; 
                        border-radius: 14px; 
                        overflow: hidden; 
                        border: 2px solid rgba(255,255,255,0.05); 
                        cursor: pointer; 
                        position: relative;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .thumb-item.active { border-color: ${primaryTeal}; box-shadow: 0 0 15px ${primaryTeal}30; }
                    .thumb-item img { width: 100%; height: 100%; object-fit: cover; }
                    .thumb-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.2); transition: opacity 0.3s; }
                    .thumb-item:hover .thumb-overlay { opacity: 0; }
                    .thumb-item.active .thumb-overlay { opacity: 0; }
                    
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

                    .description-master-container { 
                        position: relative; 
                        margin-bottom: 3rem; 
                        padding: 1.5rem; 
                        padding-left: 2rem;
                        background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%);
                        border-radius: 0 24px 24px 0;
                        border: 1px solid rgba(255,255,255,0.03);
                        border-left: none;
                    }
                    .description-accent-line { 
                        position: absolute; 
                        left: 0; 
                        top: 1.5rem; 
                        bottom: 1.5rem; 
                        width: 3px; 
                        background: ${primaryTeal}; 
                        box-shadow: 0 0 15px ${primaryTeal}40;
                        border-radius: 10px;
                    }
                    .description-content { color: #8a8a9a; font-size: 0.9rem; line-height: 1.7; font-family: 'Inter', sans-serif; }
                    .refinement-section { margin-bottom: 2rem; }
                    .refinement-title { font-size: 0.65rem; font-weight: 900; color: ${primaryTeal}; letter-spacing: 0.2em; margin-bottom: 1rem; opacity: 0.8; }
                    .premium-intro-text { color: #fff; font-weight: 500; font-size: 1.1rem; line-height: 1.5; margin: 0; }
                    .refined-sentence { margin-bottom: 0.75rem; color: #a1a1b1; position: relative; padding-left: 1.25rem; }
                    .refined-sentence::before { content: ""; position: absolute; left: 0; top: 0.6rem; width: 4px; height: 4px; background: ${primaryTeal}; border-radius: 50%; opacity: 0.5; }
                    .description-placeholder-text { font-style: italic; opacity: 0.6; }

                    .skeleton-text { height: 12px; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 12px; width: 100%; }
                    .skeleton-text.short { width: 60%; }

                    .description-content::-webkit-scrollbar { width: 4px; }
                    .description-content::-webkit-scrollbar-track { background: transparent; }
                    .description-content::-webkit-scrollbar-thumb { background: rgba(112, 228, 222, 0.2); border-radius: 10px; }
                    .description-content:hover::-webkit-scrollbar-thumb { background: rgba(112, 228, 222, 0.4); }
                    
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
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowFullView(false);
                        }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 10000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'relative', width: '95vw', height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <img
                                src={galleryImages[selectedImg]}
                                onClick={() => setShowFullView(false)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '12px',
                                    boxShadow: '0 0 100px rgba(0,0,0,0.5)',
                                    cursor: 'zoom-out'
                                }}
                                alt="Full View"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFullView(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return createPortal(modalContent, document.body);
};

export default ModelDetailOverlay;
