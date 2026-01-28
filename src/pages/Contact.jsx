import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, sending, success
    const [showMap, setShowMap] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: <Mail size={24} />,
            title: "Email Us",
            details: "ane128278@gmail.com",
            subtext: "Open Gmail to send message",
            link: "https://mail.google.com/mail/?view=cm&fs=1&to=ane128278@gmail.com",
            action: "Compose Email"
        },
        {
            icon: <Phone size={24} />,
            title: "Call Us",
            details: "+91 60034 37947",
            subtext: "Mon-Fri, 9am - 6pm",
            link: "tel:6003437947",
            action: "Start Call"
        },
        {
            icon: <MapPin size={24} />,
            title: "Visit Us",
            details: "Central Institute of Technology",
            subtext: "Kokrajhar, Assam",
            link: "https://www.google.com/maps/search/?api=1&query=Central+Institute+of+Technology+Kokrajhar",
            action: "View on Maps"
        }
    ];

    return (
        <div style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', minHeight: '100vh', position: 'relative' }}>
            <Header />

            <AnimatePresence>
                {showMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(5, 5, 8, 0.8)',
                            backdropFilter: 'blur(15px)',
                            zIndex: 1100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                        onClick={() => setShowMap(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '1000px',
                                height: '70vh',
                                background: 'var(--bg-card)',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowMap(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    zIndex: 2,
                                    border: '1px solid var(--glass-border)'
                                }}
                            >
                                <X size={20} />
                            </button>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.123456789!2d90.307213!3d26.474610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37588e2289f61b0d%3A0x9d00d23412345678!2sCentral%20Institute%20of%20Technology%20Kokrajhar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section style={{
                paddingTop: '160px',
                paddingBottom: '40px',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="section-title">Get in <span className="text-gradient">Touch</span></h1>
                        <p className="section-subtitle">
                            Ready to transform your ideas into reality? Our team is standing by to help.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Support Section */}
            <section style={{ paddingBottom: '80px' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.5fr 1fr',
                        gap: '4rem',
                        marginBottom: '6rem'
                    }} className="contact-bottom-grid">

                        {/* Left Side: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <form
                                onSubmit={handleSubmit}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '4rem',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
                                }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }} className="form-row">
                                    <div className="input-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Sourav Sharma"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="souravsharma@gmail.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }} className="form-row">
                                    <div className="input-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 1234567890"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Project Inquiry"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginBottom: '3rem' }}>
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    className="btn-primary"
                                    type="submit"
                                    style={{ width: '100%', padding: '1.5rem', fontSize: '1.1rem' }}
                                    disabled={status === 'sending' || status === 'success'}
                                >
                                    {status === 'idle' && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            Submit Message <Send size={20} />
                                        </span>
                                    )}
                                    {status === 'sending' && "Sending..."}
                                    {status === 'success' && "Sent Successfully!"}
                                </button>
                            </form>
                        </motion.div>

                        {/* Right Side: Direct Chat */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{
                                padding: '3.5rem',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'rgba(112, 228, 222, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    margin: '0 auto 2rem'
                                }}>
                                    <MessageSquare size={36} />
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Instant Support</h2>
                                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                    Prefer real-time conversation? Our engineering team is available on WhatsApp to answer your technical questions instantly.
                                </p>
                                <a
                                    href="https://wa.me/916003437947"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{
                                        padding: '1.25rem',
                                        fontSize: '1rem',
                                        background: 'transparent',
                                        border: '1px solid var(--primary)',
                                        color: 'var(--primary)',
                                        boxShadow: 'none'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--bg-dark)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }}
                                >
                                    Chat with an Engineer
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Info Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem'
                    }} className="top-contact-grid">
                        {contactInfo.map((item, idx) => (
                            <motion.a
                                key={idx}
                                href={item.title === "Visit Us" ? undefined : item.link}
                                onClick={item.title === "Visit Us" ? (e) => { e.preventDefault(); setShowMap(true); } : undefined}
                                target={item.link.startsWith('http') && item.title !== "Visit Us" ? "_blank" : undefined}
                                rel={item.link.startsWith('http') && item.title !== "Visit Us" ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    padding: '3.5rem 2rem',
                                    background: 'rgba(255,255,255,0.01)',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    transition: 'all 0.5s var(--transition-smooth)',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                className="premium-contact-card"
                            >
                                {/* Decorative Glow */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20%',
                                    right: '-20%',
                                    width: '120px',
                                    height: '120px',
                                    background: 'var(--primary-glow)',
                                    filter: 'blur(40px)',
                                    borderRadius: '50%',
                                    opacity: 0,
                                    transition: 'opacity 0.5s ease'
                                }} className="card-glow" />

                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: 'rgba(112, 228, 222, 0.1)',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    marginBottom: '2rem'
                                }} className="icon-wrapper">
                                    {item.icon}
                                </div>

                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>{item.details}</p>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '2rem' }}>{item.subtext}</p>

                                <span className="action-btn" style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '50px',
                                    background: 'rgba(112, 228, 222, 0.1)',
                                    border: '1px solid rgba(112, 228, 222, 0.2)',
                                    color: 'var(--primary)',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {item.action}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .input-group label {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--text-dim);
                    margin-left: 0.5rem;
                }
                .input-group input, .input-group textarea {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 1rem 1.25rem;
                    color: var(--text-main);
                    font-family: inherit;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .input-group input:focus, .input-group textarea:focus {
                    outline: none;
                    border-color: var(--primary);
                    background: rgba(112, 228, 222, 0.05);
                    box-shadow: 0 0 15px rgba(112, 228, 222, 0.1);
                }
                .premium-contact-card:hover {
                    background: rgba(112, 228, 222, 0.03) !important;
                    border-color: var(--primary) !important;
                    transform: translateY(-12px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(112, 228, 222, 0.1);
                }
                .premium-contact-card:hover .card-glow {
                    opacity: 0.6 !important;
                }
                .premium-contact-card:hover .icon-wrapper {
                    background: var(--primary) !important;
                    color: var(--bg-dark) !important;
                    transform: scale(1.1) rotate(5deg);
                }
                .premium-contact-card:hover .action-btn {
                    background: var(--primary) !important;
                    color: var(--bg-dark) !important;
                    box-shadow: 0 0 20px var(--primary-glow);
                }
                @media (max-width: 1024px) {
                    .top-contact-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                    .contact-bottom-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 640px) {
                    .top-contact-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .premium-contact-card {
                        padding: 2.5rem 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;
