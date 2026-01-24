import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User,
    Package,
    Heart,
    Settings,
    LogOut,
    Box,
    MapPin,
    ShoppingCart,
    ChevronRight,
    Edit,
    Plus,
    Trash2,
    Zap,
    Database,
    ShieldCheck,
    Sparkles,
    Mail,
    Phone
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
    const [isEditing, setIsEditing] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [tempAvatar, setTempAvatar] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropScale, setCropScale] = useState(1);
    const [imgRotation, setImgRotation] = useState(0);
    const [favouriteItems, setFavouriteItems] = useState([
        { id: 1, name: 'Precision Gear Set', price: 45.00, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=100' },
        { id: 2, name: 'Tough Resin V4', price: 89.99, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=100' },
        { id: 3, name: 'Custom Drone Chassis', price: 149.00, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
        { id: 4, name: 'Prototyping Kit V2', price: 85.50, img: 'https://images.unsplash.com/photo-1563206767-5b18f21dae90?auto=format&fit=crop&q=80&w=600' }
    ]);

    const toggleFavourite = (id) => {
        setFavouriteItems(prev => prev.filter(item => item.id !== id));
    };
    const [profileData, setProfileData] = useState({
        name: "Sourav Sharma",
        email: "sourav@ane.tech",
        phone: "9876543210", // Store only 10 digits
        specializations: ["Aerospace", "Medical Devices", "Rapid Prototyping"]
    });

    const userData = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        memberSince: "January 2024",
        tier: "Enterprise Designer",
        status: "Active",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}`,
        stats: {
            orders: 12,
            favourites: favouriteItems.length,
            credits: 1250,
            storage: "1.2 GB / 5 GB",
            prints: 3
        }
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            // Validate phone number
            if (profileData.phone.length !== 10) {
                setPhoneError('Phone number must be exactly 10 digits');
                return;
            }
            setPhoneError('');
        }
        setIsEditing(!isEditing);
    };

    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: <User size={20} /> },
        { id: 'orders', label: 'Order History', icon: <Package size={20} /> },
        { id: 'cart', label: 'My Cart', icon: <ShoppingCart size={20} /> },
        { id: 'favourites', label: 'Favourite Designs', icon: <Heart size={20} /> },
        { id: 'address', label: 'My Addresses', icon: <MapPin size={20} /> },
    ];

    const recentOrders = [
        { id: '#ANE-8821', date: 'Oct 24, 2025', status: 'Delivered', amount: '$149.00', item: 'Custom Drone Chassis' },
        { id: '#ANE-7712', date: 'Sep 12, 2025', status: 'In Transit', amount: '$85.50', item: 'Prototyping Kit V2' },
    ];

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Precision Gear Set', price: 45.00, qty: 2, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=100' },
        { id: 2, name: 'Tough Resin V4', price: 89.99, qty: 1, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=100' },
        { id: 3, name: 'Industrial PLA Red', price: 29.50, qty: 3, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=100' },
        { id: 4, name: 'Aerospace Carbon Fiber', price: 199.00, qty: 1, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=100' },
        { id: 5, name: 'Flexible TPU Blue', price: 55.00, qty: 2, img: 'https://images.unsplash.com/photo-1563206767-5b18f21dae90?auto=format&fit=crop&q=80&w=100' },
        { id: 6, name: 'Detail Resin Clear', price: 75.25, qty: 1, img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=100' },
        { id: 7, name: 'Bronze Infused Filament', price: 68.00, qty: 1, img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=100' }
    ]);

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        ));
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = subtotal > 500 ? 0 : 25.00;
    const totalAmount = subtotal + shipping;

    const [addressItems, setAddressItems] = useState([
        { id: 1, type: 'Home', street: '123 Tech Lane', city: 'Innovate City', state: 'Digital State', zip: '560001', isDefault: true },
        { id: 2, type: 'Office', street: 'ANE Headquarters, Sector 5', city: 'Build City', state: 'Manufacturing Hub', zip: '560045', isDefault: false },
    ]);

    const setDefaultAddress = (id) => {
        setAddressItems(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const deleteAddress = (id) => {
        setAddressItems(prev => prev.filter(addr => addr.id !== id));
    };

    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleStartAdd = () => {
        setAddressForm({ street: '', city: '', state: '', zip: '' });
        setEditingAddressId(null);
        setIsAddingAddress(true);
    };

    const handleEditAddress = (addr) => {
        setAddressForm({
            street: addr.street,
            city: addr.city,
            state: addr.state,
            zip: addr.zip
        });
        setEditingAddressId(addr.id);
        setIsAddingAddress(true);
    };

    const handleSaveAddress = () => {
        if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.zip) return;

        if (editingAddressId) {
            setAddressItems(prev => prev.map(addr =>
                addr.id === editingAddressId ? { ...addr, ...addressForm } : addr
            ));
        } else {
            const hasHome = addressItems.some(a => a.type === 'Home');
            const newType = hasHome ? 'Office' : 'Home';

            const newAddr = {
                id: Date.now(),
                type: newType,
                ...addressForm,
                isDefault: addressItems.length === 0
            };
            setAddressItems([...addressItems, newAddr]);
        }

        setIsAddingAddress(false);
        setEditingAddressId(null);
    };

    return (
        <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
            <Header />

            <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>

                    {/* User Hero Section - The Aurora Command Header */}
                    <div style={{ position: 'relative', marginBottom: '4rem' }}>
                        {/* Decorative Background Glows */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '10%',
                            width: '30%',
                            height: '100px',
                            background: 'var(--primary)',
                            filter: 'blur(100px)',
                            opacity: 0.15,
                            borderRadius: '50%',
                            zIndex: 0
                        }} />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.01)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '40px',
                                padding: '3rem',
                                display: 'grid',
                                gridTemplateColumns: '1.2fr 1fr',
                                gap: '4rem',
                                backdropFilter: 'blur(20px)',
                                position: 'relative',
                                zIndex: 1,
                                overflow: 'hidden'
                            }}
                        >
                            {/* Identity Stack */}
                            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setTempAvatar(reader.result);
                                                    setShowCropModal(true);
                                                    setCropScale(1);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '32px',
                                        background: 'linear-gradient(135deg, var(--primary), transparent)',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 30px rgba(112, 228, 222, 0.1)'
                                    }}>
                                        <img
                                            src={profileData.avatar || userData.avatar}
                                            alt="User Avatar"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '30px',
                                                background: '#0a0a0f',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <label htmlFor="avatar-upload" style={{
                                        position: 'absolute',
                                        bottom: '-10px',
                                        right: '-10px',
                                        background: 'var(--primary)',
                                        color: '#000',
                                        border: '4px solid #0a0a0f',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                                    }}>
                                        <Edit size={18} />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div>
                                        <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.25rem' }}>{userData.name}</h1>
                                        <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>Member Since 2025</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '1rem' }}>
                                            <Mail size={16} color="var(--primary)" /> {userData.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '1rem' }}>
                                            <Phone size={16} color="var(--primary)" /> +91 {userData.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Tiles */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignContent: 'center' }}>
                                {[
                                    { label: 'Saved Designs', val: favouriteItems.length, icon: <Heart size={20} />, tab: 'favourites' },
                                    { label: 'Cart Items', val: cartItems.length, icon: <ShoppingCart size={20} />, tab: 'cart' },
                                    { label: 'Total Orders', val: userData.stats.orders, icon: <Package size={20} />, tab: 'orders' },
                                    { label: 'Loyalty Points', val: '2,450', icon: <Zap size={20} />, tab: 'profile' }
                                ].map((stat, i) => (
                                    <motion.button
                                        key={stat.label}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        onClick={() => setActiveTab(stat.tab)}
                                        style={{
                                            padding: '1.5rem',
                                            background: 'rgba(112, 228, 222, 0.02)',
                                            border: '1px solid rgba(112, 228, 222, 0.05)',
                                            borderRadius: '24px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)';
                                            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.05)';
                                            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.02)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ color: 'var(--primary)' }}>{stat.icon}</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{stat.val}</div>
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{stat.label}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

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
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <User size={24} color="var(--primary)" /> Profile Details
                                            </h2>
                                            <button
                                                onClick={handleToggleEdit}
                                                style={{
                                                    background: isEditing ? 'rgba(112, 228, 222, 0.2)' : 'rgba(255,255,255,0.05)',
                                                    border: isEditing ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                                    padding: '0.75rem',
                                                    borderRadius: '12px',
                                                    color: isEditing ? 'var(--primary)' : '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {isEditing ? (
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Save Changes</span>
                                                ) : (
                                                    <Edit size={20} />
                                                )}
                                            </button>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                            {[
                                                { label: 'Full Name', key: 'name' },
                                                { label: 'Email Address', key: 'email' },
                                                { label: 'Phone Number', key: 'phone' },
                                            ].map(field => (
                                                <div key={field.key}>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>{field.label}</label>
                                                    {isEditing && field.key !== 'email' ? (
                                                        <div style={{ position: 'relative' }}>
                                                            {field.key === 'phone' ? (
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                                    border: `1px solid ${phoneError ? '#ff4d4d' : 'var(--primary)'}`,
                                                                    borderRadius: '12px',
                                                                    paddingLeft: '1rem',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', paddingRight: '0.5rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>+91</span>
                                                                    <input
                                                                        type="text"
                                                                        value={profileData.phone}
                                                                        maxLength={10}
                                                                        onChange={(e) => {
                                                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                                            setProfileData({ ...profileData, phone: val });
                                                                            if (val.length === 10) setPhoneError('');
                                                                        }}
                                                                        style={{
                                                                            flex: 1,
                                                                            padding: '1rem',
                                                                            background: 'transparent',
                                                                            border: 'none',
                                                                            color: '#fff',
                                                                            fontSize: '0.95rem',
                                                                            outline: 'none'
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={profileData[field.key]}
                                                                    onChange={(e) => setProfileData({ ...profileData, [field.key]: e.target.value })}
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '1rem',
                                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                                        border: '1px solid var(--primary)',
                                                                        borderRadius: '12px',
                                                                        color: '#fff',
                                                                        fontSize: '0.95rem',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                            )}
                                                            {field.key === 'phone' && phoneError && (
                                                                <div style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.4rem', position: 'absolute' }}>{phoneError}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div style={{
                                                            padding: '1rem',
                                                            background: field.key === 'email' && isEditing ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                                            borderRadius: '12px',
                                                            color: field.key === 'email' && isEditing ? 'rgba(255,255,255,0.4)' : '#fff',
                                                            fontSize: '0.95rem',
                                                            cursor: field.key === 'email' && isEditing ? 'not-allowed' : 'default'
                                                        }}>
                                                            {field.key === 'phone' ? `+91 ${profileData.phone}` : profileData[field.key]}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* New Section: Industry Specializations */}
                                        <div style={{ marginTop: '3rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Industry Specializations</label>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Select your domains of interest</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '0.75rem',
                                                padding: '1.5rem',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '16px'
                                            }}>
                                                {["Aerospace", "Medical Devices", "Rapid Prototyping", "Consumer Goods", "Robotics", "Automotive", "Architecture"].map(tag => {
                                                    const isActive = profileData.specializations.includes(tag);
                                                    return (
                                                        <button
                                                            key={tag}
                                                            onClick={() => {
                                                                if (!isEditing) return;
                                                                const newSpecs = isActive
                                                                    ? profileData.specializations.filter(s => s !== tag)
                                                                    : [...profileData.specializations, tag];
                                                                setProfileData({ ...profileData, specializations: newSpecs });
                                                            }}
                                                            style={{
                                                                padding: '0.6rem 1.25rem',
                                                                borderRadius: '30px',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 500,
                                                                background: isActive ? 'rgba(112, 228, 222, 0.15)' : 'rgba(255,255,255,0.05)',
                                                                border: `1px solid ${isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                                                color: isActive ? 'var(--primary)' : 'var(--text-dim)',
                                                                transition: 'all 0.3s ease',
                                                                cursor: isEditing ? 'pointer' : 'default'
                                                            }}
                                                        >
                                                            {tag}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
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
                                                            <Package size={24} />
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

                                {activeTab === 'cart' && (
                                    <motion.div
                                        key="cart"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <ShoppingCart size={24} color="var(--primary)" /> My Cart
                                        </h2>
                                        {cartItems.length > 0 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                {/* Scrollable Items Container */}
                                                <div
                                                    className="custom-scrollbar"
                                                    style={{
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '1rem',
                                                        paddingRight: '0.5rem'
                                                    }}
                                                >
                                                    {cartItems.map(item => (
                                                        <div key={item.id} style={{
                                                            padding: '1.25rem',
                                                            background: 'rgba(255, 255, 255, 0.02)',
                                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                                            borderRadius: '16px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                                                <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                                                                <div>
                                                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '8px', width: 'fit-content' }}>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.id, -1)}
                                                                            style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
                                                                        >-</button>
                                                                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.id, 1)}
                                                                            style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
                                                                        >+</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>${(item.price * item.qty).toFixed(2)}</div>
                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Fixed Summary Below */}
                                                <div style={{
                                                    padding: '1.5rem',
                                                    background: 'rgba(112, 228, 222, 0.05)',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(112, 228, 222, 0.1)'
                                                }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                        <span style={{ color: 'var(--text-dim)' }}>Subtotal</span>
                                                        <span>${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                        <span style={{ color: 'var(--text-dim)' }}>Shipping</span>
                                                        <span style={{ color: shipping === 0 ? '#4caf50' : '#fff' }}>
                                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                                        </span>
                                                    </div>
                                                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }} />
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                                                        <span>Total Amount</span>
                                                        <span style={{ color: 'var(--primary)' }}>${totalAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', fontSize: '1.1rem', fontWeight: 600 }}>Place Order</button>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '4rem 1rem', opacity: 0.5 }}>
                                                <ShoppingCart size={64} style={{ marginBottom: '1rem' }} />
                                                <p style={{ fontSize: '1.2rem' }}>Your cart is currently empty.</p>
                                                <button
                                                    onClick={() => setActiveTab('profile')}
                                                    style={{ marginTop: '1.5rem', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
                                                >
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'favourites' && (
                                    <motion.div
                                        key="favourites"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}>
                                                <Heart size={24} color="var(--primary)" /> Favourite Designs
                                            </h2>
                                            <button
                                                onClick={() => navigate('/favorites')}
                                                style={{ fontSize: '0.85rem', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '6px 16px', borderRadius: '100px', cursor: 'pointer', background: 'rgba(112, 228, 222, 0.05)' }}
                                            >View All</button>
                                        </div>

                                        {favouriteItems.length > 0 ? (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                {favouriteItems.map(item => (
                                                    <div key={item.id} style={{
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
                                                            background: `url(${item.img}) center/cover no-repeat`,
                                                            opacity: 0.3
                                                        }} />
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

                                                        {/* Heart/Unfavourite Toggle */}
                                                        <button
                                                            onClick={() => toggleFavourite(item.id)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '1rem',
                                                                right: '1rem',
                                                                background: 'rgba(0,0,0,0.5)',
                                                                backdropFilter: 'blur(5px)',
                                                                padding: '8px',
                                                                borderRadius: '10px',
                                                                color: '#ff4d4d',
                                                                border: '1px solid rgba(255,77,77,0.3)',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <Heart size={18} fill="#ff4d4d" />
                                                        </button>

                                                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                                                            <div>
                                                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>₹{item.price} • STL Model</div>
                                                            </div>
                                                            <button
                                                                onClick={() => navigate(`/model/${item.id}`, { state: { model: item, from: '/account', activeTab: 'favourites' } })}
                                                                style={{ fontSize: '0.75rem', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '4px 12px', borderRadius: '6px', background: 'rgba(112, 228, 222, 0.05)', cursor: 'pointer' }}
                                                            >View</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '4rem 1rem', opacity: 0.5 }}>
                                                <Heart size={64} style={{ marginBottom: '1rem' }} />
                                                <p style={{ fontSize: '1.2rem' }}>You haven't favourited any designs yet.</p>
                                                <button
                                                    onClick={() => navigate('/')}
                                                    style={{ marginTop: '1.5rem', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
                                                >Browse Collections</button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'address' && (
                                    <motion.div
                                        key="address"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <MapPin size={24} color="var(--primary)" /> My Addresses
                                            </h2>
                                            {addressItems.length < 2 && !isAddingAddress && (
                                                <button
                                                    onClick={handleStartAdd}
                                                    style={{ color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                                >
                                                    <Plus size={18} /> Add New
                                                </button>
                                            )}
                                        </div>

                                        {isAddingAddress && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    padding: '2rem',
                                                    background: 'rgba(255, 255, 255, 0.03)',
                                                    border: '1px solid var(--primary)',
                                                    borderRadius: '20px',
                                                    marginBottom: '2rem'
                                                }}
                                            >
                                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                                                    {editingAddressId
                                                        ? `Edit ${addressItems.find(a => a.id === editingAddressId)?.type} Address`
                                                        : `Add ${addressItems.some(a => a.type === 'Home') ? 'Office' : 'Home'} Address`
                                                    }
                                                </h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                    <div style={{ gridColumn: 'span 2' }}>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Street Address</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.street}
                                                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="e.g. 123 Tech Lane"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>City</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.city}
                                                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="Innovate City"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>State</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.state}
                                                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="Digital State"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Pincode</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.zip}
                                                            onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="560001"
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => { setIsAddingAddress(false); setEditingAddressId(null); }}
                                                        style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)', cursor: 'pointer' }}
                                                    >Cancel</button>
                                                    <button
                                                        onClick={handleSaveAddress}
                                                        style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'var(--primary)', border: 'none', color: '#000', fontWeight: 600, cursor: 'pointer' }}
                                                    >{editingAddressId ? 'Update Address' : 'Save Address'}</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                            {addressItems.map(addr => (
                                                <div
                                                    key={addr.id}
                                                    onClick={() => setDefaultAddress(addr.id)}
                                                    style={{
                                                        padding: '1.5rem',
                                                        background: 'rgba(255, 255, 255, 0.02)',
                                                        border: addr.isDefault ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '16px',
                                                        position: 'relative',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{addr.type}</span>
                                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                            {addr.isDefault ? (
                                                                <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>DEFAULT</span>
                                                            ) : (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setDefaultAddress(addr.id); }}
                                                                    style={{ fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-dim)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                                                                >SET DEFAULT</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                                                        {addr.street},<br />
                                                        {addr.city}, {addr.state} - {addr.zip}
                                                    </p>
                                                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1.5rem' }}>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }}
                                                            style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                                        ><Edit size={14} /> Edit</button>
                                                        {!addr.isDefault && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
                                                                style={{ fontSize: '0.85rem', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                                            ><Trash2 size={14} /> Delete</button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>
                </div>
            </main>

            {/* Image Fitting Modal */}
            <AnimatePresence>
                {showCropModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: '#0a0a0f',
                                border: '1px solid rgba(112, 228, 222, 0.2)',
                                borderRadius: '32px',
                                padding: '3rem',
                                width: '90%',
                                maxWidth: '500px',
                                textAlign: 'center'
                            }}
                        >
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Adjust Profile Photo</h2>

                            {/* Square Preview Box */}
                            <div style={{
                                width: '300px',
                                height: '300px',
                                margin: '0 auto 2rem',
                                borderRadius: '32px',
                                border: '2px solid var(--primary)',
                                overflow: 'hidden',
                                position: 'relative',
                                background: '#111'
                            }}>
                                <motion.img
                                    src={tempAvatar}
                                    drag
                                    dragMomentum={false}
                                    dragElastic={0.1}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        scale: cropScale,
                                        rotate: `${imgRotation}deg`,
                                        cursor: 'grab'
                                    }}
                                    whileTap={{ cursor: 'grabbing' }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                    <span>Zoom</span>
                                    <span>{Math.round(cropScale * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.01"
                                    value={cropScale}
                                    onChange={(e) => setCropScale(parseFloat(e.target.value))}
                                    style={{
                                        width: '100%',
                                        accentColor: 'var(--primary)',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setShowCropModal(false)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >Cancel</button>
                                <button
                                    onClick={() => {
                                        // Finalize
                                        setProfileData(prev => ({ ...prev, avatar: tempAvatar }));
                                        setShowCropModal(false);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        background: 'var(--primary)',
                                        color: '#000',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 700
                                    }}
                                >Save Photo</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Account;
