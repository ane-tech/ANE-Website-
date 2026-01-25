import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Palette, GraduationCap, Cpu, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ServicesSection = ({ isFullPage = false, service = null }) => {
    const services = [
        {
            title: 'Prototyping',
            description: 'Transform your concepts into tangible prototypes within 24 hours. Perfect for design validation and iterative development.',
            fullDescription: 'Transform your concepts into tangible prototypes within 24 hours. Perfect for design validation and iterative development. Our advanced 3D printing technologies deliver high-resolution prototypes that accurately represent your designs.',
            icon: <Heart size={isFullPage ? 32 : 28} />,
            path: '/services/prototyping',
            image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800',
            gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
            features: isFullPage ? ['Rapid Iteration', '24-48 Hour Turnaround', 'High Resolution Output', 'Design Validation'] : null
        },
        {
            title: 'Scalable Manufacturing',
            description: 'From prototype to production. Our scalable solutions grow with your needs, maintaining quality at every volume.',
            fullDescription: 'From prototype to production. Our scalable solutions grow with your needs, maintaining quality at every volume. Whether you need a single prototype or large-scale production runs, our 3D printing services ensure consistent quality and precision at every stage.',
            icon: <Palette size={isFullPage ? 32 : 28} />,
            path: '/services/scalable-manufacturing',
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
            gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
            features: isFullPage ? ['Volume Flexibility', 'Quality Consistency', 'Production Ready', 'Cost Optimization'] : null
        },
        {
            title: 'Reverse Engineering',
            description: 'Digitize existing parts and create precise replicas. Perfect for legacy components and discontinued products.',
            fullDescription: 'Digitize existing parts and create precise replicas. Perfect for legacy components and discontinued products. Our reverse engineering services utilize advanced 3D scanning and modeling techniques to recreate parts with exact specifications.',
            icon: <Cpu size={isFullPage ? 32 : 28} />,
            path: '/services/reverse-engineering',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
            gradient: 'linear-gradient(135deg, #70e4de 0%, #4db6b0 100%)',
            features: isFullPage ? ['3D Scanning', 'Precision Modeling', 'Legacy Component Support', 'Exact Replication'] : null
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

    const sectionContent = (
        <>
            {isFullPage && (
                <section style={{
                    padding: '6rem 0',
                    background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #050508 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(112, 228, 222, 0.08) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ textAlign: 'center' }}
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
                                OUR SERVICES
                            </span>
                            <h1 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 700,
                                marginBottom: '1.5rem',
                                letterSpacing: '-0.02em'
                            }}>
                                Specialized 3D Printing
                                <span style={{
                                    background: 'linear-gradient(135deg, #70e4de, #fff)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}> Solutions</span>
                            </h1>
                            <p style={{
                                color: '#8a8a9a',
                                fontSize: '1.1rem',
                                maxWidth: '700px',
                                margin: '0 auto',
                                lineHeight: 1.8
                            }}>
                                From healthcare to electronics, we deliver tailored 3D printing solutions that drive innovation, enhance precision, and accelerate your product development.
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            <section style={{
                padding: isFullPage ? '6rem 0' : '8rem 0',
                background: isFullPage ? '#050508' : 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #050508 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {!isFullPage && (
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
                )}

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    {!isFullPage && (
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
                    )}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isFullPage ? 'repeat(auto-fit, minmax(320px, 1fr))' : 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: isFullPage ? '2rem' : '1.5rem'
                        }}
                    >
                        {services.map((item) => (
                            <motion.div key={item.title} variants={cardVariants}>
                                <Link to={item.path} style={{ display: 'block', height: '100%' }}>
                                    <div style={{
                                        position: 'relative',
                                        height: isFullPage ? 'auto' : '420px',
                                        minHeight: isFullPage ? '500px' : 'auto',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        background: '#0d0d12',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }} className={isFullPage ? "service-card" : "industry-card"}>
                                        {/* Background Image */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            opacity: isFullPage ? 0.1 : 0.15,
                                            transition: 'all 0.6s ease'
                                        }} className="card-bg" />

                                        {/* Gradient Overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: isFullPage 
                                                ? 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.8) 70%, rgba(5,5,8,1) 100%)'
                                                : 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.9) 60%, rgba(5,5,8,1) 100%)'
                                        }} />

                                        {/* Content */}
                                        <div style={{
                                            position: 'relative',
                                            height: '100%',
                                            padding: '2rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: isFullPage ? 'flex-start' : 'flex-end',
                                            flex: 1
                                        }}>
                                            {/* Icon */}
                                            <div style={{
                                                width: isFullPage ? '70px' : '60px',
                                                height: isFullPage ? '70px' : '60px',
                                                borderRadius: '16px',
                                                background: item.gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '1.5rem',
                                                boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
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
                                            }}>{isFullPage ? item.fullDescription : item.description}</p>

                                            {isFullPage && item.features && (
                                                <div style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
                                                    {item.features.map((feature, idx) => (
                                                        <div key={idx} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.75rem',
                                                            marginBottom: '0.5rem',
                                                            color: '#9a9aaa',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            <div style={{
                                                                width: '4px',
                                                                height: '4px',
                                                                borderRadius: '50%',
                                                                background: '#70e4de'
                                                            }} />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: '#70e4de',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                transition: 'gap 0.3s ease',
                                                marginTop: isFullPage && item.features ? 'auto' : '0'
                                            }} className="card-link">
                                                {isFullPage ? `Let's Discuss` : 'Explore Solutions'}
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
                    .service-card:hover {
                        border-color: rgba(112, 228, 222, 0.3) !important;
                        transform: translateY(-8px);
                        box-shadow: 0 20px 60px rgba(112, 228, 222, 0.1);
                    }
                    .service-card:hover .card-bg {
                        opacity: 0.2 !important;
                        transform: scale(1.05);
                    }
                    .service-card:hover .card-icon {
                        transform: scale(1.1);
                    }
                    .service-card:hover .card-link {
                        gap: 0.75rem !important;
                    }
                    .service-card:hover .arrow-icon {
                        transform: translate(2px, -2px);
                    }
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

            {isFullPage && (
                <section style={{
                    padding: '6rem 0',
                    background: 'linear-gradient(135deg, rgba(112, 228, 222, 0.05) 0%, transparent 100%)',
                    borderTop: '1px solid rgba(112, 228, 222, 0.1)',
                    position: 'relative'
                }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ textAlign: 'center' }}
                        >
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                fontWeight: 700,
                                marginBottom: '1.5rem'
                            }}>
                                Ready to Bring Your Vision to Life?
                            </h2>
                            <p style={{
                                color: '#8a8a9a',
                                fontSize: '1.1rem',
                                maxWidth: '600px',
                                margin: '0 auto 2rem',
                                lineHeight: 1.8
                            }}>
                                Contact our experts to discuss your project requirements and discover how our 3D printing solutions can accelerate your success.
                            </p>
                            <Link
                                to="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, #70e4de 0%, #4db6b0 100%)',
                                    color: '#050508',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(112, 228, 222, 0.2)'
                                }}
                                className="cta-button"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>

                    <style>{`
                        .cta-button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 12px 32px rgba(112, 228, 222, 0.3) !important;
                        }
                    `}</style>
                </section>
            )}
        </>
    );

    // Get selected service for detail view
    const selectedService = service ? services.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === service.toLowerCase().replace(/\s+/g, '-')) : null;

    // Render detail page for single service
    if (service && selectedService) {
        return (
            <>
                <Header />
                <main style={{ paddingTop: '100px', background: '#050508', minHeight: '100vh' }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                textAlign: 'center',
                                marginBottom: '4rem',
                                paddingTop: '2rem'
                            }}
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
                                SERVICE DETAILS
                            </span>
                            <h1 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 700,
                                marginBottom: '1.5rem',
                                letterSpacing: '-0.02em'
                            }}>
                                {selectedService.title}
                            </h1>
                            <p style={{
                                color: '#8a8a9a',
                                fontSize: '1.1rem',
                                maxWidth: '700px',
                                margin: '0 auto',
                                lineHeight: 1.8
                            }}>
                                {selectedService.fullDescription}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '2rem',
                                marginTop: '4rem',
                                marginBottom: '4rem'
                            }}
                        >
                            {selectedService.features && selectedService.features.map((feature, idx) => (
                                <div key={idx} style={{
                                    padding: '2rem',
                                    background: '#0d0d12',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '16px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        margin: '0 auto 1rem',
                                        borderRadius: '12px',
                                        background: selectedService.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <span style={{ fontSize: '1.5rem', color: '#fff' }}>✓</span>
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        fontFamily: "'Space Grotesk', sans-serif"
                                    }}>
                                        {feature}
                                    </h3>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                textAlign: 'center',
                                padding: '3rem 0'
                            }}
                        >
                            <Link
                                to="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, #70e4de 0%, #4db6b0 100%)',
                                    color: '#050508',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(112, 228, 222, 0.2)'
                                }}
                                className="cta-button"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return isFullPage ? (
        <>
            <Header />
            <main>{sectionContent}</main>
            <Footer />
        </>
    ) : (
        sectionContent
    );
};

export default ServicesSection;
