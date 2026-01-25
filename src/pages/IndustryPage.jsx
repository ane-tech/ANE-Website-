import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import industryProjects from '../data/industry_projects.json';

const industryDataMapping = {
    'healthcare': {
        title: 'Healthcare Solutions',
        industryName: 'Healthcare',
        description: 'Precision medical models, custom prosthetics, surgical guides, and anatomical replicas engineered for healthcare professionals.'
    },
    'art-sculpture': {
        title: 'Art & Sculpture',
        industryName: 'Art & Sculpture',
        description: 'Transform digital art into physical masterpieces. We specialize in museum-quality reproductions and contemporary art pieces.'
    },
    'education': {
        title: 'Educational Solutions',
        industryName: 'Education',
        description: 'Interactive learning models, scientific demonstrations, and educational kits designed to enhance hands-on learning experiences.'
    },
    'electronics': {
        title: 'Electronics Prototyping',
        industryName: 'Electronics',
        description: 'Rapid prototyping of enclosures, heat sinks, custom components, and functional prototypes for the electronics industry.'
    }
};

const IndustryPage = () => {
    const navigate = useNavigate();
    const { industryType } = useParams();
    const data = industryDataMapping[industryType];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [industryType]);

    if (!data) {
        return (
            <div style={{ minHeight: '100vh', background: '#050508', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Industry Not Found</h1>
                    <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '2rem' }}>Return Home</button>
                </div>
            </div>
        );
    }

    const filteredProjects = industryProjects.filter(p => p.industry === data.industryName);

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
                        {/* <button
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
                        </button> */}

                        {/* Page Title */}
                        <h1 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em',
                            color: 'white'
                        }}>
                            {data.title}
                        </h1>

                        <p style={{
                            color: '#8a8a9a',
                            fontSize: '1.15rem',
                            lineHeight: 1.8,
                            marginBottom: '4rem'
                        }}>
                            {data.description}
                        </p>

                        {/* Project Cards Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2rem',
                            marginTop: '3rem'
                        }}>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                    <p style={{ color: '#8a8a9a' }}>No specific projects listed for this industry yet.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default IndustryPage;
