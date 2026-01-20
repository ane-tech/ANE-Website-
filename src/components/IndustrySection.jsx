import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Palette, GraduationCap, Cpu, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IndustrySection = () => {
    const industries = [
        {
            title: 'Healthcare',
            description: 'Custom prosthetics, surgical guides, anatomical models, and medical device prototypes engineered for precision.',
            icon: <Heart size={28} />,
            path: '/industries/healthcare',
            image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=600',
            gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)'
        },
        {
            title: 'Art & Sculpture',
            description: 'Transform digital art into stunning physical masterpieces with intricate details and premium finishes.',
            icon: <Palette size={28} />,
            path: '/industries/art-sculpture',
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600',
            gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)'
        },
        {
            title: 'Education',
            description: 'Empower learning with hands-on 3D models, educational kits, and interactive teaching tools.',
            icon: <GraduationCap size={28} />,
            path: '/industries/education',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        },
        {
            title: 'Electronics',
            description: 'Rapid prototyping of enclosures, heat sinks, and functional components with precision tolerances.',
            icon: <Cpu size={28} />,
            path: '/industries/electronics',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
            gradient: 'linear-gradient(135deg, #70e4de 0%, #4db6b0 100%)'
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <section style={{
            padding: '8rem 0',
            background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #050508 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(112, 228, 222, 0.05) 0%, transparent 70%)',
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
                    <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: 'rgba(112, 228, 222, 0.1)',
                        border: '1px solid rgba(112, 228, 222, 0.2)',
                        borderRadius: '50px',
                        fontSize: '0.8rem',
                        color: '#70e4de',
                        marginBottom: '1.5rem',
                        letterSpacing: '0.05em'
                    }}>
                        INDUSTRIES WE SERVE
                    </span>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Specialized Solutions for
                        <span style={{
                            background: 'linear-gradient(135deg, #70e4de, #fff)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}> Every Sector</span>
                    </h2>
                    <p style={{
                        color: '#8a8a9a',
                        fontSize: '1.1rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        From healthcare to electronics, we deliver tailored 3D printing solutions that drive innovation and efficiency.
                    </p>
                </motion.div>

                {/* Industry Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}
                >
                    {industries.map((item, index) => (
                        <motion.div key={item.title} variants={cardVariants}>
                            <Link to={item.path} style={{ display: 'block', height: '100%' }}>
                                <div style={{
                                    position: 'relative',
                                    height: '420px',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    background: '#0d0d12',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer'
                                }} className="industry-card">
                                    {/* Background Image */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.15,
                                        transition: 'all 0.6s ease'
                                    }} className="card-bg" />

                                    {/* Gradient Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.9) 60%, rgba(5,5,8,1) 100%)'
                                    }} />

                                    {/* Content */}
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end'
                                    }}>
                                        {/* Icon */}
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '16px',
                                            background: item.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1.5rem',
                                            boxShadow: `0 8px 24px ${item.gradient.includes('#70e4de') ? 'rgba(112,228,222,0.3)' : 'rgba(0,0,0,0.3)'}`,
                                            transition: 'transform 0.3s ease'
                                        }} className="card-icon">
                                            {item.icon}
                                        </div>

                                        <h3 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            marginBottom: '0.75rem',
                                            fontFamily: "'Space Grotesk', sans-serif"
                                        }}>{item.title}</h3>

                                        <p style={{
                                            color: '#8a8a9a',
                                            fontSize: '0.95rem',
                                            lineHeight: 1.7,
                                            marginBottom: '1.5rem'
                                        }}>{item.description}</p>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#70e4de',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            transition: 'gap 0.3s ease'
                                        }} className="card-link">
                                            Explore Solutions
                                            <ArrowUpRight size={18} style={{ transition: 'transform 0.3s ease' }} className="arrow-icon" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
        .industry-card:hover {
          border-color: rgba(112, 228, 222, 0.3) !important;
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(112, 228, 222, 0.1);
        }
        .industry-card:hover .card-bg {
          opacity: 0.25 !important;
          transform: scale(1.05);
        }
        .industry-card:hover .card-icon {
          transform: scale(1.1);
        }
        .industry-card:hover .card-link {
          gap: 0.75rem !important;
        }
        .industry-card:hover .arrow-icon {
          transform: translate(2px, -2px);
        }
      `}</style>
        </section>
    );
};

export default IndustrySection;
