import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Calendar, Tag, Layers, ShoppingCart, Box, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

// Helper to resolve images
const images = import.meta.glob(['/src/assets/portfolio/*.{png,jpg,jpeg,svg}', '/src/assets/industry/*.{png,jpg,jpeg,svg}'], { eager: true });

const ProjectCard = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const imageSrc = images[project.image]?.default || project.image;
    const galleryImages = project.gallery?.map(img => images[img]?.default || img) || [];

    const navigate = useNavigate();
    const { user } = useAuth();
    const primaryTeal = '#70e4de';

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = cart.findIndex(item => item.id === project.id);

        // Ensure price exists or default to a value (though we added them to JSON)
        const itemPrice = project.price || 0;
        // Ensure image is fully resolved for cart
        const cartItem = {
            ...project,
            image: imageSrc,
            price: itemPrice,
            quantity: 1
        };

        let updatedCart;
        if (existingIndex > -1) {
            updatedCart = [...cart];
            updatedCart[existingIndex].quantity += 1;
        } else {
            updatedCart = [...cart, cartItem];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));

        // Optional: Navigate to cart or show success. For now, let's navigate to cart as feedback.
        navigate('/cart');
    };

    const handleView3D = (e) => {
        e.stopPropagation();
        // Placeholder for 3D viewer integration
        // Could navigate to a model page or open a viewer overlay
        // For now, we'll alert or if there was a real model ID we'd use it
        alert("Interactive 3D Viewer loading... (Integration coming soon)");
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                <div
                    onClick={() => setIsExpanded(true)}
                    style={{
                        position: 'relative',
                        height: '420px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: '#0d0d12',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer'
                    }}
                    className="project-card"
                >
                    {/* Background Image */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.35,
                        transition: 'all 0.6s ease'
                    }} className="card-bg" />

                    {/* Gradient Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.85) 50%, rgba(5,5,8,0.95) 100%)'
                    }} />

                    {/* Featured Badge */}
                    {/* Industry Badge - Top Right */}
                    <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        padding: '0.4rem 0.9rem',
                        background: 'rgba(112, 228, 222, 0.1)',
                        border: '1px solid rgba(112, 228, 222, 0.3)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        color: '#70e4de',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        width: 'fit-content',
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                        {project.industry ? project.industry.toUpperCase() : 'PROJECT'}
                    </div>

                    {/* Content */}
                    <div style={{
                        position: 'relative',
                        height: '100%',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}>
                        {/* Industry Badge */}


                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '0.75rem',
                            fontFamily: "'Space Grotesk', sans-serif"
                        }}>{project.title}</h3>

                        <p style={{
                            color: '#8a8a9a',
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem'
                        }}>{project.description}</p>

                        {/* Tags */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            {project.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontSize: '0.7rem',
                                        padding: '0.3rem 0.7rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '6px',
                                        color: '#8a8a9a'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#70e4de',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            transition: 'gap 0.3s ease'
                        }} className="card-link">
                            View Project
                            <ArrowUpRight size={18} style={{ transition: 'transform 0.3s ease' }} className="arrow-icon" />
                        </div>
                    </div>
                </div>

                <style>{`
          .project-card:hover {
            border-color: rgba(112, 228, 222, 0.3) !important;
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(112, 228, 222, 0.1);
          }
          .project-card:hover .card-bg {
            opacity: 0.5 !important;
            transform: scale(1.05);
          }
          .project-card:hover .card-link {
            gap: 0.75rem !important;
          }
          .project-card:hover .arrow-icon {
            transform: translate(2px, -2px);
          }
        `}</style>
            </motion.div>

            {/* Login Modal */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

            {/* Expanded Modal */}
            {createPortal(
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExpanded(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(5, 5, 8, 0.95)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 99999,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem',
                                overflowY: 'auto'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: '#0d0d12',
                                    border: '1px solid rgba(112, 228, 222, 0.2)',
                                    borderRadius: '24px',
                                    maxWidth: '1200px',
                                    width: '100%',
                                    maxHeight: '90vh',
                                    overflowY: 'auto',
                                    position: 'relative',
                                    boxShadow: '0 20px 60px rgba(112, 228, 222, 0.15)'
                                }}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    style={{
                                        position: 'sticky',
                                        top: '1.5rem',
                                        left: '100%',
                                        marginRight: '1.5rem',
                                        marginTop: '1.5rem',
                                        marginBottom: '-3rem',
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        zIndex: 10,
                                        color: 'white'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(112, 228, 222, 0.1)';
                                        e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    }}
                                >
                                    <X size={24} />
                                </button>

                                <div style={{ padding: '3rem' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                                        gap: '3rem',
                                        '@media (max-width: 768px)': {
                                            gridTemplateColumns: '1fr'
                                        }
                                    }}>
                                        {/* Left Column: Images */}
                                        <div>
                                            <div style={{
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                marginBottom: '1.5rem',
                                                border: '1px solid rgba(255,255,255,0.08)'
                                            }}>
                                                <img
                                                    src={imageSrc}
                                                    alt={project.title}
                                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                                />
                                            </div>

                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                gap: '1rem'
                                            }}>
                                                {galleryImages.map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            borderRadius: '12px',
                                                            overflow: 'hidden',
                                                            border: '1px solid rgba(255,255,255,0.08)',
                                                            height: '200px'
                                                        }}
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`${project.title} ${idx + 1}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                transition: 'transform 0.3s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column: Details */}
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                marginBottom: '1.5rem'
                                            }}>
                                                <span style={{
                                                    padding: '0.5rem 1rem',
                                                    background: 'rgba(112, 228, 222, 0.15)',
                                                    border: '1px solid rgba(112, 228, 222, 0.3)',
                                                    borderRadius: '50px',
                                                    fontSize: '0.8rem',
                                                    color: '#70e4de',
                                                    letterSpacing: '0.05em',
                                                    fontWeight: 600
                                                }}>
                                                    {project.industry ? project.industry.toUpperCase() : 'PROJECT'}
                                                </span>

                                            </div>

                                            <h2 style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                                                fontWeight: 700,
                                                marginBottom: '1.5rem',
                                                color: 'white',
                                                lineHeight: 1.2
                                            }}>
                                                {project.title}
                                            </h2>

                                            <div style={{
                                                display: 'flex',
                                                gap: '2rem',
                                                marginBottom: '2rem',
                                                paddingBottom: '2rem',
                                                borderBottom: '1px solid rgba(255,255,255,0.08)'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Calendar size={18} style={{ color: '#70e4de' }} />
                                                    <span style={{ color: '#8a8a9a', fontSize: '0.9rem' }}>{project.year}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Layers size={18} style={{ color: '#70e4de' }} />
                                                    <span style={{ color: '#8a8a9a', fontSize: '0.9rem' }}>{project.tags[0]}</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="btn-primary"
                                                    style={{
                                                        padding: '1rem 1.75rem',
                                                        background: primaryTeal,
                                                        color: '#050508',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 700,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s ease',
                                                        flex: 1,
                                                        justifyContent: 'center'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                                >
                                                    <ShoppingCart size={18} />
                                                    Buy Now {project.price ? `(₹${project.price.toLocaleString()})` : ''}
                                                </button>

                                                <button
                                                    onClick={handleView3D}
                                                    style={{
                                                        padding: '1rem 1.75rem',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        color: 'white',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '12px',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        flex: 1,
                                                        justifyContent: 'center'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = 'rgba(255,255,255,0.1)';
                                                        e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                        e.target.style.transform = 'translateY(-2px)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = 'rgba(255,255,255,0.05)';
                                                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                                        e.target.style.transform = 'translateY(0)';
                                                    }}
                                                >
                                                    <Box size={18} />
                                                    View 3D Model
                                                </button>
                                            </div>

                                            <div style={{ marginBottom: '2rem' }}>
                                                <h3 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    marginBottom: '1rem',
                                                    color: 'white'
                                                }}>
                                                    Project Overview
                                                </h3>
                                                <p style={{
                                                    color: '#e0e0e0',
                                                    fontSize: '1rem',
                                                    lineHeight: 1.8,
                                                    marginBottom: '1.5rem'
                                                }}>
                                                    {project.description}
                                                </p>

                                                <h3 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    marginBottom: '1rem',
                                                    color: 'white'
                                                }}>
                                                    Technical Details
                                                </h3>
                                                <p style={{
                                                    color: '#8a8a9a',
                                                    fontSize: '0.95rem',
                                                    lineHeight: 1.8
                                                }}>
                                                    {project.details}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 style={{
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600,
                                                    color: '#8a8a9a',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em',
                                                    marginBottom: '1rem'
                                                }}>
                                                    Technologies & Materials
                                                </h4>
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '0.75rem'
                                                }}>
                                                    {project.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                padding: '0.6rem 1rem',
                                                                background: 'rgba(255,255,255,0.03)',
                                                                border: '1px solid rgba(255,255,255,0.08)',
                                                                borderRadius: '12px',
                                                                color: '#e0e0e0',
                                                                fontSize: '0.85rem',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)';
                                                                e.currentTarget.style.background = 'rgba(112, 228, 222, 0.05)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                                            }}
                                                        >
                                                            <Tag size={14} style={{ color: '#70e4de' }} />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ProjectCard;
