import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Palette, GraduationCap, Cpu, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IndustrySection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const industries = [
        {
            title: 'Healthcare',
            description: 'Custom prosthetics, surgical guides, and anatomical models engineered for healthcare professionals.',
            icon: <Heart size={28} strokeWidth={1.5} />,
            path: '/industries/healthcare',
            number: '01',
            color: '#ff6b6b'
        },
        {
            title: 'Art & Sculpture',
            description: 'Transform digital art into stunning physical masterpieces with intricate details.',
            icon: <Palette size={28} strokeWidth={1.5} />,
            path: '/industries/art-sculpture',
            number: '02',
            color: '#a855f7'
        },
        {
            title: 'Education',
            description: 'Hands-on 3D models and interactive teaching tools that enhance learning.',
            icon: <GraduationCap size={28} strokeWidth={1.5} />,
            path: '/industries/education',
            number: '03',
            color: '#f59e0b'
        },
        {
            title: 'Electronics',
            description: 'Rapid prototyping of enclosures and components with precision tolerances.',
            icon: <Cpu size={28} strokeWidth={1.5} />,
            path: '/industries/electronics',
            number: '04',
            color: '#3b82f6'
        }
    ];

    return (
        <section style={{
            padding: '8rem 0',
            background: '#050508',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(112,228,222,0.03) 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}
                    >
                        <div style={{
                            width: '40px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #70e4de)'
                        }} />
                        <span style={{
                            fontSize: '0.85rem',
                            color: '#70e4de',
                            fontWeight: 500,
                            letterSpacing: '0.2em'
                        }}>
                            INDUSTRIES WE SERVE
                        </span>
                        <div style={{
                            width: '40px',
                            height: '1px',
                            background: 'linear-gradient(90deg, #70e4de, transparent)'
                        }} />
                    </motion.div>

                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        letterSpacing: '-0.03em'
                    }}>
                        Specialized Solutions for{' '}
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, rgba(112,228,222,0.15), rgba(112,228,222,0.05))',
                            padding: '0.15rem 1rem',
                            color: '#70e4de',
                            marginLeft: '0.25rem'
                        }}>
                            Every Sector
                        </span>
                    </h2>
                    <p style={{
                        color: '#6a6a7a',
                        fontSize: '1.1rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        From healthcare to electronics, we deliver tailored 3D printing solutions that drive innovation and efficiency.
                    </p>
                </motion.div>

                {/* Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.5rem'
                }} className="industry-grid">
                    {industries.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Link to={item.path} style={{ display: 'block', height: '100%' }}>
                                <div
                                    className="industry-card"
                                    style={{
                                        position: 'relative',
                                        padding: '2rem',
                                        borderRadius: '24px',
                                        background: '#0a0a0f',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        overflow: 'hidden',
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                                        boxShadow: hoveredIndex === index
                                            ? '0 30px 60px -20px rgba(112,228,222,0.15)'
                                            : 'none',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {/* Background Gradient - Teal */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'radial-gradient(circle at 30% 20%, rgba(112,228,222,0.08) 0%, transparent 50%)',
                                        opacity: hoveredIndex === index ? 1 : 0.5,
                                        transition: 'opacity 0.5s ease'
                                    }} />

                                    {/* Animated Border Gradient - Teal */}
                                    <div
                                        className="border-gradient"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '24px',
                                            padding: '1px',
                                            background: hoveredIndex === index
                                                ? 'linear-gradient(135deg, #70e4de, transparent 50%, #70e4de)'
                                                : 'transparent',
                                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            WebkitMaskComposite: 'xor',
                                            maskComposite: 'exclude',
                                            opacity: 0.5,
                                            transition: 'all 0.5s ease'
                                        }}
                                    />

                                    {/* Content */}
                                    <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        {/* Top Row */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '2rem'
                                        }}>
                                            {/* Icon */}
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '18px',
                                                background: hoveredIndex === index
                                                    ? `${item.color}15`
                                                    : 'rgba(255,255,255,0.03)',
                                                border: hoveredIndex === index
                                                    ? `1px solid ${item.color}50`
                                                    : '1px solid rgba(255,255,255,0.08)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: hoveredIndex === index ? item.color : '#fff',
                                                transition: 'all 0.4s ease',
                                                transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                                            }}>
                                                {item.icon}
                                            </div>

                                            {/* Number */}
                                            <span style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: '3rem',
                                                fontWeight: 700,
                                                color: hoveredIndex === index
                                                    ? 'rgba(112,228,222,0.1)'
                                                    : 'rgba(255,255,255,0.03)',
                                                lineHeight: 1,
                                                transition: 'color 0.4s ease'
                                            }}>
                                                {item.number}
                                            </span>
                                        </div>


                                        {/* Title */}
                                        <h3 style={{
                                            fontSize: '1.75rem',
                                            fontWeight: 700,
                                            marginBottom: '0.75rem',
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            letterSpacing: '-0.02em',
                                            transition: 'color 0.3s ease',
                                            color: hoveredIndex === index ? '#fff' : '#e0e0e0'
                                        }}>
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p style={{
                                            color: '#6a6a7a',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.7,
                                            marginBottom: '1.5rem',
                                            flex: 1
                                        }}>
                                            {item.description}
                                        </p>

                                        {/* CTA */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#70e4de',
                                            fontSize: '0.9rem',
                                            fontWeight: 600
                                        }}>
                                            <span>Learn more</span>
                                            <ArrowUpRight
                                                size={16}
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: hoveredIndex === index ? 'translate(3px, -3px)' : 'translate(0, 0)'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                .industry-card:hover {
                    border-color: rgba(112,228,222,0.2) !important;
                }

                @media (max-width: 1024px) {
                    .industry-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }

                @media (max-width: 600px) {
                    .industry-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default IndustrySection;
