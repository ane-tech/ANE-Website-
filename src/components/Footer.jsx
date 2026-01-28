import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
            {/* Main Footer Content */}
            <div style={{ padding: '5rem 0 3rem' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '3rem'
                    }}>
                        {/* Brand Column */}
                        <div style={{ gridColumn: 'span 1' }}>
                            <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#70e4de' }}>ANE</span>
                            </Link>
                            <p style={{ color: '#8a8a9a', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                ANE is an advanced 3D ecosystem merging AI-driven generation with industrial additive manufacturing. From 2D images to print-ready models, we redefine digital creation.
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#8a8a9a',
                                            transition: 'all 0.3s ease'
                                        }}
                                        className="social-icon"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services Column */}
                        <div>
                            <h4 style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#8a8a9a',
                                letterSpacing: '0.1em',
                                marginBottom: '1.5rem'
                            }}>SERVICES</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Prototyping', 'Scalable Manufacturing', 'Reverse Engineering', 'Custom Design'].map(item => (
                                    <li key={item}>
                                        <Link
                                            to={`/services/${item.toLowerCase().replace(/ /g, '-')}`}
                                            style={{
                                                color: '#e0e0e0',
                                                fontSize: '0.95rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                transition: 'color 0.3s ease'
                                            }}
                                            className="footer-link"
                                        >
                                            {item}
                                            <ArrowUpRight size={14} style={{ opacity: 0, transition: 'opacity 0.3s ease' }} className="link-arrow" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Industries Column */}
                        <div>
                            <h4 style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#8a8a9a',
                                letterSpacing: '0.1em',
                                marginBottom: '1.5rem'
                            }}>INDUSTRIES</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Healthcare', 'Art & Sculpture', 'Education', 'Electronics'].map(item => (
                                    <li key={item}>
                                        <Link
                                            to={`/industries/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                            style={{
                                                color: '#e0e0e0',
                                                fontSize: '0.95rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                transition: 'color 0.3s ease'
                                            }}
                                            className="footer-link"
                                        >
                                            {item}
                                            <ArrowUpRight size={14} style={{ opacity: 0, transition: 'opacity 0.3s ease' }} className="link-arrow" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div>
                            <h4 style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#8a8a9a',
                                letterSpacing: '0.1em',
                                marginBottom: '1.5rem'
                            }}>CONTACT</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <MapPin size={18} style={{ color: '#70e4de', marginTop: '2px', flexShrink: 0 }} />
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Central+Institute+of+Technology+Kokrajhar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#e0e0e0', fontSize: '0.95rem', lineHeight: 1.6, textDecoration: 'none' }}
                                        className="footer-link"
                                    >
                                        Central Institute of Technology,<br />
                                        Kokrajhar, Assam
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Phone size={18} style={{ color: '#70e4de' }} />
                                    <a href="tel:6003437947" style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>6003437947</a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Mail size={18} style={{ color: '#70e4de' }} />
                                    <a href="mailto:ane128278@gmail.com" style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>ane128278@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '1.5rem 0'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{ color: '#8a8a9a', fontSize: '0.85rem' }}>
                        © {currentYear} ANE 3D Printing. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
                            <a
                                key={item}
                                href="#"
                                style={{
                                    color: '#8a8a9a',
                                    fontSize: '0.85rem',
                                    transition: 'color 0.3s ease'
                                }}
                                className="footer-link"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .social-icon:hover {
          background: rgba(112, 228, 222, 0.1) !important;
          border-color: rgba(112, 228, 222, 0.3) !important;
          color: #70e4de !important;
          transform: translateY(-2px);
        }
        .footer-link:hover {
          color: #70e4de !important;
        }
        .footer-link:hover .link-arrow {
          opacity: 1 !important;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
