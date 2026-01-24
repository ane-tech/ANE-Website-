import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Layers } from 'lucide-react';
import projectsData from '../data/projects.json';

// Helper to resolve images
const images = import.meta.glob('/src/assets/portfolio/*.{png,jpg,jpeg,svg}', { eager: true });

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg-dark)] text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                    <Link to="/portfolio" className="btn-primary">Back to Portfolio</Link>
                </div>
            </div>
        );
    }

    const mainImage = images[project.image]?.default || project.image;
    const galleryImages = project.gallery.map(img => images[img]?.default || img);

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] pt-24 pb-20 px-4">
            <div className="container mx-auto">
                <Link to="/portfolio" className="inline-flex items-center text-[var(--text-dim)] hover:text-[var(--primary)] mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Left Column: Images */}
                    <div className="space-y-6">
                        <div className="rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img src={mainImage} alt={project.title} className="w-full h-auto object-cover" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="rounded-xl overflow-hidden border border-[var(--glass-border)] h-48"
                                >
                                    <img src={img} alt={`${project.title} gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:pl-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-[var(--primary-glow)] text-[var(--primary)] text-sm font-bold tracking-wide uppercase border border-[var(--primary-dark)]">
                                    {project.industry}
                                </span>
                                {project.featured && (
                                    <span className="px-4 py-1.5 rounded-full bg-[var(--glass)] text-[var(--text-secondary)] text-sm font-medium border border-[var(--glass-border)]">
                                        Featured Project
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 mb-8 text-[var(--text-dim)] border-y border-[var(--glass-border)] py-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[var(--primary)]" />
                                    <span>{project.year}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-[var(--primary)]" />
                                    <span>{project.tags[0]}</span>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none mb-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Project Overview</h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                <h3 className="text-2xl font-bold text-white mb-4">Technical Details</h3>
                                <p className="text-[var(--text-dim)] leading-relaxed">
                                    {project.details}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-[var(--text-dim)] uppercase tracking-wider">Technologies & Materials</h4>
                                <div className="flex flex-wrap gap-3">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-[var(--primary)] transition-colors">
                                            <Tag className="w-4 h-4 text-[var(--primary)]" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-[var(--glass-border)]">
                                <button onClick={() => navigate('/contact')} className="btn-primary w-full md:w-auto">
                                    Start a Similar Project
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
