import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import industryProjects from '../data/industry_projects.json';

const IndustrySection = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
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
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {industryProjects.map((project, index) => (
                        <div key={project.id} style={{ height: '420px' }}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default IndustrySection;
