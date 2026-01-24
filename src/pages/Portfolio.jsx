import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';

const Portfolio = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#050508' }}>
            <Header />

            <section style={{
                paddingTop: '140px',
                paddingBottom: '100px',
                minHeight: '80vh',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Effects */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
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
                        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                    >
                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 1.25rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '50px',
                                color: '#8a8a9a',
                                fontSize: '0.85rem',
                                marginBottom: '2rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)';
                                e.currentTarget.style.color = '#70e4de';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = '#8a8a9a';
                            }}
                        >
                            <ArrowLeft size={16} />
                            Go Back
                        </button>

                        {/* Page Title */}
                        <h1 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Our Portfolio
                        </h1>

                        <p style={{
                            color: '#8a8a9a',
                            fontSize: '1.15rem',
                            lineHeight: 1.8,
                            marginBottom: '4rem'
                        }}>
                            Explore our extensive collection of 3D printing projects across various industries. From intricate medical models to stunning art pieces.
                        </p>

                        {/* Project Cards Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2rem',
                            marginTop: '3rem'
                        }}>
                            {projectsData.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Portfolio;
