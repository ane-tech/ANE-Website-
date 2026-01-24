import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Package,
    Heart,
    Settings,
    LogOut,
    Box,
    Shield,
    Bell,
    CreditCard,
    ChevronRight,
    Edit,
    ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const userData = {
        name: "Sourav Sharma",
        email: "sourav@ane.tech",
        memberSince: "January 2024",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sourav",
        stats: {
            orders: 12,
            saved: 24,
            credits: 450
        }
    };

    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: <User size={20} /> },
        { id: 'orders', label: 'Order History', icon: <Package size={20} /> },
        { id: 'designs', label: 'Saved Designs', icon: <Box size={20} /> },
        { id: 'billing', label: 'Billing & Payment', icon: <CreditCard size={20} /> },
        { id: 'security', label: 'Security', icon: <Shield size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    ];

    const recentOrders = [
        { id: '#ANE-8821', date: 'Oct 24, 2025', status: 'Delivered', amount: '$149.00', item: 'Custom Drone Chassis' },
        { id: '#ANE-7712', date: 'Sep 12, 2025', status: 'In Transit', amount: '$85.50', item: 'Prototyping Kit V2' },
    ];

    return (
        <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
            <Header />

            <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>

                    {/* User Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'rgba(112, 228, 222, 0.03)',
                            border: '1px solid rgba(112, 228, 222, 0.1)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '3rem',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={userData.avatar}
                                    alt="User Avatar"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid var(--primary)' }}
                                />
                                <button style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    background: 'var(--primary)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000'
                                }}>
                                    <Edit size={16} />
                                </button>
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{userData.name}</h1>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>{userData.email} • Member since {userData.memberSince}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {[
                                { label: 'Orders', val: userData.stats.orders },
                                { label: 'Saved', val: userData.stats.saved },
                                { label: 'Credits', val: userData.stats.credits }
                            ].map(stat => (
                                <div key={stat.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{stat.val}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>

                        {/* Sidebar Navigation */}
                        <aside>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {menuItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            background: activeTab === item.id ? 'rgba(112, 228, 222, 0.1)' : 'transparent',
                                            color: activeTab === item.id ? 'var(--primary)' : '#fff',
                                            border: activeTab === item.id ? '1px solid rgba(112, 228, 222, 0.2)' : '1px solid transparent',
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease',
                                            fontSize: '1rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                        {activeTab === item.id && <motion.div layoutId="active" style={{ marginLeft: 'auto' }}><ChevronRight size={18} /></motion.div>}
                                    </button>
                                ))}

                                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '1rem 0' }} />

                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    borderRadius: '16px',
                                    color: '#ff4d4d',
                                    textAlign: 'left',
                                    transition: 'all 0.3s ease',
                                    fontSize: '1rem',
                                    fontWeight: 500
                                }}>
                                    <LogOut size={20} />
                                    Sign Out
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <section style={{
                            background: 'rgba(255, 255, 255, 0.01)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            minHeight: '600px'
                        }}>
                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' && (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <User size={24} color="var(--primary)" /> Profile Details
                                        </h2>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                            {[
                                                { label: 'Full Name', value: 'Sourav Sharma' },
                                                { label: 'Email Address', value: 'sourav@ane.tech' },
                                                { label: 'Phone Number', value: '+91 98765 43210' },
                                                { label: 'Company', value: 'ANE Tech Solutions' },
                                            ].map(field => (
                                                <div key={field.label}>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>{field.label}</label>
                                                    <div style={{
                                                        padding: '1rem',
                                                        background: 'rgba(255, 255, 255, 0.03)',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        borderRadius: '12px',
                                                        color: '#fff',
                                                        fontSize: '0.95rem'
                                                    }}>{field.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: '2.5rem' }}>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Bio</label>
                                            <div style={{
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '12px',
                                                color: '#fff',
                                                fontSize: '0.95rem',
                                                lineHeight: 1.6
                                            }}>
                                                Industrial designer focused on additive manufacturing. Building the future of rapid prototyping one layer at a time.
                                            </div>
                                        </div>

                                        <button className="btn-primary" style={{ marginTop: '2.5rem' }}>Update Profile</button>
                                    </motion.div>
                                )}

                                {activeTab === 'orders' && (
                                    <motion.div
                                        key="orders"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Package size={24} color="var(--primary)" /> Order History
                                        </h2>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {recentOrders.map(order => (
                                                <div key={order.id} style={{
                                                    padding: '1.5rem',
                                                    background: 'rgba(255, 255, 255, 0.02)',
                                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                                        <div style={{ width: '50px', height: '50px', background: 'rgba(112, 228, 222, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                            <Box size={24} />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, fontSize: '1rem' }}>{order.item}</div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Order {order.id} • {order.date}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{order.amount}</div>
                                                        <div style={{
                                                            fontSize: '0.75rem',
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                            background: order.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                                            color: order.status === 'Delivered' ? '#4caf50' : '#ff9800',
                                                            display: 'inline-block'
                                                        }}>{order.status}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'designs' && (
                                    <motion.div
                                        key="designs"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Box size={24} color="var(--primary)" /> Saved Designs
                                        </h2>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} style={{
                                                    padding: '1rem',
                                                    background: 'rgba(255, 255, 255, 0.02)',
                                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    borderRadius: '16px',
                                                    aspectRatio: '16/10',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background: 'linear-gradient(135deg, rgba(112, 228, 222, 0.1), transparent)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Box size={48} color="rgba(112, 228, 222, 0.3)" />
                                                    </div>
                                                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Project_NANO_V{i}.stl</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Saved on Oct {10 + i}, 2025</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {['billing', 'security', 'notifications'].includes(activeTab) && (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            color: 'var(--text-dim)'
                                        }}
                                    >
                                        {activeTab === 'billing' && <CreditCard size={48} style={{ marginBottom: '1.5rem' }} />}
                                        {activeTab === 'security' && <Shield size={48} style={{ marginBottom: '1.5rem' }} />}
                                        {activeTab === 'notifications' && <Bell size={48} style={{ marginBottom: '1.5rem' }} />}
                                        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Coming Soon</h3>
                                        <p>We are currently working on this feature to bring you a better experience.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Account;
